import React from "react";
import { Box, Flex } from "rebass";
import styled from "styled-components";
import ReactFCCtest from "react-fcctest";
import { width, space } from "styled-system";
import marked from "marked";

const StyledTextarea = styled.textarea`
  ${width}
  ${space}
`;

class MyMarkdown extends React.Component {
  state = {
    content: this.props.content
  };

  handleInput = text => {
    this.setState(() => ({ content: text }));
  };

  render() {
    const title = "React Markdown Previewer";

    return (
      <Flex flexDirection="column" width={1}>
        <ReactFCCtest />
        <Flex width={1} alignItems="center" justifyContent="center">
          <Header title={title} />
        </Flex>
        <Flex flexDirection="row" width={1} flexWrap="wrap">
          <Box width={[1, 1 / 2]} ml="auto" pl="3rem">
            <ContentInput
              handleInput={this.handleInput}
              content={this.state.content}
            />
          </Box>
          <Box width={(1, 1 / 2)}>
            <ContentOutput content={this.state.content} />
          </Box>
        </Flex>
      </Flex>
    );
  }
}

// Default content

const defaultValue =
  "\n> Blockquote of some crummy text\n> Second Line?\n\n```javascript\nconst variable = {test: true}\n\nfunction(){\n  let help = 'maybe'\n  return help;\n}\n```\n\nHeading\n=======\n\nSub-heading\n-----------\n \n### Third level\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nUnordered list:\n\n  * sticks\n  * and\n  * stones\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n [![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/ee1172yeqyE/0.jpg)](http://www.youtube.com/watch?v=ee1172yeqyE)";

MyMarkdown.defaultProps = {
  content: defaultValue
};

// Components

const Header = props => (
  <Box>
    <h1>{props.title}</h1>
  </Box>
);

const ContentInput = props => (
  <div>
    <StyledTextarea
      id="editor"
      width={1 / 2}
      mx="auto"
      rows="38"
      cols="45"
      value={props.content}
      onChange={e => {
        props.handleInput(e.target.value);
      }}
    />
  </div>
);

const ContentOutput = props => (
  <div
    id="preview"
    dangerouslySetInnerHTML={{ __html: marked(props.content) }}
  />
);

export default MyMarkdown;
