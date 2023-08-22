function ext_goto() {
	vm.ip = get_op() // TODO: value_of(get_op()) -> computed goto
}

function ext_halt() {
	vm.ip -= 1
}

function ext_nop() {
}

function ext_log() {
	var op = get_op()
	var val = value_of(op)
	console.log('log',op,val)
}

vm.ext['goto'] = ext_goto
vm.ext['halt'] = ext_halt
vm.ext['log'] = ext_log
vm.ext['nop'] = ext_nop
