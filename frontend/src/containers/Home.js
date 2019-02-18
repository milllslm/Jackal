import React, { Component } from "react";
import { API } from "aws-amplify";

import "./Home.css";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Cleats",
      description: "Size 10 M",
      category: "Sports",
      rate: 5,
      rateQualifier: "day",
      maxDuration: "2 days",
      likeThisLink: "https://www.nike.com/t/superfly-6-elite-fg-game-over-firm-ground-soccer-cleat-WOv7pN",
      expiration: new Date('2019-02-17T03:24:00')

    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      await this.createWTB({
        title: this.state.title,
        description: this.state.description,
        category: this.state.category,
        rate: this.state.rate,
        rateQualifier: this.state.rateQualifier,
        maxDuration: this.state.maxDuration,
        likeThisLink: this.state.likeThisLink,
        expiration: this.state.expiration
      });
      this.props.history.push("/");
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  }

  createWTB(wtb) {
    return API.post("bets", "/bets", {
      body: wtb
    });
  }

  getWTB() {
    return API.get("bets", "/bets");
  }

  getJSON = async event => {
    event.preventDefault();
      try {
        let json = await this.getWTB();
        console.log("success");
        console.log(json)
      } catch (error) {
        console.log(error);
      }
  }

  render() {
    return (
      <div>
         <button onClick={this.handleSubmit}>Try post</button>
         <button onClick={this.getJSON}>Try get</button>
     </div>
    );
  }
}