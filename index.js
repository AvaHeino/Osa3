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



app.delete('/api/persons/:id', (req, res) => {
	Person
		.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => {
			console.log(error)
			res.status(400).send({ error: 'Id not found'})
		})
})


app.post('/api/persons', (req, res) => {
	const body = req.body

	if(body.name === '') {
		return response.status(400).json({error: 'name missing'})
	}
	if(body.number === '') {
		return response.status(400).json({error:'number missing'})
	}

	const person = new Person({
		name: body.name,
		phoneNumber: body.number,

	})

	Person
		.save()
		.then(savedPerson => {
			res.json(formatPerson(savedPerson))
		})
	
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})