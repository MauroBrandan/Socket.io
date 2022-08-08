const express = require('express')
const path = require('path')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html')
})

// io.on('connection', (socket) => {}) // Namespace por defecto

// Namespaces personalizados
const teachers = io.of('teachers') //Con io.of conectamos a un namespace
const students = io.of('students')

// Escuchamos eventos en el namespace teachers
teachers.on('connection', (socket) => {
	console.log(socket.id + ' se ha conectado a la sala de profes')

	socket.on('send message', (data) => {
		teachers.emit('message', data) //Emitimos el mensaje a todos los sockets conectados al namespace teachers
	})
})

// Escuchamos eventos en el namespace students
students.on('connection', (socket) => {
	console.log(socket.id + ' se ha conectado a la sala de estudiantes')

	socket.on('send message', (data) => {
		students.emit('message', data) //Emitimos el mensaje a todos los sockets conectados al namespace students
	})
})

httpServer.listen(3000)
