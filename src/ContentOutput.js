import React from "react";

export const ContentOutput = props => (
  <div
    id="preview"
    dangerouslySetInnerHTML={{ __html: marked(props.content) }}
  />
);
