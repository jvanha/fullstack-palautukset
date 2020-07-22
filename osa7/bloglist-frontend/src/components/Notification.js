import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(({ notification })  =>  notification)

  if (!notification) {
    return null
  }
  if (notification.errorValue === true) {
    return (
      <Alert severity='error'>
        {notification.content}
      </Alert>
    )
  }
  return (
    <Alert severity='success'>
      {notification.content}
    </Alert>

  )
}

export default Notification