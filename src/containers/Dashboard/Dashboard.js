import React, { useState, useEffect } from "react";
import {
  CardDeck,
  Container,
  Row,
  Col,
  Form,
  ButtonGroup,
  ToggleButton,
  Button,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Loader from "react-loaders";

import "../../styles/style.css";
import "./Dashboard.css";
import { firestore } from "../../firebase";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState();
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [bathFilter, setBathFilter] = useState("0");
  const [bedFilter, setBedFilter] = useState("0");
  const [priceFilter, setPriceFilter] = useState("Select a Price");
  const [furnishFilter, setFurnishFilter] = useState("");
  const bedbath = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4+", value: "4+" },
  ];
  const priceArray = [
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000,
  ];

  let ref = firestore.collection("properties");
  let query = useQuery();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function getProperties() {
    setLoading(true);
    if (query.get("location")) {
      let location = query.get("location").toLowerCase();
      ref = ref.where("address", "array-contains", `${location}`);
    } else {
      ref = firestore.collection("properties");
    }
    applyFilters();
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      console.log(items);
      setProperties(items);
      setLoading(false);
    });
  }

  function applyFilters() {
    if (propertyTypeFilter !== "") {
      ref = ref.where("propertyType", "==", propertyTypeFilter);
    }
    if (priceFilter !== "Select a Price") {
      ref = ref.where("rentMonth", "<=", priceFilter);
    }
    if (bedFilter !== "0") {
      ref = ref.where("bedrooms", "==", bedFilter);
    }
    if (bathFilter !== "0") {
      ref = ref.where("bathrooms", "==", bathFilter);
    }
    if (furnishFilter !== "") {
      ref = ref.where("furnishType", "==", furnishFilter);
    }
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
      <style type="text/css">
        {`
    .btn-outline-primary {
      border-color: #4DB790;
      color: #4DB790;
      font-weight: 500;
    }

    .btn-outline-primary:not(:disabled):not(.disabled).active {
      background-color: #4DB790;
      border-color: #4DB790;
      font-weight: 500;
    }

    .btn-outline-primary:not(:disabled):not(.disabled).active, .btn-outline-primary:not(:disabled):not(.disabled):active, .show > .btn-outline-primary.dropdown-toggle {
      background-color: #4DB790;
      border-color: #4DB790;
      font-weight: 500;
    }
    
    .btn-outline-primary:hover {
      background-color: #4DB790;
      border-color: #4DB790;
      font-weight: 500;
    }
    `}
      </style>
      <div className="propertyGrid body">
        <Container fluid>
          <Row>
            <Col
              xs={4}
              md={3}
              style={{ position: "sticky", marginRight: 50, height: "100%" }}
            >
              <Form>
                <div className="filterSection">
                  <h6 className="heading">Property Type</h6>
                  <ButtonGroup toggle>
                    <ToggleButton
                      type="radio"
                      variant="outline-primary"
                      value=""
                      checked={propertyTypeFilter === ""}
                      onChange={(e) =>
                        setPropertyTypeFilter(e.currentTarget.value)
                      }
                    >
                      Any
                    </ToggleButton>
                    <ToggleButton
                      type="radio"
                      variant="outline-primary"
                      value="Flat"
                      checked={propertyTypeFilter === "Flat"}
                      onChange={(e) =>
                        setPropertyTypeFilter(e.currentTarget.value)
                      }
                    >
                      Flat
                    </ToggleButton>
                    <ToggleButton
                      type="radio"
                      variant="outline-primary"
                      value="House"
                      checked={propertyTypeFilter === "House"}
                      onChange={(e) =>
                        setPropertyTypeFilter(e.currentTarget.value)
                      }
                    >
                      House
                    </ToggleButton>
                    <ToggleButton
                      type="radio"
                      variant="outline-primary"
                      value="Flat Share"
                      checked={propertyTypeFilter === "Flat Share"}
                      onChange={(e) =>
                        setPropertyTypeFilter(e.currentTarget.value)
                      }
                    >
                      Flat Share
                    </ToggleButton>
                  </ButtonGroup>
                </div>
                <div>
                  <Form.Group>
                    <h6 className="heading">Monthly Max</h6>
                    <Form.Control
                      as="select"
                      custom
                      value={priceFilter}
                      onChange={(g) =>
                        setPriceFilter(
                          parseInt(g.currentTarget.value.replace("£", ""))
                        )
                      }
                      required
                    >
                      <option>Select a Price</option>
                      {priceArray.map((price, idx) => (
                        <option key={idx}>£{price}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className="filterSection">
                  <h6 className="heading">Bedrooms</h6>
                  <ButtonGroup toggle>
                    <ToggleButton
                      type="radio"
                      variant="outline-primary"
                      value="0"
                      checked={bedFilter === "0"}
                      onChange={(g) => setBedFilter(g.currentTarget.value)}
                    >
                      Any
                    </ToggleButton>
                    {bedbath.map((bed, idx) => (
                      <ToggleButton
                        key={idx}
                        type="radio"
                        variant="outline-primary"
                        value={bed.value}
                        checked={bedFilter === bed.value}
                        onChange={(g) => setBedFilter(g.currentTarget.value)}
                      >
                        {bed.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </div>
                <div className="filterSection">
                  <h6 className="heading">Bathroom</h6>
                  <ButtonGroup toggle>
                    <ToggleButton
                      type="radio"
                      variant="outline-primary"
                      value="0"
                      checked={bathFilter === "0"}
                      onChange={(f) => setBathFilter(f.currentTarget.value)}
                    >
                      Any
                    </ToggleButton>
                    {bedbath.map((bath, idx) => (
                      <ToggleButton
                        key={idx}
                        type="radio"
                        variant="outline-primary"
                        value={bath.value}
                        checked={bathFilter === bath.value}
                        onChange={(f) => setBathFilter(f.currentTarget.value)}
                      >
                        {bath.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </div>
                <div className="filterSection">
                  <h6 className="heading">Furnished Type</h6>
                  <ButtonGroup toggle>
                    <ToggleButton
                      type="radio"
                      variant="outline-primary"
                      value=""
                      checked={furnishFilter === ""}
                      onChange={(e) => setFurnishFilter(e.currentTarget.value)}
                    >
                      Any
                    </ToggleButton>
                    <ToggleButton
                      type="radio"
                      variant="outline-primary"
                      value="Furnished"
                      checked={furnishFilter === "Furnished"}
                      onChange={(e) => setFurnishFilter(e.currentTarget.value)}
                    >
                      Furnished
                    </ToggleButton>
                    <ToggleButton
                      type="radio"
                      variant="outline-primary"
                      value="Unfurnished"
                      checked={furnishFilter === "Unfurnished"}
                      onChange={(e) => setFurnishFilter(e.currentTarget.value)}
                    >
                      Unfurnished
                    </ToggleButton>
                  </ButtonGroup>
                </div>
                <Button variant="outline-primary" onClick={getProperties}>
                  Apply
                </Button>
              </Form>
            </Col>
            <Col xs={12} md={8}>
              {properties.length === 1 ? (
                <h6 style={{ paddingBottom: 0 }} className="heading">
                  {properties.length} Property
                </h6>
              ) : (
                <h6
                  style={{ paddingBottom: 0, marginBottom: 0 }}
                  className="heading"
                >
                  {properties.length} Properties
                </h6>
              )}
              <CardDeck>
                {properties.map((property) => (
                  <div key={property.id}>
                    <PropertyCard property={property} />
                  </div>
                ))}
              </CardDeck>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
