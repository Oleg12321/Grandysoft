const canvas = document.querySelector('canvas')



const ctx = canvas.getContext('2d')

function drawLine(ctx, line) {
    const {
        start,
        end,
        lineWidth = 1,
        lineCap = 'round',
        strokeStyle = 'black'
    } = line


    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.lineWidth = lineWidth
    ctx.lineCap =  lineCap
    ctx.strokeStyle = strokeStyle
    ctx.stroke()
}

const mouse = {
    isPressed: false,
    down: null,
    current: null,
    up: null,
    setDown: function(event, element) {
        this.isPressed = true;
        this.down = this.getPosition(event, element)
    },
    setUp: function(event, element) {
        this.isPressed = false;
        this.up = this.getPosition(event, element)
    },
    setCurrent: function(event, element) {
        this.current = this.getPosition(event, element)
    },
    getPosition: function(event, element) {
        let position = {
            x: event.clientX - element.offsetLeft,
            y: event.clientY - element.offsetTop
        }
    
        return position
    }
}

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const lines = []

function draw() {
    clearCanvas(ctx)
    lines.forEach(function (line) {
        drawLine(ctx, line)
    })
}

function handleMouseDown(e) {
    mouse.setDown(e, canvas)
    mouse.isPressed = true
    mouse.down = mouse.getPosition(e, canvas)

    const line = {
        start: mouse.down,
        end: mouse.down,
    }
    lines.push(line)
    draw()
}
function handleMouseUp(e) {
    mouse.setUp(e, canvas)
}
function handleMouseMove(e) {
    if (mouse.isPressed) {
        mouse.setCurrent(e, canvas)

        let line = {
            start: mouse.down,
            end: mouse.current,
        }
        lines.pop()
        lines.push(line)
        draw()
    }
}

document.addEventListener('mousedown', handleMouseDown )
document.addEventListener('mouseup', handleMouseUp )
document.addEventListener('mousemove', handleMouseMove )

 

 