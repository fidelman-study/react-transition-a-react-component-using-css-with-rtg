import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import cx from 'classnames';
import Home from './components/home';
import Profile from './components/profile';
import Favorites from './components/favorites';
import './lesson.css';

class Base extends Component {
  render() {
    return (
      <Router>
        <Route component={App} />
      </Router>
    );
  }
}

class App extends Component {
  state = {
    showBalloon: false,
    highlightedMenuItem: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      showBalloon: !prevState.showBalloon,
    }));
  };

  toggleHighlightedMenuItem = () => {
    this.setState(({ highlightedMenuItem }) => ({
      highlightedMenuItem: !highlightedMenuItem,
    }));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ showBalloon: false });
    }
  }

  render() {
    return (
      <div className="container">
        <button
          className={cx('toggler', {
            'toggler--active': this.state.showBalloon,
          })}
          onClick={this.toggle}
        >
          Menu
        </button>
        <CSSTransition
          in={this.state.showBalloon}
          timeout={350}
          classNames="balloon"
          unmountOnExit
          onEntered={this.toggleHighlightedMenuItem}
          onExit={this.toggleHighlightedMenuItem}
        >
          <div className="menu">
            <ul className="list">
              <li className="list-item">
                <Link to="/">Home</Link>
              </li>
              <li className="list-item">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="list-item">
                <Link to="/favorites">Favorites</Link>
              </li>
              <li className="list-item">Sign out</li>
            </ul>
          </div>
        </CSSTransition>
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="swipe"
            timeout={500}
          >
            <div className="swipe-container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={Home}
                />
                <Route
                  exact
                  path="/profile"
                  component={Profile}
                />
                <Route
                  exact
                  path="/favorites"
                  component={Favorites}
                />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default Base;
