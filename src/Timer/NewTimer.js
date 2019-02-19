import React, { Component } from "react";
import Icon from "react-geomicons";
import ReactFCCtest from "react-fcctest";
import { Box, Flex, Button, Text } from "rebass";
import styled from "styled-components";
import { minHeight, minWidth, space, flexDirection } from "styled-system";

import { StartButton } from "./StartButton";
import { Timer } from "./Timer";
import { TimerInput } from "./TimerInput";
import { Break } from "./Break";
import { Session } from "./Session";

const initiialState = {
  breakLength: 5, // iniialState breakLength is 5 minutes
  session: 25, // iniialState session is 25 minutes
  seconds: String(0).padStart(2, 0), // responsible for the seconds
  minutes: 5, // responsible for the minutes
  secondsRemaining: 25 * 60,
  previousClockValue: 0,
  label: "session", // can be "session" or "breakLength"
  running: false,
  nextClick: "START"
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.secondsRemaining = null;
    this.intervalHandle = null;
    this.handleChange = this.handleChange.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.resetCountDown = this.resetCountDown.bind(this);
    this.tick = this.tick.bind(this);
    this.handleBreakLengthDecrement = this.handleBreakLengthDecrement.bind(
      this
    );
    this.handleBreakLengthIncrement = this.handleBreakLengthIncrement.bind(
      this
    );
    this.handleSessionLengthDecrement = this.handleSessionLengthDecrement.bind(
      this
    );
    this.handleSessionLengthIncrement = this.handleSessionLengthIncrement.bind(
      this
    );

    this.state = {
      ...initiialState
    };
  }

  handleChange(event) {
    this.setState({
      minutes: event.target.value
    });
  }
  tick() {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec =
      this.secondsRemaining - min * 60 < 10
        ? String(this.secondsRemaining - min * 60).padStart(2, 0)
        : this.secondsRemaining - min * 60;
    // this.setState({
    //   session: min,
    //   seconds: sec
    // });
    if (sec < 10) {
      this.setState({
        seconds: String(this.state.secondsRemaining).padStart(2, 0) // `0${this.state.seconds.toString()}`
      });
    }
    // if (min < 10) {
    //   this.setState({
    //     value: String(min).padStart(2, 0)
    //   });
    // }
    if ((min === 0) & (sec === 0)) {
      clearInterval(this.intervalHandle);
    }
    console.log("TICK: " + this.secondsRemaining);
    this.secondsRemaining--;
    this.setState({
      session: min,
      seconds: sec
    });
  }

  resetCountDown() {
    console.log("resetCoundown");
    this.intervalHandle = clearInterval(this.intervalHandle);
    this.setState(prevState => ({
      running: false,
      session: initiialState.session,
      secondsRemaining: initiialState.secondsRemaining,
      breakLength: initiialState.breakLength,
      seconds: initiialState.seconds
    }));
  }

  startCountDown() {
    console.log("view seconds");
    console.log(this.state.seconds);
    if (this.state.running === false) {
      this.intervalHandle = setInterval(this.tick, 1000);
      let time = this.state.session;
      this.secondsRemaining = time * 60 + Number(this.state.seconds);
      this.setState(prevState => ({
        running: !prevState.running
      }));
    }
    if (this.state.running === true) {
      this.intervalHandle = clearInterval(this.intervalHandle);
      let time = this.state.session;
      this.secondsRemaining = time * 60;
      this.setState(prevState => ({
        running: !prevState.running
      }));
    }
  }

  handleBreakLengthDecrement() {
    if (this.state.breakLength <= 1) return;
    console.log("math floor breaklentgth");
    console.log(Math.floor(this.state.breakLength));
    this.setState(
      prevState => ({
        breakLength: prevState.breakLength - 1
      }),
      () => console.log(this.state.breakLength)
    );
  }

  handleBreakLengthIncrement() {
    if (this.state.breakLength >= 60) return;
    this.setState(prevState => ({
      breakLength: prevState.breakLength + 1
    }));
  }

  handleSessionLengthDecrement() {
    if (this.state.session <= 1) return;
    this.setState(prevState => ({
      session: prevState.session - 1,
      secondsRemaining: prevState.session - 60
    }));
  }

  handleSessionLengthIncrement() {
    if (this.state.session >= 60) return;
    this.setState(prevState => ({
      session: prevState.session + 1,
      secondsRemaining: prevState.session + 60
    }));
  }

  render() {
    return (
      <div>
        <ReactFCCtest />
        <Flex flexDirection="row">
          <Break
            handleBreakLengthDecrement={this.handleBreakLengthDecrement}
            handleBreakLengthIncrement={this.handleBreakLengthIncrement}
            breakLength={this.state.breakLength}
          />
          <Session
            handleSessionLengthDecrement={this.handleSessionLengthDecrement}
            handleSessionLengthIncrement={this.handleSessionLengthIncrement}
            session={this.state.session}
          />
        </Flex>
        <TimerInput
          minutes={this.state.session}
          handleChange={this.handleChange}
        />
        <Timer minutes={this.state.session} seconds={this.state.seconds} />
        <Text id="timer-label">{this.state.label}</Text>
        <StartButton startCountDown={this.startCountDown} />
        <StartButton resetCountDown={this.resetCountDown} />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
