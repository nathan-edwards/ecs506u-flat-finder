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
import { firestore } from "../../firebase";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState();
  const [bathFilter, setBathFilter] = useState("0");
  const [bedFilter, setBedFilter] = useState("0");
  const [priceFilter, setPriceFilter] = useState("");
  const [furnishFilter, setFurnishFilter] = useState("");
  const bedbath = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4+", value: "4+" },
  ];

  const priceArray = [];

  let ref = firestore.collection("properties");
  let query = useQuery();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function priceArrayGen() {
    let i;
    for (i = 1000; i < 41000; i = i + 1000) {
      priceArray.push(i);
    }
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
      setProperties(items);
      setLoading(false);
    });
  }

  function applyFilters() {
    if (furnishFilter !== "" && bedFilter !== "0" && bathFilter !== "0") {
      ref = ref
        .where("furnishType", "==", furnishFilter)
        .where("bedrooms", "==", bedFilter)
        .where("bathrooms", "==", bathFilter);
    }
    if (furnishFilter !== "" && bedFilter !== "0") {
      ref = ref
        .where("bedrooms", "==", bedFilter)
        .where("furnishType", "==", furnishFilter);
    }
    if (furnishFilter !== "" && bathFilter !== "0") {
      ref = ref
        .where("bathrooms", "==", bathFilter)
        .where("furnishType", "==", furnishFilter);
    }
    if (bathFilter !== "" && bedFilter !== "0") {
      ref = ref
        .where("bedrooms", "==", bedFilter)
        .where("bathrooms", "==", bathFilter);
    }
    if (furnishFilter !== "") {
      ref = ref.where("furnishType", "==", furnishFilter);
    }
    if (bathFilter !== "0") {
      ref = ref.where("bathrooms", "==", bathFilter);
    }
    if (bedFilter !== "0") {
      ref = ref.where("bedrooms", "==", bedFilter);
    }
  }

  useEffect(() => {
    priceArrayGen();
    getProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader type="ball-pulse" />;
  }

  return (
    <>
      <div className="propertyGrid">
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Max Monthly</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(g) => setPriceFilter(g.currentTarget.value)}
                    required
                  >
                    <option>Select a Price</option>
                    {priceArray.map((price) => (
                      <option key={price}>{price}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <p>Bedrooms</p>
                <ButtonGroup toggle>
                  {bedbath.map((bed, idx) => (
                    <ToggleButton
                      key={idx}
                      type="radio"
                      variant="primary"
                      value={bed.value}
                      checked={bedFilter === bed.value}
                      onChange={(g) => setBedFilter(g.currentTarget.value)}
                    >
                      {bed.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
                <p>Bathroom</p>
                <ButtonGroup toggle>
                  {bedbath.map((bath, idx) => (
                    <ToggleButton
                      key={idx}
                      type="radio"
                      variant="primary"
                      value={bath.value}
                      checked={bathFilter === bath.value}
                      onChange={(f) => setBathFilter(f.currentTarget.value)}
                    >
                      {bath.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
                <p>Furnished Type</p>
                <ButtonGroup toggle>
                  <ToggleButton
                    type="radio"
                    variant="primary"
                    value="Furnished"
                    checked={furnishFilter === "Furnished"}
                    onChange={(e) => setFurnishFilter(e.currentTarget.value)}
                  >
                    Furnished
                  </ToggleButton>
                  <ToggleButton
                    type="radio"
                    variant="primary"
                    value="Semi Furnished"
                    checked={furnishFilter === "Semi Furnished"}
                    onChange={(e) => setFurnishFilter(e.currentTarget.value)}
                  >
                    Semi Furnished
                  </ToggleButton>
                  <ToggleButton
                    type="radio"
                    variant="primary"
                    value="Unfurnished"
                    checked={furnishFilter === "Unfurnished"}
                    onChange={(e) => setFurnishFilter(e.currentTarget.value)}
                  >
                    Unfurnished
                  </ToggleButton>
                </ButtonGroup>
                <Button variant="primary" onClick={getProperties}>
                  Apply
                </Button>
              </Form>
            </Col>
            <Col>
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
