import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { rootReducer } from 'ducks'
import Board from 'board'

const store = createStore(rootReducer)

console.log(store.getState())
store.subscribe(() => { console.log(store.getState()) })

export default () => (
  <Provider store={store}>
    <Board />
  </Provider>
)
