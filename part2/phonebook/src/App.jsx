import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PeopleAdder from './components/PeopleAdder'
import PeopleRender from './components/PeopleRender'
import entryService from './services/entry'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToLookFor, setNameToLookFor] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    entryService.getAll().then(initialEntries => {
      setPersons(initialEntries)
    })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    const existingPerson = persons.find(person => person.name === personObject.name)
    
    if(existingPerson) {
      if(confirm(`${personObject.name} already added to phonebook, replace the old number with the new one?`)) {
        entryService.update(existingPerson.id, personObject)
          .then(response => {
            setPersons(persons.map(p => p.id === response.id ? response : p))
            setMessage(`Updated ${personObject.name}'s phone number`)
            setTimeout(() => {
              setMessage(null)
              setIsError(false)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setIsError(true)
            setMessage(error.response.data.error)
            setTimeout(() => {
              setMessage(null)
              setIsError(false)
            }, 5000)
          })
      }
    }
    else {
      entryService.create(personObject).then(response => {
        setPersons(persons.concat(response))
        setMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch(error => {
        setIsError(true)
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
          setIsError(false)
        }, 5000)
      })
    }
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
      <Notification message={message} isError={isError}/>
      <Filter nameToLookFor={nameToLookFor} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PeopleAdder addName={addEntry} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <PeopleRender personsToShow={personsToShow} onDelete={(id) => setPersons(persons.filter(p => p.id !== id))} />
    </div>
  )
}

export default App