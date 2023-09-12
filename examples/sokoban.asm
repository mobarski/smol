( CONSTANTS )

    def LEVEL 3

    ( button )
        def btn.left  0
        def btn.right 1
        def btn.up    2
        def btn.down  3

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
        def p1.x r1
        def p1.y r2
        def pa r3 ( player action )
        def pb r4 ( button state )
        def box-done r5
        def box-cnt r6

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
    timer-set 30 $frame
    ( call $setup-level )
    call $load-level-from-rom
    halt

$frame:
    key-frame
    leds-draw
    call $player-main
    halt

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
            fi:
            
            ( move box into empty space )
            if t2 == tile.empty 0 :fi
                leds-set x2 y2 tile.box
            fi:

            ( move player )
                ( restore t1 )
                if t1 == tile.box-at-target 0 :else
                    t1 = tile.target
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
        if pb == 1 0 :fi
            y1 -= 1
            y2 -= 2
            pa = 1
            return
        fi:

    check-down:
        key btn.down >pb
        if pb == 1 0 :fi
            y1 += 1
            y2 += 2
            pa = 1
            return
        fi:

    check-left:
        key btn.left >pb
        if pb == 1 0 :fi
            x1 -= 1
            x2 -= 2
            pa = 1
            return
        fi:

    check-right:
        key btn.right >pb
        if pb == 1 0 :fi
            x1 += 1
            x2 += 2
            pa = 1
            return
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
    box-done = 0
    rom-bank LEVEL

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
    tape-bank 0
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
