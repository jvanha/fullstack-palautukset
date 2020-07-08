import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ notification, setNotification] = useState(null)
  const [ errorValue, setErrorValue] = useState(false)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    //console.log('button was clicked', event.target)
    //console.log(persons.map(person => person.name))
    if ( persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} has already been added to phonebook! Do you want to replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const id = person.id
        //console.log(id)
        personService
          .update(id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person =>  person.id !== id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            setNotification(`The number of ${updatedPerson.name} has been updated`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setErrorValue(true)
            setNotification(`Information of ${person.name} has already been removed from server` )
            setTimeout(() => {
              setNotification(null)
              setErrorValue(false)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
          })
      }  
    } else {
      personService
        .create(personObject)
          .then(createdPerson => {
            console.log('created')
            setPersons(persons.concat(createdPerson))
            setNewName('')
            setNewNumber('')
            setNotification(`Added ${createdPerson.name}.`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error.response.data.error)
            setErrorValue(true)
            setNotification(error.response.data.error)
            setTimeout(() => {
              setNotification(null)
              setErrorValue(false)
            }, 5000)
          })
    }
  }

  const removePerson = event => {
    //console.log(event)
    //console.log(event.target)
    const id = event.target.id
    //console.log(typeof(id))
    //console.log(id)
    const person = persons.find(p => p.id === id)
    //console.log(typeof(person.id))
    //console.log(person.id)
    console.log(person)
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      personService
        .remove(id)
        .then(responseObject => {
          console.log("removed")
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`Removed ${person.name}.`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  } 

  const handleNewName = (event) => {
    //console.log(event.target)
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    //console.log(event.target)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} errorValue={errorValue}/>
      <Filter value={filter} onChangeHandler={handleFilter}/> 
      <h2>add</h2>
      <PersonForm nameValue={newName} 
                  nameOnChangeHandler={handleNewName}
                  numberValue={newNumber}
                  numberOnChangeHandler={handleNewNumber} 
                  onSubmitHandler={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onClickHandler={removePerson}/>
    </div>
  )

}

export default App;
