/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

var jade = require('jade-virtualdom');

var src = [
''
];

console.log(jade(src.join('\n')).toString());
