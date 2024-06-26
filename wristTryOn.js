//below is the source used for rendering models
//https://threejs.org/docs/#examples/en/loaders/GLTFLoader

//below is the source for wrist recognition using mediapipe on web
//https://developers.google.com/mediapipe/solutions/vision/hand_landmarker/web_js

//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";



function Magnitude(v){
  return Math.sqrt(v['x']**2 + v['y']**2 + v['z']**2);
}

function GetUnitVector(v){
  let mag = Magnitude(v);
  let ans = {};
  ans['x'] = v['x']/mag
  ans['y'] = v['y']/mag
  ans['z'] = v['z']/mag
  return ans;
}


function crossProduct(a, b){
    let c = [ a['y'] * b['z'] - a['z'] * b['y'], a['z'] * b['x'] - a['x'] * b['z'], a['x'] * b['y'] - a['y'] * b['x'] ]
    let res = {}
    res['x'] = c[0]
    res['y'] = c[1]
    res['z'] = c[2]
    return res;
}


// global avriables
let objToRender = 'bracelet';

let runPoseEstimation = false
let predictedPoints = null;
let globalWidth = 0;
let globalHeight = 0;
let verticlePerspectiveAngle = 45;
let zDistanceOfScreenFromCamera = 13;
let removedModelFromItsParent = false
if(objToRender == 'golden_watch'){
  zDistanceOfScreenFromCamera = 60;
}


  
let maxVerticalY = 2* zDistanceOfScreenFromCamera*Math.tan(((verticlePerspectiveAngle/2) * Math.PI) / 180);
let maxVerticalX = maxVerticalY * (globalWidth/globalHeight);
let maxVerticalZ = maxVerticalX;


function RenderObject(width, height){
    
  //Create a Three.JS Scene
  const scene = new THREE.Scene();
  //create a new camera with positions and angles
  const camera = new THREE.PerspectiveCamera(verticlePerspectiveAngle, width / height, 0.1, 1000);

  //Keep track of the mouse position, so we can make the eye move
  let mouseX = width / 2;
  let mouseY = height / 2;
  globalWidth = width;
  globalHeight = height;

  //Keep the 3D object on a global variable so we can access it later
  let object;
  let actualObject;

  //OrbitControls allow the camera to move around the scene
  let controls;

  //Set which object to render

  //Instantiate a loader for the .gltf file
  const loader = new GLTFLoader();



  let sizeMultiplierValueElement = document.getElementById("sizeMultiplierValue");

  // for resizing 3d obj size using bounding box
  // resizing is not perfect for all models
  // https://discourse.threejs.org/t/unit-of-measurement-same-scale-for-all-3dmodels-in-three-js-scene-1-1-models-size-are-huge/44420/6
  // this is not working well with current 3d model(not sure why)
  // let mat = new THREE.MeshLambertMaterial({
  //     color: 0xff0000
  // });
  // let sizeReductionConstant = 5;
  // let boxGeom = new THREE.BoxGeometry(maxVerticalX/sizeReductionConstant, maxVerticalY/sizeReductionConstant, maxVerticalZ/sizeReductionConstant);
  // let cube = new THREE.Mesh(boxGeom, mat);
  // cube.name = 'newCUBE';
  // cube.position.set(0, 0, 0)
  // cube.scale.set(1, 1, 1);
  // cube.material.fog = false
  // // scene.current.add(cube);
  // let mainBounds = new THREE.Box3().setFromObject(cube);
  // console.log('main is >>>>>>>>', mainBounds);

  //Load the file
  loader.load(
    `wristTryOnModels/${objToRender}/scene.gltf`,
    function (gltf) {
      //If the file is loaded, add it to the scene
      object = gltf.scene;
      console.log(object);
      
      scene.add(object);
      // let bbox = new THREE.Box3().setFromObject(gltf.scene);
      //           let helper = new THREE.Box3Helper(bbox, new THREE.Color(0xFF8551));
      //           let newBounds = new THREE.Box3().setFromObject(gltf.scene);
      //           console.log('newBounds is >>>>>>>>', newBounds);


      // let lengthSceneBounds = {
      //     x: Math.abs(mainBounds.max.x - mainBounds.min.x),
      //     y: Math.abs(mainBounds.max.y - mainBounds.min.y),
      //     z: Math.abs(mainBounds.max.z - mainBounds.min.z),
      // };

      // // Calculate side lengths of glb-model bounding box
      // let lengthMeshBounds = {
      //     x: Math.abs(newBounds.max.x - newBounds.min.x),
      //     y: Math.abs(newBounds.max.y - newBounds.min.y),
      //     z: Math.abs(newBounds.max.z - newBounds.min.z),
      // };

      // // Calculate length ratios
      // let lengthRatios = [
      //     (lengthSceneBounds.x / lengthMeshBounds.x),
      //     (lengthSceneBounds.y / lengthMeshBounds.y),
      //     (lengthSceneBounds.z / lengthMeshBounds.z),
      // ];

      // // Select smallest ratio in order to contain the model within the scene
      // let minRatio = Math.min(...lengthRatios);

      // // If you need some padding on the sides
      // let padding = 0;
      // minRatio -= padding;

      // // changing min ration by user value
      // let sizeMultiplier = parseFloat(sizeMultiplierValueElement.value);
      // if(sizeMultiplier > 0){
      //   minRatio = minRatio * sizeMultiplier;
        
      //   // Use smallest ratio to scale the model
      //   object.children[0].scale.set(minRatio, minRatio, minRatio);
      // }      

    },
    function (xhr) {
      //While it is loading, log the progress
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      //If there is an error, log it
      console.error(error);
    }
  );

  console.log(loader)

  // geometry.computeBoundingBox();
  
  // var centroid = new THREE.Vector3();
  // centroid.addVectors( geometry.boundingBox.min, geometry.boundingBox.max );
  // centroid.multiplyScalar( 0.5 );
  
  // centroid.applyMatrix4( mesh.matrixWorld );


  //Instantiate a new renderer and set its size
  const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
  renderer.localClippingEnabled = true
  renderer.setSize(width, height);

  //Add the renderer to the DOM
  document.getElementById("container3D").appendChild(renderer.domElement);

  //Set how far the camera will be from the 3D model
  // camera.position.z = objToRender === "golden_watch" ? 25 : 500;
  camera.position.z = zDistanceOfScreenFromCamera

  //Add lights to the scene, so we can actually see the 3D model
  const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
  topLight.position.set(10, 10, 0) //top-left-ish
  topLight.castShadow = true;
  scene.add(topLight);

  const rightLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
  rightLight.position.set(-10, -10, -0) //top-left-ish
  rightLight.castShadow = true;
  scene.add(rightLight);

  const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "golden_watch" ? 1 : 1);
  scene.add( new THREE.AmbientLight( 0x222222 ) );
  scene.add(ambientLight);

  //This adds controls to the camera, so we can rotate / zoom it with the mouse
  if (objToRender === "golden_watch") {
    controls = new OrbitControls(camera, renderer.domElement);
  }

    
  maxVerticalY = 2* zDistanceOfScreenFromCamera*Math.tan(((verticlePerspectiveAngle/2) * Math.PI) / 180);
  maxVerticalX = maxVerticalY * (globalWidth/globalHeight);
  maxVerticalZ = maxVerticalX;

  // Create a plane geometry for the invisible wall
const wallGeometry = new THREE.PlaneGeometry(maxVerticalX, maxVerticalY);

// Create a mesh for the invisible wall
const wallMesh = new THREE.Mesh(wallGeometry);

// Set the wall mesh position in the scene
wallMesh.position.z = 0;

// Create a material with depthWrite set to false
const wallMaterial = new THREE.MeshBasicMaterial({
    depthWrite: false,
    colorWrite: false  // Disable writing to the color buffer
});

// Set the material to the wall mesh
wallMesh.material = wallMaterial;

// Create a stencil material
const stencilMaterial = new THREE.MeshBasicMaterial({
    stencilWrite: true,
    stencilFunc: THREE.AlwaysStencilFunc,
    stencilFail: THREE.ReplaceStencilOp,
    stencilZFail: THREE.ReplaceStencilOp,
    stencilZPass: THREE.ReplaceStencilOp,
    colorWrite: false  // Disable writing to the color buffer
});

// Create a stencil mesh using the same geometry as the wall
const stencilMesh = new THREE.Mesh(wallGeometry, stencilMaterial);

// Set the stencil mesh position in the scene
stencilMesh.position.z = -0.3;

// Add the stencil mesh to the scene
scene.add(stencilMesh);

// Enable the stencil test on the renderer
renderer.autoClearStencil = false;
renderer.clearStencil();
renderer.state.buffers.stencil.setTest(true);

// Add the wall mesh to the scene
scene.add(wallMesh);


actualObject = object
  //Render the scene
  function animate() {
    requestAnimationFrame(animate);
    //Here we could add some code to update the scene, adding some automatic movement

    //Make the eye move
    if (object && objToRender) {
      if(!removedModelFromItsParent && !object.children[0].children[0]){
        console.log(object.children[0].children[0]);
        actualObject = object.children[0].children[0];
        actualObject.removeFromParent();
        removedModelFromItsParent = true;
      }
      //I've played with the constants here until it looked good 
      // object.rotation.y = -3 + mouseX / width * 3;
      // object.rotation.x = -1.2 + mouseY * 2.5 / height;
      
      if(predictedPoints!==null){
        let wristNonPunchPointLandmark = predictedPoints[0];
        let wristPunchPointLandmark = predictedPoints[1];
        let bottomPointLandmark = predictedPoints[2];
        let isHandRight = predictedPoints[7];
        let confidanceOfPoseEstimation = predictedPoints[8];
        let poseYellowPoint = {x: predictedPoints[9], y: predictedPoints[10]};

        let yellowPoint = {x:(wristNonPunchPointLandmark.x + wristPunchPointLandmark.x)/2,
                           y:(wristNonPunchPointLandmark.y + wristPunchPointLandmark.y)/2,
                           z:(wristNonPunchPointLandmark.z + wristPunchPointLandmark.z)/2};
        
        let greenPoint = {x:(wristNonPunchPointLandmark.x),
                          y:(wristNonPunchPointLandmark.y),
                          z:(wristNonPunchPointLandmark.z),}
        let redPoint = {x:(wristPunchPointLandmark.x),
                        y:(wristPunchPointLandmark.y),
                        z:(wristPunchPointLandmark.z),}
        let bluePoint = {x:(bottomPointLandmark.x),
                         y:(bottomPointLandmark.y),
                         z:(bottomPointLandmark.z),}

                         
        function changeWithPose(v, poseYellowPoint, oldYellowOrigin){
          let res = {x:v.x-oldYellowOrigin.x+poseYellowPoint.x,
                     y:v.y-oldYellowOrigin.y+poseYellowPoint.y};
          return res;
        }
        // console.log(predictedPoints[8])
        // console.log('confidance:');
        // console.log(confidanceOfPoseEstimation);
        if(confidanceOfPoseEstimation > 0.5){
          greenPoint = changeWithPose(greenPoint, poseYellowPoint, yellowPoint);
          redPoint = changeWithPose(redPoint, poseYellowPoint, yellowPoint);
          bluePoint = changeWithPose(bluePoint, poseYellowPoint, yellowPoint);
        }

        let centerOfScreen = {x:0.5, y:0.5, z:0};
        
        function translateAxis(v, origin){
          return {x:-(v.x-origin.x), y:-(v.y-origin.y), z:v.z-origin.z};
        }
        function ZeroOneToSized(v){
          return {x:v.x*maxVerticalX, y:v.y*maxVerticalY, z:v.z*maxVerticalZ};
        }

        function LandmarksToWorldPoints(v, origin){
          return ZeroOneToSized(translateAxis(v, origin));
        }

        yellowPoint = LandmarksToWorldPoints(yellowPoint, centerOfScreen);
        greenPoint = LandmarksToWorldPoints(greenPoint, centerOfScreen);
        redPoint = LandmarksToWorldPoints(redPoint, centerOfScreen);
        bluePoint = LandmarksToWorldPoints(bluePoint, centerOfScreen);

        // actualObject.position.x = yellowPoint.x;
        // actualObject.position.y = yellowPoint.y;
        // actualObject.position.z = 0;
        console.log(actualObject);
        // console.log(actualObject.position);

        
        object.position.x = yellowPoint.x;
        object.position.y = yellowPoint.y;
        object.position.z = 0;

        let upVector = {x:bluePoint.x-yellowPoint.x, y:bluePoint.y-yellowPoint.y, z:bluePoint.z-yellowPoint.z}

        // normalizing z values of mediapipe
        // 1
        // multiplying -1 to all the z values as mediapipe and threeja have inverted configuration for z
        let matrix = new THREE.Matrix4().lookAt(
                    new THREE.Vector3(yellowPoint.x, yellowPoint.y, -yellowPoint.z),
                    new THREE.Vector3(greenPoint.x, greenPoint.y, -greenPoint.z),
                    new THREE.Vector3(upVector.x, upVector.y, -upVector.z));
        let targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(matrix);
        // console.log(targetQuaternion);

        object.quaternion.rotateTowards(targetQuaternion, 10).normalize();
        // actualObject.quaternion = targetQuaternion;

        
        // let defaultScale = 1;
        // let scaleMultiplier = distGreenRed/defaultScale;
        // if(zDIstByxDist > 1){
        //   actualObject.children[0].scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
        // }

      }
      

      
    }
    // object.rotation.x = 0;
    renderer.render(scene, camera);
  }

  //Add a listener to the window, so we can resize the window and the camera
  window.addEventListener("resize", function () {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  //add mouse position listener, so we can make the eye move
  // document.onmousemove = (e) => {
  //   mouseX = e.clientX;
  //   mouseY = e.clientY;
  // }

  //Start the 3D rendering
  animate();
}


function FindObjectPoints(results, resultsPose, width, height){
  let index = 0;
  let isHandRight = 1;
  for(let i=0;i<results.handednesses.length;i++){
    if(results.handednesses[i]['categoryName'] == 'Left'){
      index = i;
      isHandRight = -1;
      break;
    }
  }
  let landmarks = results.landmarks[index];
  let bottomPoint = {};
  bottomPoint['x'] = landmarks[0].x;
  bottomPoint['y'] = landmarks[0].y;
  bottomPoint['z'] = landmarks[0].z;
  let indexPoint = {};
  indexPoint['x'] = landmarks[5].x;
  indexPoint['y'] = landmarks[5].y;
  indexPoint['z'] = landmarks[5].z;
  let littlePoint = {};
  littlePoint['x'] = landmarks[17].x;
  littlePoint['y'] = landmarks[17].y;
  littlePoint['z'] = landmarks[17].z;

  let zMultiplier = 1;
  bottomPoint.x *= width;
  bottomPoint.y *= height;
  bottomPoint.z *= width*zMultiplier;
  indexPoint.x *= width;
  indexPoint.y *= height;
  indexPoint.z *= width*zMultiplier;
  littlePoint.x *= width;
  littlePoint.y *= height;
  littlePoint.z *= width*zMultiplier;

  let BC = {};
  let BA = {};
  let CA = {};
  let DA = {};

  
  BA['x'] = indexPoint.x - bottomPoint.x
  BA['y'] = indexPoint.y - bottomPoint.y
  BA['z'] = indexPoint.z - bottomPoint.z
  CA['x'] = littlePoint.x - bottomPoint.x
  CA['y'] = littlePoint.y - bottomPoint.y
  CA['z'] = littlePoint.z - bottomPoint.z
  BC['x'] = indexPoint.x - littlePoint.x
  BC['y'] = indexPoint.y - littlePoint.y
  BC['z'] = indexPoint.z - littlePoint.z

  let unitBA = GetUnitVector(BA)
  let unitCA = GetUnitVector(CA)

  
  DA['x'] = -(unitBA['x'] + unitCA['x'])
  DA['y'] = -(unitBA['y'] + unitCA['y'])
  DA['z'] = -(unitBA['z'] + unitCA['z'])
  
  let unitDA = GetUnitVector(DA)
  let CAcrossBA = crossProduct(CA, BA)
  let unitCAcrossBA = GetUnitVector(CAcrossBA)

  
  let downwardDirecton = {};

  // pushing the yellow point into the wrist (tiny amount)
  // let angle = 30
  let angle = 0
  let mul = Math.tan(angle * (Math.PI/180)) * isHandRight;
  downwardDirecton['x'] = unitDA['x'] - (mul)*unitCAcrossBA['x']
  downwardDirecton['y'] = unitDA['y'] - (mul)*unitCAcrossBA['y']
  downwardDirecton['z'] = unitDA['z'] - (mul)*unitCAcrossBA['z']

  let yellow = {};
  let alpha = 0.5*Magnitude(BC)
  yellow['x'] = bottomPoint.x + alpha*downwardDirecton['x']
  yellow['y'] = bottomPoint.y + alpha*downwardDirecton['y']
  yellow['z'] = bottomPoint.z + alpha*downwardDirecton['z']


  let unitBC = GetUnitVector(BC)
  let sideways = {};

  // tilting the wrist line [NonPunchPoint down, PunchPoint up] (tiny amount)
  // let littleUp = 0.1
  let littleUp = 0.0
  sideways['x'] = unitBC['x'] + (littleUp)*unitDA['x']
  sideways['y'] = unitBC['y'] + (littleUp)*unitDA['y']
  sideways['z'] = unitBC['z'] + (littleUp)*unitDA['z']

  // shifting yellow a little towards nonPunchSide (tiny amount)
  let shift = 5
  yellow['x'] = yellow['x'] + shift*unitBC['x']
  yellow['y'] = yellow['y'] + shift*unitBC['y']
  yellow['z'] = yellow['z'] + shift*unitBC['z']

  
  // caluclating wristPunchPoint and wristNonPunchPoint using width respective BC
  let wristWidth = Magnitude(BC)*1
  let wristPunchPoint = {};
  wristPunchPoint['x'] = yellow['x'] - (wristWidth/2)*sideways['x']
  wristPunchPoint['y'] = yellow['y'] - (wristWidth/2)*sideways['y']
  wristPunchPoint['z'] = yellow['z'] - (wristWidth/2)*sideways['z']

  let wristNonPunchPoint = {};
  wristNonPunchPoint['x'] = yellow['x'] + (wristWidth/2)*sideways['x']
  wristNonPunchPoint['y'] = yellow['y'] + (wristWidth/2)*sideways['y']
  wristNonPunchPoint['z'] = yellow['z'] + (wristWidth/2)*sideways['z']

  let confidanceOfPoseEstimation = 0
  let predictionYellow2 = {x:0, y:0};

  if(runPoseEstimation){
    if(resultsPose != null){
      // Extract the coordinates and depth of the left elbow (Landmark 13)
      let poseLandmarks = resultsPose.landmarks[0];
      // console.log(resultsPose);
      // console.log("jjj");
      // console.log(poseLandmarks[14]);
      let left_elbow = poseLandmarks[14]
      left_elbow.x *= width
      left_elbow.y *= height
      left_elbow.z *= width*zMultiplier
      
      let right_elbow = poseLandmarks[13]
      right_elbow.x *= width
      right_elbow.y *= height
      right_elbow.z *= width*zMultiplier
      // Extract the coordinates and depth of the right elbow (Landmark 14)
      let rightHamdPoseEstimatedWrist = poseLandmarks[15]
      rightHamdPoseEstimatedWrist.x *= width
      rightHamdPoseEstimatedWrist.y *= height
      rightHamdPoseEstimatedWrist.z *= width*zMultiplier
      let leftHamdPoseEstimatedWrist = poseLandmarks[16]
      leftHamdPoseEstimatedWrist.x *= width
      leftHamdPoseEstimatedWrist.y *= height
      leftHamdPoseEstimatedWrist.z *= width*zMultiplier

      let bottomPointOfWrist = bottomPoint
      let ratio = 1 / 8
      if(isHandRight == 1){
        predictionYellow2 = {};
        predictionYellow2['x'] = (1-ratio)*bottomPointOfWrist.x + ratio*right_elbow.x
        predictionYellow2['y'] = (1-ratio)*bottomPointOfWrist.y + ratio*right_elbow.y
        predictionYellow2['z'] = (1-ratio)*bottomPointOfWrist.z + ratio*right_elbow.z // z not so useful
        confidanceOfPoseEstimation = right_elbow.visibility
      }
      else{
        predictionYellow2 = {};
        predictionYellow2['x'] = (1-ratio)*bottomPointOfWrist.x + ratio*left_elbow.x
        predictionYellow2['y'] = (1-ratio)*bottomPointOfWrist.y + ratio*left_elbow.y
        predictionYellow2['z'] = (1-ratio)*bottomPointOfWrist.z + ratio*left_elbow.z // z not so useful
        confidanceOfPoseEstimation = left_elbow.visibility
      }
      // console.log("here");
      // console.log(confidanceOfPoseEstimation);
      
    }
  }

  let wristNonPunchPointLandmark = {'x': wristNonPunchPoint['x']/width, 'y': wristNonPunchPoint['y']/height, 'z':wristNonPunchPoint['z']/width}
  let wristPunchPointLandmark = {'x': wristPunchPoint['x']/width, 'y': wristPunchPoint['y']/height, 'z':wristPunchPoint['z']/width}
  let bottomPointLandmark = {'x': bottomPoint['x']/width, 'y': bottomPoint['y']/height, 'z':bottomPoint['z']/width}

  // console.log(wristNonPunchPointLandmark);
  let data = [wristNonPunchPointLandmark,
              wristPunchPointLandmark,
              bottomPointLandmark,
              width, height, width,
              isHandRight,
              confidanceOfPoseEstimation,
              predictionYellow2['x'],
              predictionYellow2['y']]

  return data;
}




// Copyright 2023 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//      http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
    HandLandmarker,
    PoseLandmarker,
    FilesetResolver,
    DrawingUtils
  } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";
  
  const demosSection = document.getElementById("demos");
  
  let handLandmarker = undefined;
  let poseLandmarker = undefined;
  let runningMode = "IMAGE";
  let enableWebcamButton;
  let webcamRunning;
  let createdObjectRenderer = false;
  let once = 1;
  
  // Before we can use HandLandmarker class we must wait for it to finish
  // loading. Machine Learning models can be large and take a moment to
  // get everything needed to run.
  const createHandLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: "GPU"
      },
      runningMode: runningMode,
      numHands: 2
    });
    demosSection.classList.remove("invisible");
  };
  createHandLandmarker();
  const createPoseLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
        delegate: "GPU"
      },
      runningMode: runningMode,
      numPoses: 2
    });
    demosSection.classList.remove("invisible");
  };
  createPoseLandmarker();
  
  /********************************************************************
  // Demo 1: Grab a bunch of images from the page and detection them
  // upon click.
  ********************************************************************/
  
  // In this demo, we have put all our clickable images in divs with the
  // CSS class 'detectionOnClick'. Lets get all the elements that have
  // this class.
  const imageContainers = document.getElementsByClassName("detectOnClick");
  
  // Now let's go through all of these and add a click event listener.
  for (let i = 0; i < imageContainers.length; i++) {
    // Add event listener to the child element whichis the img element.
    imageContainers[i].children[0].addEventListener("click", handleClick);
  }
  
  // When an image is clicked, let's detect it and display results!
  async function handleClick(event) {
    if (!handLandmarker) {
      console.log("Wait for handLandmarker to load before clicking!");
      return;
    }
  
    if (runningMode === "VIDEO") {
      runningMode = "IMAGE";
      await handLandmarker.setOptions({ runningMode: "IMAGE" });
      await poseLandmarker.setOptions({ runningMode: "IMAGE" });
    }
    // Remove all landmarks drawed before
    const allCanvas = event.target.parentNode.getElementsByClassName("canvas");
    for (var i = allCanvas.length - 1; i >= 0; i--) {
      const n = allCanvas[i];
      n.parentNode.removeChild(n);
    }
  
    // We can call handLandmarker.detect as many times as we like with
    // different image data each time. This returns a promise
    // which we wait to complete and then call a function to
    // print out the results of the prediction.
    const handLandmarkerResult = handLandmarker.detect(event.target);
    const poseLandmarkerResult = poseLandmarker.detect(event.target);
    // console.log(handLandmarkerResult.handednesses[0][0]);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("class", "canvas");
    canvas.setAttribute("width", event.target.naturalWidth + "px");
    canvas.setAttribute("height", event.target.naturalHeight + "px");
    canvas.style =
      "left: 0px;" +
      "top: 0px;" +
      "width: " +
      event.target.width +
      "px;" +
      "height: " +
      event.target.height +
      "px;";
  
    event.target.parentNode.appendChild(canvas);
    const cxt = canvas.getContext("2d");
    for (const landmarks of handLandmarkerResult.landmarks) {
      drawConnectors(cxt, landmarks, HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 5
      });
      drawLandmarks(cxt, landmarks, { color: "#FF0000", lineWidth: 1 });
    }
  }
  
  /********************************************************************
  // Demo 2: Continuously grab image from webcam stream and detect it.
  ********************************************************************/
  
  const video = document.getElementById("webcam");
  const canvasElement_mediapipe = document.getElementById("output_canvas");
  // canvasElement_mediapipe.style.backgroundColor = "rgba(0,0,0,0)"
  const canvasCtx = canvasElement_mediapipe.getContext("2d");

  const parent = document.getElementById("container3D");
  var childCanvasElements = parent.querySelectorAll('canvas');

  
  // Check if webcam access is supported.
  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;
  
  // If webcam supported, add event listener to button for when user
  // wants to activate it.
  if (hasGetUserMedia()) {
    enableWebcamButton = document.getElementById("webcamButton");
    enableWebcamButton.addEventListener("click", enableCam);
  } else {
    console.warn("getUserMedia() is not supported by your browser");
  }
  
  // Enable the live webcam view and start detection.
  function enableCam(event) {
    if (!handLandmarker) {
      console.log("Wait! objectDetector not loaded yet.");
      document.getElementById("instructionsBox").textContent = "Wait! objectDetector not loaded yet, try again in few seconds";
      return;
    }
    document.getElementById("instructionsBox").textContent = "";
    if (webcamRunning === true) {
      webcamRunning = false;
      // enableWebcamButton.innerText = "ENABLE PREDICTIONS";
    } else {
      webcamRunning = true;
      // enableWebcamButton.innerText = "DISABLE PREDICTIONS";
    }
  
    // getUsermedia parameters.
    const constraints = {
      video: true
    };
  
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      video.addEventListener("loadeddata", predictWebcam);
      // video.addEventListener("loadeddata", predictWebcamPose);
    });
  }
  
  let lastVideoTime = -1;
  let results = undefined;
  let resultsPose = undefined;
  
  function DrawDebugsOnCanvas(predictedPoints, canvasCtx, canvas){
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    // console.log(predictedPoints);
    let wristNonPunchPointLandmark = predictedPoints[0];
    let wristPunchPointLandmark = predictedPoints[1];
    let bottomPointLandmark = predictedPoints[2];

    canvasCtx.beginPath();
    canvasCtx.arc(wristNonPunchPointLandmark.x * canvasWidth, wristNonPunchPointLandmark.y * canvasHeight, 5, 0, 2 * Math.PI);
    canvasCtx.fillStyle = 'green'; // Change color as needed
    canvasCtx.fill();
    canvasCtx.closePath();

    // canvasCtx.beginPath();
    // canvasCtx.arc(0.5 * canvasWidth, 0.5 * canvasHeight, 50, 0, 2 * Math.PI);
    // canvasCtx.fillStyle = 'yellow'; // Change color as needed
    // canvasCtx.fill();
    // canvasCtx.closePath();
    
    canvasCtx.beginPath();
    canvasCtx.arc(wristPunchPointLandmark.x * canvasWidth, wristPunchPointLandmark.y * canvasHeight, 5, 0, 2 * Math.PI);
    canvasCtx.fillStyle = 'red'; // Change color as needed
    canvasCtx.fill();
    canvasCtx.closePath();
    
    canvasCtx.beginPath();
    canvasCtx.arc(bottomPointLandmark.x * canvasWidth, bottomPointLandmark.y * canvasHeight, 5, 0, 2 * Math.PI);
    canvasCtx.fillStyle = 'blue'; // Change color as needed
    canvasCtx.fill();
    canvasCtx.closePath();
  }

  async function predictWebcam() {
    let TransformObject = function(){}
    // childCanvasElements.forEach(function(canvas) {
    //     canvas.style.width = globalWidth;
    //     canvas.style.height = globalHeight;
    //     canvas.width = globalWidth;
    //     canvas.height = globalHeight;
    // });

    
    // childCanvasElements.forEach(function(canvas) {
    //   canvas.style.cssText = document.defaultView.getComputedStyle(canvasElement_mediapipe, "").cssText;
    // });
    if(createdObjectRenderer === false){
      
      TransformObject = RenderObject(video.videoWidth, video.videoHeight);
      createdObjectRenderer = true;
    }
    
    canvasElement_mediapipe.style.width = globalWidth;
    canvasElement_mediapipe.style.height = globalHeight;
    canvasElement_mediapipe.width = globalWidth;
    canvasElement_mediapipe.height = globalHeight;
    
    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      await handLandmarker.setOptions({ runningMode: "VIDEO" });
      await poseLandmarker.setOptions({ runningMode: "VIDEO" });
    }
    let startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      results = handLandmarker.detectForVideo(video, startTimeMs);
      resultsPose = poseLandmarker.detectForVideo(video, startTimeMs);
    }
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement_mediapipe.width, canvasElement_mediapipe.height);
    if (results.landmarks.length != 0) {
      for (const landmarks of results.landmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5
        });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
      predictedPoints = FindObjectPoints(results, resultsPose, globalWidth, globalHeight);
      DrawDebugsOnCanvas(predictedPoints, canvasCtx, canvasElement_mediapipe);
      // TransformObject(0,0,predictedPoints);
      // TransformObject(predictedPoints);
      // drawLandmarks(canvasCtx, [predictedPoints[0], predictedPoints[1], predictedPoints[2]], { color: "#FF0000", lineWidth: 2 });
    }
    if(resultsPose.landmarks.length != 0){
      for (const landmark of resultsPose.landmarks) {
        // drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
      }
      // console.log(resultsPose);
      // let poseData = ProcessPoseResults(results);
      // DrawDebugsOnCanvasPose(poseData, canvasCtx, canvasElement_mediapipe);
    }
    canvasCtx.restore(results.landmarks);
    canvasCtx.restore(resultsPose.landmarks);
  
    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam);
    }
  }