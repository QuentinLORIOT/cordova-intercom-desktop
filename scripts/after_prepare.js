#!/usr/bin/env node
'use strict';

var fs = require('fs');

var getPreferenceValue = function(config, name) {
    var value = config.match(new RegExp('name="' + name + '" value="(.*?)"', "i"))
    if(value && value[1]) {
        return value[1]
    } else {
        return null
    }
}

var config = fs.readFileSync("config.xml").toString()
var APP_ID = getPreferenceValue(config, "intercom-app-id")

var files = [
    "platforms/browser/www/plugins/cordova-plugin-intercom/src/browser/intercom-browser.js",
    "platforms/browser/platform_www/plugins/cordova-plugin-intercom/src/browser/intercom-browser"
]

for(var i in files) {
    try {
    	var contents = fs.readFileSync(files[i]).toString()
	    fs.writeFileSync(files[i], contents.replace(/APP_ID/g, APP_ID))
	} catch(err) {}
}
