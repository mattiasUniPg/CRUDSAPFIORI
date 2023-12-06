/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"z_academy/crudoperator/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
