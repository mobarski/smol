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
	let op = get_op()
	let val = value_of(op)
	console.log('log',op,val)
}

function vm_assert() {
	let a = get_op()
	let op = get_op()
	let b = get_op()
	let val = vm_alu(a,op,b)
	if (!val) {
		console.log('assertion failed:',a,op,b)
		vm.halt = true
	}
}

vm.ext['goto'] = vm_goto
vm.ext['halt'] = vm_halt
vm.ext['log'] = vm_log
vm.ext['nop'] = vm_nop
vm.ext['assert'] = vm_assert
