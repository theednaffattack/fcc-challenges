import React, { Component } from "react";
import Icon from "react-geomicons";
import { Box, Flex } from "rebass";

import "./App.css";
import theSound from "./loc_menu_color_bar_.wav";

class Sound extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.audio = new Audio();
  }

  state = {
    currentSongUrl: "./loc_menu_color_bar_.wav",
    isPlaying: false
  };

  handleClick() {
    // pause me
    if (this.state.isPlaying === true) {
      this.setState({ isPlaying: false });
      this.audioRef.pause();
    }
    //play me
    if (this.state.isPlaying === false) {
      this.setState({ isPlaying: true });
      this.audioRef.play().catch(error => console.log(error.message));
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <button
              onClick={this.handleClick}
              style={{
                backgroundColor: this.state.isPlaying
                  ? "#4CAF50"
                  : "grey" /* Green */,
                boxShadow: "3px 3px rgba(255,255,255, 0.2)",
                border: "none",
                color: this.state.isPlaying ? "yellow" : "white",
                padding: "15px 32px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "22px"
              }}
            >
              <Icon name={this.state.isPlaying ? "pause" : "play"} />
            </button>
          </div>
          <div>
            <audio
              ref={input => {
                this.audioRef = input;
              }}
              crossOrigin="anonymous"
              src={theSound}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default Sound;
