// === CORE MK1 ===============================================================

vm.ip = 0
vm.code = []
vm.reg = new Array(vm.cfg.core.registers).fill(0)
vm.ext = {} // extensions
vm.halt = false
vm.init = []

function vm_init() {
	for (var i=0; i<vm.init.length; i++) {
		vm.init[i]()
	}
}

function vm_run(n_steps=0) {
	var i = 0
	var t0 = performance.now()
	if (n_steps==0) {
		for (i=0; !vm.halt; i++) { vm_step() }
	} else {
		for (i=0; (i<n_steps)&&(!vm.halt); i++) { vm_step() }
	}
	//console.log('vm_run',i,'cycles',performance.now()-t0,'ms') // XXX
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
	} else if (is_reg(x)){
		var r = get_reg(x)
		vm.reg[r] = val
	} else if (is_tgt(x)) {
		var r = get_tgt(x)
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

// ie: r123 -> 123
function get_reg(x) {
	return parseInt(x.slice(1))
}

// ie: >r123 -> 123
function get_tgt(x) {
	return parseInt(x.slice(2))
}

// ie: @r123 -> reg[123]
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

function is_tgt(x) {
	return ((x[0]=='>') && is_reg(x.slice(1)))
}

function is_num(x) {
	return !isNaN(x)
}

function coalesce(...args) {
    for (let arg of args) {
        if (arg !== null && arg !== undefined) {
            return arg;
        }
    }
    return null;
}
