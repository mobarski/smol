import sys; sys.path+=['../asm']
from v1_asm import *

code = '''
    $start:
        ( xx yy zz )
    x0 = 0 ; goto :skip ; y0 = 0 ; skip:
    (a b c ) v1 += 4 ; v2 += v1 ; v2 *= 1.5 ; v3 -= v2 ; @v2 = 12 ; halt
    i = 0
    $loop:
        xi = x0 ; xi += i ; x = @xi
        yi = y0 ; yi += i ; y = @yi
        # sprite x y 1 0
        i += 1
    if i < 10 $loop

'''
tokens = tokenize(code)
labels = detect_labels(tokens)
linked = link(tokens, labels)
print(labels)
print(linked)
