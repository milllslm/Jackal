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

import sports from './images/sports.jpg';
import VideoGames from './images/VideoGames.jpg';
import Electronics from './images/Electronics.jpg';
import Apparel from './images/Apparel.jpg';
import Accessories from './images/Accessories.jpg';
import Transportation from './images/Transportation.jpg';
import Outdoors from './images/Outdoors.jpg';
import FoodandDrinks from './images/FoodandDrinks.jpg';

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
			fulfillerNames: [],
			fulfilling: false,
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
		this.getFulfillers = this.getFulfillers.bind(this);
		this.isVisible = this.isVisible.bind(this);
		this.returnItem = this.returnItem.bind(this);
		this.completeRequest = this.completeRequest.bind(this);
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
		await this.getFulfillers();
		await this.isVisible(currentUser);
	}

	async isVisible(currentUser) {
		if (this.props.data.returnStatus === 2)
			this.setState({accepted: true});
		if (this.props.data.fulfillerSelected){
			if (!this.state.mine && currentUser.userId !== this.props.data.fulfillerOptions[0])
					this.setState({accepted: true});
			else {
				this.setState({fulfilling: true});
			}
		}
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
		if (this.props.data.fulfillerSelected){
			if (!this.state.mine || this.state.userId !== this.props.data.fulfillerOptions[0])
				return this.setState({accepted: true});
		}
		let currentUser = await API.get("bets", "/getUser");
		let accepted = await API.put(
			"bets",
			`/acceptCard/${this.props.data.betId}`,
			{
				body: {
					otherUserId: this.props.data.userId
				}
			}
		).then(data => console.log(data));
	}

	async pickFulfiller(ev) {
		ev.preventDefault();
		let userId = ev.target.id;
		console.log(userId);
		let date = new Date();
		console.log(this.props.data.fulfillerOptions);
		let accepted = await API.put(
			"bets",
			`/selectFulfiller/${this.props.data.betId}`,
			{
				body: {
					otherUserId: userId,
					timeToReceive: date
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

	async getFulfillers() {
		const { classes } = this.props;
		let items = [];
		if (this.state.mine) {
			let data = await Promise.all(this.props.data.fulfillerOptions.map((fulfiller, i) => {
			let fulfillerUser = API.get(
				"bets",
				`/getUserById/${fulfiller}`
			).then(user => `${user.firstName} ${user.lastName}`).then(name => items.push(name));
		}));
		this.setState({fulfillerNames: items});
		}
	};

	async returnItem(){
		let accepted = await API.put(
			"bets",
			`/returningItem/${this.props.data.betId}`
		).then(data => console.log(data));
	}

	async completeRequest(){
		let accepted = await API.put(
			"bets",
			`/completeRequest/${this.props.data.betId}`,
			{
				body: {
					otherUserId: this.props.data.userId,
					balance: this.props.data.rate
				}
			}
		).then(data => console.log(data));
	}





	render() {
		const { classes } = this.props;
		let potentialFulfillers = 
		this.props.data.fulfillerOptions.map((fulfiller, i) => {

		return(
		<MuiThemeProvider theme={greenTheme}>
			<Button variant="outlined" color="primary" key={i} id={fulfiller} onClick={this.pickFulfiller} className={classes.button}>{this.state.fulfillerNames[i]}</Button>
		</MuiThemeProvider>);
		});
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
        			<Button variant="outlined" color="primary" onClick={this.rotate} className={classes.button}>Choose</Button>
      				</MuiThemeProvider>;
      	let backButton = <MuiThemeProvider theme={redTheme}>
        			<Button variant="outlined" color="primary" onClick={this.rotate} className={classes.button}>Back</Button>
      				</MuiThemeProvider>;
      	let returnButtonBorrower = <MuiThemeProvider theme={redTheme}>
        			<Button variant="outlined" color="primary" disabled={this.props.data.returnStatus!==0} onClick={this.returnItem} className={classes.button}>Returned</Button>
      				</MuiThemeProvider>;
      	let returnButtonLender = <MuiThemeProvider theme={redTheme}>
        			<Button variant="outlined" color="primary" disabled={ (this.state.mine && this.props.data.returnStatus!==1) } onClick={this.completeRequest} className={classes.button}>Returned</Button>
      				</MuiThemeProvider>;

      	if (this.state.mine) {
      		if (this.state.fulfilling){
      			button1 = returnButtonBorrower;
      			button2 = chatButton;
      			button3 = <div></div>;
      		} else {
      			button1 = deleteButton;
      			button2 = chatButton;
      			button3 = chooseButton;
      		}
      	} else {
      		if (this.state.fulfilling){
      			button1 = returnButtonLender;
      			button2 = chatButton;
      			button3 = <div></div>;
      		} else {
      			button3 = <div></div>
      			button1 = chatButton;
      			button2 = acceptButton;
      		}
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
        	<Card className={classes.card}>
     		<Grid container spacing={16}>
     			{potentialFulfillers}
     			{backButton}
          	</Grid>
          	</Card>
        	</div>
      	</ReactCardFlip>
      	);
	}
}

export default withStyles(styles)(Item);
