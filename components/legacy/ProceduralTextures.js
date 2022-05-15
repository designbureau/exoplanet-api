import * as THREE from "three";
import chroma from "chroma-js";
import * as d3 from "d3";

const proceduralMaterialGenerator = () => {
  // degrees to radians conversion
  function deg2rad(deg) {
    return (Math.PI / 180) * deg;
  }

  // get sperical coordinates for pixel x, y
  function getCoords(x, y) {
    let theta = deg2rad((x / 512) * 360 - 180);
    let phi = deg2rad((y / 256) * 180 - 90);
    let rho = 0.2;

    let _x = rho * Math.cos(phi) * Math.cos(theta);
    let _y = rho * Math.cos(phi) * Math.sin(theta);
    let _z = rho * Math.sin(phi); // z is 'up'

    return [_x, _y, _z];
  }

  // Noise generation with Fractional Brownian Motion
  function fbm(octaves) {
    var noise = Noise.perlin3D;

    return function (x, y, z, t) {
      let frequency = 1;
      let amplitude = 1;
      let persistence = 0.7;
      let lacunarity = 2;

      var total = 0;

      for (var i = 0; i < octaves; i++) {
        total +=
          noise(x * frequency, y * frequency, z * frequency, t * frequency) *
          amplitude;

        amplitude *= persistence;
        frequency *= lacunarity;
      }

      return total;
    };
  }

  var data = new Uint8Array(512 * 256 * 4);
  var bump = new Uint8Array(512 * 256 * 4);
  var noise = fbm(32);
  var time = 0;

  // var scale = d3.interpolateRgb("#381b0a", "#c9ba8a");
  let colors = [
    "#fdfbfa",
    "#D5DEC3",
    "#C2B4A4",
    "#869696",
    "#686064",
    "#5b4a46",
  ];

  // generate texture and bump map
  for (var y = 0; y < 256; y++) {
    for (var x = 0; x < 512; x++) {
      let index = (x + y * 512) * 4;
      let xyz = getCoords(x, y);
      let n = noise(xyz[0], xyz[1], xyz[2], time);
      n = Math.abs(Math.cos(y / 128 + noise(xyz[0], xyz[1], xyz[2], time)));

      let col = d3.color(
        d3.interpolateRgbBasis([
          "#fdfbfa",
          "#D5DEC3",
          "#C2B4A4",
          "#869696",
          "#686064",
          "#5b4a46",
        ])(n)
      );

      //   let col = chroma.scale(colors).mode("lab");

      data[index] = col.r; // n * 220;
      data[index + 1] = col.g; // n * 180;
      data[index + 2] = col.b; // * 160;
      data[index + 3] = 255;

      bump[index] = n * 255; // n * 220;
      bump[index + 1] = n * 255; // n * 180;
      bump[index + 2] = n * 255; // * 160;
      bump[index + 3] = 255;
    }
  }

  // set texture and bump map
  var texture = new THREE.DataTexture(
    data,
    512,
    256,
    THREE.RGBAFormat,
    THREE.UnsignedByteType,
    THREE.EquirectangularReflectionMapping
  );
  texture.unpackAlignment = 1;
  texture.needsUpdate = true;

  var bumpMap = new THREE.DataTexture(
    bump,
    512,
    256,
    THREE.RGBAFormat,
    THREE.UnsignedByteType,
    THREE.EquirectangularReflectionMapping
  );
  bumpMap.unpackAlignment = 1;
  bumpMap.needsUpdate = true;

  // Create a new material

  //   const sphereMaterial = new THREE.MeshPhongMaterial({
  //     emissive: new THREE.Color("rgb(7,3,5)"),
  //     specular: new THREE.Color("rgb(64,64,64)"),
  //     shininess: 10,
  //     // bumpMap: bumpMap,
  //     // bumpScale: 0.6,
  //     map: texture,
  //     transparent: false,
  //   });

  const sphereMaterial = new THREE.MeshStandardMaterial({
    // emissive: new THREE.Color("rgb(7,3,5)"),
    // specular: new THREE.Color("rgb(64,64,64)"),
    // shininess: 10,
    // bumpMap: bumpMap,
    // bumpScale: 0.03,
    // normalMap: data,
    // normalScale: 0.01,
    map: texture,
    transparent: false,
  });

  return sphereMaterial;
};

export default proceduralMaterialGenerator;
