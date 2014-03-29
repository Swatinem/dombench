/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

module.exports = Data;

function Data() {
	this.data = [];
}

Data.prototype.step1 = function Data_step1() {
	"render N items, cycling through M users"
	var numUsers = this.numUsers = 10;
	var numItems = this.numItems = 1000;
	var i;
	this.users = [];
	for (i = 0; i < numUsers; i++) {
		this.users.push({id: i, name: 'user' + i});
	}
	for (i = 0; i < numItems; i++) {
		this.data.push({id: i, text: 'item' + i, user: this.users[i%numUsers]});
	}
};

Data.prototype.step2 = function Data_step2() {
	"append an item";
	var i = this.numItems;
	var numUsers = this.numUsers;
	this.data.push({id: i, text: 'item' + i, user: this.users[i%numUsers]});
};

Data.prototype.step3 = function Data_step3() {
	"prepend an item";
	var i = -1;
	var numUsers = this.numUsers;
	this.data.unshift({id: i, text: 'item' + i, user: this.users[(numUsers + i)%numUsers]});
};

Data.prototype.step4 = function Data_step4() {
	"move last to front";
	this.data.unshift(this.data.pop());
};

Data.prototype.step5 = function Data_step5() {
	"remove last N elements";
	var num = 500;
	this.removed = this.data.splice(this.data.length - num, num);
};

Data.prototype.step6 = function Data_step6() {
	"prepend the removed elements";
	this.data.unshift.apply(this.data, this.removed);
};

Data.prototype.step7 = function Data_step7() {
	"change name of one user";
	this.users[0].name = 'userX';
};

