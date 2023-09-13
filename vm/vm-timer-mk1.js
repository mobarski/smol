vm.timer = {}
vm.timer.addr = 0
vm.timer.freq = 0
vm.timer.tick = 0
vm.timer.timer_id = 0
//
vm.timer.debug = []
vm.timer.t0 = 0

function vm_timer_set() {
    vm.timer.freq = value_of(get_op())
    vm.timer.addr = get_op()
    _vm_set_timer()
}

function _vm_on_timer() {
    if (vm.stop) { return }
    vm.timer.debug.push(performance.now())
    vm.timer.tick += 1
    //
    let addr = vm.timer.addr
    let freq = vm.timer.freq
    if ((addr==0) || (freq==0)) { return }
    _vm_set_timer()
    //
    vm.ip = addr
    vm.halt = false
    vm_run()
}

function _vm_set_timer() {
    if (vm.timer.freq==0) { return }
    let delay = Math.floor(1000 / vm.timer.freq) // TODO: more precise method (ie 60fps)
    clearTimeout(vm.timer.timer_id)
    vm.timer.timer_id = setTimeout(_vm_on_timer, delay)
}

vm.ext['timer-set'] = vm_timer_set
