function ext_mouse_init() {
    vm.mouse = {}
    vm.mouse.canvas = vm.leds.canvas // TODO: vm.screen.canvas

    document.addEventListener('mousedown', vm_on_mouse_down)
    document.addEventListener('mouseup', vm_on_mouse_up)
}

// TODO
function vm_on_mouse_down(e) {
    var bcr = vm.mouse.canvas.getBoundingClientRect()
    var mxy = _ext_mouse_xy(e)
    console.log('mouse down', e, bcr, mxy)
}

// TODO
function vm_on_mouse_up(e) {
    var bcr = vm.mouse.canvas.getBoundingClientRect()
    var mxy = _ext_mouse_xy(e)
    console.log('mouse up', e, bcr, mxy)
}

function _ext_mouse_xy(e) {
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

vm.ext['mouse-init'] = ext_mouse_init

// TODO: pass x,y
// TODO: pass event type (short click, long click, gesture, etc)
// TODO: handle animation frame
// TODO: detect short click
// TODO: detect long click

// TDOO: detect simple gesture (up, down, left, right)
// TODO: detect compound gesture (up+left, down+right, etc)