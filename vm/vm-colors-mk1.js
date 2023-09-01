// === COLORS MK1 =============================================================

vm.colors = {}
vm.colors.rgb = coalesce(vm.cfg.colors.data, ['#000000','#ffffff'])

function vm_color(x) {
	let id = x % vm.colors.rgb.length;
	return vm.colors.rgb[id]
}
