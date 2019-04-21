import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddWantToBuy from "./AddWTB";
import EditProfile from "./Edit-Profile";

import { IoMdTrophy } from "react-icons/io";
import { IoLogoGameControllerB } from "react-icons/io";
import { IoMdShirt } from "react-icons/io";
import { IoIosUmbrella } from "react-icons/io";
import { FaPiedPiperHat } from "react-icons/fa";
import { IoIosCar } from "react-icons/io";
import { MdRestaurant } from "react-icons/md";
import Tooltip from "@material-ui/core/Tooltip";
import { FaStarOfLife } from "react-icons/fa";
import { API } from "aws-amplify";
import { MdBatteryCharging80 } from "react-icons/md";



const styles = theme => ({
  card: {
    maxWidth: 300,
    flex: 1,
    height: "600"
  },
  categoryCard: {
    maxWidth: 1000,
    flex: 1,
    height: "2000"
  },
  root: {
    flexGrow: 1
  },
  fab: {
    margin: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false, user: null};
    this.handleEvent = this.handleEvent.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  async componentWillMount() {
    let user = null;
    try {
      user = await API.get("bets", "/getUser");
      this.setState({user: user});
    } catch (error){
      console.log(error);
    }
  }

  async editProfile() {
    
  }

  handleEvent(ev) {
    ev.preventDefault();
    console.log("Button Clicked:")
    console.log(ev.currentTarget);
    let category = ev.currentTarget.id;
    this.props.setCategory(category);
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    let name = this.state.user === null ? <div></div> : <h3>{this.state.user.firstName} {this.state.user.lastName}   </h3>;
    let college = this.state.user === null ? <div></div> : <h4> {`Balance: $${this.state.user.balance}`} </h4>
    return (
      <Card className={classes.card}>
        <div style={{ backgroundColor: "#4055B2" }}>
          <Grid container justify="center" spacing={0}>
            <CardHeader
              style={{ textAlign: "left" }}
              avatar={
                <Avatar
                  src="http://clipart-library.com/images/pc58xnRXi.jpg"
                  className={classes.bigAvatar}
                >
                  Name
                </Avatar>
              }
            />
            <div style={{ textAlign: "center", color: "white", "marginRight": "2px" }}>
              <Grid item xs={12}>
                {name}
              </Grid>
            </div>
            <div style={{ textAlign: "center", color: "white" }}>
              <Grid item xs={12}>
                {college}
              </Grid>
            </div>
          </Grid>
        </div>
        <div style={{ textAlign: "center" }}>
          <CardContent>
            <Grid>
              <EditProfile user={this.state.user} />
            </Grid>
          </CardContent>
        </div>
        <div
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h5>Search by Category</h5>
          <Grid container spacing={0} justify="center">
            <Grid item xs={4}>
              <Tooltip title="All">
                <Fab key={9}
                  aria-label="All"
                  id="All"
                  className={classes.fab}
                  onClick={this.handleEvent}
                >
                  <FaStarOfLife size="30" />
                </Fab>
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
            <div onClick={this.handleEvent} id="Sports">
            <Tooltip title="Sports">
              <Fab key={1}
                aria-label="Sports"
                id="Sports" 
                onClick={this.handleEvent}
                className={classes.fab}
              >
                <IoMdTrophy size="30"/>
              </Fab>
            </Tooltip>
            </div>
            </Grid>
            <Grid item xs={4}>
            <Tooltip title="Video Games">
              <Fab key={2}
                aria-label="Video Games"
                id="VideoGames"
                className={classes.fab}
                onClick={this.handleEvent}
              >
                <IoLogoGameControllerB size="30" />
              </Fab>
            </Tooltip>
            </Grid>
            <Grid item xs={4}>
            <Tooltip title="Electronics">
              <Fab key={3}
                aria-label="Electronics"
                id="Electronics"
                className={classes.fab}
                onClick={this.handleEvent}
              >
                <MdBatteryCharging80 size="30" />
              </Fab>
            </Tooltip>
            </Grid>
          <Grid item xs={4}>
            <Tooltip title="Apparel">
              <Fab key={4}
                aria-label="Apparel"
                id="Apparel"
                className={classes.fab}
                onClick={this.handleEvent}
              >
                <IoMdShirt size="30" />
              </Fab>
            </Tooltip>
            </Grid>
            <Grid item xs={4}>
            <Tooltip title="Accessories">
              <Fab key={5}
                aria-label="Accessories"
                id="Accessories"
                className={classes.fab}
                onClick={this.handleEvent}
              >
                <FaPiedPiperHat size="30" />
              </Fab>
            </Tooltip>
            </Grid>
            <Grid item xs={4}>
            <Tooltip title="Transportation">
              <Fab key={6}
                aria-label="Transportation"
                id="Transportation"
                className={classes.fab}
                onClick={this.handleEvent}
              >
                <IoIosCar size="30" />
              </Fab>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="Outdoors">
              <Fab key={7}
                aria-label="Outdoors"
                id="Outdoors"
                className={classes.fab}
                onClick={this.handleEvent}
              >
                <IoIosUmbrella size="30" />
              </Fab>
            </Tooltip>
            </Grid>
            <Grid item xs={4}>
            <Tooltip title="Food and Drink">
              <Fab key={8}
                aria-label="Food and Drink"
                id="FoodandDrinks"
                className={classes.fab}
                onClick={this.handleEvent}
              >
                <MdRestaurant size="30" />
              </Fab>
            </Tooltip>
            </Grid>
          </Grid>
        </div>

        <CardActions className={classes.actions} disableActionSpacing>
          <AddWantToBuy setCategory={this.props.setCategory}/>
        </CardActions>
      </Card>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
