import React from "react";
import { Flex as BaseFlex, Text } from "rebass";

import { minHeight, minWidth } from "styled-system";
import styled from "styled-components";

const Flex = styled(BaseFlex)`
  ${minHeight}
  ${minWidth}
`;

export class DrumPad extends React.Component {
  render() {
    return (
      <Flex
        id="Heater-1"
        className="drum-pad"
        justifyContent="center"
        alignItems="center"
        minHeight={["80px", "80px"]}
        minWidth="90px"
        width={1 / 4}
        m={[1, 1]}
        bg={
          this.props.playStatus === "PLAYING" &&
          this.props.keyPressed === this.props.value
            ? "yellow"
            : "pink"
        }
        // value={this.props.value}
        flexDirection="row"
        onClick={() => this.props.handleClick(this.props.value)}
      >
        {this.props.children}
      </Flex>
    );
  }
}
