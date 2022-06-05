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
  const [keyDown, setKeyDown] = useState(false);
  const [sensitivity, setSensitivity] = useState(1.0);



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
    if (clicked) {
      console.log({ clicked });
      controls.fitToBox(focus.current, true);
      clicked = setClicked(false);
    }
  }

  // console.log({focus})
  // console.log({newFocus});
  // focus && focus
  //   ? controls.fitToBox(focus.current, true)
  //   : controls.dollyTo(1.5, true);
  // controls.setTarget(cameraPosition[0], cameraPosition[1], cameraPosition[2], true)

  // controls.moveTo(
  //   cameraPosition[0],
  //   cameraPosition[1],
  //   cameraPosition[2],
  //   true
  // );

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
  });

  let vector = new THREE.Vector3();

  

  if (keys.plus.down) {
    setSensitivity(sensitivity + 0.1)
    console.log(sensitivity);
  }
  if (keys.minus.down) {
    setSensitivity(sensitivity - 0.1);
    console.log(sensitivity);
  }


  return useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();

   
    if (keys.a.pressed) {
      controls.truck((-0.5 * sensitivity) * delta * elapsedTime, 0, true);
      setKeyDown(true);
    }
    if (keys.d.pressed) {
      controls.truck((0.5 * sensitivity) * delta * elapsedTime, 0, true);
      setKeyDown(true);
    }
    if (keys.w.pressed) {
      controls.dolly((0.05 * sensitivity) * delta * elapsedTime, true);
      setKeyDown(true);
    }
    if (keys.s.pressed) {
      controls.dolly((-0.05 * sensitivity) * delta * elapsedTime, true);
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
      setKeyDown(false);
    }
    if (keys.s.up) {
      setKeyDown(false);
    }
    if (keys.d.up) {
      setKeyDown(false);
    }
    if (keys.w.up) {
      setKeyDown(false);
    }
    if (keys.up.up) {
      setKeyDown(false);
    }
    if (keys.down.up) {
      setKeyDown(false);
    }
    if (keys.left.up) {
      setKeyDown(false);
    }
    if (keys.right.up) {
      setKeyDown(false);
    }

    if (focus && focus.current) {
      focus.current.getWorldPosition(vector);
      if (keyDown === false) {
        controls.moveTo(vector.x, vector.y, vector.z, true);
      }
    }
    return controls.update(delta);
  });
};

export default Controls;
