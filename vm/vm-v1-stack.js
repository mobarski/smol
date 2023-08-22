vm.stack = []

function ext_return() {
	vm.ip = vm.stack.pop()
}

function ext_call() {
	vm.stack.append(vm.ip)
	vm.ip = get_op()
}

function ext_push() {
	var a = get_op()
	var val = value_of(a)
	vm.stack.push(val)
}

function ext_pop() {
	var a = get_op()
	var val = vm.stack.pop()
	vm_set(a, val)
}

vm.ext['return'] = ext_return
vm.ext['call'] = ext_call
vm.ext['push'] = ext_push
vm.ext['pop'] = ext_pop
