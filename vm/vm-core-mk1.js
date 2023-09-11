// === CORE MK1 ===============================================================

vm.ip = 0
vm.code = []
vm.reg = new Array(vm.cfg.core.registers).fill(0)
vm.ext = {} // extensions
vm.halt = false
vm.stop = false // stop also the interrupt timer
vm.init = []
vm.trace = [] // XXX

function vm_init() {
	for (var i=0; i<vm.init.length; i++) {
		vm.init[i]()
	}
}

function vm_run(n_steps=0) {
	var i = 0
	let t0 = performance.now()
	if (n_steps==0) {
		for (i=0; (!vm.halt)&&(!vm.stop); i++) { vm_step() }
	} else {
		for (i=0; (i<n_steps)&&(!vm.halt)&&(!vm.stop); i++) { vm_step() }
	}
	//console.log('vm_run',i,'cycles',performance.now()-t0,'ms') // XXX
}

function vm_step() {
	vm.trace.push([vm.ip,vm.code[vm.ip],vm.code[vm.ip+1]]) // XXX
	let t = get_op()
	if (t=='if') {
		// CONDITIONAL JUMP
		let a = get_op()
		let op = get_op()
		let b = get_op()
		let addr_then = get_op()
		let addr_else = get_op()
		if (vm_alu(a,op,b)) {
			vm.ip = addr_then ? addr_then : vm.ip
		} else {
			vm.ip = addr_else ? addr_else : vm.ip
		}
	} else if (t in vm.ext) {
		// EXTENSION
		vm.ext[t]()
	} else {
		// ALU
		let op = get_op()
		let b = get_op()
		let val = vm_alu(t,op,b)
		vm_set(t, val)
	}
}

function get_op() {
	if (vm.ip>vm.code.length) { console.log('end of code reached!'); vm.stop=true; return 'halt' } // XXX
	let op = vm.code[vm.ip]
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
		default: console.log('unknown op',op,'a',a,'b',b,'ip',vm.ip); vm.stop=true; return 0
    }
}


function vm_set(x, val) {
	if (is_ref(x)) {
		let r = get_ref(x)
		vm.reg[r] = val
	} else if (is_reg(x)){
		let r = get_reg(x)
		vm.reg[r] = val
	} else if (is_tgt(x)) {
		let r = get_tgt(x)
		vm.reg[r] = val
	}
}

function value_of(x) {
	if (is_num(x)) {
		return x
	} else if (is_ref(x)) {
		let r = get_ref(x)
		return vm.reg[r]
	} else if (is_reg(x)) {
		let r = get_reg(x)
		return vm.reg[r]
	}		
}

// ie: r123 -> 123
function get_reg(x) {
	//if (typeof(x) != 'string') { console.log('get_reg',x,'ip',vm.ip); vm.stop=true; return } // XXX
	return parseInt(x.slice(1))
}

// ie: >r123 -> 123
function get_tgt(x) {
	return parseInt(x.slice(2))
}

// ie: @r123 -> reg[123]
function get_ref(x) {
	//if (typeof(x) != 'string') { console.log('get_ref',x,'ip',vm.ip); vm.stop=true; return } // XXX
	let r = get_reg(x.slice(1))
	return vm.reg[r]
}

function is_reg(x) {
	if (typeof(x) != 'string') { return false }
	if (x[0]!='r') { return false }
	let r = get_reg(x)
	return ((x[0]=='r') && (r>=0) && (r<vm.cfg.core.registers))
}

function is_ref(x) {
	if (typeof(x) != 'string') { return false }
	return ((x[0]=='@') && is_reg(x.slice(1)))
}

function is_tgt(x) {
	if (typeof(x) != 'string') { return false }
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
