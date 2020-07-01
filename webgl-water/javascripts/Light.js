var Light = function() {
	
	this.camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );

	this.update = function( lightPos, stat ) {
	    
	    stat ? this.camera.position.copy( sceneMat( lightPos.clone() ) ) : null;
	    this.camera.lookAt( worldPos( scene ) );
	    
	};

};