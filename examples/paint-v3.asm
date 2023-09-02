def freq_hz 60

def mb r1
def mx r2
def my r3

def color r4

init:
    leds-clear 0
    timer-set freq_hz :main
    halt

main:
    mouse-frame
    mouse-btn  >mb
    mouse-xy   >mx >my

    if mb == 1 0 :_end
        leds-get mx my >color
        color += 1
        leds-set mx my color
    _end:
    if mb >= 5 0 :_end2
        leds-set mx my 0
    _end2:

    leds-draw
    halt
