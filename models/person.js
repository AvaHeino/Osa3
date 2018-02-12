const mongoose = require('mongoose')

const url = 'mongodb://tehtavantekija:olensalasana@ds229418.mlab.com:29418/osakolmetehtavat'

mongoose.connect(url)


const personSchema = mongoose.Schema({
	name: String, 
	phoneNumber: String,
	id: Number
})

const Person = mongoose.model('Person', personSchema)



module.exports = Person