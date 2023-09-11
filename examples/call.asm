log 0
call :ccc
log 1
call :bbb
log 2
call :aaa

log 3
call $zzz
log 4
call $yyy
log 5
call $xxx

halt


aaa: log 111 return
bbb: log 222 return
ccc: log 333 return

$xxx: log 444 return
$yyy: log 555 return
$zzz: log 666 return

