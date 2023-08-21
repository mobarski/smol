r0 = 10
r1 = 0
_loop:
	r2 = r0
	r2 += r1
	@r2 = r1
	r1 += 1	
if r1 < 5 :_loop
# halt

