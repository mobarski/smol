# Smol



## Idea

- Simple register-based VM that can be easily extended (highly modular)
- Simple assembly code that reads more like higher level language
- VM extensions that do the heavy-lifting AND act as facades AND adapters
- Everything compiled into a single file



## Inspirations

- [Another World VM](https://fabiensanglard.net/anotherWorld_code_review/) ([polygons](https://fabiensanglard.net/another_world_polygons/))
- [p-code machine](https://en.wikipedia.org/wiki/P-code_machine)
- [UXN](https://100r.co/site/uxn.html)
- [pico-8](https://www.lexaloffle.com/dl/docs/pico-8_manual.html) / [24a2](https://24a2.routley.io) / [cel7](https://rxi.itch.io/cel7) / [tic-80](https://tic80.com/learn) / [pq93](https://transmutrix.itch.io/pq93) / [itsy](https://github.com/mobarski/itsy)
- micro:bit / scroll:bit
- [FORTH](https://www.forth.com/starting-forth/1-forth-stacks-dictionary/)



## Why?

- `¯\_(ツ)_/¯`



## VM

The core VM has:

- only 3 instructions:
  - ALU operation
  - conditional jump
  - extension call
- 256 general-purpose registers (`r0-r255`)
- `ip` register
-  `code` memory
- extensions dictionary (`ext`)



## Quick example

assembly

```asm
def a r1
def b r2

a = 0
b = 0
loop:
    a += 1
    b += a
if a < 5 :loop 0
```

VM code (JSON):

```javascript
['r1','=',0,'r2','=',0,'(6)','r1','+=',1,'r2','+=','r1','if','r1','<',5,6,0]
```



## Installation

TODO



## Build

`python build.py [file.asm|-] [out.html] [config.toml]`

TODO



## Instructions

#### alu

`a` `op` `b`

ALU operation

operations:

- `=`

- `+=` `-=` `*=` `/=` `%=`

- `//=`

- `<<=` `>>=` `&=` `|=` `^=`

- `>` `>=` `<` `<=` `==` `!=`

- `&&` `||`

  

#### if

`if` `a` `op` `b` `addr-then` `addr-else`

Conditional jump. If `a op b` is true then the `ip` is set to `addr-then` if it is false then ip is set to `addr-else`.  If `ip` would be set to 0 with this operation it is not changed.



example use:

```assembly
r1 = 10
loop:
	(r1 -> 10 8 6 4 2)
	r1 -= 2
if r1 > 0 :loop 0
```

```assembly
if r1 == 0 :is-zero 0
	(r1 is not 0)
is-zero:
```

```assembly
if r1 == 0 0 :not-zero
	(r1 is 0)
not-zero:
```





#### extension

`ext` `...`



## Assembly



### def

`def name value`



example use:

- `def mx r1`
- `def pi 3.142`
- `def n_iters 10`



### local label

`_name:`

Local labels (starting with underscore) are only available between between two normal labels (can be reused).



example use:

```
call :aaa (logs: 111 333)
call :bbb (logs: 999 777)
halt

aaa:
	log 111
	goto :_end
	log 222
	_end:
	log 333
	return

bbb:
	log 999
	goto :_end
	log 888
	_end:
	log 777
	return
```





## Modules



### Leds

- `leds-init`

- `leds-set`  `x` `y` `color`

- `leds-get`  x y >color

- `leds-draw`

- `leds-clear`  color -> RENAME: leds-fill



##### leds-set

`leds-set`  `x`  `y`  `color`

`leds-set` `x` `y` `color`

Set color of the led at x,y to given color.



##### leds-get

`leds-get x y >c`

Get color of the led at x,y and store it in `c`.



#### configuration

- `vm.cfg.leds.width = ???`

- `vm.cfg.leds.height = ???`

- `vm.cfg.leds.size = ???`

- `vm.cfg.leds.radius = ???`



### Mouse



**mouse-frame**

Process mouse frame



**mouse-xy**

`mouse-xy >x >y`

Return mouse coordinates



**mouse-btn**

`mouse-btn >mb`

Return mouse button state:

- 0 - unpressed
- 1 - released in this frame after t < long_press_ms (short click)
- 2 - released in this frame after t >= long_press_ms (long click)
- 3 - pressed in this frame
- 4 - held, t < long_press_ms
- 5 - held, long click detected in this frame
- 6 - held, t > long_press_ms (held after long click)



#### configuration

- `vm.cfg.mouse.long_press_ms = 500`



### Screen



#### configuration

- `vm.cfg.screen.dom_id = 'vm-screen'`
- `vm.cfg.screen.height = 128`
- `vm.cfg.screen.width = 128`
- `vm.cfg.screen.scale = 1`



### Stack



#### call

`call :addr`

Call procedure at :addr.



#### return

`return`

Return from the procedure call.



#### push

`push x`

Push value onto the stack.



#### pop

`pop >x`

Pop value from the stack.



### Text



**text-new**

`text-new`

Clear the text buffer



**text-part**

`text-part` `text-id` `part`

Append text part to the text buffer



**text-val**

`text-val` `value`

Append value to the text buffer



**text-chr**

`text-chr` `char-code`

Append character to the text buffer



**text-emit**

Emit the text buffer



**text-bank**

`text-bank` `bank-id`

Switch text bank



#### configuration

- `vm.cfg.text.sep = '%%'`

- `vm.cfg.text.dom_id = 'vm-text'`



### Timer



**timer-set**

`timer-set freq addr`





