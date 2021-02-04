let restaurantData = [];
let currentRestaurant = {};
let page = 1;
const perPage = 10;
let map = null;

const avg = function(grades){
  let average = 0;
  grades.forEach(grade => { average += grade.score; });
  average /= grades.length;
  return average.toFixed(2);
}

const tableRows = _.template(`
  <% _.forEach(restaurants, function(restaurant) { %>
    <tr data-id="<%- restaurant._id %>">
      <td><%- restaurant.name %></td>
      <td><%- restaurant.cuisine %></td>
      <td><%- restaurant.address.building %> <%- restaurant.address.street %></td>
      <td><%- avg(restaurant.grades) %></td>
    </tr>
  <% }); %>
`);

const loadRestaurantData = function() {
  let requestString = `${document.location.protocol}//${document.location.hostname}:${document.location.port}/api/restaurants?page=${page}&perPage=${perPage}`;
  fetch(requestString, { method: 'GET'})
  .then(response => response.json())
  .then(data => {
    restaurantData = data;
    let dataRows = tableRows({restaurants: restaurantData});
    $("#restaurant-table tbody").html(dataRows);
    $("#current-page").html(page);
  })
  .catch(err => { console.error(err); });
}

$(function() {
  //Load the data to the table
  loadRestaurantData();

  // Set event for clicking on a restaurant row
  $("#restaurant-table tbody").on("click", "tr", function(){
    currentRestaurant = restaurantData.find(restaurant => (restaurant._id == $(this).attr("data-id")));
    $("#modal-title").html(currentRestaurant.name);
    $("#restaurant-address").html(`${currentRestaurant.address.building} ${currentRestaurant.address.street}`);
    $("#restaurant-modal").modal('toggle');
  });

  // Ser event for previous page
  $("#previous-page").on("click", function() {
    if (page > 1) {
      page--;
      loadRestaurantData()
    }
  });

  // Ser event for next page
  $("#next-page").on("click", function() {
    page++;
    loadRestaurantData();
  });

  // Ser event to load the map when the modal opens
  $('#restaurant-modal').on('shown.bs.modal', function() {
    map = new L.Map('leaflet', {
      center: [currentRestaurant.address.coord[1], currentRestaurant.address.coord[0]],
      zoom: 18,
      layers: [
      new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      ]
    });
    L.marker([currentRestaurant.address.coord[1], currentRestaurant.address.coord[0]]).addTo(map);
  });

  // Ser event to remove the map when the modal closes
  $('#restaurant-modal').on('hidden.bs.modal', function() { map.remove(); });
});