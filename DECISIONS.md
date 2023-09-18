# Directives

1) Keep it simple, keep it "smol", keep it cosy
2) High-level-language-like assembler (HLLLA)



# Design decisions



## language name

**options**

​	a) **smol**

​	b) fake

​	c) itsy 

​	d) kiss (because of the :* ... *: symbols)

​	e) kis (keep it simple/smol)

​	f) kic (keep it cosy) 



## conditional jump

**options:**

​	a)  `if CMP :then`

​	b) ABOVE + `if-not CMP :then`

​	c) **`if CMP :then :else`**

**decision**:

- 2023-09-04: **we go with c)**
  - **reason:** we started with a) then switched to c) then experimented with c) and it seams than it's the most clean solution to achieve HLLLA for both loops and "normal" if blocks
  - **area for improvement:** we are currently using 0 as the value for "continue after this instruction" which is OK in machine code, but in assembly we might have something better



## ALU op notation in machine code

**options:**

​	a) inci r1 2

​	b) **r1 += 2**

​	c) += r1 2

**decision:**

- 2023-09-01: **we go with b)**

  - **reason:** HLLLA. For efficient machine code we might go with c) or a) internally, but the focus of the first VM is on "debugability"

    

## types

**options:**

​	a) int only

​	b) int + float **-- current, makes designing a VM for a static typed language more complicated**

​	c) float only

**decision:**

​	???



## local labels

**options**:

​	a) starts with `_`

​	b) starts with `.`

​	c) **no prefix (local is the default label type)**, global labels require prefix



**decision**:

- 2023-09-10: **we go with c)**
  - **reason**:
    - local labels are way more common than global labels
    - HLLLA
- 2023-09-09: we go with b)
- 2023-09-01: we go with a)



**implementation notes**

- local labels are only visible between two global labels
- local labels don't have to be unique
- **local labels are first searched forward and then backwards**
  - forward jumps (if,else,case) are more common than loops



## global labels

**options**:

​	a) requires double colon to define / use

​	b) **start with `$`**

​	c) start with `#`

​	d) start with `!` - conflict of meaning with `!=`

**decision**:

- 2023-09-10: **we go with b)**
  - **reason**: b) and c) looks ok, b) is used in Ruby

**notes**

- the use of global label doesn't require `:`

  - ```
    call $draw-frame
    ( vs )
    call :$frame
    ```



## (!) output notation

**options**:

​	a) **`>r1`**

​	b) `&r1` - similar to C

​	c) `$r1` - nope `$` already used for global addresses

​	d) `:r1` - nope `:` is used already for addresses

​	e) `'r1`

​	f) `%r1` - candidate (similar to ASM)

​	g) `^r1` - candidate



## block comments

**options**:

​	a) `code ( comment ) code` **-- current**

​	b) `code /* comment */ code`

​	c) `code [ comment ] code` **-- current**

​	e) `code { comment } code` **-- current**



## line comments

**options**:

​	a) `# comment` - python, ruby, bash **-- current**

​	b) `-- comment` - sql, lua, ada

​	c) `; comment` - asm, lisp, haskel

​	d) `% comment` - latex, matlab, octave

​	e) `// comment` - whole c family



## basic EXT operations

### goto addr

- decision 2023-09-01: **yes**
  - **reason:** can be achieved with conditional jump with condition always true but this is better for readability and teaching

### halt

- decision 2023-09-01: **yes**
  - **reason:** 
  - **area for improvement:** needs better name? we need another command to stop the CPU and vectored code (ie timer)

### nop

- decision 2023-09-01: **80% yes**
  - **reason**: might be useful for padding code



### log val

- decision 2023-09-01: **60% yes**
  - **rename candidates**: dump, 



### assert a op b

- decision 2023-09-10: **60% yes**



## configuration

**options**

​	a) json

​	b) **toml**

**decision:**

- 2023-09-05: **we go with b)**
  - **reason:** one configuration format is enough, it can be easily installed for Python version < 3.11
- 2023-09-01: we go with both a) and b)
  - **reason**: none is perfect, a) is in the standard library, b)  is in the standard lib since 3.11+, b) is more nice to work with



## call

**options**

a)  **no arguments**

```
call $fun
```

b)

```
call $fun 0
call $fun 2 x y
call $fun 3 x y >c
```

c)

```
call 0 $fun
call 2 $fun x y
call 3 $fun x y >c
```

d) 

```
call   $fun
call.0 $fun
call.2 $fun x y
call.3 $fun x y >c
```

e) special operation for handling arguments (push-n)

```
args 3 x y >c
call $fun
```

**decision**

- 2023-09-01: we go with a)
  - **reason**: the simplest solution, arguments can be handled by registers or by stack, we can later convert it into e)



## leds



### default resolution

**options**

​	a) 17x7

​	b) 16x16

​	c) **17x17**

​	d) 19x19

​	e) 21x21	

​	f) 23x23

​	g) 24x24

**decision**:

- 2023-09-09: considering
  - d) 19x19
    - 3x3 grid of 5x5 sprites (micro:bit) + 1px separator + 2x1px margin
    - 2x2 grid of 9x9 sprites + 1px separator - no margin
    - standard go board size
    - allows first 52 levels of xsokoban
    
  - e) 21x21
    - 4x4 grid of 5x5 sprites, separator but no margin
    - allows all 90 levels of xsokoban (20x17)
  
- 2023-09-03: **we go with c)**
  
  - **reason**:2023-09-03: we go with c)
    
    reason:
    
    3x3 grid of 5x5 sprite (micro:bit) + 1px separator - no margin
    
    4x4 grid of 3x3 sprite + 1px separator + 2x1px margin
    
    2x2 grid of 7x7 sprite + 1px separator + 2x1px margin
    
    historical go board size
    
  - 
    - 3x3 grid of 5x5 sprite (micro:bit) + 1px separator - no margin
    - 4x4 grid of 3x3 sprite + 1px separator + 2x1px margin
    - 2x2 grid of 7x7 sprite + 1px separator + 2x1px margin
    - historical go board size



## button state

**decision:**

- 2023-09-08:
  - button state values:
    - 0 - unpressed
    - 1 - just pressed
    - n (n>1) - held, pressed n frames ago
    - -n - just released (was pressed n frames ago)



## display

**options**:

​	a) low resolution led display

​	b) characters / tiles / cells / emoji

​	c) sprites + tiles

​	d) vectors / turtle

**decision**: we start with a)

 - **reason**:
   - the lower the resolution the lower the work required
   - requires more imagination while "consuming"
   - entities can be represented by a single "pixel" of a specific color
   - can be easily upgraded to b)



## (!) rom vs tape

**options**:

​	a) default = rom

​	b) default = tape

​	c) default = tape (renamed to rom)

​	e) default = tape (renamed to file)



**notes**

```
a = 0 # rom addr
rom-get a >x ; a += 1
rom-get a >y ; a += 1
rom-get a >z ; a += 1

( vs )

tape-get >x
tape-get >y
tape-get >z
```

```
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
```

```
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
```

