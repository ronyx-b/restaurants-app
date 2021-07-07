import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import {useState, useEffect} from 'react';
import {Card, CardDeck} from "react-bootstrap";
import {format} from "date-fns";

export default function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    // let requestString = `${document.location.protocol}//${document.location.hostname}:${document.location.port}/`
    let requestString = "https://peaceful-tundra-65893.herokuapp.com/";
    requestString += `api/restaurants/${props.id}`;
    fetch(requestString, { method: 'GET'})
    .then(response => response.json())
    .then(data => { 
      setLoading(false);
      setRestaurant(data.hasOwnProperty("_id") ? data : null);
    })
    .catch(err => { console.error(err); });
  }, [props.id]);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text>
            {(restaurant != null) ? 
              (<><h2>{restaurant.name}</h2>{restaurant.address.building} {restaurant.address.street}</>) : 
              ((loading === true) ? (<>Loading Restaurant Data...</>) : (<>Unable to find Restaurant with id: {props.id}</>))
            }
          </Card.Text>
        </Card.Body>
      </Card>
      {restaurant && 
        <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 
          <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
        </MapContainer>
      }
      <br /><h2>Ratings</h2><hr></hr>
      <CardDeck>
        {restaurant && restaurant.grades.map(grade =>
          <Card>
            <Card.Body>Grade: {grade.grade}</Card.Body>
            <Card.Footer>Completed: {format(Date.parse(grade.date), "dd/MM/yyyy")}</Card.Footer>
          </Card>
        )}
      </CardDeck>
    </>
  );
}