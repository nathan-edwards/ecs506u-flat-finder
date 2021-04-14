import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { firestore } from "../../firebase";

export default function ReportCard(props) {
  const report = props.report;
  const link = "/report/" + report.id;

  async function fetchUser(user) {
    let data;
    const userRef = firestore.collection("users").doc(`${user}`);
    await userRef.get().then((doc) => {
      data = doc.data();
    });
    return data.name;
  }
  
  useEffect(() => {
    fetchUser(report.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Card style={{ width: "16rem", marginTop: "5%" }}>
        <Card.Body>
          <Card.Text>
            <strong>Subject: {report.subject}</strong>
          </Card.Text>
          <Card.Text>Date Created: {report.date}</Card.Text>
          <a
            href={link}
            className="btn btn-primary stretched-link"
            style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
          >
            View report
          </a>
        </Card.Body>
      </Card>
    </div>
  );
}
