import React from "react";
import styled from "styled-components";
import { width, space } from "styled-system";

const StyledTextarea = styled.textarea`
  ${width}
  ${space}
`;

export const ContentInput = props => (
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
