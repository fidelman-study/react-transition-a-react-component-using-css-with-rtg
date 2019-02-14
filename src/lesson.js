import React from 'react';
import uuid from 'uuid';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './index.css';

class App extends React.Component {
  items = [
    {
      name: 'Potato',
      id: uuid(),
    },
    {
      name: 'Carrot',
      id: uuid(),
    },
    {
      name: 'Pepper',
      id: uuid(),
    },
    {
      name: 'Eggplant',
      id: uuid(),
    },
    {
      name: 'Onion',
      id: uuid(),
    },
    {
      name: 'Garlic',
      id: uuid(),
    },
  ];

  state = {
    favorites: [],
  };

  toggleInFavorites = id => {
    let favorites;
    const isItemInFavorites = this.state.favorites.some(
      favorite => favorite.id === id
    );
    if (isItemInFavorites) {
      favorites = this.state.favorites.filter(
        favorite => favorite.id !== id
      );
    } else {
      favorites = [
        ...this.state.favorites,
        this.items.find(item => item.id === id),
      ];
    }

    this.setState({ favorites });
  };

  render() {
    return (
      <div className="container">
        <ul className="ingredients">
          {this.items.map(({ id, name }) => (
            <li
              key={id}
              className="ingredient"
              onClick={() =>
                this.toggleInFavorites(id)
              }
            >
              {name}
              <span className="star">
                {this.state.favorites.some(
                  favorite => favorite.id === id
                )
                  ? '🌟'
                  : '⭐'}
              </span>
            </li>
          ))}
        </ul>
        <div className="favorites">
          <p>My Favorites:</p>
          <TransitionGroup>
            {this.state.favorites.map(
              ({ id, name }) => (
                <CSSTransition
                  timeout={500}
                  classNames="fade"
                  key={id}
                >
                  <div className="favorite">
                    {name}
                  </div>
                </CSSTransition>
              )
            )}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;
