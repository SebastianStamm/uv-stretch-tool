'use strict';

var positionOffset = 0;

// register the file drop
function handleFileSelect(e) {
  e.stopPropagation();
  e.preventDefault();

  var files = e.dataTransfer.files;

  var file = files[0];

  var reader = new FileReader();

  reader.onload = function(e) {

    var loader = new THREE.OBJLoader();
    var result = loader.parse( e.target.result );

    var object = result.container;

    model = object;
    
    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {
        child.geometry.computeFaceNormals();
        child.geometry.computeVertexNormals();

        //new THREE.BoxHelper( child );
        console.log(child);

        var s = Math.sqrt(1 / result.scale);
        child.scale.set( 100*s, 100*s, 100*s );
        child.updateMatrix();

        child.geometry.applyMatrix( child.matrix );

        child.position.set( 0, 0, 0 );
        child.rotation.set( 0, 0, 0 );
        child.scale.set( 1, 1, 1 );
        
        child.updateMatrix();
        
        new THREE.BoxHelper( child );
        
        var bb = child.geometry.boundingBox;
        child.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(
          - bb.min.x - (bb.max.x - bb.min.x) / 2 + positionOffset,
          - bb.min.y - (bb.max.y - bb.min.y) / 2,
          - bb.min.z - (bb.max.z - bb.min.z) / 2 
        ) );

        child.updateMatrix();
        
        scene.add( object );

        positionOffset += 50;
      }
    });

  };

  reader.readAsText(file);
}

function handleDragOver(e) {
  e.stopPropagation();
  e.preventDefault();

  e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

document.body.addEventListener('dragover', handleDragOver, false);
document.body.addEventListener('drop', handleFileSelect, false);


var container;

var model;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();


function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 100;

  // scene

  scene = new THREE.Scene();

  var ambient = new THREE.AmbientLight( 0xffffff );
  scene.add( ambient );

  var directionalLight = new THREE.DirectionalLight( 0xffeedd );
  directionalLight.position.set( 0, 0, 1 );
  //scene.add( directionalLight );

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) / 1;
  mouseY = ( event.clientY - windowHalfY ) / 1;

}

//

function animate() {

  requestAnimationFrame( animate );
  render();

}

function render() {

  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;

  camera.lookAt( scene.position );

  renderer.render( scene, camera );

}
