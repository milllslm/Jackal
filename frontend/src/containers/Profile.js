import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';





const styles = theme => ({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    margin: theme.spacing.unit,
  },
  bigAvatar: {
    backgroundColor: red[500],
    width: 130,
    height: 130,
    marginTop: 30
  },
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
      <div style= {{backgroundColor: "#4055B2"}} >
       <Grid container justify = "center" >
          <CardHeader style={{ textAlign: 'center' }}
            avatar={
                <Avatar src="https://cdn.vanderbilt.edu/vu-wp0/wp-content/uploads/sites/79/2010/07/08163329/Chancellor-Zeppos-e1518107839268.jpg" className={classes.bigAvatar}>
                  Name
                </Avatar>
            }
          />
          <div style={{ textAlign: 'center', color: "white"}}>
            <h2 > Nicholas Zeppos </h2>
          </div>
         <div style={{ textAlign: 'center', color: "white"}}>
          <h3 > Branscomb </h3>
        </div>
         </Grid>
      </div>
      <div style ={{ textAlign: 'center' }}>
        <CardContent>
          <Button variant="outlined" className={classes.button} size = "large">
              Profile
          </Button>
          <Button variant="outlined" className={classes.button} size = "large">
              Transactions
          </Button>
          <Button variant="outlined" className={classes.button} size = "large">
              Settings
          </Button>
        </CardContent>
      </div>
        <CardActions className={classes.actions} disableActionSpacing>
          <Fab color="primary" aria-label="Add" className={classes.fab}>
             <AddIcon />
         </Fab>
        </CardActions>
        
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
