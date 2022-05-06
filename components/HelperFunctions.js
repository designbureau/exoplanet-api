export function getPeriapsis(a, e) {
  return a * (1 - e);
}

export function getApoapsis(a, e) {
  return a * (1 + e);
}

export function getSemiMinorAxis(a, e) {
  return a * Math.sqrt(1 - e * e);
}

export function getEllipse(a, e) {
  return {
    xRadius: a,
    yRadius: getSemiMinorAxis(a, e),
  };
}
