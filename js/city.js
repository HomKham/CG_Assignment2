var width = 500;
var height = 300;
var mesh,cylinder,plane,park;
var fov = 70;
var	aspect = width / height;
var	near = 1;
var	far = 3000;
var cubes = [];	
var buildings = [];
var light;	
var gui;
var camera;	
var hit = 0; 
var scene;

//raycaster
var raycaster = new THREE.Raycaster();

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = 100;
camera.position.z = 100;
camera.position.y = 100;
camera.lookAt(new THREE.Vector3(0, 0, 0));

lighting();
var renderer = new THREE.WebGLRenderer();
document.getElementById( "container" ).appendChild( renderer.domElement );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

//html call function
document.getElementById("rayTracing").onclick = function() {renderRayForLandmark()};

document.getElementById("shadowMap").onclick = function() {getRaysPark();};

// create multiple building
var createBox = function() {
  var mx = -60;
  var my = 0;
  var mz = -80;
  var height;
  var space = 20;
  for (var i=0; i<7; i++) {
    for (var j=-1; j<2; j++) {
    height = Math.floor(Math.random() * 11) + 40;
    var geometry = new THREE.BoxBufferGeometry( 15, height, 15 );
    var material = new THREE.MeshPhongMaterial({color: '#8AC'});
    window.mesh = new THREE.Mesh(geometry, material);
    window.mesh.castShadow = true;
    window.mesh.receiveShadow = true;
    window.mesh.position.set(mx+(space *j), height/2, mz +(space*i));
    window.cubes.push(window.mesh);
    buildings.push(window.mesh);
    scene.add(window.mesh);
    }
    
    for (var j=8; j<11; j++) {
    height = Math.floor(Math.random() * 11) + 20;
    var geometry = new THREE.BoxBufferGeometry( 15, height, 15 );
    var material = new THREE.MeshPhongMaterial({color: '#8AC'});
    window.mesh = new THREE.Mesh(geometry, material);
    window.mesh.castShadow = true;
      window.mesh.receiveShadow = true;
    
    window.mesh.position.set(mx+(space *j), height/2, mz +(space*i));
    window.cubes.push(window.mesh);
    buildings.push(window.mesh);
    scene.add(window.mesh);
    }					
  }
 
  for (var i=8; i<9; i++) {
    for (var j=-4; j<7; j++) {
    height = Math.floor(Math.random() * 70);
    var geometry = new THREE.BoxBufferGeometry( 15, height, 20 );
    var material = new THREE.MeshPhongMaterial({color: '#8AC'});
    window.mesh = new THREE.Mesh(geometry, material);
    window.mesh.castShadow = true;
      window.mesh.receiveShadow = true;
    window.mesh.position.set(mx+(space *j), height/2, mz +(space*i));
    window.cubes.push(window.mesh);
    buildings.push(window.mesh);
    scene.add(window.mesh);
    }
    for (var j=8; j<11; j++) {
    height = Math.floor(Math.random() * 11) + 60;
    var geometry = new THREE.BoxBufferGeometry( 15, height, 20 );
    var material = new THREE.MeshPhongMaterial({color: '#8AC'});
    window.mesh = new THREE.Mesh(geometry, material);
    window.mesh.castShadow = true;
      window.mesh.receiveShadow = true;
    window.mesh.position.set(mx+(space *j), height/2, mz +(space*i));
    window.cubes.push(window.mesh);
    buildings.push(window.mesh);
    scene.add(window.mesh);
    }
  }
  for (var i=0; i<3; i++) {
    for (var j=-4; j<-1; j++) {
    height = Math.floor(Math.random() * 6) + 40;
    var geometry = new THREE.BoxBufferGeometry( 15, height, 20 );
    var material = new THREE.MeshPhongMaterial({color: '#8AC'});
    window.mesh = new THREE.Mesh(geometry, material);
    window.mesh.castShadow = true;
      window.mesh.receiveShadow = true;
    window.mesh.position.set(mx+(space *j), height/2, mz +(space*i));
    window.cubes.push(window.mesh);
    buildings.push(window.mesh);
    scene.add(window.mesh);
    }
  }
  for (var i=4; i<6; i++) {
    for (var j=-4; j<-1; j++) {
    height = Math.floor(Math.random() * 11) + 70;
    var geometry = new THREE.BoxBufferGeometry( 10, height, 15 );
    var material = new THREE.MeshPhongMaterial({color: '#8AC'});
    window.mesh = new THREE.Mesh(geometry, material);
    window.mesh.castShadow = true;
      window.mesh.receiveShadow = true;
    window.mesh.position.set(mx+(space *j), height/2, mz +(space*i));
    window.cubes.push(window.mesh);
    buildings.push(window.mesh);
    scene.add(window.mesh);
    }
  }
      /** represented building**/
      var geometry = new THREE.CylinderGeometry( 10, 10, 100, 10 );
      var material = new THREE.MeshPhongMaterial( {color: '#8AF'} );
      window.cylinder = new THREE.Mesh( geometry, material );
      window.cylinder.castShadow = true;
      window.cylinder.receiveShadow = true;
      window.cylinder.position.set(mx+(space*(5)), 100/2, mz+(space*3));
      buildings.push(cylinder);
      scene.add( window.cylinder );
};

//Plane
var createFloor = function() {
var planeGeometry = new THREE.PlaneBufferGeometry(300, 200, 0, 0);
var planeMaterial = new THREE.MeshPhongMaterial( {
    color: 0xa0adaf
  } );
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI/2;
plane.position.set(0, 0, 0);
plane.receiveShadow = true;
scene.add(plane);
};

//Grass Park
var createPark = function() {
var planeGeometry = new THREE.PlaneBufferGeometry(120, 120, 0, 10);
var planeMaterial = new THREE.MeshStandardMaterial( {
    color: 'green'
  } );
window.park = new THREE.Mesh(planeGeometry, planeMaterial);
window.park.rotation.x = -Math.PI/2;
window.park.position.set(30, 1, -20);
window.park.receiveShadow = true;
scene.add(window.park);
};

//Lighting
function lighting() {
  scene.add( new THREE.AmbientLight( 0x404040 ) );
  const color = 0xFFFFFF;
  const intensity = 1;
  window.light = new THREE.DirectionalLight(color, intensity);
  window.light.castShadow = true;
  window.light.shadow = new THREE.LightShadow( new 
              THREE.PerspectiveCamera(fov, aspect, near, far));

  // for spotlight
  window.light.angle = Math.PI / 2;
  window.light.penumbra = 0.3;
  window.light.shadow.bias = 0.0001;
  
  window.light.shadow.camera.near = 10;
  window.light.shadow.camera.far = 500;
  window.light.shadow.mapSize.width = 2048;
  window.light.shadow.mapSize.height = 1024;
  window.light.position.set(2, 200, 100);
  window.light.shadow.radius = 3;
  scene.add( new THREE.CameraHelper( window.light.shadow.camera ) );
  window.light.target.position.set(20, 1.1, -40);
  scene.add(window.light);
  scene.add(window.light.target);
};

function makeXYZGUI(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -300, 300).onChange(onChangeFn);
  folder.add(vector3, 'y', 100, 200).onChange(onChangeFn);
  folder.add(vector3, 'z', 50, 100).onChange(onChangeFn);
  folder.open();
};

// GUI control for light object
function buildGui() {

  gui = new dat.GUI();

  var helper = new THREE.SpotLightHelper(window.light, 10);
  scene.add(helper);
  const onChange = () => {
  light.target.updateMatrixWorld();
  helper.update();
  };
  onChange();
  var params = {
    intensity: window.light.intensity,
  };

  gui.add( params, 'intensity', 0, 2 ).onChange( function ( val ) {
      window.light.intensity = val;
  } );
  makeXYZGUI(gui, light.position, 'position', onChange);
  gui.open();

  }

// raytracing for landmark
function renderRayForLandmark() {
  // update ray with the landmark and mouse position
  var angle = 0;
  for(var d=0; d <= 360; d ++){
    for (var h= 10; h < height;) {
      var angleRad = (d * Math.PI) / 180;
      var x_axis = Math.sin(angleRad);
      var y_axis = Math.cos(angleRad);
      var origin = window.cylinder.position.clone();
      origin.y = h;
      var direction = new THREE.Vector3(x_axis,0,y_axis).normalize();
      raycaster.set(origin, direction );

      // calculate objects intersecting the picking ray
      var intersects = raycaster.intersectObjects( window.cubes, true );
      
      if ( intersects.length > 0 ) {
      for ( var i = 0; i < intersects.length; i++ ) {
      	var arrowHelper = new THREE.ArrowHelper( direction, origin, intersects[i].distance, 'red' );
      	scene.add( arrowHelper );
        intersects[ i ].object.material.color.set( 'pink' );
        hit++;
      }
    }
    h = h+10;
  }
  }
  renderer.render( scene, camera );
  }

  // shadowMap
function drawShadowMap(data) {

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis
  var x = d3.scaleLinear()
    .domain([-30, 80])
    .range([ margin.left, width - margin.right ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-80, 35])
    .range([ height - margin.bottom, margin.top ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Prepare a color palette
  var color = d3.scaleLinear()
      .domain([0, 0.1]) // Points per square pixel.
      .range(["green", "#9df2be"])

  // compute the density data
  var densityData = d3.contourDensity()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); })
    .size([width, height])
    .bandwidth(30)
    (data)

  // show the shape!
  svg.insert("g", "g")
    .selectAll("path")
    .data(densityData)
    .enter().append("path")
      .attr("d", d3.geoPath())
      .attr("fill", function(d) { return color(d.value); })

  }

  // get ray for the park
  function getRaysPark() {
    // update ray with the landmark and mouse position
    var graph_data= [];
    var x_coords = window.park.geometry.parameters.width;
    var y_coords = window.park.geometry.parameters.height;
    for(var x=window.park.position.x - (x_coords-1)/2; x < window.park.position.x + x_coords/2;) {
        for(var y=window.park.position.z - (y_coords/2); y < window.park.position.z + y_coords/2;) {
          var origin = new THREE.Vector3(x,1,y);
          
          var target = window.light.position.clone();
          var direction = new THREE.Vector3().subVectors( target, origin ).normalize();
          raycaster.set(origin, direction );
  
          // calculate objects intersecting the picking ray
          var intersects = raycaster.intersectObjects( buildings);
          
          if ( intersects.length > 0 ) {
          var shadows = {};  
          for ( var i = 0; i < intersects.length; i++ ) {
            shadows = {
              x : intersects[i].point.x,
              y : intersects[i].point.z
            };
            graph_data.push(shadows);
            var arrowHelper = new THREE.ArrowHelper( direction, origin, intersects[i].distance, 'red' );
            scene.add( arrowHelper );
           intersects[ i ].object.material.color.set( 'pink' );
          }
        }
          y = y+5;
        }
        x = x+10;
      }
      drawShadowMap(graph_data);
}
  
// animate function
function animate() {
  controls.update();
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
createBox();
createFloor();
createPark();
animate();
buildGui();