import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from 'classnames';
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ReactCardFlip from "react-card-flip";
import Typography from '@material-ui/core/Typography';
import { API } from "aws-amplify";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import sports from './images/sports.jpg';
import VideoGames from './images/VideoGames.jpg';
import Electronics from './images/Electronics.jpg';
import Apparel from './images/Apparel.jpg';
import Accessories from './images/Accessories.jpg';
import Transportation from './images/Transportation.jpg';
import Outdoors from './images/Outdoors.jpg';
import FoodandDrinks from './images/FoodandDrinks.jpg';


import NavigationIcon from '@material-ui/icons/Navigation';
import ForumIcon from '@material-ui/icons/Forum';
import DoneIcon from '@material-ui/icons/Done';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red, blue, green, purple } from '@material-ui/core/colors'

const purpleTheme = createMuiTheme({ palette: { primary: blue } })
const greenTheme = createMuiTheme({ palette: { primary: green } })
const redTheme = createMuiTheme({ palette: { primary: red } })

const styles = theme => ({
  card: {
    maxWidth: 400,
    maxHeight: 200,
    minHeight: 200
  },
    button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  image: {
  	maxHeight: 200,
  	maxWidth: 100
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
   margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Item extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFlipped: false,
			mine: false,
			user: "Loading...",
			userId: "",
			accepted: false,
			accepterId: "",
			timeToReceive: null,
			id: this.props.data.betId
		};
		this.delete = this.delete.bind(this);
		this.rotate = this.rotate.bind(this);
		this.chat = this.chat.bind(this);
		this.accept = this.accept.bind(this);
		this.pickFulfiller = this.pickFulfiller.bind(this);
		this.getImageByCategory = this.getImageByCategory.bind(this);
	}
	rotate(e) {
		e.preventDefault();
		this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
	}

	async componentDidMount() {
		let cardUser = await API.get(
			"bets",
			`/getUserById/${this.props.data.userId}`
		);
		let currentUser = await API.get("bets", "/getUser");
		if (currentUser.userId === cardUser.userId) {
			this.setState({ mine: true });
		}
		this.setState({ user: `${cardUser.firstName} ${cardUser.lastName}` });
	}

	async delete(event) {
		event.preventDefault();
		let wtb = await API.del("bets", `/bets/${this.props.data.betId}`).then(
			response => console.log(response)
		);
		await this.props.setCategory("All");
	}

	async chat(event) {
		event.preventDefault();
		await this.props.activateChat(this.state.id);
	}

	async accept(event) {
		event.preventDefault();
		let currentUser = await API.get("bets", "/getUser");
		let accepted = await API.post(
			"bets",
			`/acceptCard/${this.props.data.betId}`,
			{
				body: {
					otherUserId: currentUser.userId
				}
			}
		).then(data => console.log(data));
	}

	async pickFulfiller() {
		console.log(this.props.data.fulfillerOptions);
		let accepted = await API.post(
			"bets",
			`/selectFulfiller/${this.props.data.betId}`,
			{
				body: {
					otherUserId: this.state.accepterId
				}
			}
		).then(data => console.log(data));
	}

	getImageByCategory() {
		let category = this.props.data.category;
		if (category==="Sports")
			return sports;
		else if (category==="VideoGames")
			return VideoGames;
		else if (category==="Electronics")
			return Electronics;
		else if (category==="Apparel")
			return Apparel;
		else if (category==="Accessories")
			return Accessories;
		else if (category==="Transportation")
			return Transportation;
		else if (category==="Outdoors")
			return Outdoors;
		else if (category==="FoodandDrinks")
			return FoodandDrinks;
		else 
			return <div></div>;
	}

	render() {
		const { classes } = this.props;
		let button1 = null;
		let button2 = null;
		let button3 = null;
		let acceptButton = <MuiThemeProvider theme={greenTheme}>
        			<Button variant="outlined" color="primary" onClick={this.accept} className={classes.button}>Accept</Button>
      				</MuiThemeProvider>;
      	let chatButton = <MuiThemeProvider theme={purpleTheme}>
        			<Button variant="outlined" color="primary" onClick={this.chat} className={classes.button}>Chat</Button>
      				</MuiThemeProvider>;
      	let deleteButton = <MuiThemeProvider theme={redTheme}>
        			<Button variant="outlined" color="primary" onClick={this.delete} className={classes.button}>Delete</Button>
      				</MuiThemeProvider>;
      	let chooseButton = <MuiThemeProvider theme={greenTheme}>
        			<Button variant="outlined" color="primary" onClick={this.pickFulfiller} className={classes.button}>Choose</Button>
      				</MuiThemeProvider>;			
      	if (this.state.mine) {
      		button1 = deleteButton;
      		button2 = chatButton;
      		button3 = chooseButton;
      	} else {
      		button3 = <div></div>
      		button1 = chatButton;
      		button2 = acceptButton;
      	}
      	let image = this.getImageByCategory();

		if (this.state.accepted) 
			return(<div></div>);
		return (
		<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        	<Card key="front" className={classes.card} > 

        	<CardContent>
        	<Grid container spacing={16}>
        		<Grid item xs={8}>
        			<Typography variant="h4">{this.props.data.title}</Typography>
        			<Typography variant="h6" color="textSecondary" gutterBottom>Requested by: {this.state.user}</Typography>
      
        			<Typography component="h6" variant="h6" gutterBottom>{this.props.data.description}</Typography>
				</Grid>
        		<Grid item xs={4}>
        			<img src={image} className={classes.image}/>
        		</Grid>
        	</Grid>

        	<Grid container spacing={8}>
        		<Grid item xs={6}>
        			<Typography variant="p" >Rate: ${this.props.data.rate} per {this.props.data.rateQualifier}</Typography>
        		</Grid>
        		<Grid item xs={6}>
        			<Typography variant="subtitle1" >Needed for: {this.props.data.maxDuration}</Typography>
        		</Grid>
        	</Grid>
        	
        	<Grid container spacing={8}>
        		<Grid item xs={4}>
        		{button1}
        		</Grid>
        			
        		<Grid item xs={4}>
        		{button2}
        		</Grid>
        		<Grid item xs={4}>
        		{button3}   
        		</Grid>
        	</Grid>
        	</CardContent>
        	</Card>
 
        	<div key="back">
          	This is the back of the card.
          	<button onClick={this.rotate}>Click to flip</button>
        	</div>
      	</ReactCardFlip>
      	);
	}
}

export default withStyles(styles)(Item);
