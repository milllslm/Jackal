import React, { Component } from "react";
import { API } from "aws-amplify";
import { Auth } from "aws-amplify";
import WTB_Card from "./WTB.js";
import Grid from "@material-ui/core/Grid";
import UserProfile from "./Profile";
import Messages from "./Messages";
import Input from "./Input";

import "./Home.css";

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

export default class Home extends Component {
 constructor(props) {
    super(props);
    this.state = {
      wtbs: [],
      category: "All",
      messages: [],
      member: {
        username: "Anonymous",
        color: randomColor()
      }
    };
    this.getUser = this.getUser.bind(this);
  }

  async getUser(){
    let user = await API.get("bets", "/getUser");
    let name = `${user.firstName} ${user.lastName}`;
    let color = randomColor();
    return { name: name, color: color };
  }

  // Function updates the Feed to show only requests of a given category
  async setCategory(category) {
    await this.setState({ category: category });
    if (category === "All") {
      await this.componentDidMount();
    } else {
      try {
        let wtbs = await API.get("bets", `/getCategory/${this.state.category}`);
        this.setState({ wtbs: wtbs });
      } catch (err) {
        console.log(err);
        alert("There are currently no requests in this category.");
        let data = await API.get("bets", "/allWTBs");
        this.setState({ wtbs: data });
      }
      console.log(this.state.wtbs);
    }
  }

  // On Rendering, load all of the Feed of the User
  async componentDidMount() {
    let user = await API.get("bets", "/getUser");
    this.setState({member: {username: `${user.firstName} ${user.lastName}`, color: randomColor()} })
    if (this.state.category === "All") {
      try {
        let data = await API.get("bets", "/allWTBs");
        this.setState({
          wtbs: data
        });
      } catch (error) {
        console.log(error);
      }
    }


    this.drone = new window.Scaledrone("hT7l8bxuKDH29NMC", {
      data: this.state.member
    });
    this.drone.on("open", error => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    this.setCategory = this.setCategory.bind(this);

    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });

    const history = this.drone.subscribe("observable-room", {
      historyCount: 5 // ask for the 5 most recent messages from the room's history
    });
    history.on('history_message', ({data}) => {
      console.log(data);
    });

    history.on('data', data => {
      console.log(data);
    });



    // history.on("past", message => console.log("message"));
  }

  render() {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <UserProfile
              category={this.state.category}
              setCategory={this.setCategory}
              user={this.state.user}
            />
          </Grid>

          <Grid item xs={6} sm={8} md={9} lg={10}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <div align="center">
                  <h5>Category: {this.state.category}</h5>
                </div>
              </Grid>
              {this.state.wtbs.map((wtb, i) => (
                <Grid item key={i} xs={12} sm={12} md={6} lg={4}>
                  <WTB_Card
                    data={wtb}
                    key={wtb.betId}
                    setCategory={this.setCategory}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <div className="App">
          <Messages
            messages={this.state.messages}
            currentMember={this.state.member}
          />
          <Input onSendMessage={this.onSendMessage} />
        </div>
      </div>
    );
  }
  onSendMessage = message => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  };
}