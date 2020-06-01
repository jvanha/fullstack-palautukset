import React from 'react'

const PersonForm = (props) => (
    <form onSubmit={props.onSubmitHandler}> 
        <div>
            name: <input value={props.nameValue} onChange={props.nameOnChangeHandler}/>
        </div>
        <div>
            number: <input value={props.numberValue} onChange={props.numberOnChangeHandler}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
  </form>
)

export default PersonForm