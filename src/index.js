import { NProgress } from "@tanem/react-nprogress";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Bar from "./Bar";
import Container from "./Container";
import "./index.css";

class AnimationExample extends React.Component {
  state = {
    isLoading: false
  };

  render() {
    return (
      <Router>
        <Route
          render={({ location }) => (
            <React.Fragment>
              <Link to="50">Red</Link>
              <Link to="40">Green</Link>

              <NProgress isAnimating={this.state.isLoading} key={location.key}>
                {({ isFinished, progress, animationDuration }) => (
                  <Container
                    isFinished={isFinished}
                    animationDuration={animationDuration}
                  >
                    <Bar
                      progress={progress}
                      animationDuration={animationDuration}
                    />
                  </Container>
                )}
              </NProgress>

              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames="fade"
                  onEnter={() => {
                    this.setState(() => ({
                      isLoading: true
                    }));
                  }}
                  onEntered={() => {
                    this.setState(() => ({
                      isLoading: false
                    }));
                  }}
                >
                  <Switch>
                    <Route exact path="/hsl/:h/:s/:l" />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </React.Fragment>
          )}
        />
      </Router>
    );
  }
}

ReactDOM.render(<AnimationExample />, document.getElementById("root"));
