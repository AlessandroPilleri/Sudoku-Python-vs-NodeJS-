const fs = require('fs')

var filename

process.argv.forEach(function (val, index, array) {
  if (array.length < 1) {
    console.log("Missing argument")
    process.exit(1)
  }

  filename = array[2]
})


content = fs.readFileSync(filename)
data = JSON.parse(content)

function print_sudoku() {
  for (var y = 0; y < 9; y++) {
    for (var x = 0; x < 9; x++) {
      process.stdout.write(data[y * 9 + x] + ((x == 2 || x == 5) ? " " : ""))
    }
      console.log((y == 2 || y == 5) ? "\n" : "")
  }
}

  function solve(i) {
    if (i >= 9*9) {
      return true
    }
    if (data[i] != 0) {
      return solve(i + 1)
    }

    for (var n = 1; n < 10; n++) {
      if (check(i, n)) {
        data[i] = n
        if (solve(i + 1)) {
          return true
        }
      }
    }

    data[i] = 0
    return false
  }

function check(i, n) {
  return (check_row(i, n) && check_col(i, n) && check_block(i, n))
}

function check_row(i, n) {
  x = i % 9
  for (var y = 0; y < 9; y++) {
    if (data[y * 9 + x] == n) {
      return false
    }
  }
  return true
}

function check_col(i, n) {
  y = Math.floor(i / 9)
  for (var x = 0; x < 9; x++) {
    if (data[y * 9 + x] == n) {
      return false
    }
  }
  return true
}

function check_block(i, n) {
  ix = Math.floor((i % 9) / 3)
  iy = Math.floor(Math.floor((i / 9)) / 3)

  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      bx = ix * 3 + x
      by = iy * 3 + y
      bi = by * 9 + bx
      if (data[bi] == n) {
        return false
      }
    }
  }
  return true
}

console.log(solve(0))
print_sudoku()
