function ext_palette() {
    var p = value_of(get_op())
    vm.colors = vm.palettes[p].rgb
}
vm.ext['palette'] = ext_palette

vm.palettes = [] // TODO