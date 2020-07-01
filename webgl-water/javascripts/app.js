var ua = detect.parse( navigator.userAgent );

var staticLight = true;
var lightPos = vec3( 70, 80, 70 );
var mouseMove = true;

var x = window.innerWidth * 0.7,
    y = window.innerHeight,
    scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera( 60, x / y, 0.1, 1000 ),
    renderer = new THREE.WebGLRenderer( { antialias: true } );

var rend = renderer.domElement;
    rend.style.float = 'left';
    rend.style.width = x + 'px';
    rend.style.height = y + 'px';
renderer.setSize( x, y );

var stats = new Stats();
    stats.showPanel( 0 );

var viewControls = new ViewControls( scene, camera, 150, vec2( pi / 9, - pi / 9 ) );

var raycaster = new THREE.Raycaster();

var light = new Light();

var pool = new Pool();

function render() {
	stats.begin();
	viewControls.update();
	light.update( lightPos, staticLight );
	pool.update();
	renderer.render( scene, camera );
	stats.end();
	requestAnimationFrame( render );
};

window.onload = function() {
    document.getElementById( 'info' ).style.width = window.innerWidth - x - 1 + 'px';
    document.getElementById( 'info' ).style.height = y + 'px';
    document.getElementsByClassName( 'extra' )[ 0 ].style.display = y < 400 ? 'none' : 'block';
    document.getElementsByClassName( 'onmousemove' )[ 0 ].checked = true;
    document.getElementsByClassName( 'onclick' )[ 0 ].checked = false;
    document.getElementsByClassName( 'staticLight' )[ 0 ].checked = true;
    document.body.insertBefore( rend, document.getElementById( 'info' ) );
    document.body.appendChild( stats.dom );
    window.onkeypress = function( e ) {
        e.preventDefault();
        e.stopPropagation();
    };
    window.onresize = function() {
        x = window.innerWidth * 0.7;
        y = window.innerHeight;
        document.getElementById( 'info' ).style.width = window.innerWidth - x - 1 + 'px';
        document.getElementById( 'info' ).style.height = y + 'px';
        document.getElementsByClassName( 'extra' )[ 0 ].style.display = y < 400 ? 'none' : 'block';
        rend.style.width = x + 'px';
        rend.style.height = y + 'px';
        renderer.setSize( x, y );
        camera.aspect = x / y;
        camera.updateProjectionMatrix();
    };
    rend.onmousemove = function( e ) {
        if ( mouseMove ) {
            e.preventDefault();
            e.stopPropagation();
		    var s, mouse = vec2( ( e.clientX / x ) * 2 - 1, - ( e.clientY / y ) * 2 + 1 );	
		    raycaster.setFromCamera( mouse, camera );	
            if ( s = raycaster.intersectObject( pool.water.mesh )[ 0 ] ) {
			    var n1 = sceneVec3( 1, 0, 0 ), n2 = sceneVec3( 0, 0, 1 );
			    var pv = new THREE.Vector3().subVectors( s.point, sceneVec3( - 50, 22, - 50 ) );
			    pool.water.drop( 100 - n1.dot( pv ), n2.dot( pv ) );
		    }
        }
    };
    rend.onclick = function( e ) {
        if ( !mouseMove ) {
            e.preventDefault();
            e.stopPropagation();
		    var s, mouse = vec2( ( e.clientX / x ) * 2 - 1, - ( e.clientY / y ) * 2 + 1 );	
		    raycaster.setFromCamera( mouse, camera );	
            if ( s = raycaster.intersectObject( pool.water.mesh )[ 0 ] ) {
			    var n1 = sceneVec3( 1, 0, 0 ), n2 = sceneVec3( 0, 0, 1 );
			    var pv = new THREE.Vector3().subVectors( s.point, sceneVec3( - 50, 22, - 50 ) );
			    pool.water.drop( 100 - n1.dot( pv ), n2.dot( pv ) );
		    }
        }
    };
    document.getElementsByClassName( 'onmousemove' )[ 0 ].onclick = function() {
        document.getElementsByClassName( 'onclick' )[ 0 ].checked = false;
        mouseMove = true;
    };
    document.getElementsByClassName( 'onclick' )[ 0 ].onclick = function() {
        document.getElementsByClassName( 'onmousemove' )[ 0 ].checked = false;
        mouseMove = false;
    };
    document.getElementsByClassName( 'staticLight' )[ 0 ].onclick = function() {
        if ( document.getElementsByClassName( 'staticLight' )[ 0 ].checked ) { 
		    staticLight = true;
			lightPos = vec3( 70, 80, 70 );
		} else staticLight = false;
    };
    document.getElementById( 'en' ).onclick = function() {
        document.getElementsByClassName( 'head' )[ 0 ].innerHTML = 'Water Simulation';
        document.getElementsByClassName( 'description' )[ 0 ].innerHTML = 'In this simulation here are the properties of water such as <strong>refraction</strong>, <strong>reflection</strong> and <strong>caustics</strong>';
        document.getElementsByClassName( 'controls' )[ 0 ].innerHTML = '- Rotate the scene using the mouse, hold the left button<br>- Zoom the camera using the mouse wheel<br>- Create waves by moving the mouse cursor on the water surface (onmousemove) or by clicking on it (onclick)';
        document.getElementsByClassName( 'radiotext' )[ 2 ].innerHTML = 'Rotate the light source with the scene';
        document.getElementsByClassName( 'extra' )[ 0 ].innerHTML = '<div class="extratext">Developed with Three.js (WebGL)</div><br><div class="extratext">by Belov D.</div><br><div class="extratext">vk.com/dbelov63</div><br><div class="extratext">dsbelov63@gmail.com</div>';
    };
    document.getElementById( 'ru' ).onclick = function() {
        document.getElementsByClassName( 'head' )[ 0 ].innerHTML = 'Симуляция воды';
        document.getElementsByClassName( 'description' )[ 0 ].innerHTML = 'В данной симуляции представлены свойства воды такие как <strong>преломление</strong>, <strong>отражение</strong> и <strong>каустика</strong>';
        document.getElementsByClassName( 'controls' )[ 0 ].innerHTML = '- Вращайте сцену с помощью мыши, удерживая левую кнопку<br>- Приближайте и удаляйте камеру с помощью колеса мыши<br>- Создавайте волны, перемещая курсор мыши по водной поверхности (onmousemove) или кликая по ней (onclick)';
        document.getElementsByClassName( 'radiotext' )[ 2 ].innerHTML = 'Вращать источник света со сценой';
        document.getElementsByClassName( 'extra' )[ 0 ].innerHTML = '<div class="extratext">Разработано на  Three.js (WebGL)</div><br><div class="extratext">Беловым Д.</div><br><div class="extratext">vk.com/dbelov63</div><br><div class="extratext">dsbelov63@gmail.com</div>';
    };
	render();
    //for ( var i = 0; i < 10; i++ ) setInterval( 'pool.water.drop( Math.random(), Math.random() )', 100 );
	document.body.style.display = 'block';
};