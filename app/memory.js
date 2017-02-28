import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { rootReducer } from 'ducks'
import Board from 'board'
import Users from 'users'

const store = createStore(rootReducer)

console.log(store.getState())
store.subscribe(() => { console.log(store.getState()) })

const Game = () => (
  <div>
    <h1>Game of memory built with React & Friends</h1>
    <Users />
    <Board />
  </div>
)

export default () => (
  <Provider store={store}>
    <Game />
  </Provider>
)
