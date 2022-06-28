import * as THREE from "three";
import controls from "camera-controls";
import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useKeyState } from "use-key-state";
import CameraControls from "camera-controls";

controls.install({ THREE });
extend({ controls });

const Controls = ({focus, initialTarget, setInitialTarget, clicked, setClicked, follow, dragged, setDragged }) => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);
  const [keyDown, setKeyDown] = useState(false);
  const [sensitivity, setSensitivity] = useState(5.0);



  let radius = 1;
  focus && focus.current
    ? (radius = focus.current.geometry.parameters.radius)
    : 1;

  camera.far = 100000000;
  camera.near = 0.001;
  camera.fov = 50;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  controls.minDistance = radius + (radius * 0.2);

  console.log({camera})

  // console.log("focus", {focus})

  if (focus) {
    if (clicked) {
      console.log({ clicked });

      //TODO: could probably compare if current focus changes? 
      if(!dragged){
        controls.fitToBox(focus.current, true);
      }
      if(dragged){
        setDragged(!dragged);
      }
      
      // let vectorInit = new THREE.Vector3();
      // focus.current.getWorldPosition(vectorInit);
      // controls.setLookAt(vectorInit.x,vectorInit.y,vectorInit.z, vectorInit.x,vectorInit.y, vectorInit.z, true);

      clicked = setClicked(false);
    }
  }

  const { ...keys } = useKeyState({
    w: "w",
    a: "a",
    s: "s",
    d: "d",
    up: "up",
    down: "down",
    left: "left",
    right: "right",
    plus: "plus",
    minus: "minus",
    enter:"enter",
  });

  let vector = new THREE.Vector3();

  
  // if(keyDown){
  //   controls.infinityDolly = true;
  //   controls.dollyToCursor = true;
  // }
  // if(!keyDown){
  //   controls.infinityDolly = false;
  //   controls.dollyToCursor = false;
  // }

  

  return useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();


   
    if (keys.plus.down) {
      setSensitivity(sensitivity + 0.1)
    }
    if (keys.minus.down) {
      setSensitivity(sensitivity - 0.1);
    }
    if (keys.enter.pressed) {
      setKeyDown(false);
    }

    if (keys.a.pressed) {
      controls.truck((-0.5 * sensitivity) * delta * elapsedTime, 0, true);
      setKeyDown(true);
    }
    if (keys.d.pressed) {
      controls.truck((0.5 * sensitivity) * delta * elapsedTime, 0, true);
      setKeyDown(true);
    }
    if (keys.w.pressed) {
      controls.dolly((0.5 * sensitivity) * delta * elapsedTime, true);
      setKeyDown(true);
    }
    if (keys.s.pressed) {
      controls.dolly((-0.5 * sensitivity) * delta * elapsedTime, true);
      setKeyDown(true);
    }

    if (keys.left.pressed) {
      controls.rotate(
        -0.05 * sensitivity * THREE.MathUtils.DEG2RAD * delta * elapsedTime,
        0,
        true
      );
      setKeyDown(true);
    }
    if (keys.right.pressed) {
      controls.rotate(
        0.05 * sensitivity * THREE.MathUtils.DEG2RAD * delta * elapsedTime,
        0,
        true
      );
      setKeyDown(true);
    }
    if (keys.up.pressed) {
      controls.rotate(
        0,
        -0.05 * sensitivity * THREE.MathUtils.DEG2RAD * delta * elapsedTime,
        true
      );
      setKeyDown(true);
    }
    if (keys.down.pressed) {
      controls.rotate(
        0,
        0.05 * sensitivity * THREE.MathUtils.DEG2RAD * delta * elapsedTime,
        true
      );
      setKeyDown(true);
    }
    if (keys.a.up) {
      // setKeyDown(false);
    }
    if (keys.s.up) {
      // setKeyDown(false);
    }
    if (keys.d.up) {
      // setKeyDown(false);
    }
    if (keys.w.up) {
      // setKeyDown(false);
    }
    if (keys.up.up) {
      // setKeyDown(false);
    }
    if (keys.down.up) {
      // setKeyDown(false);
    }
    if (keys.left.up) {
      // setKeyDown(false);
    }
    if (keys.right.up) {
      // setKeyDown(false);
    }

    if (focus && focus.current) {
      focus.current.getWorldPosition(vector);
      if (keyDown === false) {
        if(initialTarget){
          controls.moveTo(vector.x, vector.y, vector.z, false);
          setInitialTarget(false);
        }
        else{
          // controls.lerpLookAt( currentPosition.x,currentPosition.y,currentPosition.z, currentPosition.x,currentPosition.y,currentPosition.a, vector.x, vector.y, vector.z, vector.x, vector.y, vector.z, 100, true );  
         
         //Could use a toggle to switch state between different follow modes
          // controls.setTarget(vector.x, vector.y, vector.z, true);

          if(follow){
            controls.moveTo(vector.x, vector.y, vector.z, false);
          }
          else{
            controls.setTarget(vector.x, vector.y, vector.z, true);
          }


          // controls.lerpLookAt(currentPosition, vector.x, vector.y, vector.z, true)

          // lerpLookAt( positionAX, positionAY, positionAZ, targetAX, targetAY, targetAZ, positionBX, positionBY, positionBZ, targetBX, targetBY, targetBZ, t, enableTransition )




          // if(clicked){
          //   controls.moveTo(vector.x, vector.y, vector.z, true);
          //   clicked = setClicked(false);
          // }
          // else{
          //   controls.moveTo(vector.x, vector.y, vector.z, false);
          // }
        }
       

      }
    }
    return controls.update(delta);
  });
};

export default Controls;
