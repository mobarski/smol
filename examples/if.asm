r1 = 5
loop:
    log r1
    r1 -= 1
if r1 > 0 :loop :end
log 123
end:
log 321

if 1 > 0 :aa 0
log 222
aa:
log 111

if 1 > 0 0 :cc
log 333
cc:
log 444

halt
