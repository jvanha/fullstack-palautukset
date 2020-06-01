import React from 'react'

const Persons = ({ persons, filter, onClickHandler}) => (
    <div>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person =>
            <div key={person.id}>   
                <label>{person.name} {person.number} </label> 
                <button onClick={onClickHandler} id={person.id}>Remove</button>
            </div>
    )}
    </div>
)

export default Persons