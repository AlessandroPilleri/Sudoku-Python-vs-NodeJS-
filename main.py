import sys
import json

if len(sys.argv) < 1:
    print("Missing argument")
    exit(1)

filename = sys.argv[1]

with open(filename, "rt") as t:
    data = json.load(t)

def print_sudoku():
    for y in range(0, 9):
        for x in range(0, 9):
            sys.stdout.write(str(data[y * 9 + x]) + (" " if x == 2 or x == 5 else ""))
        print("\n" if y == 2 or y == 5 else "")

def solve(i):
    if i >= 9*9: return True
    if data[i] != 0: return solve(i + 1)

    for n in range(1, 10):
        if check(i, n):
            data[i] = n
            if solve(i + 1): return True

    data[i] = 0
    return False

def check(i, n):
    return check_row(i, n) and check_col(i, n) and check_block(i, n)

def check_row(i, n):
    x = i % 9
    for y in range(0, 9):
        if data[y * 9 + x] == n: return False
    return True

def check_col(i, n):
    y = i // 9
    for x in range(0, 9):
        if data[y * 9 + x] == n: return False
    return True

def check_block(i, n):
    ix = (i % 9) // 3
    iy = (i // 9) // 3

    for x in range(0, 3):
        for y in range(0, 3):
            bx = ix * 3 + x
            by = iy * 3 + y
            bi = by * 9 + bx
            if data[bi] == n: return False
    return True

print(solve(0))
print_sudoku()
