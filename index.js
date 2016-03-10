var zsf = require('@zombiec0rn/zombie-service-format')

var unify     = function(config)    { return (config instanceof Array) ? config : [config] }
var uid       = function(container) { return JSON.stringify(container).split('').sort().join('') } // Why not just hash it?

module.exports = function(current, wanted) {
	var _current = zsf.validate(unify(current)).map(uid)
	var _wanted  = zsf.validate(unify(wanted)).map(uid)

	var keep   = wanted.filter(function(container)  { return _current.indexOf(uid(container)) >= 0 }) // keep   - in wanted & current
    var _keep  = keep.map(uid)
	var add    = wanted.filter(function(container)  { return _keep.indexOf(uid(container)) < 0 })     // add    - in wanted & not in keep
	var remove = current.filter(function(container) { return _keep.indexOf(uid(container)) < 0 })     // remove - in current & not in keep

	return {
		add : add,
		keep : keep,
		remove : remove
	}
}
