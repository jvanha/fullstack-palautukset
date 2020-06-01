import React from 'react'
const errorStyle = {
  color: 'red',
  fontSize: 25,
  borderStyle: 'solid',
  padding: 15,
  marginBottom: 15
}
const notificationStyle = {
  color: 'green',
  fontSize: 25,
  borderStyle: 'solid',
  padding: 15,
  marginBottom: 15
}
const Notification = ({message, errorValue}) => {
  if (message === null) {
    return null
  }
  if (errorValue === true) {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>

  )
} 

export default Notification 