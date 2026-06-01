require('dotenv').config()
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const Person = require('./modules/person')
const app = express()

morgan.token('body', (req) => {
  return req.body ? JSON.stringify(req.body) :  ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('Welcome to the Phonebook')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/info' , (request, response) => {
  Person.find({}).then(result => {
    const noOfPeople = result.length
    const amountOfPeople = `Phonebook has info for ${noOfPeople} people`
    const time = new Date().toString()
    response.send(`${amountOfPeople}<br><br>${time}`)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response) => {
  const body = request.body
  if(!body.name){
    return response.status(400).json({
      error: 'name missing'
    })
  }
  else if(!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  console.log('In PUT request', request.body)
  const { name, number } = request.body
  Person.findById(request.params.id)
    .then(person => {
      if(!person){
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})