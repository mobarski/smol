
part_to_filename = {
    'config':  'vm-v1-config.js',
    'core':    'vm-v1-core.js',
    'sugar':   'vm-v1-sugar.js',
    'stack':   'vm-v1-stack.js',
    'colors':  'vm-v1-colors.js',
    'leds':    'vm-v1-leds.js',
    'mouse':   'vm-v1-mouse.js',
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

js = vm_as_js(config, code, run=200)
html = js_and_html(js)
open('smol-reg-vm.html', 'w').write(html)
