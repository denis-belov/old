function Pool() {
	
	this.getIntersection = [
	    'vec3 getIntersection( vec3 v, vec3 n, vec3 r, vec3 o ) {',		
			'return o + r * dot( n, v - o ) / dot( n, r );',
		'}'
	].join('\n');

	this.inRect = [	
		'float inRect( vec3 n1, vec3 n2, vec3 p, vec3 v, float w, float h ) {',
		    'vec3 pv = p - v;',
			'return step( 1.0, w / dot( n1, pv ) ) * step( 1.0, h / dot( n2, pv ) );',
		'}'
	].join('\n');
	
	this.getCenterCoords = [	
		'vec2 getCenterCoords( vec3 n1, vec3 n2, vec3 p, vec3 v ) {',
		    'vec3 pv = p - v;',
			'return vec2( dot( n1, pv ), dot( n2, pv ) );',
		'}'
	].join('\n');

	this.inRectLight = [
		'float inRectLight( vec3 n1, vec3 n2, vec3 p, vec3 v, float w, float h ) {',
		    'vec3 pv = p - v;',
			'return smoothstep( 0.98, 1.02, w / abs( dot( n1, pv ) ) ) * smoothstep( 0.98, 1.02, h / abs( dot( n2, pv ) ) );',
		'}'
	].join('\n');	
	
	this.getWallLight = [
		'vec4 getWallLight( vec3 v, vec3 n[ 3 ], vec3 p, vec3 n_, vec4 c, sampler2D caustics ) {',
		    'vec3 lightDir = normalize( lightPos - p ), s = getIntersection( v, n[ 0 ], lightDir, p );',
			'vec4 diffuse = vec4( max( dot( n_, lightDir ), 0.0 ) ) * 0.5, specular = vec4( pow( max( dot( normalize( cameraPosition - p ), reflect( - lightDir, n_ ) ), 0.0 ), 32.0 ) ) * 0.2;',						 					 	
			'float light = inRectLight( n[ 1 ], n[ 2 ], s, v, 50.0, 50.0 );',
            'return ( vec4( 0.5 ) + light * 5.0 * texture2D( caustics, getRectCoord( n[ 1 ], n[ 2 ], s, ( sceneMatrix * vec4( - 50.0, 25.0, - 50.0, 1.0 ) ).xyz ) ) * ( diffuse + specular ) ) * c;',
		'}'
	].join('\n');
	
	this.tex = [
		'vec4 tex( vec3 n1, vec3 n2, vec3 p, vec3 v, float w, float h ) {',
		    'vec3 pv = p - v;',
			'float d1 = dot( n1, pv ), d2 = dot( n2, pv );',
			'return ( w / d1 > 1.0 ) && ( h / d2 > 1.0 ) ? texture2D( tile, 0.01 * vec2( d1, d2 ) ) : vec4( 0.0 );',
		'}'
	].join('\n');
	
	this.getRectCoord = [
		'vec2 getRectCoord( vec3 n1, vec3 n2, vec3 p, vec3 v ) {',
		    'vec3 pv = p - v;',
			'return vec2( 0.01 * dot( n1, pv ), 1.0 - 0.01 * dot( n2, pv ) );',
		'}'
	].join('\n');	

	this.n = [
        'vec3 n[ 3 ];',
		'n[ 0 ] = ( sceneMatrix * vec4( 0.0, 1.0, 0.0, 1.0 ) ).xyz;',
		'n[ 1 ] = ( sceneMatrix * vec4( 1.0, 0.0, 0.0, 1.0 ) ).xyz;',
		'n[ 2 ] = ( sceneMatrix * vec4( 0.0, 0.0, 1.0, 1.0 ) ).xyz;'
	].join('\n');
	
	this.v = [
        'vec3 v[ 3 ];',
		'v[ 0 ] = ( sceneMatrix * vec4( - 50.0, - 25.0, - 50.0, 1.0 ) ).xyz;',
		'v[ 1 ] = ( sceneMatrix * vec4( - 50.0,   25.0,   50.0, 1.0 ) ).xyz;',
		'v[ 2 ] = ( sceneMatrix * vec4( - 50.0,   25.0, - 50.0, 1.0 ) ).xyz;',
	].join('\n');
	
	this.tile = tex( 'images/tile.jpg' );
	this.tile.anisotropy = 16;
	
	this.object = new THREE.Object3D();
	
	this.water = new Water( 100, 100, 200, 200, vec3( 0, 22, 0 ), vec3( - pi / 2, 0, 0 ), this );
	
	this.floor = new PoolElement( 100, 100, vec3( 0, - 25, 0 ), vec3( - pi / 2, 0, 0 ), this, true );

	this.wall = [
	    new PoolElement( 100, 50, vec3( 0, 0, - 50 ), vec3( 0, 0, 0 ), this ),
	    new PoolElement( 100, 50, vec3( 0, 0, 50 ), vec3( 0, pi, 0 ), this ),
	    new PoolElement( 100, 50, vec3( 50, 0, 0 ), vec3( 0, - pi / 2, 0 ), this ),
	    new PoolElement( 100, 50, vec3( - 50, 0, 0 ), vec3( 0, pi / 2, 0 ), this )
	];
		
	this.skyBox = new SkyBox( 500, 500, 500, scene, 'images/dawnmountain-' );
    this.skyBox.mesh.visible = false;
	
	this.update = function() {

		this.water.update();
		this.wall[ 0 ].update();
		this.wall[ 1 ].update();
		this.wall[ 2 ].update();
		this.wall[ 3 ].update();
		this.floor.update();
		
	};
		
	this.object.add( this.water.mesh );
	this.object.add( this.wall[ 0 ].mesh );	
	this.object.add( this.wall[ 1 ].mesh );
	this.object.add( this.wall[ 2 ].mesh );
	this.object.add( this.wall[ 3 ].mesh );	
	this.object.add( this.floor.mesh );
	this.object.add( this.skyBox.mesh );
	
	scene.add( this.object );
	
};