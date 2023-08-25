// === SUGAR MK1 ========================================================================

function vm_goto() {
	vm.ip = get_op() // TODO: value_of(get_op()) -> computed goto
}

function vm_halt() {
	vm.ip -= 1
	vm.halt = true
}

function vm_nop() {
}

function vm_log() {
	var op = get_op()
	var val = value_of(op)
	console.log('log',op,val)
}

vm.ext['goto'] = vm_goto
vm.ext['halt'] = vm_halt
vm.ext['log'] = vm_log
vm.ext['nop'] = vm_nop
