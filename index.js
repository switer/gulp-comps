'use strict'

var gutil = require('gulp-util')
var es = require('event-stream')
var path = require('path')
var PLUGIN_NAME = require('./package.json').name
var PluginError = gutil.PluginError
var colors = gutil.colors
var comps = require('comps')
var _ = require('underscore')

function CompsStream(opts, c, transform) {
	var _comps = c || comps
	return es.map(function (tpl, cb) {
		if (tpl.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Stream is not supported for template!'))
            return cb(null, tpl)
        }
        if (tpl.isNull()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Template should not be null!'))
            return cb(null, tpl)
        }
        var basename = path.basename(tpl.path)
        var template = tpl.contents.toString()
        if (transform) {
            template = transform(template, basename, tpl)
        }
        var result = _comps(_.extend({}, opts, {
        	template: template,
        	context: path.dirname(tpl.path)
        }))

        tpl.contents = new Buffer(result)

        gutil.log(
            PLUGIN_NAME + ': ' + colors.yellow('✔') + ' Compiled ' + colors.blue(basename)
        )
        cb(null, tpl)
	})
}
module.exports = CompsStream