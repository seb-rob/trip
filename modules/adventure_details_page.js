import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  const obj = new URLSearchParams(search);
  const id = obj.get("adventure");
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
    let data = await response.json();
    if(Array.isArray(data)){
      return data[0];
    }else{
      return data;
    }
    // return data;
  } catch {
    return null;
  }
  
  // Place holder for functionality to work in the Stubs
  // return null
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const adventureName = document.getElementById("adventure-name");
  const adventureSubtitle = document.getElementById("adventure-subtitle");
  const phototGallery = document.getElementById("photo-gallery");
  const adventureContent = document.getElementById("adventure-content");

  const {name, subtitle, content, images } = adventure;

  adventureName.textContent = name;
  adventureSubtitle.textContent = subtitle;
  adventureContent.innerText = content;
  adventure.images.forEach(imgs => {
    const img = document.createElement("img");
    img.setAttribute("class", "activity-card-image");
    img.setAttribute("src", imgs);
    phototGallery.appendChild(img);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // console.log(images);
  const phototGallery = document.getElementById("photo-gallery");
  phototGallery.innerHTML = "";
  const carouselDiv = document.createElement("div");
  carouselDiv.setAttribute("class", "carousel slide");
  carouselDiv.setAttribute("data-bs-ride", "carousel");
  carouselDiv.setAttribute("id", "photo-gallery-carousel");


  //function for carousel indicator buttons
  function createIndicatorButtons(images) {
    // console.log(images);
    const carouselIndicatorDiv = document.createElement("div");
    carouselIndicatorDiv.setAttribute("class", "carousel-indicators");
    for(let i = 0; i<images.length; i++){

      if(i === 0){

        let button = document.createElement("button");
        button.setAttribute("class", "active");
        button.setAttribute("type", "button");
        button.setAttribute("data-bs-target", "#photo-gallery-carousel");
        button.setAttribute("data-bs-slide-to",i);
        button.setAttribute("area-label", `slide ${i}`);
        carouselIndicatorDiv.appendChild(button);

      }else{

        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("data-bs-target", "#photo-gallery-carousel");
        button.setAttribute("data-bs-slide-to",i);
        button.setAttribute("area-label", `slide ${i}`);
        carouselIndicatorDiv.appendChild(button);
      }
    }
    carouselDiv.appendChild(carouselIndicatorDiv);
  }


  //funciton for carousel items
  function createCarouselItems(images) {
    const carouselInnerDiv = document.createElement("div");
    carouselInnerDiv.setAttribute("class","carousel-inner");

    for(let i = 0; i<images.length; i++){

      if(i === 0){

        const carouselItemDiv = document.createElement("div");
        carouselItemDiv.setAttribute("class", "carousel-item active");
        
        carouselItemDiv.innerHTML = `
          <img src="${images[i]}" class="d-block w-100" id="${i}" />
        `
        carouselInnerDiv.appendChild(carouselItemDiv);
      }else{

        const carouselItemDiv = document.createElement("div");
        carouselItemDiv.setAttribute("class", "carousel-item");

        carouselItemDiv.innerHTML = `
          <img src="${images[i]}" class="d-block w-100" id="${i}" />
        `;
        carouselInnerDiv.appendChild(carouselItemDiv);
      }
    }
    carouselDiv.appendChild(carouselInnerDiv);
  }
 
  createIndicatorButtons(images)
  createCarouselItems(images)
  
  carouselDiv.innerHTML += `
    <button class="carousel-control-prev" type="buton" data-bs-target="#photo-gallery-carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">previous</span>
    </button>
    <button class="carousel-control-next" type="buton" data-bs-target="#photo-gallery-carousel" data-bs-slide="prev">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">next</span>
    </button>
  `;
  phototGallery.appendChild(carouselDiv);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // adventure.forEach(val => {
    // const {available, costPerHead } = adventure;
    if(adventure.available === true){
      document.getElementById("reservation-panel-sold-out").style.display = "none";
      document.getElementById("reservation-panel-available").style.display = "block";
      document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
    }else{
      document.getElementById("reservation-panel-sold-out").style.display = "block";
      document.getElementById("reservation-panel-available").style.display = "none";
    }
  // })
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // const {costPerHead} = adventure;
  document.getElementById("reservation-cost").textContent = persons * adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const formId = document.getElementById("myForm");
  // const {id} = adventure;
  formId.addEventListener("submit", async(e) => {
    e.preventDefault();
    try {
      const name = document.getElementsByName("name")[0].value;
      const date = document.getElementsByName("date")[0].value;
      const person = document.getElementsByName("person")[0].value;

      const response = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: "POST",
        body: JSON.stringify({name:name, date:date, person:person, adventure: adventure.id}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });
      const data = await response.json();
      if(data.success){
        alert("Success!");
        window.location.reload();
      }else{
        alert(`Failed - ${data.message}`);
      }
    } catch (error) {
      alert(`Error - fetch call resulted in error`);
    } 
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
    adventure.reserved === true ? document.getElementById("reserved-banner").style.display = "block" : document.getElementById("reserved-banner").style.display = "none";  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
