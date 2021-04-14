import React, { useEffect, useState, useRef } from "react";
import { Container, Image, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BiHome, BiBed, BiBath } from "react-icons/bi";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import Loader from "react-loaders";

import { firestore } from "../../firebase";
import "../../styles/style.css";

export default function ViewProperty() {
  const { propertyID } = useParams();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState("");
  let property = useRef();
  let host = useRef();

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  function handleClick() {
    const newWindow = window.open(
      `mailto:${host.current.email}?subject=Contacting about ${titleCase(
        property.current.address[0]
      )} Property`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  }

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
                {titleCase(property.current.address[0])}
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
              <h4 style={{ padding: "28px 0 0 0 " }}>
                {titleCase(property.current.address[0]) +
                  ", " +
                  titleCase(property.current.address[1]) +
                  ", " +
                  titleCase(property.current.address[2]) +
                  ", " +
                  property.current.address[3].toUpperCase() +
                  " " +
                  property.current.address[4].toUpperCase() +
                  ", " +
                  titleCase(property.current.address[5])}
              </h4>
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
                <p>Host: {host.current.name}</p>
                <p>Email: {host.current.email}</p>
                <p>Phone Number: {host.current.phoneNumber}</p>
                <Button
                  onClick={handleClick}
                  style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
                  variant="primary"
                  // target="_blank"
                >
                  Contact Host
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
