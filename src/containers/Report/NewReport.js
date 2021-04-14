import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/AuthContext";

import { firestore } from "../../firebase";
let newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();
let separator = "/";

export default function NewProperty() {
  const subjectRef = useRef();
  const descRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();

  const ref = firestore.collection("reports");

  function addReport(submission) {
    ref
      .doc(submission.id)
      .set(submission)
      .catch((err) => {
        setError(err);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    addReport({
      id: uuidv4(),
      subject: subjectRef.current.value,
      desc: descRef.current.value,
      user: currentUser.uid,
      date: `${year}${separator}${
        month < 10 ? `0${month}` : `${month}`
      }${separator}${date}`,
    });
    history.push("/");
    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">New Report</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="display-name">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" ref={subjectRef} required />
                </Form.Group>
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <br></br>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    cols={48}
                    ref={descRef}
                    required
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100"
                  type="submit"
                  style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
