function ext_init_screen() {
	var width = 256
	var height = 128
	var scale = 8
	var canvas = document.createElement('canvas')
	canvas.width = width * scale
	canvas.height = height * scale
	document.body.appendChild(canvas)
	vm.screen = {}
	vm.screen.ctx = canvas.getContext("2d") // TODO: vs ("2d", { alpha: false })
	vm.screen.ctx.scale(scale,scale)
}

function ext_sprite() {
	var ctx = vm.screen.ctx
	var x = 0
	var y = 0
	var s = 0
	var f = 0 // frame
	var z = 0 // zoom
	var r = 0 // rotation
	ctx.moveTo(0,0)
	ctx.lineTo(256,128)
	ctx.stroke()
}

vm.ext['init_screen'] = ext_init_screen

