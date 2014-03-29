/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

module.exports = Angular;

function Angular(data) {
	this.data = data;
	this.el = document.createElement('div');
	this.el.className = 'testcase';
	this.el.innerHTML = '' +
		'<div ng-repeat="d in data" class="one two" ng-class="{three: d.id%2}" data-id="{{d.id}}">' +
		'<span class="user" data-id="{{d.user.id}}">{{d.user.name}}</span>' +
		'<span class="text">{{d.text}}</text></div>';
	angular.module('app', []);
	angular.bootstrap(this.el, ['app']);
	this.scope = angular.element(this.el).scope();
}

Angular.prototype.stepN = function Angular_step() {
	this.scope.data = this.data.data;
	this.scope.$apply();
};
