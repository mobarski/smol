def else 0
def a r1
def x r2

x = 6
a = 2 if x > 5 :| else a = 3 |:
log a
assert a == 2

x = 1
a = 2 if x > 5 :| else a = 3 |:
log a
assert a == 3

halt
