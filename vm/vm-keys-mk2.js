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
vm.keys.key_to_code = coalesce(vm.cfg.keys.key_to_code, default_key_to_code)
vm.keys.pressed = {}
vm.keys.status = {}
vm.init.push(_vm_keys_init)

function _vm_keys_init() {
    // REF: https://www.w3schools.com/jsref/obj_keyboardevent.asp
    document.addEventListener('keydown', vm_on_key_down)
    document.addEventListener('keyup',   vm_on_key_up)
}

function vm_on_key_down(e) {
    let code = vm.keys.key_to_code[e.key]
    if (code == undefined) return
    //console.log('on_key_down', e.key, code) // XXX
    vm.keys.pressed[code] = true
    //
    e.stopPropagation()
    e.preventDefault()
    e.stopImmediatePropagation()
}

function vm_on_key_up(e) {
    let code = vm.keys.key_to_code[e.key]
    if (code == undefined) return
    //console.log('on_key_up', e.key, code) // XXX
    vm.keys.pressed[code] = false
    //
    e.stopPropagation()
    e.preventDefault()
    e.stopImmediatePropagation()
}

function vm_key_frame() {
    for (k in vm.keys.key_to_code) {
        let key = vm.keys.key_to_code[k]
        if (!vm.keys.pressed[key]) {
            vm.keys.status[key] = vm.keys.status[key]>0 ? -vm.keys.status[key] : 0
        } else {
            vm.keys.status[key] += 1
        }
    }
}

// TODO: rename vm_btn
function vm_key_xxx() {
    let k = get_op() // key code
    let t = get_op() // output target
    let v = vm.keys.status[k] || 0
    //console.log('key',k,'status',v) // XXX
    vm_set(t, v)
}

vm.ext['key-frame'] = vm_key_frame
vm.ext['key'] = vm_key_xxx
