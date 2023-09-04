// === LEDS mk1 ===============================================================

vm.leds = {}
vm.init.push(_vm_leds_init)

function _vm_leds_init() {
    vm.leds.width = vm.cfg.leds.width
    vm.leds.height = vm.cfg.leds.height
    vm.leds.data = new Array(vm.leds.width * vm.leds.height).fill(0)
    _vm_leds_init2()
}

function vm_leds_clear() {
    let v = value_of(get_op())
    vm.leds.data.fill(v)
}

function vm_leds_draw() {
    _vm_leds_draw_begin()
    for (var y = 0; y < vm.leds.height; y++) {
        for (var x = 0; x < vm.leds.width; x++) {
            var v = vm.leds.data[x + y * vm.leds.width]
            _vm_leds_draw_led(x, y, v)
        }
    }
    _vm_leds_draw_end()
}

function vm_leds_set() {
    let x = value_of(get_op())
    let y = value_of(get_op())
    let v = value_of(get_op())
    vm.leds.data[x + y * vm.leds.width] = v
}

function vm_leds_get() {
    let x = value_of(get_op())
    let y = value_of(get_op())
    let t = get_op() // output target
    let v = vm.leds.data[x + y * vm.leds.width]
    vm_set(t, v)
}

vm.ext['leds-clear'] = vm_leds_clear // TODO: rename leds-fill
vm.ext['leds-draw'] = vm_leds_draw
vm.ext['leds-set'] = vm_leds_set
vm.ext['leds-get'] = vm_leds_get


// === LEDS MK1 - IMPLEMENTATION DETAILS ===

function _vm_leds_init2() {
    vm.leds.size   = vm.cfg.leds.size
    vm.leds.radius = vm.cfg.leds.radius
    let canvas = document.createElement('canvas')
    canvas.width = vm.leds.width * vm.leds.size
    canvas.height = vm.leds.height * vm.leds.size
    //
    // Create a new container and apply centering styles
    let container = document.createElement('div')
    container.style.display = 'flex'
    container.style.justifyContent = 'center'
    container.style.alignItems = 'center'
    container.style.height = '100vh'

    // Append the canvas to the container
    container.appendChild(canvas)

    // Append the container to the body of the document
    document.body.appendChild(container)
    //document.body.appendChild(canvas)

    vm.leds.canvas = canvas
    vm.leds.ctx = canvas.getContext("2d")
    //
    vm.screen = {}
    vm.screen.width = canvas.width
    vm.screen.height = canvas.height
    vm.screen.scale = vm.leds.size
    vm.screen.ctx = canvas.getContext("2d")
    vm.screen.canvas = canvas
}

function _vm_leds_draw_led(x, y, v) {
    let c = vm_color(v)
    let r = vm.leds.radius
    vm.leds.ctx.fillStyle = c
    vm.leds.ctx.beginPath()
    //vm.leds.ctx.rect(x * vm.leds.size, y * vm.leds.size, 2*r, 2*r)
    vm.leds.ctx.arc(vm.leds.size/2 + x * vm.leds.size, vm.leds.size/2 + y * vm.leds.size, r, 0, 2 * Math.PI, false)
    vm.leds.ctx.fill()
}

function _vm_leds_draw_begin() {
    // TODO: background color
    vm.leds.ctx.clearRect(0, 0, vm.leds.ctx.canvas.width, vm.leds.ctx.canvas.height)
}

function _vm_leds_draw_end() {} // NOT USED IN THIS IMPLEMENTATIN

