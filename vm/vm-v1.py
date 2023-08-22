# PoC of simple but universal register-based VM
# inspired by another world vm, pascal p-code machine, UXN

import re

class namespace: pass
vm = namespace()
vm.code = []
vm.stack = []
vm.mem = {}
vm.ip = 0

def is_numeric(x):
    try:
        float(x); return True
    except ValueError:
        return False

def is_pointer(x):
    return x[0] == '@'

def value_of(x):
    if is_numeric(x):
        return float(x)
    elif is_pointer(x):
        return vm.mem.get(vm.mem[x[1:]],0)
    else:
        return vm.mem.get(x,0)
    
def alu(a,op,b):
    a = value_of(a)
    b = value_of(b)
    match op:
        case '+'|'+=': return a+b
        case '-'|'-=': return a-b
        case '*'|'*=': return a*b
        case '/'|'/=': return a/b
        case '%'|'%=': return a%b
        case '&'|'&=': return a&b
        case '|'|'|=': return a|b
        case '^'|'^=': return a^b
        case '//'|'//=': return a//b
        case '<<'|'<<=': return a<<b
        case '>>'|'>>=': return a>>b
        case '<': return a<b
        case '>': return a>b
        case '<=': return a<=b
        case '>=': return a>=b
        case '==': return a==b
        case '!=': return a!=b
        case '=': return b
        case _: raise ValueError(f'unknown op {op}')


def tokenize(text):
    tokens = re.findall('[(][^)]*?[)] | ;+ | \S+',text, re.VERBOSE)
    tokens = [t for t in tokens if t[0] not in '(;'] # remove comments and semicolons
    return tokens

code = ' (a b c ) v1 += 4 ; v2 += v1 ; v2 *= 1.5 ; v3 -= v2 ; @v2 = 12 ; halt'
vm.code = tokenize(code)
print(vm.code)

def get_op():
    op = vm.code[vm.ip]
    vm.ip += 1
    return op

def run(n_iters):
    for i in range(n_iters):
        match t := get_op():
            case 'halt':
                vm.ip -= 1
                print(f'halt')
            case 'return':
                vm.ip = vm.stack.pop()
                print(f'return')
            case 'call':
                addr = get_op()
                vm.stack.append(vm.ip)
                #vm.ip = addr # TODO
                print(f'call {addr}')
            case 'goto':
                addr = get_op()
                #vm.ip = addr # TODO
                print(f'goto {addr}')
            case 'if':
                a = get_op()
                op = get_op()
                b = get_op()
                addr = get_op()
                if alu(a,op,b):
                    # vm.ip = addr # TODO
                    pass
                print(f'if {a} {op} {b} goto {addr}')
            case '#':
                op = get_op()
                ... # TODO
                print(f'extension {op}')
            case _: # ALU
                op = get_op()
                b = get_op()
                val = alu(t,op,b)
                dst = vm.mem[t[1:]] if is_pointer(t) else t
                vm.mem[dst] = val
                print(f'alu {t} {op} {b}')

run(10)
print(vm.mem)

"""
# palette 1
# background 0

n_spr = 3
spr = 0
loop:
    xi = x0 ; xi += spr ; x = @xi
    yi = y0 ; yi += spr ; y = @yi
    # sprite spr x y 1 0
    spr += 1
if spr < n_spr :loop

# pen 2
# text t1 0 0 

( # sprite spr @xi @yi 1 0 )

# push 
# pop 
# halt 


# sprite spr x0.spr y0.spr 1.0

a += 5
if a < 10 :test

if i % 1000 :skip_info
    # text t1 0 0
skip_info:

i += 1

call draw-all-sprites
# math sin=
def zzz ( :x :y :r )
    pop r1
    pop r2
    pop r3
    return 
end


"""
