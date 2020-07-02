/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	/*
	   Coded By Denis Belov for Cuberto Design ( Russia, Saint-Petersburg, 2017 )
	   dsbelov63@gmail.com
	*/
	
	var gap = function gap(f, t, n) {
		if (n < f) return n + Math.ceil(f - n) * (t - f + 1);else if (n > t) return n + Math.ceil(t - n) * (t - f + 1);else return n;
	};
	var currSlide = false;
	var x, y;
	var paintFragment = ['precision highp float;', 'uniform vec3 color;', 'void main() {', 'gl_FragColor = vec4( color, 1. );', '}'].join('\n');
	var paintVertex_1 = ['precision highp float;', 'uniform mat4 modelMatrix;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'attribute vec3 position;', 'uniform sampler2D dataMap;', 'void main() {', 'vec4 data = texture2D( dataMap, vec2( .5 - position.x * .01, 0. ) );', 'vec4 pos = position.y < 0. ? vec4( vec3( position.x + data.a, data.r, position.z ), 1. ) : vec4( vec3( position.x - data.a, data.r, position.z ), 1.0 );', 'if ( pos.y < - 300. ) pos.y = - 300.;', 'gl_Position = projectionMatrix * viewMatrix * modelMatrix * pos;', '}'].join('\n');
	var paintVertex_2 = ['precision highp float;', 'uniform mat4 modelMatrix;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'attribute vec3 position;', 'uniform sampler2D dataMap;', 'void main() {', 'vec4 data = texture2D( dataMap, vec2( .5 - position.x * .01, 1. ) );', 'vec4 pos = position.y < 0. ? vec4( vec3( position.x, data.r, position.z ), 1. ) : vec4( position, 1. );', 'if ( pos.y < - 300. ) pos.y = - 300.;', 'gl_Position = projectionMatrix * viewMatrix * modelMatrix * pos;', '}'].join('\n');
	var paintDataVertex = ['precision highp float;', 'attribute vec3 position;', 'varying vec2 crd;', 'void main() {', 'gl_Position = vec4( position, 1. );', 'crd = position.xy * .5 + .5;', '}'].join('\n');
	var paintDataFragment = ['precision highp float;', 'const float pi = 3.14159265359;', 'uniform sampler2D dataMap;', 'uniform float time;', 'uniform float new;', 'uniform float pos;', 'uniform float typ;', 'uniform float rad;', 'uniform float spd;', 'uniform float kspd;', 'uniform float yspd;', 'varying vec2 crd;', 'void main() {', 'vec4 rgba = texture2D( dataMap, crd );', 'float g;', 'float curr = abs( pos - crd.x ) / rad;', 'float c = cos( curr * pi );', 'if ( crd.y < .5 ) {', 'vec2 ba = texture2D( dataMap, vec2( crd.x, 1. ) ).ba;', 'if ( new == 1. && curr < 1. ) {', 'if ( typ == 0. ) rgba.g -= ( c + 1. ) * .5 * pow( 1. - curr, 2. ) * spd;', 'else if ( typ == 1. ) {', 'if ( curr < .5 ) rgba.b = sin( curr * pi * 2. ) * sign( crd.x - pos ) * rad * 160. * pow( 1. - curr, 4. );', 'rgba.a = rgba.b * .025;', 'if ( rgba.r < texture2D( dataMap, vec2( pos, 0. ) ).r ) rgba.rg = texture2D( dataMap, vec2( 2. * pos - crd.x, 0. ) ).rg;', 'rgba.g += ( - ( sqrt( 1. - pow( curr * 1.6, 2. ) ) + 1. ) * .25 + .125 - pow( ( c + 1. ) * .5, 2. ) ) * spd;', '}', 'else if ( typ == 2. ) rgba.g -= pow( ( c + 1. ) * .5, 2. ) * spd;', '}', 'rgba.a += rgba.b * ba.x * ba.y;', '}', 'else if ( new == 1. && curr < 1. ) {', 'if ( typ == 0. ) g = ( - c - 1. ) * .5 * pow( 1. - curr, 2. ) * spd;', 'else if ( typ == 1. ) {', 'rgba.ba = vec2( spd, yspd );', 'if ( curr > .6 ) g = sqrt( .25 - pow( curr - 1., 2. ) ) - .5;', 'else g = ( - sqrt( 1. - pow( curr * pi * .5, 2. ) ) - 1. ) * .25 + .125;', 'g = g * rgba.b - pow( ( c + 1. ) * .5, 2. ) * rgba.b;', '}', 'else if ( typ == 2. ) g = - pow( ( c + 1. ) * .5, 2. ) * spd;', 'rgba.g += g;', '}', 'rgba.r += rgba.g * time * kspd;', 'rgba.g *= 1.03;', 'gl_FragColor = rgba;', '}'].join('\n');
	var paintDataMaterial = new THREE.RawShaderMaterial({
		uniforms: {
			'dataMap': { type: 't' },
			'time': { type: 'f', value: .017 },
			'new': { type: 'f' },
			'typ': { type: 'f' },
			'pos': { type: 'f' },
			'rad': { type: 'f' },
			'spd': { type: 'f' },
			'yspd': { type: 'f' },
			'kspd': { type: 'f', value: 100 }
		},
		vertexShader: paintDataVertex,
		fragmentShader: paintDataFragment
	});
	var paintPlaneMaterial = [new THREE.RawShaderMaterial({
		uniforms: {
			'dataMap': { type: 't' },
			'color': { type: 'c', value: new THREE.Color(0x5449c1) }
		},
		vertexShader: paintVertex_1,
		fragmentShader: paintFragment,
		side: THREE.BackSide
	}), new THREE.RawShaderMaterial({
		uniforms: {
			'dataMap': { type: 't' },
			'color': { type: 'c', value: new THREE.Color(0x5449c1) }
		},
		vertexShader: paintVertex_2,
		fragmentShader: paintFragment
	})];
	var slide = new THREE.Object3D();
	var planeGeometry = [new THREE.PlaneGeometry(100, 1, 5119, 0), new THREE.PlaneGeometry(100, 1, 1023, 0), new THREE.PlaneGeometry(2, 2)];
	var plane = [new THREE.Mesh(planeGeometry[0], paintPlaneMaterial[0]), new THREE.Mesh(planeGeometry[1], paintPlaneMaterial[1]), new THREE.Mesh(planeGeometry[2], paintDataMaterial)];
	slide.add(plane[0]);
	slide.add(plane[1]);
	var changeData = 1;
	var typ = 0;
	var pos = 0;
	var rad = 0;
	var spd = 0;
	var yspd = 0;
	var R = new THREE.WebGLRenderer({ antialias: true });
	R.setClearColor(0xffffff);
	R.update = function () {
		paintDataMaterial.uniforms.dataMap.value = data[changeData].texture;
		changeData = 1 - changeData;
		if (currSlide.drips.length - currSlide.counter) {
			var d = currSlide.drips[currSlide.counter++];
			paintDataMaterial.uniforms.new.value = 1;
			paintDataMaterial.uniforms.typ.value = d[0];
			paintDataMaterial.uniforms.pos.value = d[1];
			paintDataMaterial.uniforms.rad.value = d[2];
			paintDataMaterial.uniforms.spd.value = d[3];
			paintDataMaterial.uniforms.yspd.value = d[4];
		}
		R.render(plane[2], camera, data[changeData], true);
		paintPlaneMaterial[0].uniforms.dataMap.value = data[changeData].texture;
		paintPlaneMaterial[1].uniforms.dataMap.value = data[changeData].texture;
		paintDataMaterial.uniforms.new.value = 0;
		return this;
	};
	document.getElementById('R').appendChild(R.domElement);
	var camera = new THREE.OrthographicCamera(-50, 50, 50 / (window.innerWidth / window.innerWidth), -50 / (window.innerWidth / window.innerWidth), 1, 1000);
	camera.position.z = 1;
	camera.position.y = -50 / (window.innerWidth / window.innerWidth);
	var data = [new THREE.WebGLRenderTarget(2048, 2, { type: THREE.FloatType }), new THREE.WebGLRenderTarget(2048, 2, { type: THREE.FloatType })];
	var paintSlide = function paintSlide(_color) {
		this.color = _color;
		this.started = false;
		this.drips = [];
		this._drip = function (typ, pos, rad, spd, yspd) {
			this.drips.push([typ, 1.0 - pos, rad, spd, yspd]);
		};
		this.drip = function (pos, rad, spd, yspd, lrad, rrad) {
			this._drip(0, pos - rad * 0.25, rad * (lrad || 2), spd * 0.4, 0);
			this._drip(0, pos + rad * 0.25, rad * (rrad || 2), spd * 0.4, 0);
			this._drip(1, pos, rad, spd, yspd);
		};
		this.counter = 0;
	};
	var paintSlides = [new paintSlide(new THREE.Color(0x5449c1)), new paintSlide(new THREE.Color(0x67d2ff)), new paintSlide(new THREE.Color(0xffffff)), new paintSlide(new THREE.Color(0x3e2dae))];
	currSlide = paintSlides[0];
	paintSlides[0].drips = [[2, 1 - .5, 10., .04, 0], [2, 1 - .6, .12, .03, 0], [2, 1 - 0., .07, .08, 0], [2, 1 - .1, .15, .05, 0], [2, 1 - .9, .1, .04, 0], [2, 1 - 1., .12, .03, 0], [2, 1 - .8, .07, 0., 0], [2, 1 - .4, .1, .05, 0], [2, 1 - .3, .07, .03, 0], [2, 1 - .2, .12, .05, 0], [2, 1 - .7, .1, .05, 0], [2, 1 - .5, .15, .04, 0], [2, 1 - 0., .3, .05, 0]];
	paintSlides[0].drip(.59, .02, .15, .14);
	paintSlides[0].drip(.87, .015, .12, .2);
	paintSlides[0].drip(.21, .01, .07, .28);
	paintSlides[0].drip(.49, .02, .2, .14);
	paintSlides[0].drip(.31, .013, .07, .3);
	paintSlides[0].drip(.26, .02, .2, .14);
	paintSlides[0].drip(.1, .013, .07, .2);
	paintSlides[0].drip(.7, .015, .07, .2);
	paintSlides[1].drips = [[2, 1 - .5, 10., .04, 0], [2, 1 - .14, .07, .05, 0], [2, 1 - .3, .1, .02, 0], [2, 1 - .6, .2, .025, 0], [2, 1 - .7, .12, .04, 0], [2, 1 - .9, .12, .065, 0], [2, 1 - 1., .12, .065, 0], [2, 1 - .5, .15, .065, 0], [2, 1 - .8, .1, .1, 0], [2, 1 - 0., .3, .05, 0], [2, 1 - .75, .05, .05, 0]];
	paintSlides[1].drip(.15, .02, .15, .14);
	paintSlides[1].drip(.67, .01, .05, .4);
	paintSlides[1].drip(.89, .01, .07, .28);
	paintSlides[1].drip(.81, .02, .2, .14);
	paintSlides[1].drip(.04, .02, .2, .14);
	paintSlides[1].drip(.58, .015, .15, .14);
	paintSlides[1].drip(.31, .01, .05, .2);
	paintSlides[1].drip(.28, .013, .07, .2);
	paintSlides[1].drip(.44, .015, .15, .2, 2, 4);
	paintSlides[2].drips = [[2, 1 - 0.5, 10.0, 0.04, 0], [2, 1 - 0.0, 0.07, 0.08, 0], [2, 1 - 0.35, 0.3, 0.05, 0], [2, 1 - 0.8, 0.07, 0.0, 0], [2, 1 - 0.3, 0.07, 0.03, 0], [2, 1 - 0.14, 0.07, 0.02, 0], [2, 1 - 0.3, 0.1, 0.02, 0], [2, 1 - 0.9, 0.12, 0.065, 0], [2, 1 - 1.0, 0.12, 0.065, 0], [2, 1 - 0.5, 0.15, 0.03, 0], [2, 1 - 0.6, 0.12, 0.03, 0], [2, 1 - 0.7, 0.12, 0.04, 0], [2, 1 - 0.8, 0.12, 0.04, 0]];
	paintSlides[2].drip(0.82, 0.015, 0.07, 0.18);
	paintSlides[2].drip(0.79, 0.012, 0.07, 0.18);
	paintSlides[2].drip(0.13, 0.015, 0.07, 0.18);
	paintSlides[2].drip(0.16, 0.012, 0.07, 0.23);
	paintSlides[2].drip(0.45, 0.02, 0.07, 0.18);
	paintSlides[2].drip(0.7, 0.02, 0.07, 0.18);
	paintSlides[2].drip(0.3, 0.025, 0.07, 0.18);
	paintSlides[2].drip(0.9, 0.02, 0.07, 0.18);
	paintSlides[2].drip(0.6, 0.015, 0.07, 0.18);
	paintSlides[2].drip(0.51, 0.015, 0.07, 0.18);
	paintSlides[3].drips = [[2, 1 - 0.5, 10.0, 0.04, 0], [2, 1 - 0.4, 0.12, 0.03, 0], [2, 1 - 1.0, 0.07, 0.08, 0], [2, 1 - 0.9, 0.15, 0.05, 0], [2, 1 - 0.1, 0.1, 0.04, 0], [2, 1 - 0.0, 0.12, 0.03, 0], [2, 1 - 0.2, 0.07, 0.0, 0], [2, 1 - 0.6, 0.1, 0.05, 0], [2, 1 - 0.7, 0.07, 0.03, 0], [2, 1 - 0.8, 0.12, 0.05, 0], [2, 1 - 0.3, 0.1, 0.05, 0], [2, 1 - 0.5, 0.15, 0.04, 0], [2, 1 - 1.0, 0.3, 0.05, 0]];
	paintSlides[3].drip(0.41, 0.02, 0.15, 0.14);
	paintSlides[3].drip(0.13, 0.015, 0.12, 0.2);
	paintSlides[3].drip(0.79, 0.01, 0.07, 0.28);
	paintSlides[3].drip(0.51, 0.02, 0.2, 0.14);
	paintSlides[3].drip(0.69, 0.013, 0.07, 0.3);
	paintSlides[3].drip(0.74, 0.02, 0.2, 0.14);
	paintSlides[3].drip(0.9, 0.013, 0.07, 0.2);
	paintSlides[3].drip(0.3, 0.015, 0.07, 0.2);
	var isSliding = false;
	var from = 0;
	var go = function go(to) {
		isSliding = true;
		R.setClearColor(currSlide.color);
		currSlide.started = false;
		currSlide = paintSlides[to];
		data = [new THREE.WebGLRenderTarget(2048, 2, { type: THREE.FloatType }), new THREE.WebGLRenderTarget(2048, 2, { type: THREE.FloatType })];
		paintPlaneMaterial[0].uniforms.color.value = paintPlaneMaterial[1].uniforms.color.value = currSlide.color;
		currSlide.started = true;
		currSlide.counter = 0;
		from = to;
		setTimeout(function () {
			isSliding = false;
		}, 2000);
	};
	var resize = function resize() {
		R.setSize(x = window.innerWidth, y = window.innerHeight);
		R.domElement.style.width = x + 'px';
		R.domElement.style.height = y + 'px';
		camera = new THREE.OrthographicCamera(-50, 50, 50 / (x / y), -50 / (x / y), 1, 1000);
		camera.position.z = 1;
		camera.position.y = -50 / (x / y);
	};
	var render = function render() {
		if (currSlide.started) R.update().render(slide, camera);
		requestAnimationFrame(render);
	};
	resize();
	render();
	isSliding = true;
	window.onresize = resize;
	window.onwheel = function (e) {
		if (!isSliding) go(gap(0, 3, from + Math.sign(e.deltaY || e.detail || e.wheelDelta)));
	};
	var loadingTime = 0;
	var int = setInterval(function () {
		if (loaded >= 3 || loadingTime > 10000) {
			clearInterval(int);
			setTimeout(function () {
				document.getElementById('preLoader').className = '-hidden';
				currSlide.started = true;
			}, 200);
			setTimeout(function () {
				document.getElementById('useTheMouseWheel').className = '-hidden';
				isSliding = false;
			}, 2000);
		}
		loadingTime += 100;
	}, 100);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map