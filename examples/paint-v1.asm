init:
    leds-clear 0
    timer-set 5 :main
    halt

main:
    mouse-frame
    mouse-btn  >r1
    mouse-xy   >r2 >r3

    leds-set  r2 r3 r1

    log  r1
    leds-draw
    halt
