var fs = require('fs')
var data = require('./data.json')

console.log(data.surname)
var dataWritten = {
    name: "Bob"
}

// Reading JSON
fs.readFile('./data.json', 'utf-8', (err, data) => {
    var data = JSON.parse(data)
    console.log(data.name)    
})
//Reading directories
fs.readdir('./', (err, data) =>{
    console.log(data)
})

//Writing files
fs.writeFile('dataWritten.json', JSON.stringify(dataWritten), (err) => {
    console.log('Write finished. ', err)
})