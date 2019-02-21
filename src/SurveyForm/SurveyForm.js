import React, { Component } from "react";
import { Box, Button, Flex, Text } from "rebass";
import ReactFCCtest from "react-fcctest";
import styled from "styled-components";
import { color, space, width, minWidth, borders } from "styled-system";

import { Checkbox } from "./Checkbox";

const ViewState = styled.pre`
  ${color}
  ${space}
  ${width}
  ${minWidth}
`;

const RadioBox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? "salmon" : "papayawhip")}
  border-radius: 3px;
  border-style: solid;
  border-color: ${props => (!props.checked ? "#ccc" : "crimson")}
  border-radius: 3px;;
  transition: all 150ms;
`;

// const HiddenRadio = styled.input.attrs({ type: 'radio' })`

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export class SurveyForm extends Component {
  constructor() {
    super();
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.state = {
      errors: { name: false, email: false },
      name: "",
      email: "",
      number: "",
      value: "",
      label: "",
      optionValue: { label: "", value: "valorum" },
      mood: null
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name || target.id;
    const label = target.label;
    this.setState({
      [name]: value,
      [label]: label
    });
  }

  handleRadio(event) {
    console.log(event.target.name);
    const target = event.target;
    const value = target.value;
    const name = target.name || target.id;
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };
  handleOptionChange = event => {
    this.setState({
      optionValue: { label: event.target.id, value: event.target.value }
    });
  };
  render() {
    return (
      <Box>
        <ReactFCCtest />
        <h1 id="title">Survey Form Title</h1>
        <Text as="p" id="description">
          This is the survey form description
        </Text>
        <form id="survey-form">
          <Flex flexDirection="column">
            <label id="name-label">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              required={true}
              value={this.state.name}
              onChange={this.handleInputChange}
            />
            <label id="email-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter a valid email address"
              value={this.state.email}
              onChange={this.handleInputChange}
              required={true}
            />
            <label id="number-label">Number</label>
            <input
              id="number"
              type="number"
              placeholder="5"
              value={this.state.number}
              onChange={this.handleInputChange}
              min="1"
              max="100"
              required={true}
            />
            <label htmlFor="loloptions" id="loloptions-label">
              LOL Options
            </label>
            <select
              id="dropdown"
              value={this.state.optionValue.value}
              onChange={this.handleOptionChange}
            >
              <option label="Hello Smith" value="hello smith">
                Hello Smith
              </option>
              <option value="valorum">Valorum</option>
              <option value="junk food">Junk Food</option>
            </select>
            <Flex my={2} flexDirection="row">
              <HiddenRadio
                type="radio"
                value="happy"
                onChange={this.handleRadio}
                name="mood"
                id="mood"
              />
              <Box>
                <RadioBox checked={this.state.mood === "happy"} />
              </Box>
              <Box pl={2}>Happy</Box>
            </Flex>
            <Flex flexDirection="row">
              <HiddenRadio
                type="radio"
                value="sad"
                onChange={this.handleRadio}
                name="mood"
                id="mood"
              />
              <Box>
                <RadioBox checked={this.state.mood === "sad"} />
              </Box>
              <Box pl={2}>Sad</Box>
            </Flex>
            <Flex flexDirection="row">
              <HiddenRadio
                type="radio"
                value="neutral"
                onChange={this.handleRadio}
                name="mood"
                id="mood"
              />
              <Box>
                <RadioBox checked={this.state.mood === "neutral"} />
              </Box>
              <Box pl={2}>Neutral</Box>
            </Flex>
            <input type="checkbox" name="vehicle1" value="Bike" /> I have a bike
            <br />
            <input type="checkbox" name="vehicle2" value="Car" /> I have a car
            <br />
            <input type="checkbox" name="vehicle3" value="Rocket" /> I have a
            rocket ship
            <br />
            <br />
            <textarea />
            <Button id="submit" type="submit">
              submit
            </Button>
          </Flex>
        </form>
      </Box>
    );
  }
}
