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
  camera.near = 0.1;
  camera.fov = 50;
  camera.far = 100000;
  // camera.isOrthographicCamera = true;
  camera.aspect = width/height;
  // console.log(camera);

  let radius = 1
  focus? radius = focus.current.geometry.parameters.radius : 1
  controls.minDistance = radius + .1


  focus? controls.fitToBox(focus.current, true) : controls.dollyTo(1.5, true)
  controls.setTarget(cameraPosition[0], cameraPosition[1], cameraPosition[2], true)
  let currentPosition = controls.getPosition();
  // setControlPosition(currentPosition);

  return useFrame((state, delta) => {
    return controls.update(delta)
  })
}

export default Controls;
