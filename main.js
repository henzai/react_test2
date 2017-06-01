/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const fs = __webpack_require__(4);
const os = __webpack_require__(5);
const path = __webpack_require__(6);
const electron = __webpack_require__(0);
const isDev = __webpack_require__(2);

const BrowserWindow = electron.BrowserWindow;

const homedir = os.homedir();

const macos = profile => path.join(homedir, 'Library', 'Application Support', 'Google', 'Chrome', profile, 'Extensions');

const windows = profile => {
	const appData = process.env.LOCALAPPDATA || path.join(homedir, 'AppData', 'Local');
	return path.join(appData, 'Google', 'Chrome', 'User Data', profile, 'Extensions');
};

const linux = (chrome, profile) => {
	chrome = chrome || 'google-chrome';
	return path.join(homedir, '.config', chrome, profile, 'Extensions');
};

const extensionPath = (name, profile) => {
	if (process.platform === 'darwin') {
		return macos(profile);
	}

	if (process.platform === 'win32') {
		return windows(profile);
	}

	return linux(name, profile);
};

const x = module.exports = (target, opts) => {
	opts = Object.assign({
		enabled: null,
		name: 'google-chrome',
		profile: 'Default'
	}, opts);

	if (opts.enabled === false || (opts.enabled === null && !isDev)) {
		return;
	}

	if (typeof target === 'string') {
		target = {id: target};
	}

	const alredyAdded = target.name &&
		BrowserWindow.getDevToolsExtensions &&
		{}.hasOwnProperty.call(BrowserWindow.getDevToolsExtensions(), target.name);

	if (alredyAdded) {
		return;
	}

	const extension = extensionPath(opts.name, opts.profile);

	if (!opts.version || opts.version === 'latest') {
		try {
			const versions = fs.readdirSync(path.join(extension, target.id)).sort();
			opts.version = versions.pop();
		} catch (err) {
			console.warn(`Skip loading '${target.name}' because it can't be found. Please install at Chrome Web Store.`);
			return;
		}
	}

	BrowserWindow.addDevToolsExtension(path.join(extension, target.id, opts.version));
};

x.REDUX_DEVTOOLS = {
	id: 'lmhkpmbekcpmknklioeibfkpmmfibljd',
	name: 'Redux DevTools'
};

x.EMBER_INSPECTOR = {
	id: 'bmdblncegkenkacieihfhpjfppoconhi',
	name: 'Ember Inspector'
};

x.REACT_DEVELOPER_TOOLS = {
	id: 'fmkadmapgofadopljbjfkapdkoienihi',
	name: 'React Developer Tools'
};

x.BACKBONE_DEBUGGER = {
	id: 'bhljhndlimiafopmmhjlgfpnnchjjbhd',
	name: 'Backbone Debugger'
};

x.JQUERY_DEBUGGER = {
	id: 'dbhhnnnpaeobfddmlalhnehgclcmjimi',
	name: 'jQuery Debugger'
};

x.ANGULARJS_BATARANG = {
	id: 'ighdmehidhipcmcojjgiloacoafjmpfk',
	name: 'AngularJS Batarang'
};

x.VUEJS_DEVTOOLS = {
	id: 'nhdogjmejiglipccpnnnanhbledajbpd',
	name: 'Vue.js devtools'
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = __webpack_require__(0);
var loadDevtool = __webpack_require__(1);
// メインウィンドウの参照をグローバルに持っておく。
var mainWindow = null;
// すべてのウィンドウが閉じられた際の動作
electron_1.app.on('window-all-closed', function () {
    // OS X では、ウィンドウを閉じても一般的にアプリ終了はしないので除外。
    if (process.platform != 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('ready', function () {
    // 新規ウィンドウ作成
    mainWindow = new electron_1.BrowserWindow({ width: 1200, height: 800 });
    // index.htmlを開く
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
    // ウィンドウが閉じられたら、ウィンドウへの参照を破棄する。
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map