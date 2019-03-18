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
  }
  componentDidMount(){
  }
  async delete(event){
    event.preventDefault();
    let wtb = await API.del("bets", `/bets/${this.props.data.betId}`).then(response => console.log(response))
  }

  render() {
    const classes = this.props;
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
            Rate: ${this.props.data.rate} per {this.props.data.rateQualifier}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Will need for: {this.props.data.maxDuration}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {this.props.data.category}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            <a href={this.props.data.likeThisLink}>Like This</a>
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button variant="outlined" color="secondary" className={classes.button}>Chat</Button>
          <Button variant="outlined" color="secondary" onClick={this.delete} className={classes.button}>Delete</Button>
        </div>
      </div>
    </Card>
  );
  }
}

WTB_Card.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

