function SkyBox( x, y, z, scene, directory ) {
	
    var directions  = [ 'xpos', 'xneg', 'ypos', 'yneg', 'zpos', 'zneg' ];
	
    var suffix = '.png';
	
    var geometry = new THREE.CubeGeometry( x, y, z );	
	
    var materialArray = [];
	
    for ( var i = 0; i < 6; i++ )
	    materialArray.push(
	        new THREE.MeshBasicMaterial( {
		        map: new THREE.TextureLoader().load( directory + directions[ i ] + suffix ),
		        side: THREE.BackSide
	        } )
		);
		
    var material = new THREE.MeshFaceMaterial( materialArray );
	
    this.mesh = new THREE.Mesh( geometry, material );
	
};