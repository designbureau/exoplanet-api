/**
 * Navigation
 */

import { fitCameraToSelection } from "./CameraUtilities";

const GenerateNav = (
  allStarsArray,
  allLonePlanetsArray,
  scene,
  camera,
  controls,
  currentTargetObject,
  systemParameters
) => {
  const nav = document.getElementById("nav_container");

  nav.innerHTML = "";

  const starList = document.createElement("ul");
  starList.setAttribute("id", "star_list");
  nav.append(starList);

  allStarsArray.map((star, i) => {
    const starListItem = document.createElement("li");
    const starItem = document.createElement("button");
    starItem.setAttribute("data-object", star.mesh.name);
    starItem.setAttribute("class", "nav-button");
    starItem.append(star.mesh.name);

    starListItem.append(starItem);
    starList.append(starListItem);

    if (i == 0) {
      const starName = scene.getObjectByName(star.mesh.name);
      fitCameraToSelection(
        camera,
        starName.parent.position,
        controls,
        starName,
        1.5,
        systemParameters
      );
    }

    // console.log(star);

    starItem.addEventListener("click", (e) => {
      const starName = e.currentTarget.dataset.object;
      const star = scene.getObjectByName(starName);

      // controls.target = star.parent.position;
      // fitCameraToObject(star, star.parent.position);
      fitCameraToSelection(
        camera,
        star.parent.position,
        controls,
        star,
        1.5,
        systemParameters
      );
      currentTargetObject.push(star);
    });

    if (star.planets != null) {
      const planetList = document.createElement("ul");
      starListItem.append(planetList);

      let planetsArray = [];
      Array.isArray(star.planets)
        ? (planetsArray = star.planets)
        : planetsArray.push(star.planets);

      planetsArray.map((planet) => {
        console.log(planet);
        const planetListItem = document.createElement("li");

        let planetName;

        if (Array.isArray(planet.name)) {
          planetName = planet.name[0]._text;
        } else {
          planetName = planet.name._text;
        }

        const planetItem = document.createElement("button");
        planetItem.setAttribute("data-object", planetName);
        planetItem.setAttribute("class", "nav-button");
        planetItem.append(planetName);

        planetListItem.append(planetItem);
        planetList.append(planetListItem);

        planetItem.addEventListener("click", (e) => {
          const planetName = e.currentTarget.dataset.object;
          const planet = scene.getObjectByName(planetName);
          // controls.target = planet.position;
          // fitCameraToObject(camera, planet, planet.position, 1.25, controls);
          // fitCameraToObject(planet, planet.position);
          fitCameraToSelection(
            camera,
            planet.position,
            controls,
            planet,
            1.5,
            systemParameters
          );
          currentTargetObject.push(planet);
        });
      });
    }
  });

  const lonePlanetList = document.createElement("ul");
  nav.append(lonePlanetList);

  allLonePlanetsArray.map((planet) => {
    console.log("lone planet", planet);
    const planetListItem = document.createElement("li");

    let planetName;

    if (Array.isArray(planet.mesh.name)) {
      planetName = planet.mesh.name[0]._text;
    } else {
      if (planet.mesh.name.hasOwnProperty("_text")) {
        planetName = planet.mesh.name._text;
      } else {
        planetName = planet.mesh.name;
      }
    }

    const planetItem = document.createElement("button");
    planetItem.setAttribute("data-object", planetName);
    planetItem.setAttribute("class", "nav-button");
    planetItem.append(planetName);

    planetListItem.append(planetItem);
    lonePlanetList.append(planetListItem);

    planetItem.addEventListener("click", (e) => {
      const planetNameID = e.currentTarget.dataset.object;
      const planet = scene.getObjectByName(planetNameID);
      // controls.target = planet.position;
      // fitCameraToObject(camera, planet, planet.position, 1.25, controls);
      // console.log(planet);
      // fitCameraToObject(planet, planet.position);
      fitCameraToSelection(
        camera,
        planet.position,
        controls,
        planet,
        1.5,
        systemParameters
      );
      currentTargetObject.push(planet);
    });
  });
};

export default GenerateNav;
