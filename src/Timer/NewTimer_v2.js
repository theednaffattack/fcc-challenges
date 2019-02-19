import React, { Component } from "react";
import Icon from "react-geomicons";
import ReactFCCtest from "react-fcctest";
import { Box, Flex, Button, Text } from "rebass";
import styled from "styled-components";
import { minHeight, minWidth, space, flexDirection } from "styled-system";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import accurateInterval from "./accurateInterval";
import BeepSound from "../audio/pomodoro/BeepSound.wav";
import TimerLengthControlBase from "./TimerLengthControlBase";

const TimerLengthControl = styled(TimerLengthControlBase)``;

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      percentage: 0,
      timerState: "stopped",
      timerLabel: "Session",
      timer: 1500,
      intervalID: "",
      alarmColor: { color: "green" }
    };
    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.lengthControl = this.lengthControl.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.warning = this.warning.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.clockify = this.clockify.bind(this);
    this.reset = this.reset.bind(this);
  }
  setBreakLength(e) {
    this.lengthControl(
      "breakLength",
      e.currentTarget.value,
      this.state.breakLength,
      "Session"
    );
  }
  setSessionLength(e) {
    this.lengthControl(
      "sessionLength",
      e.currentTarget.value,
      this.state.sessionLength,
      "Break"
    );
  }
  lengthControl(stateToChange, sign, currentLength, timerLabel) {
    if (this.state.timerState == "running") return;
    if (this.state.timerLabel == timerLabel) {
      if (sign == "-" && currentLength != 1) {
        this.setState({ [stateToChange]: currentLength - 1 });
      } else if (sign == "+" && currentLength != 60) {
        this.setState({ [stateToChange]: currentLength + 1 });
      }
    } else {
      if (sign == "-" && currentLength != 1) {
        this.setState({
          [stateToChange]: currentLength - 1,
          timer: currentLength * 60 - 60
        });
      } else if (sign == "+" && currentLength != 60) {
        this.setState({
          [stateToChange]: currentLength + 1,
          timer: currentLength * 60 + 60
        });
      }
    }
  }
  timerControl() {
    let control =
      this.state.timerState == "stopped"
        ? (this.beginCountDown(), this.setState({ timerState: "running" }))
        : (this.setState({ timerState: "stopped" }),
          this.state.intervalID && this.state.intervalID.cancel());
  }
  beginCountDown() {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000)
    });
  }
  decrementTimer() {
    this.setState(prevState => ({
      timer: this.state.timer - 1,
      percentage:
        (1 - (this.state.timer - 1) / (this.state.sessionLength * 60)) * 10
    }));
  }
  phaseControl() {
    let timer = this.state.timer;
    this.warning(timer);
    this.buzzer(timer);
    if (timer < 0) {
      let something =
        this.state.timerLabel == "Session"
          ? (this.state.intervalID && this.state.intervalID.cancel(),
            this.beginCountDown(),
            this.switchTimer(this.state.breakLength * 60, "Break"))
          : (this.state.intervalID && this.state.intervalID.cancel(),
            this.beginCountDown(),
            this.switchTimer(this.state.sessionLength * 60, "Session"));
    }
  }
  warning(_timer) {
    let warn =
      _timer < 61
        ? this.setState({ alarmColor: { color: "#a50d0d" } })
        : this.setState({ alarmColor: { color: "goldenrod" } });
  }
  buzzer(_timer) {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  }
  switchTimer(num, str) {
    this.setState({
      timer: num,
      timerLabel: str,
      percentage: 0,
      alarmColor: { color: "white" }
    });
  }
  clockify() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }
  reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerState: "stopped",
      timerLabel: "Session",
      timer: 1500,
      intervalID: "",
      alarmColor: { color: "white" }
    });
    this.state.intervalID && this.state.intervalID.cancel();
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  render() {
    const percentage = Math.floor(this.state.percentage * 10);
    return (
      <Flex flexDirection="column">
        <ReactFCCtest />
        <div className="main-title">Pomodoro Clock</div>
        <CircularProgressbar percentage={percentage} text={`${percentage}%`} />
        <TimerLengthControl
          titleID="break-label"
          minID="break-decrement"
          addID="break-increment"
          lengthID="break-length"
          title="Break Length"
          onClick={this.setBreakLength}
          length={this.state.breakLength}
        />
        <TimerLengthControl
          titleID="session-label"
          minID="session-decrement"
          addID="session-increment"
          lengthID="session-length"
          title="Session Length"
          onClick={this.setSessionLength}
          length={this.state.sessionLength}
        />
        <Box className="timer" style={this.state.alarmColor}>
          <Text id="timer-label" mx="auto">
            {this.state.timerLabel || "no timer type loaded"}
          </Text>
          <Text id="time-left">{this.clockify()}</Text>
        </Box>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <Box className="timer-control">
          <Button id="start_stop" onClick={this.timerControl}>
            {this.state.timerState === "running" ? (
              <Icon name="pause" />
            ) : (
              <Icon name="play" />
            )}
            <i className="fa fa-play fa-2x" />
            <i className="fa fa-pause fa-2x" />
          </Button>
          <Button id="reset" onClick={this.reset}>
            <Icon name="refresh" />
            <i className="fa fa-refresh fa-2x" />
          </Button>
        </Box>
        <audio
          id="beep"
          preload="auto"
          src={BeepSound}
          ref={audio => {
            this.audioBeep = audio;
          }}
        />
      </Flex>
    );
  }
}
