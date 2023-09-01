// === MOUSE MK1 ==============================================================

vm.mouse = {}
vm.mouse.long_press_ms = coalesce(vm.cfg.mouse.long_press_ms, 500)
vm.mouse.time_pressed = 0
vm.mouse.time_released = 0
vm.mouse.time_frame = 0
vm.mouse.time_frame_prev = 0
vm.mouse.pressed = false
vm.mouse.button_state = 0
vm.mouse.x = 0
vm.mouse.y = 0
vm.mouse.xy_pressed = {x:0, y:0} // NOT USED YET (for gestures?)
vm.mouse.xy_released = {x:0, y:0} // NOT USED YET (for gestures?)
vm.init.push(_vm_mouse_init)

function _vm_mouse_init() {
    vm.mouse.canvas = vm.leds.canvas // TODO: vm.screen.canvas

    // REF: https://www.w3schools.com/jsref/obj_mouseevent.asp
    document.addEventListener('mousedown', vm_on_mouse_down)
    document.addEventListener('mouseup', vm_on_mouse_up)
    document.addEventListener('mousemove', vm_on_mouse_move)
}

function vm_mouse_btn() {
    let t = get_op() // output target
    let v = vm.mouse.button_state
    vm_set(t, v)
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
    let m = vm.mouse
    m.time_frame_prev = m.time_frame
    m.time_frame = performance.now()
    // JUST PRESSED?
    if (m.time_pressed > m.time_frame_prev) {
        m.button_state = 3
    } else // JUST RELEASED?
    if (m.time_released > m.time_frame_prev) {
        m.button_state = (m.time_released-m.time_pressed < m.long_press_ms) ? 1 : 2
    } else // JUST LONG PRESSED?
    if ((m.pressed)&&(m.time_frame > m.time_pressed+m.long_press_ms)&&(m.time_frame_prev<m.time_pressed+m.long_press_ms)) {
        m.button_state = 5
    } else // HELD?
    if (m.pressed) {
        m.button_state = (m.time_frame < m.time_pressed+m.long_press_ms)? 4 : 6
    } else {
        m.button_state = 0
    }
}

// TODO
function vm_on_mouse_down(e) {
    let bcr = vm.mouse.canvas.getBoundingClientRect()
    let mxy = _vm_mouse_xy(e)
    vm.mouse.time_pressed = performance.now()
    vm.mouse.xy_pressed = mxy
    vm.mouse.pressed = true
    //console.log('mouse down', e, bcr, mxy)
}

// TODO
function vm_on_mouse_up(e) {
    let bcr = vm.mouse.canvas.getBoundingClientRect()
    let mxy = _vm_mouse_xy(e)
    vm.mouse.time_released = performance.now()
    vm.mouse.xy_released = mxy
    vm.mouse.pressed = false
    //console.log('mouse up', e, bcr, mxy)
}

function vm_on_mouse_move(e) {
    let mxy = _vm_mouse_xy(e)
    vm.mouse.x = mxy.x
    vm.mouse.y = mxy.y
}

function _vm_mouse_xy(e) {
    let bcr = vm.mouse.canvas.getBoundingClientRect()

	//var ratio = bcr.height/fc.height
	//var bcr_left = ratio==fc.scale ? bcr.left : 0.5*(bcr.width - fc.width * ratio)

	let bcr_top = bcr.top
    let bcr_left = bcr.left
	
	let mx = e.clientX - bcr_left
	let my = e.clientY - bcr_top

    // TODO: get sx, sy from screen ???
    let sx = vm.leds.size
    let sy = vm.leds.size
    return {x:Math.floor(mx/sx), y:Math.floor(my/sy)}
}

// TODO
function _vm_mouse_btn() {
    let now = performance.now()
    if (vm.mouse.pressed) {
        if (false) { return 3 } // TODO: pressed in this frame
        else if (now - vm.mouse.time_pressed < vm.mouse.long_press_ms) { return 4 } // short press
        else if (false) { return 5 } // TODO: long press in this frame
        else if (now - vm.mouse.time_pressed > vm.mouse.long_press_ms) { return 6 } // long press
    } else {

    }

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
