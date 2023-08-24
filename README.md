# Idea

- Simple register-based VM that can be easily extended (highly modular)
- Simple assembly code that reads more like higher level language
- VM extensions that do the heavy-lifting AND act as facades AND adapters
- Everything compiled into a single file



# Inspirations

- [Another World VM](https://fabiensanglard.net/anotherWorld_code_review/) ([polygons](https://fabiensanglard.net/another_world_polygons/))
- [p-code machine](https://en.wikipedia.org/wiki/P-code_machine)
- [UXN](https://100r.co/site/uxn.html)
- [pico-8](https://www.lexaloffle.com/dl/docs/pico-8_manual.html) / [24a2](https://24a2.routley.io) / [cel7](https://rxi.itch.io/cel7) / [tic-80](https://tic80.com/learn) / [pq93](https://transmutrix.itch.io/pq93) / [itsy](https://github.com/mobarski/itsy)
- micro:bit / scroll:bit
- [FORTH](https://www.forth.com/starting-forth/1-forth-stacks-dictionary/)



# Why?

- `¯\_ (ツ)_/¯`



# VM

The core VM has:

- only 3 instructions:
  - conditional jump
  - ALU operation
  - extension call
- 256 general-purpose registers (`r0-r255`)
- `ip` register
-  `code` memory
- extensions dictionary (`ext`)



# Quick example

```asm
r1 = 0
r2 = 0
loop:
    r1 += 1
    r2 += r1
if r1 < 5 :loop
```



# Modules

## Leds

- `leds-init`

- `leds-set`  `x` `y` `color`

- `leds-get`  x y >color

- `leds-draw`

- `leds-clear`  color -> RENAME: leds-fill



##### leds-set

`leds-set  x  y  color`

`leds-set  x y color`

`leds-set`  `x`  `y`  `color`

`leds-set` `x` `y` `color`

Set color of the led at x,y to given color.



##### leds-get

`leds-get x y >c`

Get color of the led at x,y and store it in `c`.





## 



## Mouse

**mouse-xy**

`mouse-xy >x >y`



**mouse-btn**

`mouse-btn >s`



**button state (TODO)**

| Value | Description                                                  |
| ----- | ------------------------------------------------------------ |
| 0     | unpressed                                                    |
| 1     | pressed in this frame OR at delay1 OR every delay2 after delay1 |
| 2     | pressed, time of press >1 and <delay                         |
| 3     | pressed, time of press == delay1                             |
| 4     | pressed, time of press >delay1                               |
|       |                                                              |
|       | released in this frame                                       |
|       | released in this frame after <delay1                         |
|       | released in this frame after >=delay1                        |



# Progress

### Next tasks

- [x] configuration default values at the top of the module

  ```javascript
  vm.mouse = {}
  vm.mouse.delay1 = coalesce(vm.cfg.mouse.delay1, 500)
  vm.mouse.delay2 = coalesce(vm.cfg.mouse.delay2, 250)
  vm.init.push(vm_mouse_init)
  ```

- [x] extension init (new modules append their init to the list)

- rename files `vm-v1-core.js` -> `vm-core-mk1.js`

- leds vs screen

- btn state

- init / update / draw

- var -> let

- colors vs palettes

- [x] text vs banks

- screen vs time vs threads (requestAnimationFrame)

  

### Extension modules

| extension             | interface | implementation | config | tests   | docs    | notes                            |
| --------------------- | --------- | -------------- | ------ | ------- | ------- | -------------------------------- |
| stack                 | ●●● ●     | ●●● ●          |        | ○○○ ○   | ○○○ ○   |                                  |
| leds                  | ●●● ●●    | ●●● ●●         | ●●● ●  | ●●● ○○  | ○○○ ○○  |                                  |
| colors                | ●         | ●              | ●      | ●       | ○       |                                  |
| screen                |           |                |        |         |         | pages, blit                      |
| mouse/touch           | ●●● ●     | ●○○ ○          | ○○     | ○○○ ○   | ○○○ ○   |                                  |
| threads (cooperative) | ●●● ●○    | ●●● ●○         | ●      | ○○○ ○○  | ○○○ ○○  | run!                             |
| text                  | ●●● ●●    | ●●● ●●●        | ●●●    | ●●● ●○○ | ○○○ ○○○ | mk1 = ala 24a2<br />banks!       |
| ----------------      |           |                |        |         |         |                                  |
| random                |           |                |        |         |         |                                  |
| time                  |           |                |        |         |         |                                  |
| palettes              | ●         | ●              | ○      | ○       | ○       | embed selected palettes at build |
| pads                  |           |                |        |         |         | NES/GB style (4+2+2) x 4?        |
| keys                  |           |                |        |         |         |                                  |
| math                  |           |                |        |         |         |                                  |
| rom                   |           |                |        |         |         |                                  |
| ram                   |           |                |        |         |         |                                  |
| draw                  |           |                |        |         |         |                                  |
| sprites               |           |                |        |         |         |                                  |
| particles             |           |                |        |         |         |                                  |
| sound                 |           |                |        |         |         |                                  |
| font                  |           |                |        |         |         |                                  |
| music                 |           |                |        |         |         |                                  |
| micro:bit             |           |                |        |         |         |                                  |



### Compilation

- **v1.py**: python -> js (interpreted), requires whitespace between tokens
- **v1.js**: js -> js (interpreted), requires whitespace between tokens
- **v1.xx**: compiled_language -> js (interpreted), requires whitespace between tokens
- **v2.py**: python -> another language (js, c, go)

