import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/AuthContext";

import { firestore, storage } from "../../firebase";

export default function NewProperty() {
  const addressRef = useRef();
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
      name: addressRef.current.value,
      desc: descRef.current.value,
      host: currentUser.uid,
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
                  <Form.Control type="text" ref={addressRef} required />
                </Form.Group>
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" ref={descRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
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
