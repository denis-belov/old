function WorldObject( width, height, depth, position, rotation, pool ) {

    this.geometry = new THREE.BoxGeometry( width, height, depth );
    
	crab = tex( 'tile.jpg' );
	crab.anisotropy = 16;

    this.material = new THREE.ShaderMaterial( {
		
        uniforms: {
            'texture': { type: 't', value: crab },
			'caustics': { type: 't', value: pool.water.caustics.texture },
		    'lightPos': { type: 'v3', value: worldPos( light.camera ) },
			'waterPoint': { type: 'v3' },
		    'sceneMatrix': { type: 'm4' },
			'color': { type: 'c', value: col( 0xb1dcfc ) }
        },
		
        vertexShader: [
		    'varying vec4 coord;',
			'varying vec4 worldPosition;',
		    'varying vec3 meshNormal;',
		    'varying vec2 vUv;',
            'void main() {',
		        'vUv = uv;',
			    'worldPosition = modelMatrix * vec4( position, 1.0 );',
			    'meshNormal = normalMatrix * normal;',
				'coord = projectionMatrix * viewMatrix * worldPosition;',
			    'gl_Position = coord;',
            '}'
        ].join('\n'),
		
        fragmentShader: [
	        'uniform sampler2D texture;',
			'uniform sampler2D caustics;',
		    'uniform vec3 lightPos;',
		    'uniform mat4 sceneMatrix;',
			'uniform vec3 color;',
			'varying vec4 coord;',
		    'varying vec4 worldPosition;',
		    'varying vec3 meshNormal;',
		    'varying vec2 vUv;',
			pool.inRectLight,
			pool.getWallLight,
            'void main() {',
                pool.n,
		        'vec3 v = - 50.0 * n[ 1 ] + 25.0 * n[ 0 ] - 50.0 * n[ 2 ];',
			    'gl_FragColor = texture2D( texture, vUv ) * getWallLight( v, n, worldPosition.xyz, meshNormal, vec4( color, 1.0 ), caustics, coord );',
		   '}'
        ].join('\n')
		
    } );

	this.mesh = new THREE.Mesh( this.geometry, this.material );
	this.mesh.position.set( position.x, position.y, position.z );
	this.mesh.rotation.set( rotation.x, rotation.y, rotation.z );

	this.update = function() {
		
		this.material.uniforms[ 'caustics' ].value = pool.water.caustics.texture;
        this.material.uniforms[ 'lightPos' ].value = worldPos( light.camera );
		this.material.uniforms[ 'sceneMatrix' ].value = scene.matrix;

	};

};