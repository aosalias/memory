import { combineReducers } from 'redux'
import { map, range, merge, mergeWith, shuffle, isArray } from 'lodash'

// CARDS
const SET_CARD = 'SET_CARD'

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
  } else if (type === RESET_GAME) {
    return defaultCards
  }

  return state
}


// USERS
const SCORE_USER = 'SCORE_USER'

export const scoreUser = ({ id, value }) => ({
  type: SCORE_USER,
  id,
  scores: [ value ],
})

const defaultUsers = [{
  id: 1,
  scores: [],
  color: 'steelblue',
}]

const usersReducer = (state = defaultUsers, { type, id, ...userProps }) => {
  if(type === SCORE_USER) {
    return map(state, (user) => {
      if(id === user.id) {
        return mergeWith({}, user, userProps, deepMergeArrayCustomizer)
      }
      return user
    })
  } else if (type === RESET_GAME) {
    return defaultUsers
  }

  return state
}


// GAME
const RESET_GAME = 'RESET_GAME'
const ADVANCE_TURN = 'ADVANCE_TURN'

export const resetGame = () => ({
  type: RESET_GAME
})

export const advanceTurn = () => ({
  type: ADVANCE_TURN
})

const defaultGame = {
  currentUserId: 1,
  turn: 0,
}

const gameReducer = (state = defaultGame, { type }) => {
  if(type === ADVANCE_TURN) {
    return merge({}, state, { turn: state.turn + 1 } )
  } else if(type === RESET_GAME) {
    return defaultGame
  }
  return state
}

// ROOT
const rootReducer = combineReducers({
  cards: cardsReducer,
  users: usersReducer,
  game: gameReducer,
})

export { rootReducer }

// From https://lodash.com/docs/4.17.4#mergeWith
function deepMergeArrayCustomizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
