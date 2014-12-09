var slerp = require('./')
var test = require('tape')
var almost = require('almost-equal')

var out, quatA, quatB, result
var vec, id, deg90

function reset() {
    quatA = [1, 2, 3, 4]
    quatB = [5, 6, 7, 8]
    out = [0, 0, 0, 0]
    vec = [1, 1, -1]
    id = [0, 0, 0, 1]
    deg90 = Math.PI / 2
}

function equalish(a, b) {
    if (a.length!==b.length) return false
    for (var i=0; i<a.length; i++)
        if (Math.abs(a[i]-b[i])>0.0001) {
            return false
        }
    return true
}

test("the normal case", function(t) {
    reset()
    result = slerp(out, [0, 0, 0, 1], [0, 1, 0, 0], 0.5)
    t.equal(result, out)
    t.ok(equalish(result, [0, 0.707106, 0, 0.707106]), 'calculate proper quat')
    t.end()
});

test("where a == b", function(t) {
    reset()
    result = slerp(out, [0, 0, 0, 1], [0, 0, 0, 1], 0.5)
    t.equal(result, out)
    t.ok(equalish(result, [0, 0, 0, 1]))
    t.end()
});

test("where a == -b", function(t) {
    reset()
    result = slerp(out, [1, 0, 0, 0], [-1, 0, 0, 0], 0.5);
    t.equal(result, out)
    t.ok(equalish(result, [1, 0, 0, 0]))
    t.end()
})