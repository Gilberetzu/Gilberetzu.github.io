/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var game_engine_1 = __webpack_require__(1);
	var np = new game_engine_1.GEngine('juego');
	var pla = new np.player(0, 0);
	document.addEventListener("keydown", function () {
	    np.keyControld(event, pla);
	});
	document.addEventListener("keyup", function () {
	    np.keyControlu(event, pla);
	});
	var world = np.worldC(pla);
	pla.type = "player";
	pla.cX = 0;
	pla.cY = 0;
	pla.state = "ground";
	var startG = function () {
	    np.clear();
	    np.mLR(pla);
	    np.mU(pla);
	    np.limitScreen(pla);
	    np.worldRenderer(world, pla);
	    world.map(function (world) { return np.limits(world, pla); });
	    world.map(function (world) { return np.render(world, pla); });
	    np.renderP(pla);
	    setTimeout(function () { return requestAnimationFrame(startG); }, 1000 / 60);
	};
	startG();
	var atrass = function () {
	    window.location.replace("index.html");
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var GEngine = (function () {
	    function GEngine(cID) {
	        this.sc = 1 / 2;
	        this.S = 20;
	        this.pasto = new Image();
	        this.playerSprite = new Image();
	        this.aire = new Image();
	        this.flag = 0;
	        this.CV = document.getElementById(cID);
	        this.context = this.CV.getContext('2d');
	        this.width = window.innerWidth - 50;
	        this.height = window.innerHeight - 50;
	        this.centerx = this.width / 2;
	        this.centery = this.height / 2;
	        this.pasto.src = './img/pasto.png';
	        this.playerSprite.src = './img/hongo.png';
	        this.aire.src = './img/aire.png';
	        this.CV.setAttribute("width", this.width);
	        this.CV.setAttribute("height", this.height);
	    }
	    GEngine.prototype.atrass = function () {
	        window.location.replace("index.html");
	    };
	    GEngine.prototype.findAngle = function (X2, Y2, X1, Y1) {
	        if ((X2 >= X1) && (Y2 <= Y1)) {
	            return Math.atan((Y1 - Y2) / (X2 - X1));
	        }
	        else if ((X2 <= X1) && (Y2 <= Y1)) {
	            return Math.atan((X1 - X2) / (Y1 - Y2)) + Math.PI / 2;
	        }
	        else if ((X2 <= X1) && (Y2 >= Y1)) {
	            return Math.atan((Y2 - Y1) / (X1 - X2)) + Math.PI;
	        }
	        else if ((X2 >= X1) && (Y2 >= Y1)) {
	            return Math.atan((X2 - X1) / (Y2 - Y1)) + Math.PI * (3 / 2);
	        }
	    };
	    GEngine.prototype.magnitude = function (X2, Y2, X1, Y1) {
	        return Math.sqrt((X2 - X1) * (X2 - X1) + (Y2 - Y1) * (Y2 - Y1));
	    };
	    GEngine.prototype.player = function (x, y) {
	        var type = "player";
	        var posX = x;
	        var posY = x;
	        var cX = 0;
	        var cY = 0;
	        var state = "ground";
	    };
	    GEngine.prototype.keyControld = function (event, Pal) {
	        var c = event.keyCode || event.which;
	        if (c == '37') {
	            Pal.cX = -2;
	        }
	        if (c == '39') {
	            Pal.cX = 2;
	        }
	        if (c == '32') {
	            Pal.state = "jump";
	            this.jump(Pal);
	        }
	    };
	    GEngine.prototype.keyControlu = function (event, Pal) {
	        var c = event.keyCode || event.which;
	        if (c == '37') {
	            Pal.cX = 0;
	        }
	        if (c == '39') {
	            Pal.cX = 0;
	        }
	    };
	    GEngine.prototype.worldC = function (Pal) {
	        var world = [];
	        var tipo = "aire";
	        var x = 0;
	        var asd = 0;
	        for (var i = 0; i <= 10 * 300; i++) {
	            if (i % 10 < 5) {
	                tipo = "aire";
	            }
	            else if (i % 10 < 9) {
	                if (tipo == "aire") {
	                    if (Math.random() <= 0.1) {
	                        tipo = "solido";
	                        if (i >= 50) {
	                            if (asd == 0) {
	                                Pal.posX = x * this.S;
	                                Pal.posY = (i - 1) % 10 * this.S;
	                                asd = 1;
	                            }
	                        }
	                    }
	                    else {
	                        tipo = "aire";
	                    }
	                }
	            }
	            else if (i % 10 == 9) {
	                tipo = "solido";
	                if (i >= 50) {
	                    if (asd == 0) {
	                        Pal.posX = x * this.S;
	                        Pal.posY = (i - 1) % 10 * this.S;
	                        asd = 1;
	                    }
	                }
	            }
	            world.push({
	                type: tipo,
	                pX: x * this.S,
	                pY: i % 10 * this.S,
	                R: false
	            });
	            if (i % 10 == 9) {
	                x = x + 1;
	                tipo = "aire";
	            }
	        }
	        return world;
	    };
	    GEngine.prototype.mLR = function (Pal) {
	        Pal.posX = Pal.posX + Pal.cX;
	    };
	    GEngine.prototype.jump = function (Pal) {
	        if (this.flag == 0) {
	            Pal.cY = -20;
	            this.flag = 1;
	            console.log("entre");
	        }
	    };
	    GEngine.prototype.mU = function (Pal) {
	        Pal.cY = Pal.cY + 2;
	        if (Pal.cY <= 20) {
	            Pal.posY = Pal.posY + Pal.cY;
	            console.log("falling");
	            console.log(Pal.cY);
	        }
	        else {
	            Pal.cY = 22;
	            Pal.posY = Pal.posY + Pal.cY;
	            console.log("force");
	            console.log(Pal.cY);
	        }
	    };
	    GEngine.prototype.limits = function (obj, Pal) {
	        if (obj.R == true) {
	            if (obj.type == "solido") {
	                var ang = this.findAngle(obj.pX, obj.pY, Pal.posX, Pal.posY);
	                if ((ang >= Math.PI * (11 / 6) && ang <= 2 * Math.PI) || (ang >= 0 && ang <= (1 / 1024) * Math.PI)) {
	                    if (Math.abs(obj.pX - Pal.posX) <= this.S) {
	                        Pal.posX = Pal.posX - Pal.cX;
	                    }
	                }
	                else if ((ang >= Math.PI * (1023 / 1024)) && ang <= (7 / 6) * Math.PI) {
	                    if (Math.abs(Pal.posX - obj.pX) <= this.S) {
	                        Pal.posX = Pal.posX - Pal.cX;
	                    }
	                }
	                if ((ang >= (5 / 4) * Math.PI) && (ang <= Math.PI * (7 / 4))) {
	                    if (Math.abs(Pal.posY - obj.pY) <= this.S) {
	                        Pal.posY = Pal.posY - Pal.cY;
	                        Pal.state = "ground";
	                        console.log("normal force");
	                        this.flag = 0;
	                    }
	                }
	            }
	        }
	    };
	    GEngine.prototype.limitScreen = function (Pal) {
	        if (Pal.posX < 0) {
	            Pal.posX = 0;
	        }
	        if (Pal.posX > 299 * this.S) {
	            Pal.posX = 299 * this.S;
	        }
	        if (Pal.posY < 0) {
	            Pal.posY = 0;
	        }
	        if (Pal.posY > 9 * this.S) {
	            Pal.posY = 9 * this.S;
	            this.flag = 0;
	        }
	    };
	    GEngine.prototype.worldRenderer = function (world, pla) {
	        for (var i = 0; i < world.length; i++) {
	            var mag = world[i].pX - pla.posX;
	            if (mag < 0) {
	                if (Math.abs(mag) <= 4 * this.S * (1 / this.sc)) {
	                    world[i].R = true;
	                }
	                else {
	                    world[i].R = false;
	                }
	            }
	            else {
	                if (Math.abs(mag) <= (this.width - 2 * this.S * (1 / this.sc)) * this.sc) {
	                    world[i].R = true;
	                }
	                else {
	                    world[i].R = false;
	                }
	            }
	        }
	    };
	    GEngine.prototype.pixelify = function (V2, V1, ps) {
	        if (ps == "x") {
	            return (V2 - V1) * (1 / this.sc) + 3 * this.S * (1 / this.sc);
	        }
	        else if (ps == "y") {
	            return (V2) * (1 / this.sc) + 3 * this.S * (1 / this.sc);
	        }
	    };
	    GEngine.prototype.render = function (obj, Pal) {
	        if (obj.R == true) {
	            if (obj.type == "aire") {
	                this.context.drawImage(this.aire, this.pixelify(obj.pX, Pal.posX, "x"), this.pixelify(obj.pY, 10 * this.S / 2, "y"), this.S * (1 / this.sc), this.S * (1 / this.sc));
	            }
	            else if (obj.type == "solido") {
	                this.context.drawImage(this.pasto, this.pixelify(obj.pX, Pal.posX, "x"), this.pixelify(obj.pY, 10 * this.S / 2, "y"), this.S * (1 / this.sc), this.S * (1 / this.sc));
	            }
	        }
	    };
	    GEngine.prototype.renderP = function (Pal) {
	        this.context.drawImage(this.playerSprite, 3 * this.S * (1 / this.sc), (Pal.posY) * (1 / this.sc) + 3 * this.S * (1 / this.sc), this.S * (1 / this.sc), this.S * (1 / this.sc));
	    };
	    GEngine.prototype.clear = function () {
	        this.context.clearRect(0, 0, this.CV.width, this.CV.height);
	    };
	    return GEngine;
	}());
	exports.GEngine = GEngine;


/***/ }
/******/ ]);