const mongoose = require('mongoose')

const url = 'mongodb://tehtavantekija:olensalasana@ds229418.mlab.com:29418/osakolmetehtavat'

mongoose.connect(url)

const Person = mongoose.model('Person', {
	name: String, 
	phoneNumber: String
})

module.exports = Person