// /**
//  * Camera fit to object
//  */
import * as THREE from "three";
import { Vector3 } from "three";

export function fitCameraToSelection(
  camera,
  newTarget,
  controls,
  selection,
  fitOffset = 1.5,
  systemParameters
) {
  const box = new THREE.Box3();

  const object = selection;
  box.expandByObject(object);

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance =
    maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

  const direction = controls.target
    .clone()
    .sub(camera.position)
    .normalize()
    .multiplyScalar(distance);

  // controls.target.copy(newTarget);

  // controls.target.set(newTarget.x, newTarget.y, newTarget.z);

  const newTargetVec3 = new Vector3(newTarget.x, newTarget.y, newTarget.z);
  // controls.target = newTargetVec3;

  controls.target = selection.position;

  camera.updateProjectionMatrix();
  camera.lookAt(newTargetVec3);

  // controls.target = new Vector3(newTarget.x, newTarget.y, newTarget.z);

  camera.position.copy(controls.target).sub(direction);

  controls.update();
}
