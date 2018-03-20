// var img = document.createElement("IMG");
//     img.src = imageSource;
//     img.setAttribute('id', imageId);
//     document.getElementById("backup").appendChild(img);



// var backupDiv = document.getElementById('backup');
// var backup = document.createElement("img");
// // backupDiv.appendChild(renderer.domElement);
// backup.src = 'backup.jpg';
// backup.setAttribute("height", window.innerHeight+200);
// backup.classList.add("backup");
// document.getElementById("backup").appendChild(backup);
// document.getElementById("placehere").appendChild("elem");

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var animationOffsets = {
// scene: {
// 	position: {
// 		x: 0,
// 		y: 0,
// 		z: 0,
// 	}
// }
};
var options = {
dotSize: 12,
density: 5, // расстояние между точками
resolution: 150, // разрешение объекта
nerve: 3, // дерганность шариков 1-5
twitchDist: 10, // диапазон содрогания точек
amount: 4000, // количество точек
};
var raycaster;
var mouse = new THREE.Vector2(), INTERSECTED;

var colorRed = 0xe6430a;

canvas.width = options.resolution;
canvas.height = options.resolution;
canvas.classList.add('tempcanvas');
document.body.appendChild(canvas);

var camera, controls, scene, renderer, geometry, currentImage = 0, galleryData = [], pivot;
k=0;
// var pivot = new THREE.Group();
var images = [
	'svg/Lost_gfx.svg'
];

var query = "(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)";
 
if (matchMedia(query).matches) {
  // do high-dpi stuf
  var retinaCheck = 1;
  var www = window.innerWidth/2;
  var hhh = window.innerHeight/2;

} else {
  // do non high-dpi stuff
  var retinaCheck = 0;
  var www = window.innerWidth;
  var hhh = window.innerHeight;
}

window.onerror = function() {
  document.getElementById("backup").style.backgroundImage = 'url("backup.jpg")';
  document.getElementById("container").remove();
  document.getElementById("loading").classList.remove("blink_me");
  // $("#loading").css({bottom: '35%'});
  document.getElementById("loading").innerHTML = ("INTRO NOT LOADING, <br>MAYBE CHANGE BROWSER? <br><br> SCROLL DOWN PLEASE");
  return true;
};
// iii
document.addEventListener("DOMContentLoaded", function(event) {
loadImages(images, function(loadedImages) {
loadedImages.forEach(function(el, index) {
	galleryData.push(getArrayFromImage(loadedImages[index]));
});});
mouseX = 0, mouseY = 0;
windowHalfX = www / 2;
windowHalfY = hhh / 2;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'click', onDocumentClick, false );
// window.addEventListener('mouseup', mouseOut, false);
document.onmouseout = function() {
	mouseX=0;
	mouseY=0;
};


// var nParticles = .05;
var i = 0;
// var pivot = new THREE.Group();
// setTimeout(function(){
init();

});

function scrollUp() {
	console.log(window.innerHeight-70)
	$(window.parent.top.document).find("html, body").animate({
		// $("html, body").animate({
		scrollTop: window.innerHeight-70
	},500, 'swing');
}


function init() {
	
	// 
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x0e0e0e);
	scene.fog = new THREE.Fog( 0x0e0e0e, 20, 4000);
	// scene.fog = new THREE.FogExp2( 0x0e0e0e, 0.0009 );
	// raycaster = new THREE.Raycaster();
	renderer = new THREE.WebGLRenderer({
	  antialias: true
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(www, hhh);
	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(90, www / hhh, 1, 10000);
	camera.position.z = 1000;
	// camera.minDistance = 50;


	controls = new THREE.OrbitControls( camera, renderer.domElement );
	// controls.addEventListener( 'change', render ); // remove when using animation loop
	controls.enableZoom = false;
	controls.enableDamping = true;
	if (/Mobi/.test(navigator.userAgent)) {
	controls.dampingFactor = .07;
	controls.rotateSpeed = 0.02;
	} else{
	controls.dampingFactor = .07;
	controls.rotateSpeed = 0.1;
	}
	controls.minDistance = 200;
	controls.maxDistance = 1700;
	controls.enabled=false;


	var spotLight = new THREE.DirectionalLight(0xffffff);
        spotLight.position = new THREE.Vector3(0,0,900);
        spotLight.intensity = 0.12;
        spotLight.target = scene;
        spotLight.name="spotLight"
        // scene.add(spotLight);

        

	var loader = new THREE.FontLoader();

	loader.load( 'font/Rajdhani_Regular.json', function ( font ) {
	  var geoTxtLost = new THREE.TextGeometry('LOSTCONVERSATION', {
	    font: font,
	    size: 60,
	    bevelEnabled: false,
	    height: 1
	  });
	  THREE.GeometryUtils.center( geoTxtLost );
	  var mat = new THREE.MeshBasicMaterial( {
	            color: 0xffffff, //60ff00,
	            transparent: true,
	            opacity: .5
	        } );
	  var lostTxt = new THREE.Mesh(geoTxtLost, mat);
	// console.log(name1.position.z)
	  lostTxt.position.set(0, -200, 1750);

	  lostTxt.name = 'lostTxt';
	  lostTxt.class = "blink_me";
	  scene.add(lostTxt);



	  var geoTxtName1 = new THREE.TextGeometry('MOTION DESIGN', {
	    font: font,
	    size: 12,
	    bevelEnabled: false,
	    height: 1
	  });
	  THREE.GeometryUtils.center( geoTxtName1 );
	  var mat2 = new THREE.MeshBasicMaterial( {
	            color: 0xffffff,
	            transparent: true,
    			// opacity: 0.5
	        } );
	  var name1 = new THREE.Mesh(geoTxtName1, mat2);
	  name1.name = 'name1';
	  name1.position.y=50;
	  name1.position.z=1750;
	  scene.add(name1);

	  var geoTxtName2 = new THREE.TextGeometry('finally interactive', {
	    font: font,
	    size: 9,
	    bevelEnabled: false,
	    height: 1
	  });
	  THREE.GeometryUtils.center( geoTxtName2 );
	  var name2 = new THREE.Mesh(geoTxtName2, mat2);
	  name2.name = 'name2';
	  name2.position.y=30;
	  name2.position.z=1750;
	  scene.add(name2);

	  var btn = new THREE.Object3D();
	  btn.name="btn";
	  scene.add(btn);

	  	geometry3 = new THREE.PlaneGeometry(70,10, 1,1)
        mat3 = new THREE.MeshBasicMaterial({
        color: 0xffffff
        // transparent: true,
        // opacity: 0.5
        });
        material3 = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
        });
        // var SubdivisionModifier = require('three-subdivision-modifier');
        // var modifier = new SubdivisionModifier( 222 ); // Number of subdivisions
        // modifier.modify( geometry3 ); // Modifies geometry in place
        planeBG = new THREE.Mesh(geometry3, material3);
        planeBG.position.x = 0;
        planeBG.position.y = 10;
        planeBG.position.z = 0;
        planeBG.name="planeBG";
        // planeBG.visible = false;
        // planeBG.scale.set(5,5,5)
        btn.add(planeBG);


	  var geoTxtName3 = new THREE.TextGeometry('OR EXPLORE PROJECTS', {
	    font: font,
	    size: 5,
	    bevelEnabled: false,
	    height: 1
	  });
	  THREE.GeometryUtils.center( geoTxtName3 );
	  var name3 = new THREE.Mesh(geoTxtName3, mat3);
	  name3.name = 'name3';
	  // name3.position.y=-2000;
	  name3.position.z=-8888;
	  name3.position.y=-10;
	  scene.add(name3);

	  var geoTxtName4 = new THREE.TextGeometry("CLICK & DRAG AROUND", {
	    font: font,
	    size: 5,
	    bevelEnabled: false,
	    height: 1
	  });
	  THREE.GeometryUtils.center( geoTxtName4 );
	  var name4 = new THREE.Mesh(geoTxtName4, mat2);
	  name4.name = 'name4';
	  name4.position.y=-2;
	  name4.position.z=-8888;
	  // name4.userData = { URL: "http://stackoverflow.com"};
	  scene.add(name4);

	  



	  // var geoTxtNameLoading = new THREE.TextGeometry("loading", {
	  //   font: font,
	  //   size: 8,
	  //   bevelEnabled: false,
	  //   height: 1
	  // });
	  // THREE.GeometryUtils.center( geoTxtNameLoading );
	  // var nameLoading = new THREE.Mesh(geoTxtNameLoading, mat2);
	  // nameLoading.name = 'loading';
	  // nameLoading.position.y=0;
	  // // nameLoading.position.z=500;
	  // // name4.userData = { URL: "http://stackoverflow.com"};
	  // scene.add(nameLoading);

	  document.getElementById("loading").innerHTML = "READY";
	 // document.getElementById('container').css('cursor', 'pointer');
	
	setTimeout(function(){
	document.getElementById("loading").innerHTML = "GO!";
	createScene();
	animate();
	},500)

	// dragCam();
	
	});


	// stats = new Stats();
	// container.appendChild( stats.dom );

	window.addEventListener('resize', onWindowResize, false);


}



function createScene(argument) {
var nParticles = .00005;
// var geometry2 = new THREE.CircleGeometry(80,33);
// var mat = new THREE.MeshBasicMaterial( {
// 	            color: 0x00fc4d
// 	        } );
// 	 particle = new THREE.Mesh(geometry2, mat);
if (/Mobi/.test(navigator.userAgent)) {
		partSize = 4;
	}else{
	partSize = 2;
	}
	
var texture = (new THREE.TextureLoader).load("svg/particle_128.png");
var material = new THREE.PointsMaterial({
	size: partSize,
	// vertexColors: THREE.VertexColors,
	color: colorRed,
	map: texture,
	alphaTest: 0.5,
	// transparent: true,
	// opacity: .5
});

geometry = new THREE.Geometry();
var x, y, z;

// var nParticles = .05;
galleryData[currentImage].forEach((el, index) => {
	nParticles+=.0001;
	// material.size +=.0001,
	geometry.vertices.push(new THREE.Vector3(
		el.x - Math.random() * 3,
		el.y - Math.random() * 3,
		Math.random() * (options.resolution / nParticles)
	));
});

	 pointCloud = new THREE.Points(geometry, material);
	pointCloud.position.z=-800;
	pointCloud.name="pointCloud"
	scene.add(pointCloud);




		// for ( var z= -1000; z < 1000; z+=10 ) {
		//   var geometry = new THREE.ConeGeometry( 3,5,3 );
		//   var material = new THREE.MeshBasicMaterial( { flatShading: true, color: 0x666666  } );
		//   var starGroup;
		//   var star = new THREE.Mesh(geometry, material)
		//   star.position.x = Math.random() * 3000 - 1500;
		//   star.position.y = Math.random() * 3000 - 1500;
		//   star.position.z = z;
		//   star.rotation.x=Math.PI;
		// // star.scale.x = star.scale.y = 2;
		// scene.add( pivot );
		// pivot.add( star );
		// // stars.push(star);
		// star.name="Star"
		// }



	geometry = new THREE.IcosahedronGeometry(5000, 3)
	material = new THREE.MeshBasicMaterial({
	color: 0x333333,
	wireframe: true
	});
	// console.log(cube.position.z)
	dome = new THREE.Mesh(geometry, material);
	dome.position.y = 0;
	dome.name="dome"
	scene.add(dome);

	 lostTxt = scene.getObjectByName('lostTxt');
	this.lostTxt=lostTxt;
	 name1 = scene.getObjectByName('name1');
	this.name1=name1;
	 name2 = scene.getObjectByName('name2');
	this.name2=name2;
	name3 = scene.getObjectByName('name3');
	this.name3=name3;
	name4 = scene.getObjectByName('name4');
	this.name4=name4;
	 icoPlay = scene.getObjectByName('icoPlay');
	this.icoPlay=icoPlay;


	coolEase = "M0,0 C0.466,0 0.476,0.318 0.55,0.602 0.646,0.972 0.806,1 1,1";

	t0 = new TimelineLite()
	t0
		.from(pointCloud.position, 5, {ease: CustomEase.create("custom", coolEase), y:0, z:1006 } ,0)
	  .from(pointCloud.scale, 5, {ease: CustomEase.create("custom", coolEase), y:.00004, x:.00004 } ,0)
	;

	// pointCloud.traverse( function ( object ) { object.visible = false; } );
	// dome.traverse( function ( object ) { object.visible = false; } );
	lostTxt.traverse( function ( object ) { object.visible = false; } );
	// name1.traverse( function ( object ) { object.visible = false; } );
	// name4.traverse( function ( object ) { object.visible = false; } );
	// playGroup.traverse( function ( object ) { object.visible = false; } );

	setTimeout(function(){
		document.getElementById("loading").remove();
	},500)

	canvas.style.display = "block";
	// drawCurrentImgOnCanvas();

	// console.log(coolEase)
	t1 = new TimelineLite()
	t1
	// .to(lostTxt.position, 2, {z:0, ease: CustomEase.create("custom", coolEase)}, 2)
  	.to(name1.position, 4, {z:0, ease: CustomEase.create("custom", coolEase)}, 2)
 	.to(name2.position, 4, {z:0, ease: CustomEase.create("custom", coolEase)}, 3)
 	.to(name3.position, 4, {z:0, ease: CustomEase.create("custom", coolEase)}, 4.2)
 	.to(name4.position, 4, {z:0, ease: CustomEase.create("custom", coolEase)}, 4)
 	.to(dome.scale, 5, {x:.5, y:.5, z:.5, ease: CustomEase.create("custom", coolEase), onComplete: function(){controls.enabled=true;}}, 3)
 // 	.from(pivot.position, 6, {z:2000, ease: CustomEase.create("custom", coolEase)}, 7)
 	.to(camera.position, 7, {z:200, ease: CustomEase.create("custom", coolEase)}, 2)
 	.to(pointCloud.position, 2, {z:-200, ease: CustomEase.create("custom", coolEase)}, 5)
 	// .to(name1.position, 8, {z:-3000, ease: CustomEase.create("custom", coolEase)}, 13)
 	// .to(name2.position, 8, {z:-3000, ease: CustomEase.create("custom", coolEase)}, 13.3)

}






function clone1(){
k+=1;
var pC = scene.getObjectByName('pointCloud');

var newCloud = pC.clone();
newCloud.position.set(0,0,k*100-100);
newCloud.name="newCloud"+k+"a";
newCloud.scale.set(5,5,5);
// newCloud.material.transparent = true;
// newCloud.material.opacity = .2;
scene.add(newCloud);


geometry = new THREE.IcosahedronGeometry(2000, 3)
	material = new THREE.MeshBasicMaterial({
	color: 0x2f2f2f,
	wireframe: true,
	transparent: true
	});
	// console.log(cube.position.z)
	dome = new THREE.Mesh(geometry, material);
	// console.log(cube.position.z)
	dome.position.y = 0;
	// cube.position.y = 1500;
	dome.rotation.x = -20;
	dome.rotation.y = -20;
	// console.log(cube.position.z)
	dome.name="dome"
	scene.add(dome);
// obj1(8000);

// var dome = setTimeout(function(obj1), 2000);


let tlHello = new TimelineMax();
	tlHello
	.fromTo(newCloud.position, 3, {ease: Power2.easeInOut, z: 4000 }, { z: -3000 } ,1)
	// .from(dome.material, 2, {ease: Power2.easeInOut, css:{opacity:0}}, 0)
	.from(dome.scale, 4, {ease: Power2.easeInOut, x:0, y:0, z:0 }, 0)
	;

	// $('html,body').css('cursor', 'pointer');

}





function shoot(){
	event.preventDefault();
var pC = scene.getObjectByName('pointCloud');

var shot = pC.clone();
shot.position.set(0,0,k*100-100);
shot.name="shot"+k+"a";
shot.scale.set(.1,.1,1);
// newCloud.material.transparent = true;
// newCloud.material.opacity = .2;
scene.add(shot);
var shotX = mouseX*1
var shotY = -mouseY*1
if (camera.position.z<=0){
	shotX = -shotX
}
let tlHello = new TimelineMax();
	tlHello
	.fromTo(shot.position, 4, {ease: Power2.easeInOut, x:shotX, y:shotY, z: 1000 }, { z: -6000, onComplete: cleanShot } ,0)
	.to(shot.scale, 4, {ease: Power2.easeInOut, x:.2, y:.2, z: .002} ,0)
	;

function cleanShot(){
scene.remove(shot);
}


}









function onDocumentClick(event){



	shoot();

	raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );
    var btn = scene.getObjectByName( "btn" , true)
        if (!btn){} else {

    var int2 = raycaster.intersectObjects( btn.children, true );
    // console.log(mouse, btn, btn.children, int2.length)
    // var INTERSECTED
        if ( int2.length > 0 ) {
        	// console.log("yo");

        	window.parent.top.location = "https://www.lostconversation.com/interactive"; 

            var INTERSECTED1;
            if ( INTERSECTED1 != int2[ 0 ].object ) {
                INTERSECTED1 = int2[ 0 ].object;

				// INTERSECTED1.material.opacity(.5);
                // console.log("yo");
        }
            
    }     
    }

    





}






function onWindowResize() {
	
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	if (retinaCheck == 0){
		windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	renderer.setSize( window.innerWidth, window.innerHeight );
	} else {
	windowHalfX = window.innerWidth / 4;
	windowHalfY = window.innerHeight / 4;
	renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
	}
}
function onDocumentMouseMove(event) {

	mouseX = ( event.clientX - windowHalfX ) * .5;	
	mouseY = ( event.clientY - windowHalfY ) * .5;

	mouse.x = (( event.clientX / windowHalfX ) ) -1;
    mouse.y = (( event.clientY / windowHalfY ) ) -1;


	raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );
    var btn = scene.getObjectByName( "btn" , true)
        if (!btn){} else {

    var int2 = raycaster.intersectObjects( btn.children, true );
    console.log(mouse, btn, btn.children, int2.length)
    // var INTERSECTED
        if ( int2.length > 0 ) {
        	// console.log("yo");
            var INTERSECTED1;
            if ( INTERSECTED1 != int2[ 0 ].object ) {
                INTERSECTED1 = int2[ 0 ].object;
                var hover = scene.getObjectByName( "name3" )
				hover.material.color.setHex( colorRed );
				$('html,body').css('cursor', 'pointer');
				// document.getElementById('container').css('cursor', 'pointer');
                // console.log("yo");
        }
            
    }else{
    	$('html,body').css('cursor', 'crosshair');
    	var hover = scene.getObjectByName( "name3" )
				hover.material.color.setHex( 0xffffff );
    }  
    }

}





function loadImages(paths, whenLoaded) {
	var imgs = [];
	var loadedImgsCounter = 0;

	paths.forEach(function(path, i) {
		var img = new Image;
		img.setAttribute('crossOrigin', '');
		img.onload = function() {
			if (img.complete) {
				imgs[i] = img;
				loadedImgsCounter++;
				if (loadedImgsCounter == paths.length) {
					whenLoaded(imgs)
				};
			}

		}
		img.src = path;
	});
}

function fillUp(array, max) {
	var length = array.length;

	let counter = 0;
	if (length > max) {
		for (; array.length > max;) {
			length = array.length;
			for (i = 0; i < length - max; i++) {
				array.splice(Math.floor(Math.random() * length), 1);
			}
		}

	} else {
		for (i = 0; i < max - length; i++) {
			array.push(array[Math.floor(Math.random() * length)])
		}

	}


	return array;
}

function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
	return a;
}

function drawImageScaled(img, context) {
	context = context || ctx;
	let canvas = context.canvas;
	let hRatio = canvas.width / img.width;
	let vRatio = canvas.height / img.height;
	let ratio = Math.min(hRatio, vRatio);
	let centerShift_x = (canvas.width - img.width * ratio) / 2;
	let centerShift_y = (canvas.height - img.height * ratio) / 2;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(img, 0, 0, img.width, img.height,
		centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}

function clearScene(arg) {
	while(scene.children.length > 0) {
		scene.remove(scene.children[0]);
	}
}

function drawCurrentImgOnCanvas(argument) {
	loadImages(images, function(imgs){
		drawImageScaled(imgs[currentImage], ctx);
	});
}


function getArrayFromImage(img) {
	let imageCoords = [];
	// ctx.clearRect(0, 0, options.resolution, options.resolution);

	img.prop = img.height / img.width;

	drawImageScaled(img, ctx);
	let data = ctx.getImageData(0, 0, options.resolution, options.resolution);
	data = data.data;

	for (let y = 0; y < options.resolution; y++) {
		for (let x = 0; x < options.resolution; x++) {
			let red = data[((options.resolution * y) + x) * 4];
			let green = data[((options.resolution * y) + x) * 4 + 1];
			let blue = data[((options.resolution * y) + x) * 4 + 2];
			let alpha = data[((options.resolution * y) + x) * 4 + 3];
			if (alpha > 0) {
				imageCoords.push({
					x: options.density * (x - options.resolution / 2),
					y: options.density * (options.resolution / 2 - y),
					red: red,
					green: green,
					blue: blue
				});
			}
		}
	}
	return shuffle(fillUp(imageCoords, options.amount));
}




function animate() {

	if (dome) dome.rotation.y+=0.0003;
	requestAnimationFrame(animate);


	render();
	// stats.update();
}
function render() {

	myTimerVideo0 = setTimeout( function() {
		controls.update();
		
		// console.log("sdf")
		camera.position.x += ( mouseX - camera.position.x ) * .03;
		camera.position.y += ( - mouseY - camera.position.y ) * .03;
	}, 8000 );
	// options.dotSize+= .001;
	if(camera.position.z<=0){
		lostTxt.rotation.y=Math.PI;
		name1.rotation.y=Math.PI;
		name2.rotation.y=Math.PI;
		name3.rotation.y=Math.PI;
		name4.rotation.y=Math.PI;
	} else {lostTxt.rotation.y=0;name1.rotation.y=0; name2.rotation.y=0, name3.rotation.y=0, name4.rotation.y=0}


	camera.lookAt( scene.position );
	renderer.render( scene, camera );
}
