function ext_init_leds() {
    vm.leds = {}
    vm.leds.width = 17 // TODO: config
    vm.leds.height = 7 // TODO: config
    vm.leds.data = new Array(vm.leds.width * vm.leds.height)
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

vm.ext['init_leds'] = ext_init_leds
vm.ext['leds_clear'] = ext_leds_clear
vm.ext['leds_draw'] = ext_leds_draw
vm.ext['leds_set'] = ext_leds_set
vm.ext['leds_get'] = ext_leds_get


// IMPLEMENTATION DETAILS

function _ext_leds_init() {
    vm.leds.size   = 32 // TODO: config
    vm.leds.radius = 12 // TODO: config
    vm.leds.ctx = document.createElement('canvas').getContext("2d")
    vm.leds.ctx.canvas.width = vm.leds.width * vm.leds.size
    vm.leds.ctx.canvas.height = vm.leds.height * vm.leds.size
}

function _ext_leds_draw_led(x, y, v) {
    var c = vm.colors[v]
    vm.leds.ctx.fillStyle = c
    vm.leds.ctx.circle(x * vm.leds.size, y * vm.leds.size, vm.leds.radius)
    vm.leds.ctx.fill()
}

function _ext_leds_draw_begin() {} // NOT USED IN THIS IMPLEMENTATIN
function _ext_leds_draw_end()   {} // NOT USED IN THIS IMPLEMENTATIN
