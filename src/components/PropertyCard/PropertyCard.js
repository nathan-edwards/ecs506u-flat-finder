import React from "react";
import { Card } from "react-bootstrap";
import { BiBed, BiBath } from "react-icons/bi";

export default function PropertyCard(props) {
  const property = props.property;
  const link = "/property/" + property.id;

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  return (
    <div>
      <Card style={{ width: "18rem", marginTop: "5%" }}>
        <Card.Img variant="top" src={property.photo} />
        <Card.Body>
          <Card.Title>{titleCase(property.address[0])}</Card.Title>
          <Card.Text>{property.desc}</Card.Text>
          <Card.Text>
            <BiBed /> {property.bedrooms} <BiBath /> {property.bathrooms}
          </Card.Text>
          <Card.Text>£{property.rentMonth} pcm</Card.Text>
          <Card.Text>£{property.rentWeek} pw</Card.Text>
          <a
            href={link}
            className="btn btn-primary stretched-link"
            style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
          >
            View Property
          </a>
        </Card.Body>
      </Card>
    </div>
  );
}

export function PropertyCardEdit(props) {
  const property = props.property;
  const link = "/property/edit/" + property.id;

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  return (
    <div>
      <Card style={{ width: "18rem", marginTop: "5%" }}>
        <Card.Img variant="top" src={property.photo} />
        <Card.Body>
          <Card.Title>{titleCase(property.address[0])}</Card.Title>
          <Card.Text>
            <BiBed /> {property.bedrooms} <BiBath /> {property.bathrooms}
          </Card.Text>
          <Card.Text>£{property.rentMonth} pcm</Card.Text>
          <Card.Text>£{property.rentWeek} pw</Card.Text>
          <a
            href={link}
            className="btn btn-primary stretched-link"
            style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
          >
            Edit Property
          </a>
        </Card.Body>
      </Card>
    </div>
  );
}
