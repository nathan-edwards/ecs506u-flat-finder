import React, { useState, useEffect } from "react";
import { CardDeck } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import "holderjs";
import Loader from 'react-loaders'

import "../../styles/style.css";
import { firestore } from "../../firebase";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

export default function Dashboard() {
  // const [error, setError] = useState("");
  // const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState();
  // const history = useHistory();

  let ref = firestore.collection("properties");
  let query = useQuery();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function getProperties() {
    setLoading(true);
    if (query.get("type") === "rent") {
      ref = ref.where("propertyType", "==", "Rent");
    } else if (query.get("type") === "flatshare") {
      ref = ref.where("propertyType", "==", "Flat Share");
    } else {
      ref = firestore.collection("properties");
    }
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
      <div className="propertyGrid">
        <CardDeck>
          {properties.map((property) => (
            <div key={property.id}>
              <PropertyCard property={property} />
            </div>
          ))}
        </CardDeck>
      </div>
    </>
  );
}
