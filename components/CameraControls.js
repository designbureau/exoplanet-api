import * as THREE from "three";
import controls from "camera-controls";
import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useKeyState } from "use-key-state";
import CameraControls from "camera-controls";

controls.install({ THREE });
extend({ controls });

const Controls = ({ cameraPosition, focus, setFocus, clicked, setClicked }) => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);

  let radius = 1;
  focus && focus.current
    ? (radius = focus.current.geometry.parameters.radius)
    : 1;

  camera.far = 1000000000;
  camera.fov = 50;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  controls.minDistance = radius + 0.2;
  // console.log({width, height})

  // console.log("camera position", {cameraPosition})
  // console.log("focus", {focus})

  
  if (focus) {
    if(clicked){
      console.log({clicked});
      controls.fitToBox(focus.current, true);
      clicked = setClicked(false);
    }
    // newFocus = structuredClone(focus);
    // controls.fitToBox(focus.current, true);
    // focus = setFocus(null);
  }

  // console.log({focus})
  // console.log({newFocus});
  // focus && focus
  //   ? controls.fitToBox(focus.current, true)
  //   : controls.dollyTo(1.5, true);
  // controls.setTarget(cameraPosition[0], cameraPosition[1], cameraPosition[2], true)

  controls.moveTo(
    cameraPosition[0],
    cameraPosition[1],
    cameraPosition[2],
    true
  );

  const { ...keys } = useKeyState({
    w: "w",
    a: "a",
    s: "s",
    d: "d",
    up: "up",
    down: "down",
    left: "left",
    right: "right",
  });

  return useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (keys.a.pressed) {
      controls.truck(-0.5 * delta * elapsedTime, 0, false);
    }
    if (keys.d.pressed) {
      controls.truck(0.5 * delta * elapsedTime, 0, false);
    }
    if (keys.w.pressed) {
      controls.dolly(0.125 * delta * elapsedTime, true);
    }
    if (keys.s.pressed) {
      controls.dolly(-0.125 * delta * elapsedTime, true);
    }

    if (keys.left.pressed) {
      controls.rotate(
        -0.125 * THREE.MathUtils.DEG2RAD * delta * elapsedTime,
        0,
        true
      );
    }
    if (keys.right.pressed) {
      controls.rotate(
        0.125 * THREE.MathUtils.DEG2RAD * delta * elapsedTime,
        0,
        true
      );
    }
    if (keys.up.pressed) {
      controls.rotate(
        0,
        -0.125 * THREE.MathUtils.DEG2RAD * delta * elapsedTime,
        true
      );
    }
    if (keys.down.pressed) {
      controls.rotate(
        0,
        0.125 * THREE.MathUtils.DEG2RAD * delta * elapsedTime,
        true
      );
    }

    // controls.setTarget(focus.current.position);
    // focus && camera.setDistance(1.5);
    // focus && controls.setLookAt(focus.current);
    // focus && camera.minDistance(1)
    // focus && focus.current? controls.setTarget(focus.current.position.x, focus.current.position.y, focus.current.position.z, true) : "";
    // controls.moveTo(cameraPosition[0], cameraPosition[1], cameraPosition[2], true);
    // focus && focus.current? controls.setTarget(focus.current.position.x, focus.current.position.y, focus.current.position.z, true) : "";
    // controls.moveTo(focus.current.position, true);

    // focus && focus? controls.fitToBox(focus.current, true) : controls.dollyTo(1.5, true)
    // controls.moveTo(focus.current.position.x, focus.current.position.y, focus.current.position.z, true)
    return controls.update(delta);
  });
};

export default Controls;
