const socket = io()
const circle = document.querySelector('#circle')

document.addEventListener('mousedown', (e) => {
	document.addEventListener('mousemove', drag)
})

document.addEventListener('mouseup', (e) => {
	document.removeEventListener('mousemove', drag)
})

const drag = (e) => {
	const position = {
		y: e.clientY + 'px',
		x: e.clientX + 'px',
	}

	drawCircle(position)
	console.log('Se envia el evento al servidor')
	socket.volatile.emit('circle position', position)
}

const drawCircle = (position) => {
	circle.style.top = position.y
	circle.style.left = position.x
}

socket.on('move circle', (position) => {
	drawCircle(position)
})
