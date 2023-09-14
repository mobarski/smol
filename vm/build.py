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


def vm_as_js(config):
    out = []
    parts = config['core.parts']
    for p in parts:
        fn = part_to_filename[p]
        js = open(ROOT+'/'+fn).read()
        out.append(js)
    return '\n'.join(out)

def code_as_js(code, run=False):
    out = []
    out.append('vm.code = ' + code_as_str(code))
    out.append('vm_init()')
    if run or run==0:
        out.append(f'vm_run({run})')
    return '\n'.join(out)


def js_and_html(js1, js2, js3):
    html = []
    html.append('<html></html>')
    html.extend(['<script>',js1,'</script>'])
    if js2:
        html.extend(['<script>',js2,'</script>'])
    else:
        html.append('<script src="smol.js"></script>') # XXX
    html.extend(['<script>',js3,'</script>'])
    return '\n'.join(html)

def code_as_str(code):
    return repr(code).replace(', ',',')

def print_code(code):
    print('\nCODE:')
    for i in range(0,len(code),10):
        line = code[i:i+10]
        line = ' '.join([str(x) for x in line]) # XXX
        print(f'{i:03}', line)

# =================================================================

import sys; sys.path.append('../asm')
import v1_asm as asm

def build(path_in, path_out=None, path_cfg=None):
    if not path_cfg or not os.path.exists(path_cfg):
        path_cfg = ROOT+'/config.toml'
        print('WARNING: using default config.toml')
    cfg = toml.load(open(path_cfg))
    print('\nCONFIG:\n', cfg) # XXX
    path_out = path_out or 'out.html'
    if path_in=='-':
        text = sys.stdin.read()
    else:
        text = open(path_in).read()
    code = asm.text_to_code(text)
    print_code(code)

    config_js = config_as_js(cfg)
    vm_js = vm_as_js(cfg)
    code_js = code_as_js(code, run=0)
    if 1 :
        html = js_and_html(config_js, vm_js, code_js)
    else:
        open('smol.js','w').write(vm_js) # XXX
        html = js_and_html(config_js, None, code_js) # XXX
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

