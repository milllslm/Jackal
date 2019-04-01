import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { API } from "aws-amplify";


const styles = theme => ({
  card: {
    maxWidth: 300,
    margin: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit/2,
    paddingBottom: theme.spacing.unit/2,
  },
  button: {
    margin: theme.spacing.unit,
    width: "100%"

  },
  input: {
    display: 'none',
  },
});

export default class WTB_Card extends Component {
  constructor(props){
    super(props);
    this.delete = this.delete.bind(this);
    this.state = {mine: false, user: "Loading..."};
    this.chat = this.chat.bind(this);
  }
  async componentDidMount(){
    let cardUser = await API.get("bets", `/getUserById/${this.props.data.userId}`);
    let currentUser = await API.get("bets", "/getUser");
    if (currentUser.userId === cardUser.userId){
      this.setState({mine: true});
    }
    this.setState({user: `${cardUser.firstName} ${cardUser.lastName}`});
  }
  async delete(event){
    event.preventDefault();
    let wtb = await API.del("bets", `/bets/${this.props.data.betId}`).then(response => console.log(response))
    await this.props.setCategory("All");
  }

  async chat(event){
    event.preventDefault();
    document.getElementById('Message-content').scrollIntoView() 
  }

  render() {
    const classes = this.props;
    let link = (this.props.data.likeThisLink === "N/A") ? <div></div> : 
          <Typography variant="h6" color="textSecondary">
            <a href={this.props.data.likeThisLink}>Like This</a>
          </Typography>;
    let deleteButton = <Button variant="outlined" color="secondary" onClick={this.delete} className={classes.button}>Delete</Button>;
    let acceptButton = <Button variant="outlined" style={{float: "right"}}color="primary" className={classes.button}>Accept</Button>;
    let buttons = (this.state.mine) ?
      <div className={classes.controls}>
            {deleteButton}
      </div> :
      <div className={classes.controls}>
            <Button key={this.props.data.betId} variant="outlined" color="secondary" onClick={this.accept} className={classes.button}>Chat</Button>
            {acceptButton}
      </div>
    return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
          {this.props.data.title}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {this.props.data.description}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {this.state.user}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Rate: ${this.props.data.rate} per {this.props.data.rateQualifier}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Will need for: {this.props.data.maxDuration}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {this.props.data.category}
          </Typography>
          {link}
        </CardContent>
          {buttons}
      </div>
    </Card>
  );
  }
}


