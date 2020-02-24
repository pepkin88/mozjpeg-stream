var fs = require('fs')
var path = require('path')
var test = require('tape')
var concat = require('concat-stream')
var mozjpeg = require('../index.js')
var bufferEqual = require('buffer-equal')

test('Does it blend?', function (t) {
  t.plan(1)
  fs.createReadStream(path.join(__dirname, 'flying-pug.jpg'))
    .pipe(mozjpeg())
    .pipe(concat(function (actual) {
      var expected = fs.readFileSync(path.join(__dirname, 'flying-pug.q75.jpg'))
      t.ok(bufferEqual(actual, expected), 'The Buffers! Do they match?')
    }))
})

test('Will it compress further?', function (t) {
  t.plan(1)
  fs.createReadStream(path.join(__dirname, 'flying-pug.jpg'))
    .pipe(mozjpeg({ quality: 50 }))
    .pipe(concat(function (actual) {
      var expected = fs.readFileSync(path.join(__dirname, 'flying-pug.q50.jpg'))
      t.ok(bufferEqual(actual, expected), 'The Buffers! Do they match at this lo lo quality?')
    }))
})

test('Can it args?', function (t) {
  t.plan(1)
  fs.createReadStream(path.join(__dirname, 'flying-pug.jpg'))
    .pipe(mozjpeg({ quality: 50, args: '-baseline' }))
    .pipe(concat(function (actual) {
      var expected = fs.readFileSync(path.join(__dirname, 'flying-pug.q50.baseline.jpg'))
      t.ok(bufferEqual(actual, expected), 'The Buffers! Do they match with baseline quality?')
    }))
})
