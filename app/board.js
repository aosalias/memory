import React from 'react'
import { connect } from 'react-redux'
import { map, partial, get, find } from 'lodash'

import { showCard, hideCard, scoreUser, advanceTurn } from 'ducks'

const cardStyles = {
  width: 48,
  height: 16,
  textAlign: 'center',
  padding: '16px 0',
  border: '1px solid #ddd',
  margin: '0 10px 10px 0',
  boxShadow: '0 0 5px 1px #ccc',
  display: 'inline-block',
  overflow: 'hidden',
}

const boardStyles = {
  padding: "16px 8px 16px 16px",
  maxWidth: 820,
  position: 'relative',
}

const Card = ({ value, revealed, onClick }) => (
  <span style={ cardStyles } onClick={ onClick }>
    <span>{ revealed && value }</span>
  </span>
)

const Board = ({ cards, onCardClick, winner }) => (
  <div style={ boardStyles }>
    {
      map(cards, (card) => (
        <Card
          key={ card.id }
          onClick={ partial(onCardClick, card) }
          {...card}
        />
      ))
    }
  </div>
)

const mapStateToProps = ({
  cards,
  game: { currentUserId }
}) => ({
  cards,
  currentUserId,
})

// View state
const turnTimeout = 250
let lastCard = null
let boardEnabled = true

const mapDispatchToProps = (dispatch) => ({
  onCardClick: (currentUserId, card) => {
    if(card.id === get(lastCard, 'id')) { return }

    if(boardEnabled) {
      dispatch(showCard(card))
      if(lastCard) {
        if(card.value === lastCard.value) {
          dispatch(scoreUser({ value: card.value, id: currentUserId }))
          lastCard = null
        } else {
          boardEnabled = false
          setTimeout(() => {
            dispatch(hideCard(lastCard))
            dispatch(hideCard(card))
            lastCard = null
            boardEnabled = true
          }, turnTimeout)
        }

        dispatch(advanceTurn())
      } else {
        lastCard = card
      }
    }
  }
})

const mergeProps = (stateProps, { onCardClick }, ownProps) => ({
  ...stateProps,
  onCardClick: partial(onCardClick, stateProps.currentUserId),
  ...ownProps,
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Board)
