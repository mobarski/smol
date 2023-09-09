# Directives

1) Keep it simple, keep it "smol", keep it cosy
2) High-level-language-like assembler (HLLLA)



# Design decisions



## conditional jump

**options:**

​	a)  `if CMP :then`

​	b) ABOVE + `if-not CMP :then`

​	c) **`if CMP :then :else`**

**decision**:

- 2023-09-04: **we go with c)**
  - **reason:** we started with a) then switched to c) then experimented with c) and it seams than it's the most clean solution to achieve HLLLA for both loops and "normal" if blocks
  - **area for improvement:** we are currently using 0 as the value for "continue after this instruction" which is OK in machine code, but in assembly we might have something better



## ALU operations notation

**options:**

​	a) inci r1 2

​	b) **r1 += 2**

​	c) += r1 2

**decision:**

- 2023-09-01: **we go with b)**

  - **reason:** HLLLA. For efficient machine code we might go with c) or a) internally, but the focus of the first VM is on "debugability"

    

## local labels

**options**:

​	a) starts with `_`

​	b) starts with `.`

**decision**:

- 2023-09-10: **we go with b)**

## basic EXT operations

### goto :addr

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

### assert a op b





## configuration

**options**

​	a) json

​	b) **toml**

**decision:**

- 2023-09-05: **we go with b)**
  - **reason:** one configuration format is enough, it can be easily installed for Python version < 3.11
- 2023-09-01: we go with both a) and b)
  - **reason**: none is perfect, a) is in the standard library, b)  is in the standard lib since 3.11+, b) is more nice to work with



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
    - standard go board size

  - e) 21x21
    - 4x4 grid of 5x5 sprites, separator but no margin

- 2023-09-03: **we go with c)**
  - **reason**:
    - 3x3 grid of 5x5 sprite (micro:bit) + 1px separator
    - 4x4 grid of 3x3 sprite + 1px separator + 2x1px margin
    - historical go board size



## button state

**decision:**

- 2023-09-08:
  - button state values:
    - 0 - unpressed
    - 1 - just pressed
    - n (n>1) - held, pressed n frames ago
    - -n - just released (was pressed n frames ago)
