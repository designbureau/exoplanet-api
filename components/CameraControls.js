import * as THREE from 'three'
import CameraControls from "camera-controls";
import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useKeyState } from "use-key-state";


CameraControls.install({ THREE })
extend({ CameraControls })

const Controls = ({cameraPosition, focus}) => {

  let width = window.innerWidth;
  let height = window.innerHeight;
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement,), [])

  let radius = 1;
  focus && focus.current? radius = focus.current.geometry.parameters.radius : 1;

  camera.far = 1000000000;
  camera.fov = 50;
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
  controls.minDistance = radius + .2;
  // console.log({width, height})

  // console.log("camera position", {cameraPosition})
  // console.log("focus", {focus})

  focus && focus? controls.fitToBox(focus.current, true) : controls.dollyTo(1.5, true)
  // controls.setTarget(cameraPosition[0], cameraPosition[1], cameraPosition[2], true)
  controls.moveTo(cameraPosition[0], cameraPosition[1], cameraPosition[2], true);
  // let currentPosition = controls.getPosition();
  // setControlPosition(currentPosition);

  // window.addEventListener("keydown", (e) => {
  //   console.log(e);
  //   e.stopPropagation();
  // });


  const { up, down, left, right } = useKeyState(
    {
      up: "up",
      down: "down",
      left: "left",
      right: "right",
    },
  );

  // if(down.down){
  //   console.log("down")

  // }
  // if(up.down){
  //   console.log("up")
  // }
  // if(left.down){
  //   console.log("left")
  //   // controls.rotateAzimuthTo( 30 * THREE.MathUtils.DEG2RAD, true );

  // }
  // if(right.down){
  //   console.log("right")
  //   let increment = 0.0;
  //   increment++;
  //   console.log(increment);

  //   // controls.azimuthAngle(increment);
  //   // controls.rotateAzimuthTo( azimuthAngle += ((azimuthAngle + 25) * THREE.MathUtils.DEG2RAD), true );
  //   // controls.rotateAzimuthTo( (azimuthAngle + increment) * THREE.MathUtils.DEG2RAD, true );

  // }
    
  
  // })

  focus && console.log(focus);

  let increment = 0.0;

  return useFrame((state, delta) => {



    const elapsedTime = state.clock.getElapsedTime();


    if(left.pressed){ controls.rotate( - 0.1 * THREE.MathUtils.DEG2RAD * elapsedTime, 0, true )}
    if(right.pressed){ controls.rotate(   0.1 * THREE.MathUtils.DEG2RAD * elapsedTime, 0, true )}
    if(up.pressed){ controls.rotate( 0, - 0.05 * THREE.MathUtils.DEG2RAD * elapsedTime, true )}
    if(down.pressed){ controls.rotate( 0,   0.05 * THREE.MathUtils.DEG2RAD * elapsedTime, true )}


    // controls.setTarget(focus.current.position);
    // focus && camera.setDistance(1.5);
    // focus && controls.setLookAt(focus.current);
    // focus && camera.minDistance(1)
    // focus && focus.current? controls.setTarget(focus.current.position.x, focus.current.position.y, focus.current.position.z, true) : "";
    // controls.moveTo(cameraPosition[0], cameraPosition[1], cameraPosition[2], true);
    // focus && focus.current? controls.setTarget(focus.current.position.x, focus.current.position.y, focus.current.position.z, true) : "";
    // controls.moveTo(focus.current.position, true);

  // focus && focus? controls.fitToBox(focus.current, true) : controls.dollyTo(1.5, true)


    return controls.update(delta)

  })
}

export default Controls;
