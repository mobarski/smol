threads-set 1 :t1
threads-set 2 :t2
threads-next
threads-next
log 333
halt

t1:
	log 111
	(threads-id 11)
	log r11
	threads-next
	goto :t1

t2:
	log 222
	(threads-id 22)
	log r22
	threads-next
	goto :t2
