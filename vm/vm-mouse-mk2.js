// === MOUSE MK1 ==============================================================

vm.mouse = {}
vm.mouse.pressed = false
vm.mouse.over = true
vm.mouse.button_state = 0
vm.mouse.x = 0
vm.mouse.y = 0
vm.mouse.xy_pressed = {x:0, y:0} // NOT USED YET (for gestures?)
vm.mouse.xy_released = {x:0, y:0} // NOT USED YET (for gestures?)
vm.init.push(_vm_mouse_init)

function _vm_mouse_init() {
    let canvas = vm.leds.canvas // TODO: vm.screen.canvas
    vm.mouse.canvas = canvas

    // REF: https://www.w3schools.com/jsref/obj_mouseevent.asp
    document.addEventListener('pointerdown', vm_on_mouse_down)
    document.addEventListener('pointerup',   vm_on_mouse_up)
    document.addEventListener('pointermove', vm_on_mouse_move, {passive: false})
    //
    canvas.addEventListener('pointerleave', vm_on_mouse_leave)
    canvas.addEventListener('pointerenter', vm_on_mouse_enter)
}

function vm_mouse_btn() {
    let t = get_op() // output target
    let v = vm.mouse.button_state
    vm_set(t, v)
    //console.log('mouse-btn', v) // XXX
}

function vm_mouse_xy() {
    let tx = get_op() // output target x
    let ty = get_op() // output target y

    let mx = vm.mouse.x
    let my = vm.mouse.y
    vm_set(tx, mx)
    vm_set(ty, my)
}

function vm_mouse_frame() {
    if (!vm.mouse.pressed) {
        vm.mouse.button_state = vm.mouse.button_state>0 ? -vm.mouse.button_state : 0
    } else {
        vm.mouse.button_state += 1
    }
}

// TODO
function vm_on_mouse_down(e) {
    if (e.pointerType == 'mouse' && e.button != 0) return;
    if (!vm.mouse.over) { return }
    let bcr = vm.mouse.canvas.getBoundingClientRect()
    let mxy = _vm_mouse_xy(e)
    vm.mouse.xy_pressed = mxy
    vm.mouse.pressed = true
    //console.log('mouse down', e, bcr, mxy)
    //
    e.stopPropagation()
    e.preventDefault()
    e.stopImmediatePropagation()
}

// TODO
function vm_on_mouse_up(e) {
    if (e.pointerType == 'mouse' && e.button != 0) return;
    let bcr = vm.mouse.canvas.getBoundingClientRect()
    let mxy = _vm_mouse_xy(e)
    vm.mouse.xy_released = mxy
    vm.mouse.pressed = false
    //console.log('mouse up', e, bcr, mxy)
    //
    e.stopPropagation()
    e.preventDefault()
    e.stopImmediatePropagation()
}

function vm_on_mouse_move(e) {
    if (!vm.mouse.over) { return }
    let mxy = _vm_mouse_xy(e)
    vm.mouse.x = mxy.x
    vm.mouse.y = mxy.y
    //
    e.stopPropagation()
    e.preventDefault()
    e.stopImmediatePropagation()
}

function vm_on_mouse_leave(e) {
    vm.mouse.over = false
    //console.log('mouse leave')
}

function vm_on_mouse_enter(e) {
    vm.mouse.over = true
    //console.log('mouse enter')
}

function _vm_mouse_xy(e) {
    let bcr = vm.mouse.canvas.getBoundingClientRect()

	//var ratio = bcr.height/fc.height
	//var bcr_left = ratio==fc.scale ? bcr.left : 0.5*(bcr.width - fc.width * ratio)
	
	let mx = e.clientX - bcr.left
	let my = e.clientY - bcr.top

    // TODO: get sx, sy from screen ???
    let sx = vm.leds.size
    let sy = vm.leds.size
    return {x:Math.floor(mx/sx), y:Math.floor(my/sy)}
}

vm.ext['mouse-btn'] = vm_mouse_btn
vm.ext['mouse-xy'] = vm_mouse_xy
vm.ext['mouse-frame'] = vm_mouse_frame

// TODO: pass x,y
// TODO: pass event type (short click, long click, gesture, etc)
// TODO: handle animation frame
// TODO: detect short click
// TODO: detect long click

// TDOO: detect simple gesture (up, down, left, right)
// TODO: detect compound gesture (up+left, down+right, etc)
