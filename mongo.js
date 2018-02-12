const mongoose = require('mongoose')

const url = 'mongodb://tehtavantekija:olensalasana@ds229418.mlab.com:29418/osakolmetehtavat'

mongoose.connect(url)

const Person = mongoose.model('Person', {
	name: String, 
	phoneNumber: String
})

if(process.argv[2] !== undefined) {
	const person = new Person({
		name: process.argv[2], 
		phoneNumber: process.argv[3]
	})

	person 
		.save()
		.then(response => {
			console.log(`Lisataan henkilo ${process.argv[2]} numero ${process.argv[3]} luetteloon`)
			mongoose.connection.close()
		})
} else {
	Person 
		.find({})
		.then(result => {
			console.log('puhelinluettelo: ')
			result.forEach(person => {
				console.log(`${person.name} ${person.phoneNumber}`)
			})
			mongoose.connection.close()
		})

}