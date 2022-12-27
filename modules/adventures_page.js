import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const obj = new URLSearchParams(search);
  const city = obj.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {

    const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
    const adventureData = await response.json();
    return adventureData;

  } catch {
    return null
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  const adventureCardSection = document.getElementById("data");

  adventures.forEach(ad => {

    const {id, image, category, name, costPerHead, duration} = ad;

    const columns = document.createElement("div");
    columns.setAttribute("class", "col-6 col-lg-3");

    columns.innerHTML = `
      <a href="detail/?adventure=${id}" id=${id} class="activity-card mb-3">
        <p class="category-banner">${category}</p>
        <img src=${image} />
        <div class="mx-1 d-flex justify-content-between">
          <p>${name}</p>
          <div class="d-inline-block">
            <span>&#8377;</span><h6 class="d-inline-block">${costPerHead}</h6>
          </div>
        </div>
        <div class="mx-1 d-flex justify-content-between">
          <p>Duration</p>
          <p>${duration} hours</p>
        </div>
      </a>
    `;
    adventureCardSection.appendChild(columns)
  })
  
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const selectedDuration = list.filter(objs => objs.duration >= low && objs.duration <= high)
  return selectedDuration;
}


//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  const lst = []
  categoryList.forEach((category) => {
    list.forEach((obj) => {
      if (obj.category === category) {
        lst.push(obj);
      }
    });
  });
  
  return lst;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  let filteredList = [];

  //Filter by duration and category together
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  //Filter by duration only
  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  //Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  //when there is no filter
  else {
    filteredList = list;
  }
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  
  const categoriesArray = filters.category;
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let filter = JSON.parse(localStorage.getItem("filters"))

  // Place holder for functionality to work in the Stubs
  return filter;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const pill = document.getElementById("category-list");
  const categories = filters.category;
  pill.innerHTML = "";

  categories.filter(cat => {
      let listElem = document.createElement("p");
      listElem.setAttribute("class", "category-filter d-inline-block");
      listElem.innerText = cat;
      pill.appendChild(listElem);
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
