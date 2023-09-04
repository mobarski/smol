def freq_hz 30

def mb r1
def mx r2
def my r3

def color r4

def i r0
def W 17
def H 17


init:
    leds-clear 0
    timer-set freq_hz :main
    halt

main:
    mouse-frame
    mouse-btn  >mb
    mouse-xy   >mx >my

    i = 0
    loop:
        leds-set i 0 i
        i += 1
    if i < W :loop 0

    if mb > 3 0 :_end
        if my == 0 0 :_skip
            color = mx
            goto :_end
        _skip:
        leds-set mx my color
    _end:

    leds-draw
    halt
