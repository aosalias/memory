import React from 'react'
import { connect } from 'react-redux'
import { map, partial, get } from 'lodash'

import { showCard, hideCard, scoreUser } from 'ducks'

const cardStyles = {
  height: 50,
  width: 50,
  border: '1px solid #ddd',
  margin: '0 10px 10px 0',
  float: 'left',
  boxShadow: '0 0 5px 1px #ccc'
}

const boardStyles = {
  padding: "20px 10px 20px 20px",
}

const Card = ({ value, revealed, onClick }) => (
  <div style={ cardStyles } onClick={ onClick }>
    { revealed && value }
  </div>
)

const Board = ({ cards, onCardClick }) => (
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

const mapStateToProps = ({ cards, game: { currentUserId } }) => ({ cards, currentUserId })

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
