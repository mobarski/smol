( CONSTANTS )

    def FPS 60
    def BTN.DELAY.INITIAL 30 # = FPS / 2
    def BTN.DELAY.REPEAT   5 # = FPS / 12

    ( button )
        def btn.left  0
        def btn.right 1
        def btn.up    2
        def btn.down  3
        def btn.undo  4
        def btn.reset 5

    ( tiles )
        def tile.empty            0
        def tile.wall             2
        def tile.target           3
        def tile.box              4
        def tile.player           5
        def tile.box-at-target    6
        def tile.player-at-target 7

( REGISTER ALLOCATION )

    ( player / game )
        def level r0
        def p1.x r1
        def p1.y r2
        def pa r3 ( player action )
        def pb r4 ( button state )
        def box-done r5
        def box-cnt r6
        def pbp r7 ( button pressed or repeated )

    ( xy @ distance )
        def x1 r10
        def y1 r11
        def x2 r12
        def y2 r13

    ( tile.code @ distance )
        def t0 r20
        def t1 r21
        def t2 r22

    ( work )
        def i r30
        def j r31
        def k r32
        def n r33
        def t r34

( ========================================================================= )

$init:
    leds-clear 0
    timer-set FPS $frame-main
    level = 0
    call $load-level-from-rom
    halt

$frame-main:
    key-frame
    leds-draw
    ( TODO: mode -> game | transition )
    call $player-main
    call $check-level-done
    halt

$frame-transition:
    if i == 0 0 :fi
        level += 1
        call $load-level-from-rom
        timer-set FPS $frame-main
        halt
    fi:
    leds-clear 1
    leds-draw
    i -= 1
    halt

$check-level-done:
    if box-done == box-cnt 0 :fi
        i = 30 ( number of trasition frames )
        timer-set FPS $frame-transition
        halt
    fi:
    return

$player-main:
    call $check-keys
    if pa == 0 :end 0 ( no player action )

    leds-get x1 y1 >t1
    leds-get x2 y2 >t2

    move-into-empty-space?:
        if t1 == tile.empty 0 :fi
            call $update-player-position
        fi:

    move-into-target?:
        if t1 == tile.target 0 :fi
            call $update-player-position
        fi:

    move-box?:
        
        ( t2 must be empty or target )
        if t2 == tile.wall          :end 0
        if t2 == tile.box           :end 0
        if t2 == tile.box-at-target :end 0

        ( t1 must be box or box-at-target )
        if t1 == tile.box           :yes 0
        if t1 == tile.box-at-target :yes :end

        yes:
            ( move box into target )
            if t2 == tile.target 0 :fi
                leds-set x2 y2 tile.box-at-target
                box-done += 1
            fi:
            
            ( move box into empty space )
            if t2 == tile.empty 0 :fi
                leds-set x2 y2 tile.box
            fi:

            ( move player )
                ( restore t1 )
                if t1 == tile.box-at-target 0 :else
                    t1 = tile.target
                    box-done -= 1
                    goto :fi
                else:
                    t1 = tile.empty
                fi:
                ( move )
                call $update-player-position
    end:
    return


$check-keys:
    ( check pressed keys and set pa x1 y1 x2 y2 )

    x1 = p1.x
    y1 = p1.y
    x2 = p1.x
    y2 = p1.y

    check-up:
        key btn.up >pb
        call $btn-pressed-or-repeated ( >pbp )
        if pbp == 1 0 :fi
            y1 -= 1
            y2 -= 2
            pa = 1
            return
        fi:

    check-down:
        key btn.down >pb
        call $btn-pressed-or-repeated ( >pbp )
        if pbp == 1 0 :fi
            y1 += 1
            y2 += 2
            pa = 1
            return
        fi:

    check-left:
        key btn.left >pb
        call $btn-pressed-or-repeated ( >pbp )
        if pbp == 1 0 :fi
            x1 -= 1
            x2 -= 2
            pa = 1
            return
        fi:

    check-right:
        key btn.right >pb
        call $btn-pressed-or-repeated ( >pbp )
        if pbp == 1 0 :fi
            x1 += 1
            x2 += 2
            pa = 1
            return
        fi:

    check-reset:
        key btn.reset >pb
        if pb == FPS 0 :fi
            call $load-level-from-rom
        fi:

    pa = 0 ( no action )
    return


$update-player-position:
    check-empty:
        if t1 == tile.empty 0 :fi
            call $update-player-position-core
            leds-set p1.x p1.y tile.player
            return
        fi:

    check-target:
        if t1 == tile.target 0 :fi
            call $update-player-position-core
            leds-set p1.x p1.y tile.player-at-target
            return
        fi:
    
    return

$update-player-position-core:
    leds-set p1.x p1.y t0 ( restore old tile )
    t0 = t1
    p1.x = x1
    p1.y = y1
    return

$btn-pressed-or-repeated:
    if pb == 1 :then 0
    if pb >= BTN.DELAY.INITIAL 0 :fi ( AND ) if pb % BTN.DELAY.REPEAT :fi :then
    goto :fi
    then:
        pbp = 1
        return
    fi:
        pbp = 0
        return

( ========================================================================= )

$setup-level:
    p1.x = 1
    p1.y = 1
    leds-set p1.x p1.y tile.player
    leds-set 5 4 tile.wall
    leds-set 5 5 tile.wall
    leds-set 5 6 tile.wall
    leds-set 5 7 tile.wall
    leds-set 5 8 tile.wall
    leds-set 5 9 tile.wall
    leds-set 8 5 tile.box
    leds-set 8 8 tile.box
    leds-set 1 5 tile.target
    leds-set 1 8 tile.target
    return

$load-level-from-rom:
    leds-clear tile.empty
    box-done = 0
    rom-bank level

    i = 0
    rom-get i >p1.x    ; i += 1
    rom-get i >p1.y    ; i += 1
    rom-get i >box-cnt ; i += 1
    leds-set p1.x p1.y tile.player

    loop1:
        rom-get i >n ; i += 1
        rom-get i >t ; i += 1
        if n == 0 :end 0
        j = 0
        loop2:
            rom-get i >x1 ; i += 1
            rom-get i >y1 ; i += 1
            leds-set x1 y1 t
            j += 1
            if j < n :loop2 :loop1
    end:
    return

(
$load-level-from-tape:
    leds-clear tile.empty
    tape-bank level
    tape-get >p1.x
    tape-get >p1.y
    tape-get >box-cnt
    box-done = 0

    loop1:
        tape-get >n
        tape-get >t
        if n == 0 :end 0
        j = 0
        loop2:
            tape-get >x1
            tape-get >y1
            leds-set x1 y1 t
            j += 1
            if j < n :loop2 :loop1
    end:
    return
)
