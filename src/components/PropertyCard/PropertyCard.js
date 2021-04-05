import React from "react";
import { Card } from "react-bootstrap";
import { BiBed, BiBath } from "react-icons/bi";
import "holderjs";

function PropertyCard(props) {
  const property = props.property;
  return (
    <div>
      <Card style={{ width: "18rem", marginTop: "5%" }}>
        <Card.Img variant="top" src={property.photo} />
        <Card.Body>
          <Card.Title>{property.name}</Card.Title>
          <Card.Text>{property.desc}</Card.Text>
          <Card.Text>
            <BiBed /> {property.bedrooms} <BiBath /> {property.bathrooms}
          </Card.Text>
          <Card.Text>£{property.rentMonth} pcm</Card.Text>
          <Card.Text>£{property.rentWeek} pw</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PropertyCard;
