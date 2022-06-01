import * as THREE from 'three'
import CameraControls from "camera-controls";
import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";


CameraControls.install({ THREE })
extend({ CameraControls })

const Controls = ({cameraPosition, focus, setControlPosition}) => {

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

  console.log("camera position", {cameraPosition})
  console.log("focus", {focus})

  focus && focus? controls.fitToBox(focus.current, true) : controls.dollyTo(1.5, true)
  // controls.setTarget(cameraPosition[0], cameraPosition[1], cameraPosition[2], true)
  controls.moveTo(cameraPosition[0], cameraPosition[1], cameraPosition[2], true);
  // let currentPosition = controls.getPosition();
  // setControlPosition(currentPosition);

  window.addEventListener("keydown", (e) => {
    console.log(e);
  });



  focus && console.log(focus);
  return useFrame((state, delta) => {
    // controls.setTarget(focus.current.position);
    // focus && camera.setDistance(1.5);
    // focus && controls.setLookAt(focus.current);
    // focus && camera.minDistance(1)
    // focus && focus.current? controls.setTarget(focus.current.position.x, focus.current.position.y, focus.current.position.z, true) : "";
    // controls.moveTo(cameraPosition[0], cameraPosition[1], cameraPosition[2], true);


    return controls.update(delta)

  })
}

export default Controls;
