import React from "react";

export class StartButton extends React.Component {
  render() {
    let { startCountDown, resetCountDown } = this.props;
    return (
      <div style={{ marginLeft: 130 }}>
        <button
          id={resetCountDown ? "start_stop" : "reset"}
          onClick={resetCountDown ? resetCountDown : startCountDown}
        >
          {JSON.stringify(resetCountDown)}
          {JSON.stringify(startCountDown)}
          {resetCountDown ? "RESET" : "START / PAUSE"}
        </button>
      </div>
    );
  }
}
