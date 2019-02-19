import React from "react";
import ReactFCCtest from "react-fcctest";
import Toggle from "react-toggle";
import { Box as Base, Flex as BaseFlex, Text } from "rebass";
import styled from "styled-components";
import { minHeight, minWidth, space } from "styled-system";

import { DrumPad } from "./DrumPad";

// sound bank info, used to build the view and
// give information to the audio components
import { bankOne } from "./bankOne";
import { bankTwo } from "./bankTwo";

import "./react_toggle.css";

const Box = styled(Base)`
  ${minHeight}
  ${minWidth}
`;
const Flex = styled(BaseFlex)`
  ${minHeight}
`;

const textColor = "#282c34";

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    power: "is_on", // is_off : String
    bank: "bankTwo", // heater_kit : String
    volume: 0.2, // 0 - 100 : int
    soundLabel: "",
    keyPressed: "", // Q W E   A S D   Z X C : String
    clearInput: "",
    playStatus: "PAUSED",
    currentSong: "",
    display: "SHOW ME SOMETHING",
    clipToPlay: "Initial state clip"
  };

  handleInput = text => {
    this.setState(() => ({ content: text }));
  };

  handleChange = () => {
    this.setState(() => ({ clearInput: "" }));
  };
  handleSongFinishedPlaying = () => {
    // this.setState(() => ({ playStatus: Sound.status.PAUSED }));
  };

  handleClick = event => {
    if (this.state.power === "is_off") return console.log("POWER IS OFF");

    let privateEventValue = event;
    console.log("privateEventValue inside handleClick");
    console.log(privateEventValue);
    let refChooser = "audioRef" + privateEventValue.toUpperCase();

    let songToPlay =
      this.state.bank === "bankOne"
        ? bankOne // filter out other letter, map out the object that's left
            .filter(
              soundInfo => soundInfo.key === privateEventValue.toUpperCase()
            )
            .map(x => x.url)
        : bankTwo
            .filter(
              soundInfo => soundInfo.key === privateEventValue.toUpperCase()
            )
            .map(x => x.url);
    let soundLabel =
      this.state.bank === "bankOne"
        ? bankOne
            .filter(
              soundInfo => soundInfo.key === privateEventValue.toUpperCase()
            )
            .map(x => x.name)
        : bankTwo
            .filter(
              soundInfo => soundInfo.key === privateEventValue.toUpperCase()
            )
            .map(x => x.name);
    console.log(soundLabel);
    this.setState(
      (prevState, props) => ({
        keyPressed: privateEventValue.toUpperCase(),
        currentSong: songToPlay[0],
        playStatus: "PLAYING",
        soundLabel: soundLabel[0]
      }),
      () => {
        this[refChooser].currentTime = 0;
        this[refChooser].play().catch(error => console.log(error.message));
      }
    );
  };

  handlePowerToggle = () => {
    this.setState((prevState, props) => ({
      power: prevState.power === "is_on" ? "is_off" : "is_on"
    }));
  };

  handleBankToggle = () => {
    this.setState((prevState, props) => ({
      bank: prevState.bank === "bankOne" ? "bankTwo" : "bankOne"
    }));
  };

  handleKeyPress = event => {
    if (this.state.power === "is_off") return console.log("POWER IS OFF");
    event.preventDefault();
    console.log(event.key.toUpperCase());

    // if any key pressed besides these 9 were pressed, return early,
    // meaning don't play sound or change state
    if (
      !["Q", "W", "E", "A", "S", "D", "Z", "X", "C"].includes(
        event.key.toUpperCase()
      )
    ) {
      return;
    }
    let refChooser = "audioRef" + event.key.toUpperCase();
    let songToPlay =
      this.state.bank === "bankOne"
        ? bankOne
            .filter(bankOneItem => bankOneItem.key === event.key.toUpperCase())
            .map(x => x.url)
        : bankTwo
            .filter(bankTwoItem => bankTwoItem.key === event.key.toUpperCase())
            .map(x => x.url);

    let soundLabel =
      this.state.bank === "bankOne"
        ? bankOne
            .filter(soundInfo => soundInfo.key === event.key.toUpperCase())
            .map(x => x.name)
        : bankTwo
            .filter(soundInfo => soundInfo.key === event.key.toUpperCase())
            .map(x => x.name);

    this.setState(
      (prevState, props) => ({
        keyPressed: event.key,
        currentSong: songToPlay[0],
        playStatus: "PLAYING",
        soundLabel: soundLabel[0]
      }),
      () => {
        this[refChooser].currentTime = 0;
        this[refChooser].play().catch(error => console.log(error.message));
      }
    );
  };

  componentDidMount() {
    let self = this;
    document.addEventListener("keydown", this.handleKeyPress);

    bankOne.forEach(soundItem =>
      this["audioRef" + soundItem.key].addEventListener("ended", function() {
        self.setState({
          playStatus: "PAUSED"
        });
      })
    );
  }

  componentWillUnmount() {
    let self = this;
    document.removeEventListener("keydown", this.handleKeyPress);

    bankOne.forEach(soundItem =>
      this["audioRef" + soundItem.key].removeEventListener("ended", function() {
        self.setState({
          playStatus: "PAUSED"
        });
      })
    );
  }

  render() {
    const title = "React Drum Machine with Immer";

    return (
      <Flex id="drum-machine" flexDirection="column" width={1 / 3} mx="auto">
        <ReactFCCtest />
        <Header title={title} />
        <Box id="display">
          {/* power toggle */}
          <label>
            <Toggle
              defaultChecked={this.state.power === "is_on"}
              onChange={this.handlePowerToggle}
            />
            <Flex flexDirection="row">
              <Text color={this.state.power === "is_on" ? "green" : "#eee"}>
                On
              </Text>{" "}
              /{" "}
              <Text color={this.state.power === "is_off" ? "crimson" : "#eee"}>
                Off
              </Text>
            </Flex>
          </label>
          {/* sound bank toggle */}
          <label>
            <Toggle
              defaultChecked={this.state.bank === "bankOne"}
              onChange={this.handleBankToggle}
            />
            <Flex flexDirection="row">
              <Text color={this.state.bank === "bankOne" ? "green" : textColor}>
                Bank One - Heater 1 Kit
              </Text>{" "}
              /{" "}
              <Text
                color={this.state.bank === "bankTwo" ? "crimson" : textColor}
              >
                Bank Two - Piano Kit
              </Text>
            </Flex>
          </label>
          {/* {this.state.display} */}
          <Text>{this.state.soundLabel}</Text>
        </Box>

        <Flex
          flexDirection="row"
          name="drum-machine"
          width={(1 / 3, 1)}
          flexWrap="wrap"
        >
          {bankOne.map(soundItem => (
            <DrumPad
              key={soundItem.key}
              handleClick={this.handleClick}
              value={soundItem.key}
              playStatus={this.state.playStatus}
              keyPressed={this.state.keyPressed.toUpperCase()}
            >
              <audio
                id={soundItem.key}
                className="clip"
                src={this.state.currentSong}
                ref={audio => {
                  this["audioRef" + soundItem.key] = audio;
                }}
              />
              {soundItem.key}
            </DrumPad>
          ))}
        </Flex>
      </Flex>
    );
  }
}

// Components

const Header = props => (
  <Box>
    <h1>{props.title}</h1>
  </Box>
);

export default DrumMachine;
