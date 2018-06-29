
const mongoose = require('mongoose')

const url = 'mongodb://PerttiKeinonen:TuomionPaiva1995@ds259410.mlab.com:59410/persons'

mongoose.connect(url)

const Henkilo = mongoose.model('Henkilo', {
    name: String,
    number: String
})

const rivit = process.argv

if (rivit[2] !== undefined && rivit[3] !== undefined) {
    
    const henkilo = new Henkilo({
        name: rivit[2],
        number: rivit[3]
    })

    const tulostus = `lisätään henkilö ${henkilo.name} numero ${henkilo.number} luetteloon`
    
    henkilo.save().then(response => {
        console.log(tulostus)
        mongoose.connection.close()
    })

} else {
    
    Henkilo.find({}).then(result => {
        result.forEach(henkilo => { console.log(henkilo) })
        mongoose.connection.close()
    })

}