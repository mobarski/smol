# Progress

### Next tasks

- [x] button state approach

- [ ] finish keys extension (n<=4 players + id=0 system buttons)

  - [ ] pico-8 -> [btnp](https://pico-8.fandom.com/wiki/Btnp) [btn](https://pico-8.fandom.com/wiki/Btn)
  - [ ] tic-80 -> [btnp](https://github-wiki-see.page/m/nesbox/TIC-80/wiki/btnp) [btn](https://github-wiki-see.page/m/nesbox/TIC-80/wiki/btn)

- [ ] sokoban

  

- [ ] touch = mouse

- [x] if a op b :then :else VS if a op b :then + if-not a op b :then -> :then :else STAYS

- [ ] center / title / template

- [x] split README.md into PROJECT.md

- [x] name -> smol

- [x] if-then vs if-then-else vs if+if-not

- [x] examples runnable on github (ie: https://mobarski.github.io/pages/smol/html/paint-v4.html)

- [x] CLI + file based configuration

- [ ] leds vs screen

- [ ] screen vs time vs threads (requestAnimationFrame)

- [ ] pip + github based installation

- [ ] run with "python -m xxx ..."

- [ ] open the repo

### Finished task

- [x] var -> let

  - [x] core
  - [x] mouse
  - [x] stack
  - [x] sugar
  - [x] threads

- [x] asm + build

- [x] build and run

- [x] configuration default values at the top of the module

  ```javascript
  vm.mouse = {}
  vm.mouse.delay1 = coalesce(vm.cfg.mouse.delay1, 500)
  vm.mouse.delay2 = coalesce(vm.cfg.mouse.delay2, 250)
  vm.init.push(vm_mouse_init)
  ```

- [x] extension init (new modules append their init to the list)

- [x] rename files `vm-v1-core.js` -> `vm-core-mk1.js`

- [x] init / update / draw (callbacks, hooks, events, triggers, signals, interrupts) (-set, -bind, -link, -attach)  -> single timer hook

- [x] btn state

- [x] colors vs palettes

- [x] text vs banks

  

### Extension modules

| extension             | interface    | implementation | config       | tested       | docs         | notes                            |
| --------------------- | ------------ | -------------- | ------------ | ------------ | ------------ | -------------------------------- |
| stack                 | ●●● ●        | ●●● ●          |              | ○○○ ○        | ○○○ ○        |                                  |
| colors                | ●            | ●              | ●            | ●            | ○            |                                  |
| leds                  | ●●● ●●       | ●●● ●●         | ●●● ●        | ●●● ○○       | ○○○ ○○       |                                  |
| threads (cooperative) | ●●● ●        | ●●● ●          | ●            | ●●○ ○        | ○○○ ○        | errors: -id                      |
| text                  | ●●● ●●       | ●●● ●●●        | ●●●          | ●●● ●○○      | ○○○ ○○○      | mk1 = ala 24a2<br />banks!       |
| timer                 | ●            | ●●●            |              | ●            | ○            | TODO: better delay               |
| mouse/touch           | ●●● ●        | ●●● ●●● ●●●    | ○○           | ○○○ ○        | ○○○ ○        |                                  |
| screen                |              |                | ●●●○         |              |              | pages, blit                      |
| ------------          | ------------ | ------------   | ------------ | ------------ | ------------ | ------------                     |
| random                |              |                |              |              |              |                                  |
| time                  |              |                |              |              |              |                                  |
| palettes              | ●            | ●              | ○            | ○            | ○            | embed selected palettes at build |
| pads                  |              |                |              |              |              | NES/GB style (4+2+2) x 4?        |
| keys                  |              |                |              |              |              |                                  |
| math                  |              |                |              |              |              |                                  |
| rom                   |              |                |              |              |              |                                  |
| ram                   |              |                |              |              |              |                                  |
| draw                  |              |                |              |              |              |                                  |
| sprites               |              |                |              |              |              |                                  |
| particles             |              |                |              |              |              |                                  |
| sound                 |              |                |              |              |              |                                  |
| font                  |              |                |              |              |              |                                  |
| music                 |              |                |              |              |              |                                  |
| micro:bit             |              |                |              |              |              |                                  |



### Assembly

- [x] basic tokenization
- [x] comments
- [x] global labels
- [x] local labels
- [x] basic CLI
- [x] variables / aliases
- [ ] better tokenization (whitespace not required)
- [ ] minification / obfuscation
- [x] decision: no macros (to much for being "smol"?)

### Linker

- [x] extensions
- [x] configuration
- [x] call assembly
- [x] produce js
- [x] produce html
- [x] basic CLI



### Compilation

- **v1.py**: python -> js (interpreted), requires whitespace between tokens
- **v1.js**: js -> js (interpreted), requires whitespace between tokens
- **v1.xx**: compiled_language -> js (interpreted), requires whitespace between tokens
- **v2.py**: python -> another language (js, c, go)



## Examples

### paint

- v4 - palette in the first row
- v5 - modal palette 



### sand

- v1



