import React from 'react';
import Card from 'react-bootstrap/Card'

const RestaurantCard = ({apiData}) => {

  const cards = apiData.map(data => {
    return(
      <Card key={data.name} id='card' style={{width: '50%'}}>
        <Card.Img variant='top' id='img' style={{width: '100%', height: 'auto'}} src={data.image_url} />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{data.rating} &nbsp; {data.price}</Card.Subtitle>
          <Card.Text>
            {data.location}
          </Card.Text>
          <Card.Link href={data.url}>Yelp</Card.Link>
        </Card.Body>
      </Card>
    )
  })


  return (
    <div className='container'>
      {
        cards
      }
    </div>
  );
};

export default RestaurantCard;