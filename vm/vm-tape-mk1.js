// === TAPE ===================================================================

vm.tape = {}
vm.tape.data = []
vm.tape.pos = 0
vm.tape.id = 0
vm.tape.tapes = coalesce(vm.cfg.tape.tapes, [[]])
vm.tape.positions = {}
vm.init.push(_vm_tape_init)

function vm_tape_select() {
    let id = value_of(get_op()) // tape
    vm.tape.positions[vm.tape.id] = vm.tape.pos // save current tape position
    vm.tape.id = id
    vm.tape.pos = vm.tape.positions[id] || 0 // restore tape position
    if (vm.tape.tapes[id] == undefined) {
        console.log('tape not found', id)
        vm.stop = true
        return
    } else {
        vm.tape.data = vm.tape.tapes[id]
    }
}

function vm_tape_read() {
    let t = get_op() // output target
    let v = vm.tape.data[vm.tape.pos] || 0
    vm.tape.pos += 1
    vm_set(t, v)
}

function vm_tape_write() {
    let v = get_op() // value
    vm.tape.data[vm.tape.pos] = value_of(v)
    vm.tape.pos += 1
}

// TODO: pos >= len
// TODO: pos < 0
function vm_tape_seek() {
    let p = value_of(get_op()) // position
    let m = value_of(get_op()) // mode
    switch (m) {
        case 0: vm.tape.pos  = p; break
        case 1: vm.tape.pos += p; break
        case 2: vm.tape.pos  = vm.tape.data.length + p; break
        default:
            console.log('invalid tape-seek mode', m)
            vm.stop = true
            break
    }
}

function vm_tape_tell() {
    let t = get_op() // output target
    vm_set(t, vm.tape.pos)
}

function vm_tape_len() {
    let t = get_op() // output target
    vm_set(t, vm.tape.data.length)
}

vm.ext['tape-select']  = vm_tape_select
vm.ext['tape-seek']  = vm_tape_seek
vm.ext['tape-tell']  = vm_tape_tell
vm.ext['tape-read']  = vm_tape_read
vm.ext['tape-write'] = vm_tape_write
vm.ext['tape-len'] = vm_tape_len

function _vm_tape_init() {
    vm.tape.id = 0
    vm.tape.data = vm.tape.tapes[vm.tape.id] || []
}
