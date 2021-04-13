import React, { useState, useEffect } from "react";
import { CardDeck } from "react-bootstrap";
import Loader from "react-loaders";

import "../../styles/style.css";
import { firestore } from "../../firebase";
import ReportCard from "../Report/ReportCard";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState();

  let ref = firestore.collection("reports");

  function getProperties() {
    setLoading(true);
    ref = firestore.collection("reports");

    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setReports(items);
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
          {reports.map((report) => (
            <div key={report.id}>
              <ReportCard report={report} />
            </div>
          ))}
        </CardDeck>
      </div>
    </>
  );
}
