import React from 'react'
import { connect } from 'react-redux'
import { find } from 'lodash'

import { resetGame, numPairs } from 'ducks'

const Game = ({ onClickReset, turn, winner }) => (
  <div>
    <h1>Game of memory built with React & Friends</h1>
    <div style={ { margin: '0 16px 16px' } }>
      <span style={ { marginRight: '16px' } }>Turn: { turn }</span>
      <button onClick={ onClickReset }>Reset</button>
    </div>
    { winner && <h4 style={ { marginLeft: '16px' } }>Player { winner.id } is a winner!</h4>}
  </div>
)

const mapStateToProps = ({users, game: { turn }}) => ({
  users,
  turn,
  winner: find(users, (user) => ( user.scores.length === numPairs )),
})
const mapDispatchToProps = (dispatch) => ({
  onClickReset: () => ( dispatch(resetGame()) )
})
export default connect(mapStateToProps, mapDispatchToProps)(Game)
