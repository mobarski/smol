vm.ip = 0
vm.code = []
vm.reg = new Array(vm.cfg.core.registers).fill(0)
vm.ext = {} // extensions

function vm_run(n_steps) {
	for (var i=0; i<n_steps; i++) { vm_step() }
}

function vm_step() {
	var t = get_op()
	if (t=='if') {
		// CONDITIONAL JUMP
		var a = get_op()
		var op = get_op()
		var b = get_op()
		var addr = get_op()
		if (vm_alu(a,op,b)) { vm.ip = addr }
	} else if (t in vm.ext) {
		// EXTENSION
		vm.ext[t]()
	} else {
		// ALU
		var op = get_op()
		var b = get_op()
		var val = vm_alu(t,op,b)
		vm_set(t, val)
	}
}

function get_op() {
	var op = vm.code[vm.ip]
	vm.ip += 1
	return op
}

function vm_alu(a,op,b) {
	var a = value_of(a)
	var b = value_of(b)
	switch (op) {
	    case  '+': case '+=':  return a+b
	    case  '-': case '-=':  return a-b
	    case  '*': case '*=':  return a*b
	    case  '/': case '/=':  return a/b
	    case  '%': case '%=':  return a%b
	    case  '&': case '&=':  return a&b
	    case  '|': case '|=':  return a|b
	    case  '^': case '^=':  return a^b
	    case '<<': case '<<=': return a<<b
	    case '>>': case '>>=': return a>>b
	    case '//': case '//=': return Math.floor(a/b)
	    case  '=': return b
	    case  '<': return a<b
	    case  '>': return a>b
	    case '<=': return a<=b
	    case '>=': return a>=b
	    case '==': return a==b
	    case '!=': return a!=b
	    case '&&': return a&&b
	    case '||': return a||b
    }
}


function vm_set(x, val) {
	if (is_ref(x)) {
		var r = get_ref(x)
		vm.reg[r] = val
	} else if (is_reg(x)) {
		var r = get_reg(x)
		vm.reg[r] = val
	}
}

function value_of(x) {
	if (is_num(x)) {
		return x
	} else if (is_ref(x)) {
		var r = get_ref(x)
		return vm.reg[r]
	} else if (is_reg(x)) {
		var r = get_reg(x)
		return vm.reg[r]
	}		
}

function get_reg(x) {
	return parseInt(x.slice(1))
}

function get_ref(x) {
	var r = get_reg(x.slice(1))
	return vm.reg[r]
}

function is_reg(x) {
	var r = get_reg(x)
	return ((x[0]=='r') && (r>=0) && (r<vm.cfg.core.registers))
}

function is_ref(x) {
	return ((x[0]=='@') && is_reg(x.slice(1)))
}

function is_num(x) {
	return !isNaN(x)
}
