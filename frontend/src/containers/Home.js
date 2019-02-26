import React, { Component } from "react";
import { API } from "aws-amplify";
import WTB_Card from "./WTB.js"
import Grid from '@material-ui/core/Grid';
import New_Button from "./NewWTB";
import UserProfile from "./Profile"


import "./Home.css";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wtbs: [],
      ready: false,
    }
    this.setStateMine = this.setStateMine.bind(this);
  }

  async setStateMine() {
    let data = [];
    try {
        data = await API.get("bets", "/bets");
        console.log("success");
        this.setState({wtbs: data, ready: true, title: "Camping Air Mattress",
      description: "Large foam air mattress",
      category: "Outdoors",
      rate: 10,
      rateQualifier: "day",
      maxDuration: "5 days",
      likeThisLink: "https://www.mattressfirm.com/sleepys/4-inch-foam-mattress/mfiV000002149.html?gclid=EAIaIQobChMIgIHCxKLG4AIVk4nICh2vRAMtEAQYASABEgJGhPD_BwE&gclsrc=aw.ds",
      expiration: new Date('2019-02-17T03:24:00')});
    } catch (error) {
        console.log(error);
    }
  }

  componentDidMount() {
    this.setStateMine();
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
      console.log("Request submitted successfully");
    } catch (error) {
      console.log("Problem with request");
      console.log(error);
    }
  }

  createWTB(wtb) {
    return API.post("bets", "/bets", {
      body: wtb
    });
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
         <Grid container spacing={12}>
           <Grid item sm={4}>
           <UserProfile />
           </Grid>
           
           <Grid item sm={8}>
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

//          <button onClick={this.handleSubmit}>Add New Offer</button>



