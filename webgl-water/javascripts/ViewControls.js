function ViewControls( scene, camera, positionZ, rotation ) {
	
	var sceneRotationXOnMouseUp = rotation.x,
        sceneRotationYOnMouseUp = rotation.y,	
        sceneRotationX = sceneRotationXOnMouseUp,
	    sceneRotationY = sceneRotationYOnMouseUp;
		
	camera.position.z = positionZ;
	
	renderer.domElement.onmousedown = function( e ) {
        var cX = e.clientX,
	        cY = e.clientY;
        renderer.domElement.onmousemove = function( e ) {
		    sceneRotationX = ( ( sceneRotationXOnMouseUp * 100 ) + e.clientY - cY ) / 100;
            sceneRotationY = ( ( sceneRotationYOnMouseUp * 100 ) + e.clientX - cX ) / 100;
        };
    };

    renderer.domElement.onmouseup = function() {
        sceneRotationXOnMouseUp = ( scene.rotation.x >= ( 2 * pi ) ) ? scene.rotation.x - ( 2 * pi ) * ( Math.floor ( scene.rotation.x / ( 2 * pi ) ) ) : scene.rotation.x;
        sceneRotationYOnMouseUp = ( scene.rotation.y >= ( 2 * pi ) ) ? scene.rotation.y - ( 2 * pi ) * ( Math.floor ( scene.rotation.y / ( 2 * pi ) ) ) : scene.rotation.y;
        renderer.domElement.onmousemove = function( e ) {
            if ( mouseMove ) {
                e.preventDefault();
                e.stopPropagation();
		        var s, mouse = vec2( ( e.clientX / x ) * 2 - 1, - ( e.clientY / y ) * 2 + 1 );	
		       raycaster.setFromCamera( mouse, camera );	
                if ( s = raycaster.intersectObject( pool.water.mesh )[ 0 ] ) {
			        var n1 = sceneVec3( 1, 0, 0 ), n2 = sceneVec3( 0, 0, 1 );
			        var pv = new THREE.Vector3().subVectors( s.point, sceneVec3( - 50, 22, - 50 ) );
			        pool.water.drop( 100 -  n1.dot( pv ), n2.dot( pv ) )
		        }
            }
        };
    };

    renderer.domElement.onwheel = function( e ) {
	    if ( ua.browser.family == 'Firefox' ) camera.position.z += e.deltaY || e.detail || e.wheelDelta;
		else camera.position.z += ( e.deltaY || e.detail || e.wheelDelta ) / 50;
	};

    this.update = function() {
	    scene.matrixAutoUpdate = false;
	    scene.rotation.x = sceneRotationX;
	    scene.rotation.y = sceneRotationY;
	    scene.updateMatrix();
	    scene.matrixAutoUpdate = true;	
    };
	
};