import React, { Component } from "react";
import { API } from "aws-amplify";
import WTB_Card from "./WTB.js";
import Grid from "@material-ui/core/Grid";
import UserProfile from "./Profile";

import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wtbs: [],
      category: "None"
    };
    this.setCategory = this.setCategory.bind(this);
  }

  setCategory(category) {
    this.setState({ category: category });
  }

  async componentDidMount() {
    let data = [];
    try {
      data = await API.get("bets", "/bets");
      this.setState({
        wtbs: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.category}</h1>
        <Grid container spacing={12}>
          <Grid item sm={3}>
            <UserProfile category={this.state.category} setCategory={this.setCategory} />
          </Grid>

          <Grid item sm={9}>
            <Grid container spacing={12}>
              {this.state.wtbs.map(wtb => (
                <Grid item xs={12} sm={6} md={3}>
                  <WTB_Card data={wtb} key={wtb.betId} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
