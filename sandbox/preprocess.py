import sys; sys.path+=['../asm']
import v1_asm as asm

code = '''
def a 2
def b r1
def c r2

b += a
c += @b
zzz >a
zzz >b
zzz >c
'''

tokens = asm.tokenize(code)
tokens2 = asm.preprocess(tokens)

print('tokens:', tokens)
print('tokens2:', tokens2)
