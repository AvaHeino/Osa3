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
	return {
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
		.catch(error => {
			console.log(error)
		})
})

app.get('/info', (req, res) => {
	const personsLength = persons.length 
	const time = new Date()
	res.send(
		`<div><p>puhelinluettelossa ${personsLength} henkilon tiedot </p><p>${time}</p></div>`
		)

}) 

{/*app.delete('/api/persons/:id', (req, res) => {
	person
		.findByIdAndRemove(res.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => {
			res.status(400).send({ error: 'Id not found'})
		})
})*/}


app.post('/api/persons', (req, res) => {
	
	const body = req.body
	const randomnumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
	
    if(body.name === undefined) {
		return res.status(400).json({error: 'No name given'})

	}
	if(body.number === undefined){
		return res.status(400).json({error: 'No number given'})
	}

	const person = new Person({
		name: body.name, 
		phoneNumber: body.number,
		id: randomnumber

	})

	person
		.save()
		.then(savedPerson => {
			res.json(formatPerson(savedPerson))
		})
		.catch(error => {
			console.log(error)
		})
	{/*}
	if(persons.filter(p => p.name === person.name).length > 0) {
		return res.status(400).json({error: 'Name must be unique'})
	}
	else {
	persons = persons.concat(person)
	res.json(person)
	}*/}
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})