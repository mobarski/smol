// === TAPE ===================================================================

vm.tape = {}
vm.tape.data = []
vm.tape.bank = 0
vm.tape.pos = 0
vm.tape.banks = coalesce(vm.cfg.tape.banks, [[]])
vm.init.push(_vm_tape_init)

function vm_tape_bank() {
    let b = get_op() // bank
    vm.tape.bank = b
    vm.tape.pos = 0
    if (vm.tape.banks[b] == undefined) {
        console.log('bank not found', b)
        vm.stop = true
        return
    } else {
        vm.tape.data = vm.tape.banks[b]
    }
}

function vm_tape_get() {
    let t = get_op() // output target
    let v = vm.tape.data[vm.tape.pos] || 0
    vm.tape.pos += 1
    vm_set(t, v)
}

/*
function vm_tape_write() {
    let v = get_op() // value
    vm.tape.data[vm.tape.pos] = value_of(v)
    vm.tape.pos += 1
}
*/

// TODO: seek mode (0 = absolute, 1 = relative)
function vm_tape_seek() {
    let p = get_op() // position
    vm.tape.pos = value_of(p)
}

function vm_tape_pos() {
    let t = get_op() // output target
    vm_set(t, vm.tape.pos)
}

// vm.ext['tape-write'] = vm_tape_write
vm.ext['tape-bank']  = vm_tape_bank
vm.ext['tape-get']  = vm_tape_get
vm.ext['tape-seek']  = vm_tape_seek
vm.ext['tape-pos']   = vm_tape_pos

function _vm_tape_init() {
    vm.tape.bank = 0
    vm.tape.data = vm.tape.banks[vm.tape.bank] || []
}
