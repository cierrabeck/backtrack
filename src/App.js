import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Content from "./components/content/Content";
import logo from "./assets/logo.png";
import tracks from "./assets/TRACKLIST.png"
import name from "./assets/name.png";
import connect from "./assets/connect.png"
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      items: [],
      no_data: true,
    };
    this.data = [];
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }



  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }

    // set interval for polling every 10 seconds
    this.interval = setInterval(() => this.tick(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }


  getCurrentlyPlaying(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        this.setState({
          items: data.items,
          no_data: false
        });
        this.data=data.items
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="about">
          <img src={name} className="b" alt="backtrack" />
        </div>
        <header className="App-header">
          {!this.state.token && (
            <div className="login">
              <img
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
              src={connect}
            />
            <div className="about"> 
              <img src={logo} className="App-logo" alt="logo" />
              <img src={tracks} className="App-logo" alt="logo" />
            </div>
            <h3 className="footer"> a project by
              <a href="http://cierrabeck.com/" target="_blank" >Cierra</a>
            </h3>
            </div>

          )}
          {this.state.token && !this.state.no_data && (
            <Content
              items={this.state.items}
            />
          )}
          
          {this.state.no_data && this.state.token && (
            <p>
              no data!
            </p>
          )}
        </header>
      </div>
    );
  }
}

export default App;
