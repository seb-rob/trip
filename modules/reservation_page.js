import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const response = await fetch(`${config.backendEndpoint}/reservations/`)
    const data = await response.json();
    // Place holder for functionality to work in the Stubs
    return data;
  } catch {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length === 0 ){
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }else{
    document.getElementById("reservation-table-parent").style.display = "block"
    document.getElementById("no-reservation-banner").style.display = "none";
    const tableBody = document.getElementById("reservation-table")
    reservations.map(rotate => {

      const { id, name, adventureName, date, time, person, price, adventure } = rotate;

      const row = document.createElement("tr");
      // row.setAttribute("id", id);
      row.innerHTML = `
        <th>${id}</th>
        <td>${name}</td>
        <td>${adventureName}</td>
        <td>${person}</td>
        <td>${new Date(date).toLocaleDateString("en-IN")}</td>
        <td>${price}</td>
        <td>${new Date(time).toLocaleString("en-IN", {
          year: "numeric",
          day: "numeric",
          month: "long",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true
        })}</td>
        <td id=${id}><a href="../detail/?adventure=${adventure}" class="reservation-visit-button">visit adventure</a></td>
      `;
      // row.innerHTML += `
        
      // `;
      tableBody.appendChild(row);
    })
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
