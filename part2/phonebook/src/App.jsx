import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PeopleAdder from './components/PeopleAdder'
import PeopleRender from './components/PeopleRender'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToLookFor, setNameToLookFor] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const personExists = persons.some(person => person.name === personObject.name)
    personExists ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(personObject))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  // console.log(persons)

  const handleFilter = (event) => {
    setNameToLookFor(event.target.value)
  }
  
  const personsToShow = nameToLookFor === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(nameToLookFor.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameToLookFor={nameToLookFor} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PeopleAdder addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <PeopleRender personsToShow={personsToShow}/>
    </div>
  )
}

export default App