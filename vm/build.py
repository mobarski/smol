import os
import toml
import json

ROOT = os.path.dirname(os.path.realpath(__file__))

part_to_filename = {
    'config':  'vm-config-mk1.js',
    'core':    'vm-core-mk1.js',
    'sugar':   'vm-sugar-mk1.js',
    'stack':   'vm-stack-mk1.js',
    'colors':  'vm-colors-mk1.js',
    'leds':    'vm-leds-mk1.js',
    'mouse':   'vm-mouse-mk2.js',
    'keys':    'vm-keys-mk2.js',
    'threads': 'vm-threads-mk1.js',
    'text':    'vm-text-mk1.js',
    'timer':   'vm-timer-mk1.js',
    'rom':     'vm-rom-mk1.js',
    'tape':    'vm-tape-mk1.js',
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

def vm_as_js(config, code, run=False):
    out = []
    js = config_as_js(config)
    out.append(js)
    parts = config['core.parts']
    for p in parts:
        fn = part_to_filename[p]
        js = open(ROOT+'/'+fn).read()
        out.append(js)
    out.append('vm.code = ' + code_as_str(code))
    out.append('vm_init()')
    if run or run==0:
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

def print_code(code):
    print('\nCODE:')
    for i in range(0,len(code),10):
        print(f'{i:03}', code[i:i+10])

# =================================================================

import sys; sys.path.append('../asm')
import v1_asm as asm

def build(path_in, path_out=None, path_cfg=None):
    if not path_cfg or not os.path.exists(path_cfg):
        path_cfg = ROOT+'/config.toml'
    cfg = toml.load(open(path_cfg))
    print('\nCONFIG:\n', cfg) # XXX
    path_out = path_out or 'out.html'
    if path_in=='-':
        text = sys.stdin.read()
    else:
        text = open(path_in).read()
    code = asm.text_to_code(text)
    print_code(code)

    js = vm_as_js(cfg, code, run=0)
    html = js_and_html(js)
    open(path_out, 'w').write(html)

# =================================================================

if __name__=="__main__":
    argv = dict(enumerate(sys.argv))
    print('argv', argv)
    path_in  = argv.get(1, '')
    path_out = argv.get(2, '')
    path_cfg = argv.get(3, '')
    if path_in:
        build(path_in, path_out, path_cfg)
    else:
        print('Usage: python build.py [file.asm|-] [out.html] [config.toml]')

