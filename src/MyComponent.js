import React, { Component } from "react";
import Timeout from "./Timeout";

class MyComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // You can access methods of Timeout as they
    // were passed down as props.
    this.props.setTimeout(() => {
      console.log("Hey! I'm timing out!");
    }, 1000);
    let clear = this.props.clearTimeout;
    clear();
  }

  render() {
    return <span>Hello, world!</span>;
  }
}

// Pass your component to Timeout to create the magic.
export default Timeout(MyComponent);
