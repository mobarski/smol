// === COLORS MK1 =============================================================

vm.colors = {}
vm.colors.data = coalesce(vm.cfg.colors.data, ['#000000','#ffffff'])

function vm_color(x) {
	var id = x % vm.colors.data.length;
	return vm.colors.data[id]
}
