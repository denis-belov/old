function PoolElement( width, height, position, rotation, pool, floor ) {

    this.geometry = new THREE.PlaneGeometry( width, height );

    var mat = this.material = new THREE.RawShaderMaterial( {
		
        uniforms: {
            'tile': { type: 't', value: pool.tile },
			'caustics': { type: 't', value: pool.water.caustics.texture },
		    'lightPos': { type: 'v3', value: worldPos( light.camera ) },
			'waterPoint': { type: 'v3' },
		    'sceneMatrix': { type: 'm4' },
			'color': { type: 'c', value: col( 0xb1dcfc ) }
        },
		
        vertexShader: [
		    vertexShaderVariables,
			'varying vec4 worldPos;',
		    'varying vec3 vNormal;',
		    'varying vec2 vUv;',
            'void main() {',
		        floor ? 'vUv = uv;' : 'vUv = uv * vec2( 1.0, 0.5 );',
			    'worldPos = modelMatrix * vec4( position, 1.0 );',
			    'vNormal = normalMatrix * normal;',
			    'gl_Position = projectionMatrix * viewMatrix * worldPos;',
            '}'
        ].join('\n'),
		
        fragmentShader: [
		    fragmentShaderVariables,
	        'uniform sampler2D tile;',
			'uniform sampler2D caustics;',
		    'uniform vec3 lightPos;',
		    'uniform mat4 sceneMatrix;',
			'uniform vec3 color;',
		    'varying vec4 worldPos;',
		    'varying vec3 vNormal;',
		    'varying vec2 vUv;',
		    pool.getIntersection,
		    pool.inRectLight,
		    pool.getRectCoord,
			pool.getWallLight,
            'void main() {',
                pool.n,
			    'gl_FragColor = texture2D( tile, vUv ) * getWallLight( 25.0 * n[ 0 ], n, worldPos.xyz, vNormal, vec4( color, 1.0 ), caustics );',
		    '}'
        ].join('\n')
		
    } );

	this.mesh = new THREE.Mesh( this.geometry, this.material );
	this.mesh.position.copy( position );
	this.mesh.rotation.set( rotation.x, rotation.y, rotation.z );

	this.update = function() {
		
		mat.uniforms.caustics.value = pool.water.caustics.texture;
        mat.uniforms.lightPos.value = worldPos( light.camera );
		mat.uniforms.sceneMatrix.value = scene.matrix;

	};

};