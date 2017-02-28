import { combineReducers } from 'redux'
import { map, range, merge, shuffle } from 'lodash'

// ACTION TYPES
const SET_CARD = 'SET_CARD'

// ACTIONS
export const showCard = ({ id }) => ({
  type: SET_CARD,
  id,
  revealed: true,
})

export const hideCard = ({ id }) => ({
  type: SET_CARD,
  id,
  revealed: false,
})

// REDUCERS
// TODO: FEATURE: expose numPairs in config
const numPairs = 26

const defaultCards = shuffle(map(range(numPairs * 2), (i) => ({
  id: i,
  revealed: false,
  value: i % numPairs,
})))

const cardsReducer = (state = defaultCards, { type, id, ...cardProps }) => {
  if(type === SET_CARD) {
    return map(state, (card) => {
      if(id === card.id) {
        return merge({}, card, cardProps)
      }
      return card
    })
  }

  return state
}

const rootReducer = combineReducers({
  cards: cardsReducer
})

export { rootReducer }
