import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { rootReducer } from 'ducks'
import Board from 'board'
import Users from 'users'
import Game from 'game'

const store = createStore(rootReducer)

console.log(store.getState())
store.subscribe(() => { console.log(store.getState()) })

export default () => (
  <Provider store={store}>
    <div>
      <Game />
      <Users />
      <Board />
    </div>
  </Provider>
)
