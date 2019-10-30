import React, { Component } from "react";
import { Box } from "@material-ui/core";

class Cover extends Component {  
  render() {
    return (
      <Box style={{
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          opacity: 0.4
        }}
        position="fixed"
        zIndex="modal"
      ></Box>
    );
  }
}

export default Cover;