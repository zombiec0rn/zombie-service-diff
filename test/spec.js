var assert  = require('assert')
var clone   = require('clone')
var zsf     = require('@zombiec0rn/zombie-service-format')
var scale   = require('@zombiec0rn/zombie-service-scale')
var cdiff   = require('../index')

describe('cccd-diff', function() {

  it('returns an object with keep, add and remove', function() {
    var current = zsf.random(2)
    var wanted = zsf.random(1)
    wanted.push(current[0])
    var diff = cdiff(current, wanted)
    assert(typeof diff == 'object')
    assert(diff.keep.length == 1)
    assert(diff.add.length == 1)
    assert(diff.remove.length == 1)
  })

	it('works with scales', function() {
    var current = zsf.random(2)
    var wanted = zsf.random(1)
    wanted.push(current[0])
		wanted[1].scale = 5
		var upscaled = scale.up(wanted)
		var diff = cdiff(current, upscaled)
		assert(typeof diff == 'object')
		assert(diff.keep.length == 1)
		assert(diff.add.length == 5)
		assert(diff.remove.length == 1)
		var downscaled = scale.down(upscaled)
		var diff = cdiff(upscaled, downscaled)
		assert(typeof diff == 'object')
		assert(diff.keep.length == 2)
		assert(diff.add.length == 0)
		assert(diff.remove.length == 4)
	})

	it('validates input', function() {
		try { cdiff({},[]) } catch(e) {
			assert(e instanceof zsf.exception)
		}
	})

  it('looks at all the properties', function() {
    var current = zsf.random(1)
    var wanted = clone(current) 
    wanted[0].image = wanted[0].image+':1.2.3'
    var diff     = cdiff(current, wanted)
    assert(diff.add.length == 1)
    assert(diff.keep.length == 0)
    assert(diff.remove.length == 1)
  })

  it('can handle properties in random order', function() {
    var current = zsf.random(1)
    var wanted = clone(current) 
    var env = current[0].env
    delete current[0].env
    current[0].env = env
    var diff = cdiff(current, wanted)
    assert(diff.add.length == 0)
    assert(diff.keep.length == 1)
    assert(diff.remove.length == 0)
  })

  it('will obey a fingerprint property over the actual object hash', function() {
    var current = zsf.random(1)
    var wanted  = zsf.random(1)
    current[0].fingerprint = '12345'
    wanted[0].fingerprint = '12345'
    var diff = cdiff(current, wanted)
    assert(diff.add.length == 0)
    assert(diff.keep.length == 1)
    assert(diff.remove.length == 0)
  })

  it('exposes the object-hash functionality', function() {
    var service = zsf.random(1)
    var fingerprint = cdiff.fingerprint(service[0])
    assert(typeof fingerprint == 'string')
  })

})
