const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())


morgan.token('body', function getBody (req) {
	return JSON.stringify(req.body)
})
app.use(morgan(':method :url :body :status :res[content-length] :response-time ms'))

const formatPerson = (person) => {
	return{
		name: person.name, 
		number: person.phoneNumber
	}
}

let persons = [
	{
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }

]

app.get('/api/persons', (req, res) => {
	Person 
		.find({})
		.then(people => {
			res.json(people.map(formatPerson))
		})
})

app.get('/info', (req, res) => {
	const personsLength = persons.length 
	const time = new Date()
	res.send(
		`<div><p>puhelinluettelossa ${personsLength} henkilon tiedot </p><p>${time}</p></div>`
		)

}) 

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)

	res.status(204).end()
})


app.post('/api/persons', (req, res) => {
	const id = Math.random(1, 100)
	const body = req.body

	const person = {
		name: body.name, 
		number: body.number,
		id: id
	}

	if(body.name === undefined) {
		return res.status(400).json({error: 'No name given'})

	}
	if(body.number === undefined){
		return res.status(400).json({error: 'No number given'})
	}
	if(persons.filter(p => p.name === person.name).length > 0) {
		return res.status(400).json({error: 'Name must be unique'})
	}
	else {
	persons = persons.concat(person)
	res.json(person)
	}	
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})