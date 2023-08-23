# Idea

- Simple register-based VM that can be easily extended
- Simple assembly code that reads more like higher level language
- VM extensions that do the heavy-lifting AND act as facades AND adapters



# Inspirations

- [Another World VM](https://fabiensanglard.net/anotherWorld_code_review/) ([polygons](https://fabiensanglard.net/another_world_polygons/))
- [p-code machine](https://en.wikipedia.org/wiki/P-code_machine)
- [UXN](https://100r.co/site/uxn.html)
- [pico-8](https://www.lexaloffle.com/dl/docs/pico-8_manual.html) / [tic-80](https://tic80.com/learn) / [24a2](https://24a2.routley.io) / [cel7](https://rxi.itch.io/cel7)



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



# Progress



### Extensions

| extension             | interface | implementation | config | test  | example | docs  | other |
| --------------------- | --------- | -------------- | ------ | ----- | ------- | ----- | ----- |
| stack                 | ●●●●      | ●●●●           |        | ○○○○  | ○○○○    | ○○○○  |       |
| leds                  | ●●●●●     | ●●●●●          | ●●●●   | ●●●○○ | ○○○○○   | ○○○○○ |       |
| colors                | ○         | ●              | ?      | ○     | ○       | ○     |       |
| palettes              | ●         | ●              | ○      | ○     | ○       | ○     | ○     |
| screen                |           |                |        |       |         |       |       |
| mouse/touch           | ●○○○○○ ○○ | ●○○○○○ ○○      |        |       |         |       |       |
| keys                  |           |                |        |       |         |       |       |
| time                  |           |                |        |       |         |       |       |
| random                |           |                |        |       |         |       |       |
| math                  |           |                |        |       |         |       |       |
| threads (cooperative) |           |                |        |       |         |       |       |
| font                  |           |                |        |       |         |       |       |
| text                  |           |                |        |       |         |       |       |
| rom                   |           |                |        |       |         |       |       |
| ram                   |           |                |        |       |         |       |       |
| touch                 |           |                |        |       |         |       |       |
| sprites               |           |                |        |       |         |       |       |
| particles             |           |                |        |       |         |       |       |
| sound                 |           |                |        |       |         |       |       |
| music                 |           |                |        |       |         |       |       |
| micro:bit             |           |                |        |       |         |       |       |



### Compilation

- **v1.py**: python -> js (interpreted), requires whitespace between tokens
- **v1.js**: js -> js (interpreted), requires whitespace between tokens
- **v1.xx**: compiled_language -> js (interpreted), requires whitespace between tokens
- ???: ... -> js (bytecode)
- ???: ... -> static language (interpreted)
- ???: ... -> static language (bytecode)

