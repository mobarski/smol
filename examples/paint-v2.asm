def freq_hz 5

def mb r1
def mx r2
def my r3

init:
    leds-clear 0
    timer-set freq_hz :main
    halt

main:
    mouse-frame
    mouse-btn  >mb
    mouse-xy   >mx >my

    leds-set  mx my mb

    log  mb
    leds-draw
    halt
