import React, { Component } from "react";
import { API } from "aws-amplify";
import { Auth } from "aws-amplify";
import WTB_Card from "./WTB.js";
import Grid from "@material-ui/core/Grid";
import UserProfile from "./Profile";

import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wtbs: [],
      category: "All"
    };
    this.setCategory = this.setCategory.bind(this);
  }

  // Function updates the Feed to show only requests of a given category
  async setCategory(category) {
    await this.setState({ category: category });
    if (category==="All"){
      await this.componentDidMount();
    } else {
      try {
      let wtbs = await API.get("bets", `/getCategory/${this.state.category}`);
      this.setState({wtbs: wtbs});
    } catch(err) {
      console.log(err);
      alert("There are currently no requests in this category.")
      let data = await API.get("bets", "/allWTBs");
      this.setState({wtbs: data});
    }
    console.log(this.state.wtbs);
    }
  }

  // On Rendering, load all of the Feed of the User
  async componentDidMount() {
    let data = [];
    if (this.state.category === "All") {
      try {
      data = await API.get("bets", "/allWTBs");
      this.setState({
        wtbs: data,
      });
    } catch (error) {
      console.log(error);
    }
    }
  }

  render() {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <UserProfile category={this.state.category} setCategory={this.setCategory} user={this.state.user}/>
          </Grid>

          <Grid item xs={6} sm={8} md={9} lg={10}>
            <Grid container spacing={8}>
              <Grid item xs={12} ><div align="center"><h5>Category: {this.state.category}</h5></div></Grid>
              {this.state.wtbs.map((wtb, i) => (
                <Grid item key={i} xs={12} sm={12} md={6} lg={4}>
                  <WTB_Card data={wtb} key={wtb.betId} setCategory={this.setCategory}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
