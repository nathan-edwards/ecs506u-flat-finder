import React, { useEffect, useState, useRef } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import Loader from "react-loaders";

import { firestore } from "../../firebase";
import "../../styles/style.css";

export default function ViewReport() {
  const { reportID } = useParams();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState("");
  let report = useRef();
  let host = useRef();

  async function fetchReport(reportID) {
    let data;
    const reportRef = firestore.collection("reports").doc(`${reportID}`);
    await reportRef.get().then((doc) => {
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
    let reportData = {};
    try {
      reportData = await fetchReport(reportID);
      report.current = reportData;
    } catch {
      setError("Failed to fetch report");
    }
    try {
      hostData = await fetchHost(report.current.host);
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
      <Card style={{ margin:"auto", width: "50rem", marginTop: "5%" }}>
        <Card.Body>
          <Card.Text style={{textAlign:"center"}}><h2><strong>{report.current.subject}</strong></h2></Card.Text>
          <Card.Text style={{marginBottom: "0%"}}>Description:</Card.Text>
          <Card.Text style={{marginTop: "0%"}}>{report.current.desc}</Card.Text>
          <Card.Text>Created By: {}</Card.Text>
          <Card.Text>Date Created: {report.current.date}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
