import React, { useState, useEffect } from "react";
import { CardDeck } from "react-bootstrap";
import { PropertyCardEdit } from "../../components/PropertyCard/PropertyCard";
import Loader from "react-loaders";
import { firestore } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

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
      <div className="propertyGrid">
        <CardDeck>
          {properties.map((property) => (
            <div key={property.id}>
              <PropertyCardEdit property={property} />
            </div>
          ))}
        </CardDeck>
      </div>
    </>
  );
}
