  oldTimer(self) {
    console.log("passed in self from click handler");
    console.log(self);
    if (!self) return;
    return setTimeout(function run() {
      self.setState(
        prevState => ({
          secondsRemaining: prevState.secondsRemaining--,
          nextClick: "PAUSE"
        }),
        () =>
          console.log(
            "running inner timeout log: ",
            self.state.secondsRemaining
          )
      );

      if (self.state.secondsRemaining > 0 && self.state.running === true) {
        return setTimeout(
          self.timer, // the key was referencing the class bound instance not `run`
          1000,
          self,
          self.state.secondsRemaining--
        );
      }
      if (self.state.secondsRemaining === 0 && self.state.running === true) {
        clearTimeout(self.timer);
        self.setState(prevState => ({
          label: prevState.label === "BREAK" ? "SESSION" : "BREAK",
          secondsRemaining:
            prevState.label === "BREAK"
              ? prevState.session
              : prevState.breakLength,
          running: true
        }));
        return self.timer(self);
      }
      self.setState(prevState => ({
        label: "BREAK"
      }));
      clearTimeout(self.timer);
      console.log("reached bottom of timer. early execution or completion?");
    }, 0);
  }
