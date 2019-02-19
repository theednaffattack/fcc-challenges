import React, { Component } from "react";
import Icon from "react-geomicons";
import { Text, Button } from "rebass";
import ReactFCCtest from "react-fcctest";
import styled from "styled-components";
import { minHeight, minWidth, space, flexDirection } from "styled-system";

import { Box, Flex } from "./PomodoroStyledComponents";
import StartButton from "./StartButton";

const initiialState = {
  initialClock: 60 * 25,
  breakLength: 60 * 5, // iniialState breakLength is 5 minutes
  session: 60 * 25, // iniialState session is 25 minutes
  clock: 0,
  secondsRemaining: 15,
  previousClockValue: 0,
  minutes: 60 * 25, // minutes display
  //   seconds: "00", // seconds display
  label: "session", // can be "session" or "breakLength"
  running: false,
  nextClick: "START"
};

export class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.handleStartPauseClock = this.handleStartPauseClock.bind(this);
    this.timer = this.timer.bind(this);
    this.handleLoadSession = this.handleLoadSession.bind(this);
    this.handleLoadbreakLength = this.handleLoadbreakLength.bind(this);
    this.handleClockReset = this.handleClockReset.bind(this);
    this.handleClockPreviousValue = this.handleClockPreviousValue.bind(this);
    this.handleBreakLengthDecrement = this.handleBreakLengthDecrement.bind(
      this
    );
    this.handleSessionLengthDecrement = this.handleSessionLengthDecrement.bind(
      this
    );
    this.handleBreakLengthIncrement = this.handleBreakLengthIncrement.bind(
      this
    );
    this.handleSessionLengthIncrement = this.handleSessionLengthIncrement.bind(
      this
    );
  }
  state = {
    initialClock: 60 * 25,
    breakLength: 60 * 5, // iniialState breakLength is 5 minutes
    session: 60 * 25, // iniialState session is 25 minutes
    clock: 0,
    secondsRemaining: initiialState.initialClock,
    previousClockValue: 0,
    minutes: 60 * 25, // minutes display
    // seconds: "00", // seconds display
    label: "session", // can be "session" or "breakLength"
    running: false,
    nextClick: "START"
  };

  fancyTimeFormat(time) {
    // Hours, minutes and seconds
    // var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    // if (hrs > 0) {
    //   ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    // }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  timer() {
    // for (let i = 1; i <= 5; ++i) {
    //   setDelay(i);
    // }
    // console.log(this);
    // let self = this;
    // setTimeout(function() {
    //   clearTimeout(self.timer);
    //   console.log("self inside recursive setTimeout");
    //   console.log(self);
    //   self.setState(prevState => ({
    //     secondsRemaining: prevState.secondsRemaining - 1,
    //     running: true,
    //     nextClick: "PAUSE"
    //   }));
    //   setTimeout(self.timer, 1000);
    // }, 1000);
  }

  handleStartPauseClock() {
    console.log("view this in click handler");
    console.log(this);
    if (this.state.running === false) this.timer();
    if (this.state.running === true) clearTimeout(this.timer());
    console.log("bottom of click handler that I want to be unreachable");
  }

  handleBreakLengthDecrement() {
    if (this.state.breakLength <= 60) return;
    console.log("math floor breaklentgth");
    console.log(Math.floor(this.state.breakLength));
    this.setState(
      prevState => ({
        breakLength: prevState.breakLength - 60
      }),
      () => console.log(this.state.breakLength)
    );
  }

  handleBreakLengthIncrement() {
    if (this.state.breakLength >= 60 * 60) return;
    this.setState(prevState => ({
      breakLength: prevState.breakLength + 60
    }));
  }

  handleSessionLengthDecrement() {
    if (this.state.session <= 60) return;
    this.setState(prevState => ({
      session: prevState.session - 60,
      secondsRemaining: prevState.session - 60
    }));
  }

  handleSessionLengthIncrement() {
    if (this.state.session >= 60 * 60) return;
    this.setState(prevState => ({
      session: prevState.session + 60,
      secondsRemaining: prevState.session + 60
    }));
  }

  handleLoadbreakLength() {
    console.log("do breakLength loading");
    console.log("this");
    console.log(this);
    this.setState(prevState => ({
      secondsRemaining: prevState.breakLength,
      previousClockValue: prevState.secondsRemaining,
      label: "BREAK"
    }));
  }

  handleClockReset() {
    this.setState(prevState => ({
      secondsRemaining: initiialState.initialClock,
      breakLength: initiialState.breakLength,
      session: initiialState.session,
      running: false
    }));
  }

  handleClockPreviousValue() {
    this.setState(prevState => ({
      secondsRemaining: prevState.previousClockValue
    }));
  }

  handleLoadSession() {
    console.log("do session loading");
    this.setState(prevState => ({
      secondsRemaining: prevState.session,
      previousClockValue: prevState.secondsRemaining,
      label: "SESSION"
    }));
  }

  handleChange(event) {
    this.setState({
      minutes: event.target.value
    });
  }

  oldHandleStartPauseClock() {
    let self = this;
    console.log("this inside click handler");
    console.log(this);
    // the setState below is attempting to toggle any value it finds
    this.setState(
      prevState => ({
        running: !prevState.running,
        nextClick: prevState.nextClick === "PAUSE" ? "RUNNING" : "PAUSE"
      }),
      () =>
        console.log(
          "click handler setState callback",
          JSON.stringify(this.state)
        )
    );

    if (self.state.running && self.state.nextClick === "PAUSE") {
      console.log("inside click handler if statement: pause timer");
      //   clearTimeout(this.timeoutID);
      return clearTimeout(self.timer);
    }

    if (!self.state.running && self.state.nextClick !== "RUNNING") {
      console.log("inside click handler if statement: start timer");
      //   clearTimeout(this.timeoutID);
      return this.timer(self);
    }
  }
  componentWillMount() {
    // this.timeoutID = this.timer(); // cache the timeoutID
    // clearTimeout(this.timer());
  }
  componentDidMount() {
    // this.timeoutID = this.timer(); // cache the timeoutID
    // clearTimeout(this.timeoutID);
  }

  componentDidUpdate() {
    // clearTimeout(this.timer());
  }
  render() {
    let breakLengthMinutes = this.state.breakLength / 60;
    let sessionMinutes = this.state.session / 60;
    return (
      <Flex flexDirection="column">
        <ReactFCCtest />
        <Text>Quickly</Text>
        <Flex flexDirection="column">
          <Text>Clock {this.state.secondsRemaining}</Text>
          <Text>breakLength {breakLengthMinutes}</Text>
          <Text>Session {sessionMinutes}</Text>
          <Text>Session {this.state.nextClick}</Text>
          <Text>Session {this.state.running.toString()}</Text>
          <pre>
            <Text>{JSON.stringify(this.state, null, 2)}</Text>
          </pre>
          {/* {"timeout ID: " + this.timer()} */}
        </Flex>
        {/* session area */}

        <Text textAlign="center" fontSize="1.5em">
          Break
        </Text>
        <Flex alignItems="center" mt={3}>
          <Box id="break-label">
            <Flex flexDirection="row">
              <Flex flexDirection="column" width={1 / 3}>
                <Box>
                  <Text id="break-length">
                    {Math.floor(this.state.breakLength / 60)}
                  </Text>
                </Box>
                <Box>min</Box>
              </Flex>
            </Flex>
          </Box>
          <Flex flexDirection="column">
            <Button
              onClick={this.handleBreakLengthIncrement}
              id="break-increment"
              bg="crimson"
            >
              <Icon name="triangleUp" fill="#fff" />
            </Button>
            <Button
              onClick={this.handleBreakLengthDecrement}
              id="break-decrement"
              bg="crimson"
            >
              <Icon name="triangleDown" fill="#fff" />
            </Button>
          </Flex>
        </Flex>

        <Button onClick={this.handleLoadbreakLength} width={1 / 5}>
          Load breakLength
        </Button>
        {/* session area */}
        <Text fontSize="1.5em">Session</Text>

        <Flex alignItems="center" mt={3}>
          <Box id="session-label">
            <Flex flexDirection="row">
              <Flex flexDirection="column" width={1 / 3}>
                <Box>
                  <Text id="session-length">
                    {Math.floor(this.state.session / 60)}
                  </Text>
                </Box>
                <Box>min</Box>
              </Flex>
            </Flex>
          </Box>

          <Flex flexDirection="column">
            <Button
              onClick={this.handleSessionLengthIncrement}
              id="session-increment"
              bg="crimson"
            >
              <Icon name="triangleUp" fill="#fff" />
            </Button>
            <Button
              onClick={this.handleSessionLengthDecrement}
              id="session-decrement"
              bg="crimson"
            >
              <Icon name="triangleDown" fill="#fff" />
            </Button>
          </Flex>
        </Flex>

        <Button onClick={this.handleLoadSession} width={1 / 5}>
          Load Session
        </Button>
        <Flex width={1 / 5} alignItems="center" flexDirection="column" mt={3}>
          <Text id="time-left" fontSize={7}>
            {this.fancyTimeFormat(this.state.secondsRemaining)}
            {/* {Math.floor(this.state.secondsRemaining / 60) < 10
              ? "0" + Math.floor(this.state.secondsRemaining / 60)
              : Math.floor(this.state.secondsRemaining / 60).toString() +
                ":" +
                (this.state.secondsRemaining % 60).toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false
                })} */}
          </Text>
          <Text id="timer-label" fontSize={5}>
            {this.state.label}
          </Text>
        </Flex>
        <StartButton
          passId="start_stop"
          running={this.state.running}
          value={this.state.running ? "PAUSE" : "START"}
          startCountDown={this.handleStartPauseClock}
        >
          {this.state.running ? "PAUSE" : "START"}
        </StartButton>
        <Button id="reset" onClick={this.handleClockReset} width={1 / 5}>
          RESET
        </Button>

        <Button
          id="rewind"
          onClick={this.handleClockPreviousValue}
          width={1 / 5}
        >
          GO BACK
        </Button>
      </Flex>
    );
  }
}
