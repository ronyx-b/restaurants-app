import {useState, useEffect} from 'react';
import { Card, Table, Pagination } from "react-bootstrap";
import { useHistory } from 'react-router-dom';


export default function Restaurants(props) {
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const previousPage = function() { if (page > 1) setPage(num => num - 1); }
  const nextPage = function() { setPage(num => num + 1); }
  const history = useHistory();

  useEffect(()=>{
    // let requestString = `${document.location.protocol}//${document.location.hostname}:${document.location.port}/`
    let requestString = "https://peaceful-tundra-65893.herokuapp.com/";
    requestString += `api/restaurants?page=${page}&perPage=${perPage}`;
    let borough = props.query;
    if (borough != null & borough !== "") requestString += `&borough=${borough}`;
    fetch(requestString, { method: 'GET'})
    .then(response => response.json())
    .then(data => { setRestaurants(data); })
    .catch(err => { console.error(err); });
  }, [page, props.query]);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text>
            {(restaurants == null) ? 
              (<>Loading Restaurants...</>) : 
              ((restaurants.length === 0) ? 
                (<>No Restaurants Found</>) : 
                (<><h2>Restaurant List</h2>Full list of restaurants. Optionally sorted by borough.</>))
            }
          </Card.Text>
        </Card.Body>
      </Card>
      {restaurants && restaurants.length > 0 && 
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants && restaurants.map(rest => 
                <tr key={rest._id} id={rest._id} onClick={()=>{ history.push(`/restaurant/${rest._id}`)}}>
                  <td>{rest.name}</td>
                  <td>{rest.address.building} {rest.address.street}</td>
                  <td>{rest.borough}</td>
                  <td>{rest.cuisine}</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </>
      }
    </>
  );
}