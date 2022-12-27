import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();


  //Updates the DOM with the cities


  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/cities`)
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image, parent) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  
  const cardSection = document.getElementById("data");
  const col = document.createElement("div");
  col.setAttribute("class", "col-6 col-lg-3 mb-3")


  col.innerHTML = `
    <a href="pages/adventures/?city=${id}" id=${id} class="tile">
      <img src=${image}/>
      <div class="tile-text">
        <h2>${city}</h2>
        <h4>${description}</h4>
      </div>
    </a>
  `;
  cardSection.appendChild(col)
}

export { init, fetchCities, addCityToDOM };
