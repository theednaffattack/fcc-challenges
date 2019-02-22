import React from "react";
import { Box } from "rebass";

export const Video = ({ url, title }) => (
  <Box
    width={1}
    css={{
      height: 0,
      paddingBottom: 900 / 16 + "%",
      position: "relative",
      overflow: "hidden",
      "& > iframe": {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        bottom: 0,
        left: 0,
        border: 0
      }
    }}
  >
    <iframe
      id="video"
      title={title}
      width="560"
      height="315"
      src={url} // "https://www.youtube.com/embed/GNCd_ERZvZM"
      frameBorder="0"
      allowFullScreen
    />
  </Box>
);
