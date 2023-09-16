// === SCREEN MK1 =============================================================

vm.screen = {}
vm.screen.dom_id = coalesce(vm.cfg.screen.dom_id, 'vm-screen')
vm.screen.height = coalesce(vm.cfg.screen.height, 128)
vm.screen.width  = coalesce(vm.cfg.screen.width,  128)
vm.screen.scale  = coalesce(vm.cfg.screen.scale, 1)
vm.init.push(_vm_init_screen2)


function _vm_init_screen() {
	let scale = vm.cfg.screen.scale
	let canvas = document.getElementById(vm.screen.dom_id)
	canvas.width = vm.screen.width * scale
	canvas.height = vm.screen.height * scale
	vm.screen.ctx = canvas.getContext("2d") // TODO: vs ("2d", { alpha: false })
	vm.screen.ctx.scale(scale,scale)
}

function _vm_init_screen2() {
	let scale = vm.screen.scale
    let canvas = document.createElement('canvas')
    canvas.width = vm.screen.width * scale
    canvas.height = vm.screen.height * scale
    //
    // Create a new container and apply centering styles
    let container = document.createElement('div')
    container.style.display = 'flex'
    container.style.justifyContent = 'center'
    container.style.alignItems = 'center'
    container.style.height = '100vh'
    container.style.flexDirection = 'column' // NEW

    // Append canvas to the container
    container.appendChild(canvas)

    // Append the container to the body of the document
    document.body.appendChild(container)
    //document.body.appendChild(canvas)

    //
    vm.screen.ctx = canvas.getContext("2d")
	vm.screen.ctx.scale(scale,scale)
    vm.screen.canvas = canvas
}

// default resolution candidates:
// - 160x128 (common display for micro:bit)
// - 160x120 (makecode arcade)
// - 160x144 (gbc)
// - 128x128 (pico-8)
// - 128x64 (8-lined dot-matrix display)
// - 64x64 (lowrezjam)
// ----------------------------
// - 128x160 (common display for micro:bit, rotated for mobile)
// - 160x160 (???)
