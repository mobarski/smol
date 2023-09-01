// === PALETTES MK1 ===========================================================

vm.palettes = {}
vm.palettes.data = coalesce(vm.cfg.palettes.data, [{rgb:['#000000','#ffffff']}])
vm.palettes.palette = 0
vm.colors.rgb = vm.palettes.data[0].rgb

function ext_palette() {
    let p = value_of(get_op())
    vm.colors.rgb = vm.palettes.data[p].rgb
}
vm.ext['palette'] = ext_palette
