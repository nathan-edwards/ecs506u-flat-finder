import React, { useEffect, useState, useRef } from "react";
import { Container, Image, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BiHome, BiBed, BiBath } from "react-icons/bi";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import Loader from "react-loaders";
// import fetchHost from "./HostInfo";
// import fetchProperty from "./PropertyInfo";

import { firestore } from "../../firebase";
import "../../styles/style.css";

export default function PropertyView() {
  const { propertyID } = useParams();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState("");
  let property = useRef();
  let host = useRef();

  async function fetchProperty(propertyID) {
    let data;
    const propertyRef = firestore.collection("properties").doc(`${propertyID}`);
    await propertyRef.get().then((doc) => {
      data = doc.data();
    });
    return data;
  }

  async function fetchHost(host) {
    let data;
    const hostRef = firestore.collection("users").doc(`${host}`);
    await hostRef.get().then((doc) => {
      data = doc.data();
    });
    return data;
  }

  async function fetchData() {
    setLoading(true);
    let hostData = {};
    let propertyData = {};
    try {
      propertyData = await fetchProperty(propertyID);
      property.current = propertyData;
    } catch {
      setError("Failed to fetch property");
    }
    try {
      hostData = await fetchHost(property.current.host);
      host.current = hostData;
    } catch {
      setError("Failed to fetch host");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
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
                {property.current.name}
              </h1>
            </Row>
            <Row>
              <Gallery>
                <Item
                  original={property.current.photo}
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={property.current.photo}
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
                  <BiHome /> {property.current.propertyType}
                </p>
              </Col>
              <Col>
                <p className="property-mini-details">Bedrooms</p>
                <p className="property-mini-details-text">
                  <BiBed /> {property.current.bedrooms}
                </p>
              </Col>
              <Col>
                <p className="property-mini-details">Bathrooms</p>
                <p className="property-mini-details-text">
                  <BiBath /> {property.current.bathrooms}
                </p>
              </Col>
            </Row>
            <p className="property-description">{property.current.desc}</p>
          </Col>
          <Col sm={4} style={{ padding: "0" }}>
            <Card>
              <Card.Header>
                <span style={{ fontSize: "16px", paddingRight: "30px" }}>
                  <span style={{ fontSize: "21px" }}>
                    £{property.current.rentMonth}
                  </span>{" "}
                  / monthly{" "}
                </span>
                <span style={{ fontSize: "13spx" }}>
                  <span style={{ fontSize: "17px" }}>
                    £{property.current.rentWeek}
                  </span>{" "}
                  / weekly{" "}
                </span>
              </Card.Header>
              <Card.Body>
                Host: {host.current.name}
                <Button variant="primary">Contact Host</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
