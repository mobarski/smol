// === MOUSE MK1 ==============================================================

vm.mouse = {}
vm.init.push(_vm_mouse_init)

function _vm_mouse_init() {
    vm.mouse.canvas = vm.leds.canvas // TODO: vm.screen.canvas

    document.addEventListener('mousedown', vm_on_mouse_down)
    document.addEventListener('mouseup', vm_on_mouse_up)
}

function vm_mouse_btn() {
    var t = get_op() // output target
    var v = 0 // TODO: get button state
    vm_set(t, v)
}

function vm_mouse_xy() {
    var tx = get_op() // output target x
    var ty = get_op() // output target y

    var mx = 0 // TODO
    var my = 0 // TODO
    vm_set(tx, mx)
    vm_set(ty, my)
}



// TODO
function vm_on_mouse_down(e) {
    var bcr = vm.mouse.canvas.getBoundingClientRect()
    var mxy = _vm_mouse_xy(e)
    console.log('mouse down', e, bcr, mxy)
}

// TODO
function vm_on_mouse_up(e) {
    var bcr = vm.mouse.canvas.getBoundingClientRect()
    var mxy = _vm_mouse_xy(e)
    console.log('mouse up', e, bcr, mxy)
}

function _vm_mouse_xy(e) {
    var bcr = vm.mouse.canvas.getBoundingClientRect()

	//var ratio = bcr.height/fc.height
	//var bcr_left = ratio==fc.scale ? bcr.left : 0.5*(bcr.width - fc.width * ratio)

	var bcr_top = bcr.top
    var bcr_left = bcr.left
	
	var mx = e.clientX - bcr_left
	var my = e.clientY - bcr_top

    // TODO: get sx, sy from screen ???
    var sx = vm.leds.size
    var sy = vm.leds.size
    return {x:Math.floor(mx/sx), y:Math.floor(my/sy)}
}

vm.ext['mouse-btn'] = vm_mouse_btn
vm.ext['mouse-xy'] = vm_mouse_xy

// TODO: pass x,y
// TODO: pass event type (short click, long click, gesture, etc)
// TODO: handle animation frame
// TODO: detect short click
// TODO: detect long click

// TDOO: detect simple gesture (up, down, left, right)
// TODO: detect compound gesture (up+left, down+right, etc)