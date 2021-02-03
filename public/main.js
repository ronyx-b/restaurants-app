let restaurantData = [];
let currentRestaurant = {};
let page = 1;
const perPage = 10;
let map = null;

const sampleData = [
  {
  "address": {
  "coord": [
  -73.8786113,
  40.8502883
  ],
  "building": "2300",
  "street": "Southern Boulevard",
  "zipcode": "10460"
  },
  "_id": "5eb3d668b31de5d588f42933",
  "borough": "Bronx",
  "cuisine": "American",
  "grades": [
  {
  "date": "2014-05-28T00:00:00.000Z",
  "grade": "A",
  "score": 11
  },
  {
  "date": "2013-06-19T00:00:00.000Z",
  "grade": "A",
  "score": 4
  },
  {
  "date": "2012-06-15T00:00:00.000Z",
  "grade": "A",
  "score": 3
  }
  ],
  "name": "Wild Asia",
  "restaurant_id": "40357217"
  },
  {
  "address": {
  "coord": [
  -73.9973325,
  40.61174889999999
  ],
  "building": "7715",
  "street": "18 Avenue",
  "zipcode": "11214"
  },
  "_id": "5eb3d668b31de5d588f42934",
  "borough": "Brooklyn",
  "cuisine": "American",
  "grades": [
  {
  "date": "2014-04-16T00:00:00.000Z",
  "grade": "A",
  "score": 5
  },
  {
  "date": "2013-04-23T00:00:00.000Z",
  "grade": "A",
  "score": 2
  },
  {
  "date": "2012-04-24T00:00:00.000Z",
  "grade": "A",
  "score": 5
  },
  {
  "date": "2011-12-16T00:00:00.000Z",
  "grade": "A",
  "score": 2
  }
  ],
  "name": "C & C Catering Service",
  "restaurant_id": "40357437"
  },
  {
  "address": {
  "coord": [
  -73.871194,
  40.6730975
  ],
  "building": "1269",
  "street": "Sutter Avenue",
  "zipcode": "11208"
  },
  "_id": "5eb3d668b31de5d588f42936",
  "borough": "Brooklyn",
  "cuisine": "Chinese",
  "grades": [
  {
  "date": "2014-09-16T00:00:00.000Z",
  "grade": "B",
  "score": 21
  },
  {
  "date": "2013-08-28T00:00:00.000Z",
  "grade": "A",
  "score": 7
  },
  {
  "date": "2013-04-02T00:00:00.000Z",
  "grade": "C",
  "score": 56
  },
  {
  "date": "2012-08-15T00:00:00.000Z",
  "grade": "B",
  "score": 27
  },
  {
  "date": "2012-03-28T00:00:00.000Z",
  "grade": "B",
  "score": 27
  }
  ],
  "name": "May May Kitchen",
  "restaurant_id": "40358429"
  },
  {
  "address": {
  "coord": [
  -73.96926909999999,
  40.7685235
  ],
  "building": "1",
  "street": "East   66 Street",
  "zipcode": "10065"
  },
  "_id": "5eb3d668b31de5d588f42937",
  "borough": "Manhattan",
  "cuisine": "American",
  "grades": [
  {
  "date": "2014-05-07T00:00:00.000Z",
  "grade": "A",
  "score": 3
  },
  {
  "date": "2013-05-03T00:00:00.000Z",
  "grade": "A",
  "score": 4
  },
  {
  "date": "2012-04-30T00:00:00.000Z",
  "grade": "A",
  "score": 6
  },
  {
  "date": "2011-12-27T00:00:00.000Z",
  "grade": "A",
  "score": 0
  }
  ],
  "name": "1 East 66Th Street Kitchen",
  "restaurant_id": "40359480"
  },
  {
  "address": {
  "coord": [
  -73.9653967,
  40.6064339
  ],
  "building": "705",
  "street": "Kings Highway",
  "zipcode": "11223"
  },
  "_id": "5eb3d668b31de5d588f42935",
  "borough": "Brooklyn",
  "cuisine": "Jewish/Kosher",
  "grades": [
  {
  "date": "2014-11-10T00:00:00.000Z",
  "grade": "A",
  "score": 11
  },
  {
  "date": "2013-10-10T00:00:00.000Z",
  "grade": "A",
  "score": 13
  },
  {
  "date": "2012-10-04T00:00:00.000Z",
  "grade": "A",
  "score": 7
  },
  {
  "date": "2012-05-21T00:00:00.000Z",
  "grade": "A",
  "score": 9
  },
  {
  "date": "2011-12-30T00:00:00.000Z",
  "grade": "B",
  "score": 19
  }
  ],
  "name": "Seuda Foods",
  "restaurant_id": "40360045"
  },
  {
  "address": {
  "coord": [
  -73.97822040000001,
  40.6435254
  ],
  "building": "203",
  "street": "Church Avenue",
  "zipcode": "11218"
  },
  "_id": "5eb3d668b31de5d588f4293a",
  "borough": "Brooklyn",
  "cuisine": "Ice Cream, Gelato, Yogurt, Ices",
  "grades": [
  {
  "date": "2014-02-10T00:00:00.000Z",
  "grade": "A",
  "score": 2
  },
  {
  "date": "2013-01-02T00:00:00.000Z",
  "grade": "A",
  "score": 13
  },
  {
  "date": "2012-01-09T00:00:00.000Z",
  "grade": "A",
  "score": 3
  },
  {
  "date": "2011-11-07T00:00:00.000Z",
  "grade": "P",
  "score": 12
  },
  {
  "date": "2011-07-21T00:00:00.000Z",
  "grade": "A",
  "score": 13
  }
  ],
  "name": "Carvel Ice Cream",
  "restaurant_id": "40360076"
  },
  {
  "address": {
  "coord": [
  -73.7032601,
  40.7386417
  ],
  "building": "265-15",
  "street": "Hillside Avenue",
  "zipcode": "11004"
  },
  "_id": "5eb3d668b31de5d588f42938",
  "borough": "Queens",
  "cuisine": "Ice Cream, Gelato, Yogurt, Ices",
  "grades": [
  {
  "date": "2014-10-28T00:00:00.000Z",
  "grade": "A",
  "score": 9
  },
  {
  "date": "2013-09-18T00:00:00.000Z",
  "grade": "A",
  "score": 10
  },
  {
  "date": "2012-09-20T00:00:00.000Z",
  "grade": "A",
  "score": 13
  }
  ],
  "name": "Carvel Ice Cream",
  "restaurant_id": "40361322"
  },
  {
  "address": {
  "coord": [
  -74.0259567,
  40.6353674
  ],
  "building": "6909",
  "street": "3 Avenue",
  "zipcode": "11209"
  },
  "_id": "5eb3d668b31de5d588f4293b",
  "borough": "Brooklyn",
  "cuisine": "Delicatessen",
  "grades": [
  {
  "date": "2014-08-21T00:00:00.000Z",
  "grade": "A",
  "score": 4
  },
  {
  "date": "2014-03-05T00:00:00.000Z",
  "grade": "A",
  "score": 3
  },
  {
  "date": "2013-01-10T00:00:00.000Z",
  "grade": "A",
  "score": 10
  }
  ],
  "name": "Nordic Delicacies",
  "restaurant_id": "40361390"
  },
  {
  "address": {
  "coord": [
  -73.95171,
  40.767461
  ],
  "building": "522",
  "street": "East   74 Street",
  "zipcode": "10021"
  },
  "_id": "5eb3d668b31de5d588f42940",
  "borough": "Manhattan",
  "cuisine": "American",
  "grades": [
  {
  "date": "2014-09-02T00:00:00.000Z",
  "grade": "A",
  "score": 12
  },
  {
  "date": "2013-12-19T00:00:00.000Z",
  "grade": "B",
  "score": 16
  },
  {
  "date": "2013-05-28T00:00:00.000Z",
  "grade": "A",
  "score": 9
  },
  {
  "date": "2012-12-07T00:00:00.000Z",
  "grade": "A",
  "score": 13
  },
  {
  "date": "2012-03-29T00:00:00.000Z",
  "grade": "A",
  "score": 11
  }
  ],
  "name": "Glorious Food",
  "restaurant_id": "40361521"
  },
  {
  "address": {
  "coord": [
  -73.9829239,
  40.6580753
  ],
  "building": "284",
  "street": "Prospect Park West",
  "zipcode": "11215"
  },
  "_id": "5eb3d668b31de5d588f4293c",
  "borough": "Brooklyn",
  "cuisine": "American",
  "grades": [
  {
  "date": "2014-11-19T00:00:00.000Z",
  "grade": "A",
  "score": 11
  },
  {
  "date": "2013-11-14T00:00:00.000Z",
  "grade": "A",
  "score": 2
  },
  {
  "date": "2012-12-05T00:00:00.000Z",
  "grade": "A",
  "score": 13
  },
  {
  "date": "2012-05-17T00:00:00.000Z",
  "grade": "A",
  "score": 11
  }
  ],
  "name": "The Movable Feast",
  "restaurant_id": "40361606"
  }];

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
  return new Promise(function(resolve, reject) {
    fetch(requestString, { method: 'GET'})
    .then(response => response.json())
    .then(json => { resolve(json); })
    .catch(err => { reject(err); });
  });
}

$(function() {
  loadRestaurantData()
  .then(data => {
    $("#restaurant-table tbody").html(tableRows({'restaurants': data}));
  })
  .catch(err => {console.log(err)});
});