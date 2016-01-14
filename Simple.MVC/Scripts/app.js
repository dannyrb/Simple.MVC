﻿
// Global namespace (name of our app)
simple = {};

function extend(base, sub) {
	// Avoid instantiating the base class just to setup inheritance
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	// for a polyfill
	// Also, do a recursive merge of two prototypes, so we don't overwrite 
	// the existing prototype, but still maintain the inheritance chain
	var origProto = sub.prototype;
	sub.prototype = Object.create(base.prototype);
	for (var key in origProto) {
		sub.prototype[key] = origProto[key];
	}
	// Remember the constructor property was set wrong, let's fix it
	sub.prototype.constructor = sub;
	// In ECMAScript5+ (all modern browsers), you can make the constructor property
	// non-enumerable if you define it like this instead
	Object.defineProperty(sub.prototype, 'constructor', {
		enumerable: false,
		value: sub
	});
}

var base = {};
var VmBase = (function () {
	var VmBase = function (data) {
		console.log(this);
		var _this = this;
		this.data = data;
		this.mapInitData(data);
		this.setupBindings();
		this.setNewItem();
		//this.WindowLocation(window.location.pathname + window.location.hash);
	};

	VmBase.prototype.setupBindings = function () { };

	VmBase.prototype.mapInitData = function (data) {
		ko.mapping.fromJS(data, data.KOMapping, this);
	};

	VmBase.prototype.setNewItem = function () {
		console.log(this.ItemDetail);
		//this.NewItemDetail = mapper.toJs(this.ItemDetail);
	};

	// setup SignIn Method 
	VmBase.prototype.SignIn = function () {
		// this == LoginForm (see base VM;; C#)
		var myForm = ko.toJS(this);
		myForm.returnUrl = "";


		// todo: loading icon...
		// todo: populate loggedInUser...
		// todo: verify loggedInUser is populated on fullpage refresh...
		// todo: verify logout...

		//var promise =
		$.ajax({
			method: "POST",
			url: "/Account/Login",
			data: myForm
		})
		.done(function (data) {
			console.log("DONE");
			console.log(data);
		})
		.fail(function (data) {
			console.log("FAIL");
			console.log(data);
		});
	};

	return VmBase;
})();



// Modules / AggregateRoots
// Function that is called to init VM for Home Route
var Home =
    (function () {
    	function Home(data) {
    		VmBase.call(this, data); // call base constructor

    		this.data = data;
    		ko.applyBindings(this);
    		$('.hideUnbound').removeClass('hideUnbound');
    	}

    	return Home;
    })(base.VmBase);
simple.Home = Home;

// Setup the prototype chain the right way
extend(VmBase, Home);