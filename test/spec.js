var assert  = require('assert')
var cccf    = require('cccf')
var example = require('cccf/example.json')
var cs      = require('cccf-scale')
var clone   = require('clone')
var cdiff   = require('../index')

var current = [
	clone(example),
	clone(example)
]
var wanted  = [
	clone(example),
	clone(example)
]
current[1].id = 'remove'
wanted[1].id = 'new'

describe('cccd-diff', function() {

	it('returns an object with keep, add and remove', function() {
		var diff = cdiff(current, wanted)
		assert(typeof diff == 'object')
		assert(diff.keep.length == 1)
		assert(diff.add.length == 1)
		assert(diff.remove.length == 1)
	})

	it('works with scales', function() {
		var _wanted = clone(wanted)
		_wanted[1].scale = 5
		var upscaled = cs.up(_wanted)
		var diff = cdiff(current, upscaled)
		assert(typeof diff == 'object')
		assert(diff.keep.length == 1)
		assert(diff.add.length == 5)
		assert(diff.remove.length == 1)
		var downscaled = cs.down(upscaled)
		var diff = cdiff(upscaled, downscaled)
		assert(typeof diff == 'object')
		assert(diff.keep.length == 2)
		assert(diff.add.length == 0)
		assert(diff.remove.length == 4)
	})

	it('validates input', function() {
		try { cdiff({},[]) } catch(e) {
			assert(e instanceof cccf.exception)
		}
	})

    it('looks at all the properties', function() {
        var _current = [clone(example)]
        var _wanted  = [clone(example)]; _wanted[0].image = _wanted[0].image+':1.2.3'
        var diff     = cdiff(_current, _wanted)
        assert(diff.add.length == 1)
        assert(diff.keep.length == 0)
        assert(diff.remove.length == 1)
    })

    it('can handle properties in random order', function() {
        var _current = [clone(example)]
        var _wanted  = [clone(example)]
        var env = _current[0].env
        delete _current[0].env
        _current[0].env = env
        var diff = cdiff(_current, _wanted)
        assert(diff.add.length == 0)
        assert(diff.keep.length == 1)
        assert(diff.remove.length == 0)
    })

})
