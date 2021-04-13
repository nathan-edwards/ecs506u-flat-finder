import React from "react";
import { Card } from "react-bootstrap";
import { BiBed, BiBath } from "react-icons/bi";
import "holderjs";

export default function PropertyCard(props) {
  const property = props.property;
  const link = "/property/" + property.id;

  return (
    <div>
      <Card style={{ width: "18rem", marginTop: "5%" }}>
        <Card.Img variant="top" src={property.photo} />
        <Card.Body>
          <Card.Title>{property.address[0]}</Card.Title>
          <Card.Text>{property.desc}</Card.Text>
          <Card.Text>
            <BiBed /> {property.bedrooms} <BiBath /> {property.bathrooms}
          </Card.Text>
          <Card.Text>£{property.rentMonth} pcm</Card.Text>
          <Card.Text>£{property.rentWeek} pw</Card.Text>
          <a href={link} className="btn btn-primary stretched-link">
            {" "}
            View Property{" "}
          </a>
        </Card.Body>
      </Card>
    </div>
  );
}

export function PropertyCardEdit(props) {
  const property = props.property;
  const link = "/property/edit/" + property.id;

  return (
    <div>
      <Card style={{ width: "18rem", marginTop: "5%" }}>
        <Card.Img variant="top" src={property.photo} />
        <Card.Body>
          <Card.Title>{property.address[0]}</Card.Title>
          <Card.Text>
            <BiBed /> {property.bedrooms} <BiBath /> {property.bathrooms}
          </Card.Text>
          <Card.Text>£{property.rentMonth} pcm</Card.Text>
          <Card.Text>£{property.rentWeek} pw</Card.Text>
          <a href={link} className="btn btn-primary stretched-link">
            {" "}
            Edit Property{" "}
          </a>
        </Card.Body>
      </Card>
    </div>
  );
}
