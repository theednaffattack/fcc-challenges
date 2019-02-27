import changeCase from "change-case";
import React, { Component } from "react";
import ReactFCCtest from "react-fcctest";
import posed from "react-pose";
import {
  Box as BaseBox,
  Button as BaseButton,
  Card,
  Flex as BaseFlex,
  Heading,
  Text as BaseText
} from "rebass";
import styled from "styled-components";
import {
  borders,
  color,
  space,
  width,
  height,
  minHeight,
  minWidth
} from "styled-system";

import mathfromString from "math-from-string";

import NavbarTop from "./NavbarTop";
import { initialState, operators, switchNegative } from "./calculation";
// import { ReactComponent } from "*.svg";

const navItems = [
  {
    text: "Calculator",
    link: "https://github.com/theednaffattack",
    section: false
  },
  {
    text: "About",
    link: "#about",
    section: true
  }
];

const Flex = styled(BaseFlex)`
  ${minHeight}
  ${borders}
`;

const Box = styled(BaseBox)`
  ${borders}
`;

const Text = styled(BaseText)`
  ${space}
`;

const Button = styled(BaseButton)`
  ${space}
`;

const ViewState = styled.pre`
  font-size: 1.5em;
`;

const Str = item => {
  return JSON.stringify(item, null, 2);
};

const findDecimals = /\./g;

const topRow = "#c5c5c5";

const buttonTestBorder = "1px solid red";

const isOpen = true;

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.state = {
      window: initialState.window,
      inputState: initialState.inputState
    };
  }

  // handlePress(event) {
  //   event.preventDefault();
  //   let {
  //     target: { value }
  //   } = event;
  //   console.log(event.target.value);

  //   // don't allow multiple beginning zeroes
  //   if (
  //     this.state.window.substr(-1) === "0" &&
  //     value === "0" &&
  //     this.state.window.length === 1
  //   ) {
  //     return; // alert("no!!! you idiot, it's a zero!")
  //   }

  //   // don't allow multiple decimals
  //   if (
  //     this.state.window.match(/\./g) &&
  //     this.state.window.match(/\./g).length > 0 &&
  //     value === "."
  //   ) {
  //     return; // alert("no!!! you idiot, it's a zero!")
  //   }
  //   if (this.state.window.substr(0) === "0" && !isNaN(+value)) {
  //     return this.setState((prevState, currentProps) => {
  //       return { window: value };
  //     });
  //   }
  //   if (value === "AC") {
  //     return this.setState((prevState, currentProps) => {
  //       return { window: "0" };
  //     });
  //   }
  //   if (value === "TOGGLE_NEGATIVE") {
  //     return this.setState((prevState, currentProps) => {
  //       return { window: switchNegative(prevState.window).toString() };
  //     });
  //   }

  //   if (value === "=") {
  //     console.log(mathfromString(this.state.window));
  //     return this.setState({
  //       window: JSON.stringify(mathfromString(this.state.window))
  //     });
  //   }

  //   // trying to avoid this?
  //   this.setState((prevState, currentProps) => {
  //     return { window: prevState.window + value };
  //   });
  // }

  handlePress(event) {
    event.preventDefault();
    let {
      target: { value }
    } = event;

    //
    // User Story #10: When inputting numbers, my calculator should not allow a number
    //   to begin with multiple zeros.
    // User Story #11: When the decimal element is clicked, a . should append to the
    //   currently displayed value; two . in one number should not be accepted.
    // User Story #12: I should be able to perform any operation (+, -, *, /) on numbers
    //   containing decimal points.
    // User Story #13: If 2 or more operators are entered consecutively, the operation
    //   performed should be the last operator entered.
    // User Story #14: Pressing an operator immediately following = should start a new
    //   calculation that operates on the result of the previous evaluation.
    // User Story #15: My calculator should have several decimal places of precision when
    // it comes to rounding (note that there is no exact standard, but you should be able
    // to handle calculations like 2 / 7 with reasonable precision to at least 4 decimal places).
    if (
      this.state.window.substr(-1) === "0" &&
      value === "0" &&
      this.state.window.length === 1
    ) {
      return; // alert("no!!! you idiot, it's a zero!")
    }

    // don't allow multiple decimals
    if (
      this.state.window.match(/\./g) &&
      this.state.window.match(/\./g).length > 0 &&
      value === "."
    ) {
      let calcTable = this.state.window.split("").map((calcEntry, index) => {
        if (!isNaN(+calcEntry)) {
          return "NUMBER";
        }
        if (calcEntry === ".") {
          return "DECIMAL";
        }
        if (operators.indexOf(calcEntry) !== -1) {
          return "OPERATOR";
        }
      });
      let lastDecimal = calcTable.lastIndexOf("DECIMAL");
      let lastNumber = calcTable.lastIndexOf("NUMBER");
      let lastOperator = calcTable.lastIndexOf("OPERATOR");
      console.log("lastDecimal, lastNumber, and lastOperator");
      console.log(lastDecimal);
      console.log(lastNumber);
      console.log(lastOperator);
      // TODO: if the last index of a decimal is followed by an operator or
      // an operator allow another decimal, otherwise return;
      console.log("check out a mapping of the display");
      console.table(calcTable);
      if (lastDecimal < lastOperator)
        this.setState(prevState => {
          return { window: prevState.window + value };
        });
      return;
    }
    if (this.state.window.substr(0) === "0" && !isNaN(+value)) {
      return this.setState((prevState, currentProps) => {
        return { window: value };
      });
    }
    if (value === "AC") {
      return this.setState((prevState, currentProps) => {
        return { window: "0" };
      });
    }
    if (value === "TOGGLE_NEGATIVE") {
      return this.setState((prevState, currentProps) => {
        return { window: switchNegative(prevState.window).toString() };
      });
    }

    if (value === "=") {
      // console.log(mathfromString(this.state.window));
      // let getStringMath = JSON.stringify(mathfromString(this.state.window));
      let strEval = eval(this.state.window);
      return this.setState({
        window: strEval.toString()
      });
    }
    // don't allow consecutive operators
    if (
      operators.indexOf(this.state.window.substr(-1)) !== -1 &&
      operators.indexOf(value) >= 0
    ) {
      let newArray = [...this.state.window];
      // let findIndex = newArray.indexOf(value);
      let findIndex = this.state.window.length - 1;
      // i want to replace the last operator if a new on is chosen so...
      // i slice the newArray fron beginning to the target(findIndex),
      // then i concat on a new array that's made from right after the
      // to the end of the array. in this case the target is always
      // the end so it's redundant
      const filteredItems = newArray
        .slice(0, findIndex)
        .concat(newArray.slice(findIndex + 1, newArray.length));
      return this.setState(prevState => {
        return { window: filteredItems.join("") + value };
      });

      console.error("YOIU'VE FAILED TO HANDLE A CASE");
    }
    this.setState((prevState, currentProps) => {
      return { window: prevState.window + value };
    });
  }
  render() {
    return (
      <Flex flexDirection="column" minHeight="100vh">
        <NavbarTop navItems={navItems} />
        <Flex
          as="section"
          id="welcome-propper-section"
          minHeight="100vh"
          height="70vh"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          // border="4px dashed crimson"
          width={1}
          mt="50px"
        >
          <Card
            p={2}
            bg="papayawhip"
            border="1px solid goldenrod"
            borderRadius="10px"
            color="#282c34"
          >
            <ViewState>
              <Text fontWeight="bold" textAlign="center">
                state
              </Text>
              {Str(this.state, null, 2)}
            </ViewState>
          </Card>
          <Flex
            flexDirection="column"
            justifyContent="center"
            width={[3 / 4, 1 / 3]}
          >
            <Flex flexDirection="row" border="2px solid green" width={1}>
              <Box bg="#282c34" width={1} color="#F0E68C" id="display">
                {/* <Text
                  id="display"
                  fontSize="2em"
                  width={1}
                  textAlign="right"
                  px=".3em"
                > */}
                {this.state.window}
                {/* </Text> */}
              </Box>
            </Flex>
            <Flex flexDirection="row" border="2px solid green" width={1}>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
                minHeight="2em"
              >
                <Button
                  onClick={this.handlePress}
                  bg={topRow}
                  value="AC"
                  id="clear"
                  color="black"
                  width={1}
                >
                  AC
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="TOGGLE_NEGATIVE"
                  id="toggle_negative"
                  bg={topRow}
                  color="black"
                  width={1}
                >
                  +/-
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="%"
                  id="percent"
                  bg={topRow}
                  color="black"
                  width={1}
                >
                  %
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="/"
                  id="divide"
                  color="black"
                  bg="orange"
                  width={1}
                >
                  /
                </Button>
              </Flex>
            </Flex>

            {/* ROW 2 START */}
            <Flex flexDirection="row" border="2px solid green" width={1}>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  bg={topRow}
                  value="7"
                  id="seven"
                  color="black"
                  width={1}
                >
                  7
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  bg={topRow}
                  value="8"
                  id="eight"
                  color="black"
                  width={1}
                >
                  8
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  bg={topRow}
                  value="9"
                  id="nine"
                  color="black"
                  width={1}
                >
                  9
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="*"
                  id="multiply"
                  color="black"
                  bg="orange"
                  width={1}
                >
                  X
                </Button>
              </Flex>
            </Flex>

            {/* ROW 2 END */}

            {/* ROW 3 START */}
            <Flex flexDirection="row" border="2px solid green" width={1}>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="4"
                  id="four"
                  bg={topRow}
                  color="black"
                  width={1}
                >
                  4
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="5"
                  id="five"
                  bg={topRow}
                  color="black"
                  width={1}
                >
                  5
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="6"
                  id="six"
                  bg={topRow}
                  color="black"
                  width={1}
                >
                  6
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="-"
                  id="subtract"
                  color="black"
                  bg="orange"
                  width={1}
                >
                  -
                </Button>
              </Flex>
            </Flex>

            {/* ROW 3 END */}

            {/* ROW 4 START */}
            <Flex flexDirection="row" border="2px solid green" width={1}>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="1"
                  id="one"
                  bg={topRow}
                  color="black"
                  width={1}
                >
                  1
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="2"
                  id="two"
                  bg={topRow}
                  color="black"
                  width={1}
                >
                  2
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="3"
                  id="three"
                  bg={topRow}
                  color="black"
                  width={1}
                >
                  3
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="+"
                  id="add"
                  color="black"
                  bg="orange"
                  width={1}
                >
                  +
                </Button>
              </Flex>
            </Flex>

            {/* ROW 4 END */}

            {/* ROW 5 START */}
            <Flex flexDirection="row" border="2px solid green" width={1}>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 2]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  id="zero"
                  value="0"
                  bg={topRow}
                  color="black"
                  width={1}
                >
                  0
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  value="."
                  id="decimal"
                  bg={topRow}
                  color="black"
                  width={1}
                >
                  .
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                m={0}
                width={[1 / 4]}
                border={buttonTestBorder}
              >
                <Button
                  onClick={this.handlePress}
                  id="equals"
                  value="="
                  color="black"
                  bg="orange"
                  width={1}
                >
                  =
                </Button>
              </Flex>
            </Flex>

            {/* ROW 5 END */}
          </Flex>
        </Flex>
        <ReactFCCtest />
      </Flex>
    );
  }
}
