import sys
in_it = sys.stdin.readline
out_it = sys.stdout.write

num = int(in_it())
if num > 100:
    out_it("up")
else:
    out_it("down")