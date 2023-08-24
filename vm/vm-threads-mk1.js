// === THREADS MK1 ============================================================

vm.threads = {}
vm.threads.addr = new Array(vm.cfg.core.threads).fill(0)
vm.threads.current = -1

function vm_threads_set() {
    var id = value_of(get_op())
    if (id<0) { id = length(vm.threads.addr) + id }
    let addr = get_op()
    // TODO: thread argument (one value per thread) ???
    vm.threads.addr[id] = addr
}

function vm_threads_next() {
    var id = vm.threads.current
    vm.threads.addr[id] = vm.ip
    for (var i=id+1; i<vm.threads.addr.length; i++) {
        if (vm.threads.addr[i] > 0) {
            vm.ip = vm.threads.addr[i]
            vm.thread = i
            return
        }
    }
    // all threads done, wait for the next main loop
    vm.halt = true
}

function vm_threads_kill() {
    var id = vm.threads.current
    vm.threads.addr[id] = 0
}

function vm_threads_id() {
    var t = get_op()
    vm_set(t, vm.threads.current)
}

vm.ext['thread-set'] = vm_threads_set
vm.ext['thread-next'] = vm_threads_next
vm.ext['thread-kill'] = vm_threads_kill
vm.ext['thread-id'] = vm_threads_id
