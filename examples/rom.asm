def a r1

rom-get 3 >a , log a
rom-get 2 >a , log a

rom-bank 1

rom-get 1 >a , log a
rom-get 0 >a , log a

rom-bank 0

rom-get 1 >a , log a
rom-get 0 >a , log a

halt
