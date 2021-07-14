var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

mongoose.Promise = Promise

var dbUrl = 'mongodb+srv://root:6hIAiDdXJU8uQmae@cluster0.kzkr1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//Entity
var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) =>{
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.post('/messages', (req, res) =>{
    var message = new Message(req.body)

    message.save()
    .then(() => {
        return Message.findOne({message: 'badword'})
    })
    .then( censored => { //If it found it, catch it
        if(censored) {
            console.log('badword:',censored)
            return Message.remove({_id: censored.id})
        }
        io.emit('message', req.body)
        res.sendStatus(200)
    })
    .catch((err) => {
        res.sendStatus(500)
        return console.error(err)
    })
})

io.on('connection', (socket) => {
    console.log('user connected')
})

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true },(err) => {
    console.log('mongoDB connection', err)
})

var server = http.listen(3000, () =>{
    console.log('Server is listening on port ', server.address().port)
})