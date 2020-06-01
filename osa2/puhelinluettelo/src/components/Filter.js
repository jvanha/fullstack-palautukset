import React from 'react'

const Filter = ({ value, onChangeHandler }) => (
  <div>
    <input value={value} onChange={onChangeHandler}/> 
  </div>
)

export default Filter