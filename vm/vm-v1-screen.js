function ext_init_screen() {
	var width = vm.cfg.screen.width
	var height = vm.cfg.screen.height
	var scale = vm.cfg.screen.scale
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

vm.ext['screen-init'] = ext_init_screen

// default resolution candidates:
// - 160x128 (common display for micro:bit)
// - 160x120 (makecode arcade)
// - 160x144 (gbc)
// - 128x128 (pico-8)
// - 128x64 (8-lined dot-matrix display)
// - 64x64 (lowrezjam)
