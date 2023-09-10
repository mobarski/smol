( CONSTANTS )

    ( button )
        def btn.up    0
        def btn.down  1
        def btn.left  2
        def btn.right 3

    ( tiles )
        def tile.empty            0
        def tile.wall             1
        def tile.target           2
        def tile.box              3
        def tile.player           4
        def tile.box-at-target    5
        def tile.player-at-target 6

( REGISTER ALLOCATION )

    ( player )
        def px r1
        def py r2
        def pa r3 ( player action )
        def pb r4 ( button state )

    ( xy @ distance )
        def x1 r10
        def y1 r11
        def x2 r12
        def y2 r13

    ( tile.code @ distance )
        def t0 r20
        def t1 r21
        def t2 r22

( ========================================================================= )

$init:
    leds-fill 0
    timer-set 30 $frame
    break

$frame:
    btn-frame
    call $player-main
    leds-draw
    break

$check-keys:
    ( check pressed keys and set pa x1 y1 x2 y2 )

    x1 = px , y1 = py
    x2 = px , y2 = py

    check-up:
        btn btn.up >pb
        if pb == 1 0 :check-down
            y1 -= 1
            y2 -= 2
            pa = 1
            return

    check-down:
        btn btn.down >pb
        if pb == 1 0 :check-left
            y1 += 1
            y2 += 2
            pa = 1
            return

    check-left:
        btn btn.left >pb
        if pb == 1 0 :check-right
            x1 -= 1
            x2 -= 2
            pa = 1
            return

    check-right:
        btn btn.right >pb
        if pb == 1 0 :check-done
            x1 += 1
            x2 += 2
            p1 = 1
            return

    pa = 0 ( no action )
    return

$player-main:
    call $check-keys
    if pa == 0 .end 0 ( no player action )

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
        if t1 == tile.box           :move-box 0
        if t1 == tile.box-at-target :move-box :end

        move-box:
            ( move box into target )
            if t2 == tile.target 0 :check-empty
                leds-set x2 y2 tile.box-at-target
            
            ( move box into empty space )
            check-empty:
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


$update-player-position:
    check-empty:
        if t1 == tile.empty 0 :fi
            call $update-player-position-core
            leds-set px py tile.player
            return
        fi:

    check-target:
        if t1 == tile.target 0 :fi
            call $update-player-position-core
            leds-set px py tile.player-at-target
            return
        fi:
    
    return

$update-player-position-core:
    leds-set px py t0 ( restore old tile )
    t0 = t1
    px = x1
    py = y1
    return
