function ext_leds_init() {
    vm.leds = {}
    vm.leds.width = vm.cfg.leds.width
    vm.leds.height = vm.cfg.leds.height
    vm.leds.data = new Array(vm.leds.width * vm.leds.height).fill(0)
    _ext_leds_init()
}

function ext_leds_clear() {
    var v = value_of(get_op())
    vm.leds.data.fill(v)
}

function ext_leds_draw() {
    _ext_leds_draw_begin()
    for (var y = 0; y < vm.leds.height; y++) {
        for (var x = 0; x < vm.leds.width; x++) {
            var v = vm.leds.data[x + y * vm.leds.width]
            _ext_leds_draw_led(x, y, v)
        }
    }
    _ext_leds_draw_end()
}

function ext_leds_set() {
    var x = value_of(get_op())
    var y = value_of(get_op())
    var v = value_of(get_op())
    vm.leds.data[x + y * vm.leds.width] = v
}

function ext_leds_get() {
    var x = value_of(get_op())
    var y = value_of(get_op())
    var t = get_op() // output target
    var v = vm.leds.data[x + y * vm.leds.width]
    vm_set(t, v)
}

vm.ext['leds-init'] = ext_leds_init
vm.ext['leds-clear'] = ext_leds_clear
vm.ext['leds-draw'] = ext_leds_draw
vm.ext['leds-set'] = ext_leds_set
vm.ext['leds-get'] = ext_leds_get


// IMPLEMENTATION DETAILS

function _ext_leds_init() {
    vm.leds.size   = vm.cfg.leds.size
    vm.leds.radius = vm.cfg.leds.radius
    var canvas = document.createElement('canvas')
    canvas.width = vm.leds.width * vm.leds.size
    canvas.height = vm.leds.height * vm.leds.size
    document.body.appendChild(canvas)
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

function _ext_leds_draw_led(x, y, v) {
    var c = vm.colors[v]
    var r = vm.leds.radius
    vm.leds.ctx.fillStyle = c
    vm.leds.ctx.beginPath()
    //vm.leds.ctx.rect(x * vm.leds.size, y * vm.leds.size, 2*r, 2*r)
    vm.leds.ctx.arc(vm.leds.size/2 + x * vm.leds.size, vm.leds.size/2 + y * vm.leds.size, r, 0, 2 * Math.PI, false)
    vm.leds.ctx.fill()
}

function _ext_leds_draw_begin() {
    // TODO: background color
    vm.leds.ctx.clearRect(0, 0, vm.leds.ctx.canvas.width, vm.leds.ctx.canvas.height)
}

function _ext_leds_draw_end()   {} // NOT USED IN THIS IMPLEMENTATIN
