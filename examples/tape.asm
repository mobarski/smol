def a r1

tape-read >a , log a
tape-read >a , log a

tape-select 1

tape-read >a , log a
tape-read >a , log a

tape-select 0

tape-read >a , log a
tape-read >a , log a

tape-seek 1 0
tape-read >a , log a
tape-read >a , log a

tape-seek -2 1
tape-read >a , log a
tape-read >a , log a

tape-select 2
tape-write 11
tape-write 22
tape-write 33

tape-seek 0 0
tape-read >a , log a
tape-read >a , log a
tape-read >a , log a

tape-seek 0 0
tape-write 111
tape-seek 0 0
tape-read >a , log a

tape-select 0
tape-select 2
tape-tell >a , log a

tape-select 1
tape-len >a , log a
tape-select 2
tape-len >a , log a
tape-select 3
tape-len >a , log a

halt
