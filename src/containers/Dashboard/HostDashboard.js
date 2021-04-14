import React, { useState, useEffect } from "react";
import { CardDeck, Row, Col, Button } from "react-bootstrap";
import { PropertyCardEdit } from "../../components/PropertyCard/PropertyCard";
import Loader from "react-loaders";
import { firestore } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import "./HostDashboard.css";

export default function HostDashboard() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState();

  let ref = firestore.collection("properties");

  function getProperties() {
    setLoading(true);
    ref = ref.where("host", "==", `${currentUser.uid}`);
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setProperties(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader type="ball-pulse" />;
  }

  return (
    <>
      <div className="propertyGrid hostDashboard">
        <Row>
          <Col xs={4} md={3}>
            <h2 style={{fontWeight: 600}}>Host Dashboard</h2>
            <h3 style={{fontSize: "x-large"}}>Hello, <span style={{color: "#4DB790"}}>{currentUser.displayName}</span></h3>
            <Button
              href="/profile/update"
              style={{ backgroundColor: "#4DB790", borderColor: "#4DB790", marginTop: 15 }}
            >
              Update Profile
            </Button>
          </Col>
          <Col xs={12} md={8}>
            <Row>
              <Col>
                <h2>Properties</h2>
              </Col>
              <Col xs={10}>
                <Button
                  href="/property/new"
                  style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
                >
                  New Property
                </Button>
              </Col>
            </Row>
            <CardDeck>
              {properties.map((property) => (
                <div key={property.id}>
                  <PropertyCardEdit property={property} />
                </div>
              ))}
            </CardDeck>
          </Col>
        </Row>
      </div>
    </>
  );
}
