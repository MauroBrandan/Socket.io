const socket = io()

const send = document.querySelector('#send')
const disconnect = document.querySelector('#disconnect')
const reconnect = document.querySelector('#reconnect')

send.addEventListener('click', () => {
	// Verificamos si esta conectado para que el mensaje no se guarde en el buffer
	if (socket.connected) socket.emit('is connected', '¡Está conectado!')
})

disconnect.addEventListener('click', () => {
	socket.disconnect()
})

reconnect.addEventListener('click', () => {
	socket.connect()
})
