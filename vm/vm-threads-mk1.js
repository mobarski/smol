// === THREADS MK1 ============================================================

vm.threads = {}
vm.threads.threads = coalesce(vm.cfg.core.threads, 64)
vm.threads.addr = new Array(vm.threads.threads).fill(0)
vm.threads.current = 0 // main thread

function vm_threads_set() {
    var id = value_of(get_op())
    let addr = get_op()
    // allow addressing from the end (-1 as the last thread)
    if (id<0) { id = length(vm.threads.addr) + id }
    vm.threads.addr[id] = addr
}

function vm_threads_next() {
    let id = vm.threads.current
    vm.threads.addr[id] = vm.ip
    for (var i=id+1; i<vm.threads.addr.length; i++) {
        if (vm.threads.addr[i] > 0) {
            vm.ip = vm.threads.addr[i]
            vm.threads.current = i
            return
        }
    }
    // all threads done, return to the main thread
    vm.ip = vm.threads.addr[0]
    vm.threads.current = 0
}

function vm_threads_kill() {
    let id = vm.threads.current
    vm.threads.addr[id] = 0
}

function vm_threads_id() {
    let t = get_op()
    vm_set(t, vm.threads.current) // ERROR
}

vm.ext['threads-set'] = vm_threads_set
vm.ext['threads-next'] = vm_threads_next
vm.ext['threads-kill'] = vm_threads_kill // NOT TESTED
vm.ext['threads-id'] = vm_threads_id
