// === ROM ====================================================================

vm.rom = {}
vm.rom.data = []
vm.rom.bank = 0
vm.rom.banks = coalesce(vm.cfg.rom.banks, [[]])
vm.init.push(_vm_rom_init)

function vm_rom_bank() {
    let b = value_of(get_op()) // bank
    vm.rom.bank = b
    if (vm.rom.banks[b] == undefined) {
        console.log('bank not found', b)
        vm.stop = true
        return
    } else {
        vm.rom.data = vm.rom.banks[b]
    }
}

function vm_rom_get() {
    let a = value_of(get_op()) // addr
    let t = get_op() // output target
    let v = vm.rom.data[a] || 0
    vm_set(t, v)
}

vm.ext['rom-bank'] = vm_rom_bank
vm.ext['rom-get'] = vm_rom_get

function _vm_rom_init() {
    vm.rom.bank = 0
    vm.rom.data = vm.rom.banks[vm.rom.bank] || []
}
