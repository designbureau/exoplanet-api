import * as THREE from "three";
import {
  getEllipse,
  getApoapsis,
  getPeriapsis,
  getSemiMinorAxis,
} from "./HelperFunctions"
// import proceduralMaterialGenerator from "./ProceduralTextures";

/**
 * textures
 */

const textureLoader = new THREE.TextureLoader();
const starNormalTexture = textureLoader.load("/textures/8k_sun.jpeg");
const uranusNormalTexture = textureLoader.load("/textures/2k_uranus.jpeg");
const venusNormalTexture = textureLoader.load(
  "/textures/4k_venus_atmosphere.jpeg"
);
const neptuneNormalTexture = textureLoader.load("/textures/2k_neptune.jpeg");
const mercuryNormalTexture = textureLoader.load("/textures/8k_mercury.jpeg");
const jupiterNormalTexture = textureLoader.load("/textures/8k_jupiter.jpeg");

/**
 * Materials
 */
// const material = new THREE.MeshNormalMaterial();
const material = new THREE.MeshStandardMaterial();
// material.wireframe = true;
// material.roughness = 0.7;
// gui.add(material, 'metalness').min(0).max(1).step(0.001)
// gui.add(material, 'roughness').min(0).max(1).step(0.001)

let planetMaterial = material;

const starMaterial = new THREE.MeshBasicMaterial({
  map: starNormalTexture,
});

const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterNormalTexture,
});

// const jupiterMaterial = proceduralMaterialGenerator();

const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneNormalTexture,
});

const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusNormalTexture,
});

const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusNormalTexture,
});

const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryNormalTexture,
});

// Gas Giant
// A giant planet composed mainly of gas

// Super-Earth
// A potentially rocky world, larger than Earth

// Neptune-like
// Gaseous worlds around the size of Neptune

// Terrestrial
// A rocky world outside our solar system.

const setPlanetMaterial = (radius) => {
  let material = mercuryMaterial;
  if (radius > 0.05 && radius <= 0.2) {
    material = venusMaterial;
  }
  if (radius > 0.2 && radius <= 0.5) {
    material = uranusMaterial;
  }
  if (radius > 0.5 && radius < 1) {
    material = neptuneMaterial;
  }
  if (radius >= 1) {
    material = jupiterMaterial;
  }
  return material;
};

const GenerateSystem = (
  system,
  systemParameters,
  allPlanetsArray,
  allStarsArray,
  allLonePlanetsArray,
  scene
) => {
  //jupiter:earth radius = 11.209
  //jupiter:earth mass = 318
  //au:sol radius/mass/distance
  //jupiter:sol radius = 11
  // solar radius in jupiter radii = 9,73116

  const solRadius = 9.73116;
  const jupiterRadius = 1;
  const au = 2092.51;
  const defaultBinarySeparation = 20; //known average
  const defaultSemimajoraxis = 1;
  let adjustedAU = au * systemParameters.distance;

  /**
   * Planet Renderer
   */
  const renderPlanet = (planet, starGroup, lonePlanet = false) => {
    let planetsArray = [];
    Array.isArray(planet) ? (planetsArray = planet) : planetsArray.push(planet);

    planetsArray.map((planet, i) => {
      let semimajoraxis, eccentricity, period, inclination, radius, name;

      if (planet.hasOwnProperty("name")) {
        if (Array.isArray(planet.name)) {
          name = planet.name[0]._text;
        } else {
          name = planet.name._text;
        }
      } else {
        name = "planet-" + i;
      }

      if (planet.hasOwnProperty("radius")) {
        if (planet.radius.hasOwnProperty("_text")) {
          radius = parseFloat(planet.radius._text);
        } else {
          radius = 1;
          // if(planet.hasOwnProperty("mass")){
          //   if(planet.mass.hasOwnProperty("_text")){
          //     radius = parseFloat(planet.mass._text)
          //   }

          // }
        }
      } else {
        radius = 1;
      }

      planetMaterial = setPlanetMaterial(radius);
      // upperlimit

      // material.wireframe = true;

      const planetMesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius, 64, 64),
        planetMaterial
      );

      if (planet.hasOwnProperty("semimajoraxis")) {
        if (planet.semimajoraxis.hasOwnProperty("_text")) {
          semimajoraxis = parseFloat(planet.semimajoraxis._text) * adjustedAU;
        } else {
          semimajoraxis = defaultSemimajoraxis * adjustedAU;
        }
      } else {
        semimajoraxis = defaultSemimajoraxis * adjustedAU;
      }

      if (planet.hasOwnProperty("eccentricity")) {
        if (planet.eccentricity.hasOwnProperty("_text")) {
          eccentricity = parseFloat(planet.eccentricity._text);
        } else {
          if (planet.eccentricity.hasOwnProperty("upperlimit")) {
            eccentricity = parseFloat(planet.eccentricity.upperlimit);
          } else if (planet.eccentricity.hasOwnProperty("lowerlimit")) {
            eccentricity = parseFloat(planet.eccentricity.lowerlimit);
          } else {
            eccentricity = 0;
          }
        }
      } else {
        eccentricity = 0;
      }
      // console.log(
      //   "eccentricity:",
      //   eccentricity,
      //   "semimajoraxis:",
      //   semimajoraxis
      // );

      if (planet.hasOwnProperty("period")) {
        if (planet.period.hasOwnProperty("_text")) {
          period = parseFloat(planet.period._text);
        } else {
          if (planet.period.hasOwnProperty("upperlimit")) {
            period = parseFloat(planet.period.upperlimit);
          } else if (planet.period.hasOwnProperty("lowerlimit")) {
            period = parseFloat(planet.period.lowerlimit);
          } else {
            period = 0.1;
          }
        }
      } else {
        period = 0.1;
      }

      planet.hasOwnProperty("inclination")
        ? (inclination = parseFloat(planet.inclination._text))
        : (inclination = 0);

      planetMesh.position.x = semimajoraxis;
      planetMesh.name = name;
      planetMesh.objectType = "planet";

      // console.log("planet", planetMesh);

      planetMesh.rotation.x = Math.PI * 0.5;

      const ellipse = getEllipse(semimajoraxis, eccentricity);
      const periapsis =
        getPeriapsis(semimajoraxis, eccentricity) - semimajoraxis;

      //Orbits
      const curve = new THREE.EllipseCurve(
        0,
        0, // ax, aY
        ellipse.xRadius,
        ellipse.yRadius, // xRadius, yRadius
        0,
        2 * Math.PI, // aStartAngle, aEndAngle
        false, // aClockwise
        0 // aRotation
      );
      // console.log(Math.cos(eccentricity * semimajoraxis) + semimajoraxis)
      // console.log(Math.sin(eccentricity * semimajoraxis) + semimajoraxis)

      const points = curve.getPoints(1000);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      orbitMaterial.transparent = true;
      orbitMaterial.opacity = 0.25;
      const orbitEllipse = new THREE.Line(geometry, orbitMaterial);

      orbitEllipse.name = name + " orbit";
      // console.log(orbitEllipse);

      let orbitsGroup = new THREE.Group();
      orbitsGroup.add(planetMesh, orbitEllipse);
      // orbitsGroup.rotation.x = inclination;
      orbitsGroup.rotation.x = inclination / 90;

      orbitsGroup.position.x = periapsis;
      console.log("periapsis", periapsis);
      // console.log("inclination", inclination);

      // console.log(orbitsGroup);

      allPlanetsArray.push({
        mesh: planetMesh,
        semimajoraxis,
        period,
        eccentricity,
        inclination,
      });

      if (lonePlanet === true) {
        allLonePlanetsArray.push({
          mesh: planetMesh,
        });
      }

      if (starGroup === null) {
        scene.add(orbitsGroup);
      } else {
        starGroup.add(orbitsGroup);
      }
    });
  };

  /**
   * Star Renderer
   */
  const renderStar = (
    star,
    separation = 0,
    binaryGroup = null,
    distance = null
  ) => {
    let starsArray = [];
    Array.isArray(star) ? (starsArray = star) : starsArray.push(star);

    const starsArraySize = starsArray.length;
    starsArray.map((star, i) => {
      let starRadius = solRadius;

      let name;

      star.hasOwnProperty("radius")
        ? (starRadius = parseFloat(star.radius._text))
        : (starRadius = 1);

      star.hasOwnProperty("name")
        ? (name = Array.isArray(star.name)
            ? star.name[0]._text
            : star.name._text)
        : "star-" + i;

      const starMesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(starRadius * solRadius, 64, 64),
        starMaterial
      );

      let starGroup = new THREE.Group();

      starMesh.name = name;
      starMesh.objectType = "star";
      starMesh.rotation.x = -Math.PI * 0.5;

      // console.log("star", starMesh);

      const pointLight = new THREE.PointLight(0xffffff, 1, 10000);
      pointLight.position.set(0, 0, 0);
      starGroup.add(pointLight);

      starGroup.name = name + " group";

      // console.log(starGroup);

      //TODO: think about this some more.
      starGroup.position.x = parseFloat(separation) / starsArraySize + i * 215;
      // starGroup.position.x = parseFloat(separation);
      // starGroup.position.x = parseFloat(separation) + i * adjustedAU;

      /**
       * Habitable Zone
       */
      console.log("system details", system);

      //Distance to Sun (should be earth?)
      let distance;
      system.hasOwnProperty("distance")
        ? (distance = parseFloat(system.distance._text))
        : (distance = 10); //arbitray assingment

      //Spectral type
      let spectraltype;
      star.hasOwnProperty("spectraltype")
        ? (spectraltype = star.spectraltype._text[0])
        : (spectraltype = null);

      //Visual Magnitude
      let apparentMagnitude;
      star.hasOwnProperty("magV")
        ? (apparentMagnitude = parseFloat(star.magV._text))
        : (apparentMagnitude = 5); //arbitray assingment

      console.log("spectralType", spectraltype);

      let bc = -0;
      const bolometricCorrection = {
        B: -2.0,
        A: -0.3,
        F: -0.15,
        G: -0.4,
        K: -0.8,
        M: -2.0,
      };
      if (spectraltype != null) {
        bc = bolometricCorrection[spectraltype];
        console.log("BC", bc);
      }

      let Mv, mv, Mbol, Lstar;
      mv = apparentMagnitude;

      // Stage 1: Estimate the host star’s absolute luminosity based on the star’s apparent visual magnitude (three steps)

      //1. Calculate absolute visual magnitude
      Mv = mv - 5 * (Math.log10(distance) - 1);
      // console.log("Mv", Mv);

      //2. Calculate bolometric magnitude
      Mbol = Mv + bc;
      // console.log("Mbol", Mbol);

      // 3. Calculate absolute luminosity
      // Where:
      // Lstar/Lsun = the absolute luminosity of the host star in terms of the absolute luminosity of the sun
      // Mbol star = the bolometric magnitude of the host star
      // Mbol sun = the bolometric magnitude of the sun = 4.72
      // 2.5 is a constant value used for comparing stellar luminosities -- known as "Pogson's Ratio."

      Lstar = Math.pow(10, (Mbol - 4.72) / -2.5);
      // console.log("Lstar", Lstar);

      // Stage 2: Approximate the radii of the host star’s habitable zone boundaries

      // Where:
      // This method approximates habitable zone radii using stellar luminosity and stellar flux following methods presented by Whitmire et al., 1996, cited below.
      // ri = the inner boundary of the habitable zone in astronomical units (AU)
      // ro = the outer boundary of the habitable zone in astronomical units (AU)
      // Lstar is the absolute luminosity of the star
      // 1.1 is a constant value representing stellar flux at the inner radius (based on Kasting et al., 1993, cited below; Whitmire et al., 1996, cited below)
      // 0.53 is a constant value representing stellar flux at the outer radius (based on Kasting et al., 1993, cited below; Whitmire et al., 1996., cited below)

      let innerRadius, outerRadius;

      innerRadius = Math.sqrt(Lstar / 1.1) * adjustedAU;
      outerRadius = Math.sqrt(Lstar / 0.53) * adjustedAU;

      // console.log("innerRadius", innerRadius);
      // console.log("outerRadius", outerRadius);

      const habitableZoneGeometry = new THREE.RingGeometry(
        innerRadius,
        outerRadius,
        128
      );
      const habitableZoneMaterial = new THREE.MeshBasicMaterial({
        color: 0x008080,
        side: THREE.DoubleSide,
      });
      habitableZoneMaterial.transparent = true;
      habitableZoneMaterial.opacity = 0.15;
      const habitableZoneMesh = new THREE.Mesh(
        habitableZoneGeometry,
        habitableZoneMaterial
      );
      //Z fighting fix needed for binaries
      habitableZoneMesh.rotation.y = Math.PI * i * 0.025;
      console.log(i);

      starGroup.add(starMesh, habitableZoneMesh);

      if (binaryGroup == null) {
        scene.add(starGroup);
      } else {
        binaryGroup.add(starGroup);
      }

      allStarsArray.push({
        mesh: starMesh,
        planets: star.hasOwnProperty("planet") ? star.planet : null,
        habitableZone: habitableZoneMesh,
      });

      //render planets
      star.hasOwnProperty("planet") && renderPlanet(star.planet, starGroup);
    });
  };

  /**
   * Binary Renderer
   */
  const renderBinary = (
    binary,
    isChild = false,
    separation = null,
    group = null
  ) => {
    let binaryArray = [];
    Array.isArray(binary) ? (binaryArray = binary) : binaryArray.push(binary);

    if (separation === null && isChild === true) {
      separation = defaultBinarySeparation * adjustedAU;
    }

    let binarySemimajorAxis;
    binary.hasOwnProperty("semimajoraxis")
      ? (binarySemimajorAxis = parseFloat(binary.semimajoraxis._text))
      : (binarySemimajorAxis = separation);

    // console.log(binarySemimajorAxis);

    let binaryGroup = new THREE.Group();

    if (group === null) {
      group = binaryGroup;
    } else {
      binaryGroup.position.x = parseFloat(separation);
    }

    scene.add(group);

    //Binary loop
    binaryArray.map((binary) => {
      //render star

      // if(binary.hasOwnProperty("separation")){
      //   Array.isArray(binary.separation) ?
      // }

      binary.hasOwnProperty("star") &&
        renderStar(
          binary.star,
          binary.hasOwnProperty("separation")
            ? binary.separation._text
            : defaultBinarySeparation * adjustedAU,
          group
        );

      //TODO: add separation?
      binary.hasOwnProperty("binary") &&
        renderBinary(binary.binary, true, separation, group);

      //render planets
      binary.hasOwnProperty("planet") &&
        renderPlanet(binary.planet, group, true);
    });
  };

  /**
   * Iterator
   */

  //contains binary
  system.system.hasOwnProperty("binary") && renderBinary(system.system.binary);

  //contains star
  system.system.hasOwnProperty("star") && renderStar(system.system.star);

  //contains planet
  system.system.hasOwnProperty("planet") && renderPlanet(system.system.planet);
};

export default GenerateSystem;
