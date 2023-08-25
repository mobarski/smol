
part_to_filename = {
    'config':  'vm-config-mk1.js',
    'core':    'vm-core-mk1.js',
    'sugar':   'vm-sugar-mk1.js',
    'stack':   'vm-stack-mk1.js',
    'colors':  'vm-colors-mk1.js',
    'leds':    'vm-leds-mk1.js',
    'mouse':   'vm-mouse-mk1.js',
    'threads': 'vm-threads-mk1.js',
    'text':    'vm-text-mk1.js',
}

def config_as_js(config):
    parts = config['core.parts']
    js = [
        'vm = {}',
        'vm.cfg = {}',
    ]
    for p in parts:
        js.append(f'vm.cfg.{p} = {{}}')
    for k,v in config.items():
        js.append(f'vm.cfg.{k} = {v}')
    return '\n'.join(js)

def vm_as_js(config, code, run=0):
    out = []
    js = config_as_js(config)
    out.append(js)
    parts = config['core.parts']
    for p in parts:
        fn = part_to_filename[p]
        js = open(fn).read()
        out.append(js)
    out.append('vm.code = ' + code_as_str(code))
    out.append('vm_init()')
    if run:
        out.append(f'vm_run({run})')
    return '\n'.join(out)

def js_and_html(js):
    html = []
    html.append('<html></html>')
    html.append('<script>')
    html.append(js)
    html.append('</script>')
    return '\n'.join(html)

def code_as_str(code):
    return repr(code).replace(', ',',')

# =================================================================

config = {
    'core.registers': 256,
    'core.parts': ['core', 'sugar','colors','leds','mouse','threads','text'],
    #
    'leds.width': 17,
    'leds.height': 7,
    'leds.size': 32,
    'leds.radius': 15,
    #
    'colors.data': [
        '#211e20',
        '#555568',
        '#a0a08b',
        '#e9efec',
    ]
}

code = [
    'leds-clear',3,
    'r1','=',1,
    'leds-set','r1',1,2,
    'leds-set','r1',2,1,
    'leds-set','r1',3,0,
    'leds-set','r1',4,1,
    'leds-set','r1',5,2,
    'r1','+=',1,
    'if','r1','<',16,5,
    'leds-draw',
    'halt'
]

code = ['threads-set',1,11,'threads-set',2,17,'threads-next','threads-next','log',333,'halt','nop','log',111,'threads-next','goto',11,'nop','log',222,'threads-next','goto',17]
code = ['threads-set',1,11,'threads-set',2,21,'threads-next','threads-next','log',333,'halt','nop','log',111,'threads-id',11,'log','r11','threads-next','goto',11,'nop','log',222,'threads-id',22,'log','r22','threads-next','goto',21]
code = ['threads-set',1,11,'threads-set',2,19,'threads-next','threads-next','log',333,'halt','nop','log',111,'threads-id',5,'threads-next','goto',11,'nop','log',222,'threads-id',6,'threads-next','goto',19]
code = ['threads-set',1,11,'threads-set',2,19,'threads-next','threads-next','log',333,'halt','nop','log',111,'log','r11','threads-next','goto',11,'nop','log',222,'log','r22','threads-next','goto',19]

js = vm_as_js(config, code, run=0)
html = js_and_html(js)
open('smol-reg-vm.html', 'w').write(html)
