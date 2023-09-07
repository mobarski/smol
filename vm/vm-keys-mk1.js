// === KEYS MK1 ==============================================================

default_key_to_code = {
    'ArrowLeft':0,
    'ArrowRight':1,
    'ArrowUp':2,
    'ArrowDown':3,
    'z':4, // a
    'x':5, // b
    'q':6, // start
    'w':7  // select
}

vm.keys = {}
vm.keys.delay_ms = coalesce(vm.cfg.keys.delay_ms, 500)
vm.keys.repeat_ms = coalesce(vm.cfg.keys.repeat_ms, 50)
vm.keys.key_to_code = coalesce(vm.cfg.keys.key_to_code, default_key_to_code)
vm.keys.time_pressed = {}
vm.keys.time_released = {}
vm.keys.pressed = {}
vm.keys.time_frame = 0
vm.keys.time_frame_prev = {}
vm.init.push(_vm_keys_init)

function _vm_keys_init() {
    // REF: https://www.w3schools.com/jsref/obj_keyboardevent.asp
    document.addEventListener('keydown', vm_on_key_down)
    document.addEventListener('keyup',   vm_on_key_up)
}

function vm_on_key_down(e) {
    let code = vm.keys.key_to_code[e.key]
    if (code == undefined) return
    vm.keys.time_pressed[code] = performance.now()
    vm.keys.pressed[code] = true
    //
    e.stopPropagation()
    e.preventDefault()
    e.stopImmediatePropagation()
}

function vm_on_key_up(e) {
    let code = vm.keys.key_to_code[e.key]
    if (code == undefined) return
    vm.keys.time_pressed[code] = performance.now()
    vm.keys.pressed[code] = false
    //
    e.stopPropagation()
    e.preventDefault()
    e.stopImmediatePropagation()
}

function vm_key_frame() {
    vm.keys.time_frame_prev = vm.keys.time_frame
    vm.keys.time_frame = performance.now()
}


// TODO: rename vm_btn
function vm_key_xxx() {
    let k = get_op() // key
    let t = get_op() // output target
}

vm.ext['key-frame'] = vm_key_frame
vm.ext['key'] = vm_key_xxx
