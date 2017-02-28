import React from 'react'
import { map, join } from 'lodash'
import { connect } from 'react-redux'

const userStyles = (color, active) => {
  const activeColor = active ? color : '#ccc'

  return {
    padding: '0 20px',
    margin: '0 20px',
    maxWidth: 250,
    border: `1px solid ${ activeColor }`,
    boxShadow: `0 0 5px 1px ${ activeColor }`,
  }
}

const User = ({ id, scores, color, active }) => (

  <div style={ userStyles(color, active) }>
    <h3>Player: { id }</h3>
    <h4>Score: { scores.length }</h4>
    <h4>Scores: { join(scores, ' ') }</h4>
  </div>
)
const Users = ({ users, currentUserId }) => (
  <div>
    {
      map(users, (user) => (
        <User key={ user.id }
              active={ user.id === currentUserId }
              { ...user }
        />
      ))
    }
  </div>
)

const mapStateToProps = ({ users, game: { currentUserId } }) => ({ users, currentUserId })

export default connect(mapStateToProps)(Users)
