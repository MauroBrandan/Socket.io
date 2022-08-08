// const socket = io(); // Aqui el socket se concecta al namespace por defecto

const user = prompt('Escribe tu usuario')

const profes = ['RetaxMaster', 'juandc', 'GNDX']

let socketNamespace, group // socketNamespace reemplaza a socket

const chat = document.querySelector('#chat')
const namespace = document.querySelector('#namespace')

if (profes.includes(user)) {
	socketNamespace = io('/teachers') //El socket se va a conectar al namespace teachers
	group = 'teachers'
} else {
	socketNamespace = io('/students') //El socket se va a conectar al namespace students
	group = 'students'
}

socketNamespace.on('connect', () => {
	namespace.textContent = group
})

// Lógica de envío de mensajes

const sendMessage = document.querySelector('#send-message')
sendMessage.addEventListener('click', () => {
	const message = prompt('Escribe tu mensaje: ')

	socketNamespace.emit('send message', {
		message,
		user,
	})
})

socketNamespace.on('message', (messageData) => {
	const { user, message } = messageData

	const li = document.createElement('li')
	li.textContent = `${user}: ${message}`

	chat.append(li)
})
