// === TEXT MK1 ===============================================================

vm.text = {}
vm.text.bank = 0
vm.text.buffer = []
vm.text.banks = coalesce(vm.cfg.text.banks, [[]])
vm.text.data = vm.text.banks[vm.text.bank]
vm.text.dom_id = coalesce(vm.cfg.text.dom_id, 'vm-text')
vm.text.sep = coalesce(vm.cfg.text.sep, '%%')

function vm_text_bank() {
	let bank_id = value_of(get_op())
	vm.text.bank = bank_id
	vm.text.data = vm.text.banks[bank_id]
}

function vm_text_new() {
	vm.text.buffer = []
}

function vm_text_part() {
	let text_id = value_of(get_op())
	let part_id = value_of(get_op())
	let sep = vm.text.sep
	let part = vm.text.data[text_id].split(sep)[part_id]
	_vm_text_append(part)
}

function vm_text_val() {
	let v = value_of(get_op())
	let s = v.toString() // TODO: format ???
	_vm_text_append(s)
}

function vm_text_chr() {
	let v = value_of(get_op())
	let c = String.fromCharCode(v)
	_vm_text_append(c)
}

function vm_text_emit() {
	let text = vm.text.buffer.join('')
	let dom_target = document.getElementById(vm.text.dom_id)
	if (dom_target) { dom_target.innerHTML = text }
	console.log('text-emit', text) // XXX
}

vm.ext['text-bank'] = vm_text_bank
vm.ext['text-new'] = vm_text_new
vm.ext['text-part'] = vm_text_part
vm.ext['text-val'] = vm_text_val
vm.ext['text-chr'] = vm_text_chr
vm.ext['text-emit'] = vm_text_emit

function _vm_text_append(s) {
	vm.text.buffer.push(s)
}

/*
USAGE EXAMPLE:
text-new
text-part r1 0
text-val r2
text-part r1 0
text-emit
*/
