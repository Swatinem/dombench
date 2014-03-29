/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

module.exports = Custom;

function Custom(data) {
	this.data = data;
	this.el = document.createElement('div');
	this.el.className = 'testcase';
}

Custom.prototype.step1 = function Custom_step1() {
	var data = this.data.data;
	this.el.innerHTML = data.map(function (d, i) {
		return '<div class="one two' + (d.id%2 ? ' three' : '') + '" data-id="' + d.id + '">' +
		       '<span class="user" data-id="' + d.user.id + '">' + d.user.name + '</span>' +
		       '<span class="text">' + d.text + '</text></div>';
	}).join('');
};

Custom.prototype.step2 = function Custom_step2() {
	var i = this.data.data.length - 1;
	var d = this.data.data[i];
	this.el.appendChild(domify(
		'<div class="one two' + (d.id%2 ? ' three' : '') + '" data-id="' + d.id + '">' +
		'<span class="user" data-id="' + d.user.id + '">' + d.user.name + '</span>' +
		'<span class="text">' + d.text + '</text></div>'));
};

Custom.prototype.step3 = function Custom_step3() {
	var d = this.data.data[0];
	var i = -1;
	this.el.insertBefore(domify(
		'<div class="one two' + (d.id%2 ? ' three' : '') + '" data-id="' + d.id + '">' +
		'<span class="user" data-id="' + d.user.id + '">' + d.user.name + '</span>' +
		'<span class="text">' + d.text + '</text></div>'),
		this.el.firstChild);
};

Custom.prototype.step4 = function Custom_step4() {
	this.el.insertBefore(this.el.lastChild, this.el.firstChild);
};

Custom.prototype.step5 = function Custom_step5() {
	for (var i = 0; i < 500; i++) {
		this.el.removeChild(this.el.lastChild);
	}
};

Custom.prototype.step6 = function Custom_step6() {
	var frag = document.createDocumentFragment();
	for (var i = 0; i < 500; i++) {
		var d = this.data.data[i];
		frag.appendChild(domify(
			'<div class="one two' + (d.id%2 ? ' three' : '') + '" data-id="' + d.id + '">' +
			'<span class="user" data-id="' + d.user.id + '">' + d.user.name + '</span>' +
			'<span class="text">' + d.text + '</text></div>'));
	}
	this.el.insertBefore(frag, this.el.firstChild);
};

Custom.prototype.step7 = function Custom_step7() {
	var user = this.data.users[0];
	var els = this.el.querySelectorAll('.user[data-id="' + user.id + '"]');
	for (var i = 0; i < els.length; i++) {
		els[i].firstChild.data = user.name;
	}
};

function domify(str) {
	var el = document.createElement('div');
	el.innerHTML = str;
	return el.firstChild;
}
