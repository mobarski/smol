# Directives

1) Keep it simple, keep it "smol"
2) High-level-language-like assembler (HLLLA)



# Design decisions



## conditional jump

**options:**

​	a)  `if CMP :then`

​	b) ABOVE + `if-not CMP :then`

​	c) `if CMP :then :else`

**decision**:

- **2023-09-04**: we go with c)
  - **reason:** we started with a) then switched to c) then experimented with c) and it seams than it's the most clean solution to achieve HLLLA for both loops and "normal" if blocks
  - **area for improvement:** we are currently using 0 as the value for "continue after this instruction" which is OK in machine code, but in assembly we might have something better



## ALU operations notation

**options:**

​	a) inci r1 2

​	b) r1 += 2

​	c) += r1 2

**decision:**

- **2023-09-01:** we go with b)

  - **reason:** HLLLA. For efficient machine code we might go with c) or a) internally, but the focus of the first VM is on "debugability"

    

## basic EXT operations

### goto :addr

- **decision 2023-09-01**: yes
  - **reason:** can be achieved with conditional jump with condition always true but this is better for readability and teaching

### halt

- **decision 2023-09-01**: yes
  - **reason:** 
  - **area for improvement:** needs better name? we need another command to stop the CPU and vectored code (ie timer)

### nop

- **decision 2023-09-01**: 80% yes
  - **reason**: might be useful for padding code

### log val

### assert a op b





## configuration

**options**

​	a) json

​	b) toml

**decision:**

- **2023-09-05**: we go with b)
  - **reason:** one configuration format is enough, it can be easily installed for Python version < 3.11
- **2023-09-01**: we go with both a) and b)
  - **reason:** none is perfect, a) is in the standard library, b)  is in the standard lib since 3.11+, b) is more nice to work with
