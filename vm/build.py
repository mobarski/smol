
part_to_filename = {
    'config': 'vm-v1-config.js',
    'core':   'vm-v1-core.js',
    'sugar':  'vm-v1-sugar.js',
    'stack':  'vm-v1-stack.js',
    'colors': 'vm-v1-colors.js',
    'leds':   'vm-v1-leds.js',
}

def config_as_js(parts, config):
    js = [
        'vm = {}',
        'vm.cfg = {}',
    ]
    for p in parts:
        js.append(f'vm.cfg.{p} = {{}}')
    for k,v in config.items():
        js.append(f'vm.cfg.{k} = {v}')
    return '\n'.join(js)

def vm_as_js(parts, config):
    out = []
    js = config_as_js(parts, config)
    out.append(js)
    for p in parts:
        fn = part_to_filename[p]
        js = open(fn).read()
        out.append(js)
    return '\n'.join(out)

def js_and_html(js, code=['halt']):
    html = []
    html.append('<html></html>')
    html.append('<script>')
    html.append(js)
    html.append('vm.code = ' + code_as_str(code))
    # TODO: vm_run(xxx)
    html.append('</script>')
    return '\n'.join(html)

def code_as_str(code):
    return repr(code).replace(', ',',')

# =================================================================

config = {
    'core.registers': 256,
    'leds.width': 17,
    'leds.height': 7,
    'leds.size': 32,
    'leds.radius': 15,
}

code = [
    'leds-init',
    'leds-clear',0,
    'leds-set',1,1,1,
    'leds-set',1,2,2,
    'leds-set',1,3,3,
    'leds-draw',
    'halt'
]

parts = ['core', 'sugar','colors','leds']
js = vm_as_js(parts, config)
html = js_and_html(js, code)
open('smol-reg-vm.html', 'w').write(html)
