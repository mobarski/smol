
part_to_filename = {
    'config': 'vm-v1-config.js',
    'core':   'vm-v1-core.js',
    'sugar':  'vm-v1-sugar.js',
    'stack':  'vm-v1-stack.js',
    'colors': 'vm-v1-colors.js',
    'leds':   'vm-v1-leds.js',
    'mouse':  'vm-v1-mouse.js',
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

def vm_as_js(config, code):
    out = []
    js = config_as_js(config)
    out.append(js)
    parts = config['core.parts']
    for p in parts:
        fn = part_to_filename[p]
        js = open(fn).read()
        out.append(js)
    out.append('vm.code = ' + code_as_str(code))
    # TODO: vm_run(xxx)
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
    'core.parts': ['core', 'sugar','colors','leds','mouse'],
    #
    'leds.width': 17,
    'leds.height': 7,
    'leds.size': 32,
    'leds.radius': 15,
}

code = [
    'leds-init',
    'mouse-init',
    'leds-clear',0,
    'leds-set',1,1,1,
    'leds-set',1,2,2,
    'leds-set',1,3,3,
    'leds-draw',
    'halt'
]

js = vm_as_js(config, code)
html = js_and_html(js)
open('smol-reg-vm.html', 'w').write(html)
