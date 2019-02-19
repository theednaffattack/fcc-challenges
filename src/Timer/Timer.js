import React from "react";

export class Timer extends React.Component {
  render() {
    return (
      <div>
        <h1 id="time-left" style={{ fontSize: 100, marginLeft: 100 }}>
          {this.props.minutes}:{this.props.seconds}
        </h1>
      </div>
    );
  }
}
