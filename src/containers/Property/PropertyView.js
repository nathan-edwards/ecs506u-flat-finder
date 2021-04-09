import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BiHome, BiBed, BiBath } from "react-icons/bi";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import Loader from "react-loaders";

import { firestore } from "../../firebase";
import "../../styles/style.css";

export default function PropertyView() {
  const { propertyID } = useParams();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState({});
  const [host, setHost] = useState({});

  function getData() {
    let ref = firestore.collection("properties").doc(`${propertyID}`);
    setLoading(true);
    ref.get().then((doc) => {
      setProperty(doc.data());
    });
    ref = firestore.collection("users").doc(property.host);
    ref.get().then((doc) => {
      setHost(doc.data());
      setLoading(false);
    });
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader type="ball-pulse" />;
  }

  return (
    <>
      <Container style={{ minHeight: "100vh" }}>
        <Row className="p-2 property-header">
          <Col>
            <Row>
              <h1 style={{ fontSize: "26px", padding: "28px 0 12px 0 " }}>
                {property.name}
              </h1>
            </Row>
            <Row>
              <Gallery>
                <Item original={property.photo} width="1024" height="768">
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={property.photo}
                      rounded
                      width="60%"
                    />
                  )}
                </Item>
              </Gallery>
            </Row>
          </Col>
        </Row>
        <Row className="p-2">
          <Col sm={8} style={{ padding: "0" }}>
            <h2 style={{ fontSize: "22px" }}>Details</h2>
            <Row>
              <Col>
                <p className="property-mini-details">Property Type</p>
                <p className="property-mini-details-text">
                  <BiHome /> {property.propertyType}
                </p>
              </Col>
              <Col>
                <p className="property-mini-details">Bedrooms</p>
                <p className="property-mini-details-text">
                  <BiBed /> {property.bedrooms}
                </p>
              </Col>
              <Col>
                <p className="property-mini-details">Bathrooms</p>
                <p className="property-mini-details-text">
                  <BiBath /> {property.bathrooms}
                </p>
              </Col>
            </Row>
            <p className="property-description">{property.desc}</p>
          </Col>
          <Col sm={4} style={{ padding: "0" }}>
            <Card>
              <Card.Header>
                <span style={{ fontSize: "16px", paddingRight: "30px" }}>
                  <span style={{ fontSize: "21px" }}>
                    £{property.rentMonth}
                  </span>{" "}
                  / monthly{" "}
                </span>
                <span style={{ fontSize: "13spx" }}>
                  <span style={{ fontSize: "17px" }}>£{property.rentWeek}</span>{" "}
                  / weekly{" "}
                </span>
              </Card.Header>
              <Card.Body>
                Host: {host.name}
                <Button variant="primary">Contact Host</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
