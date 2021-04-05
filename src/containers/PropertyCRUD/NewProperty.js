import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { firestore, storage } from "../../firebase";

export default function NewProperty() {
  const addressRef = useRef();
  const descRef = useRef();
  const bedRef = useRef();
  const bathRef = useRef();
  const rentRef = useRef();
  const propTypeRef = useRef();
  const photoRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const history = useHistory();

  const ref = firestore.collection("properties");

  function addProperty(submission) {
    ref
      .doc(submission.id)
      .set(submission)
      .catch((err) => {
        setError(err);
      });
  }

  async function onFileChange(e) {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setPhotoUrl(await fileRef.getDownloadURL());
  }

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    addProperty({
      id: uuidv4(),
      name: addressRef.current.value,
      desc: descRef.current.value,
      bedrooms: bedRef.current.value,
      bathrooms: bathRef.current.value,
      rentMonth: rentRef.current.value,
      rentWeek: Math.ceil(((rentRef.current.value * 12) / 365.25) * 7),
      propertyType: propTypeRef.current.value,
      photo: photoUrl,
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
              <h2 className="text-center mb-4">New Property</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="display-name">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" ref={addressRef} required />
                </Form.Group>
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" ref={descRef} required />
                </Form.Group>
                <Form.Group id="bathBed">
                  <Form.Row>
                    <Col>
                      <Form.Label>Bedrooms</Form.Label>
                      <Form.Control as="select" ref={bedRef} required>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4+</option>
                      </Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Bathroom</Form.Label>
                      <Form.Control as="select" ref={bathRef} required>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4+</option>
                      </Form.Control>
                    </Col>
                  </Form.Row>
                </Form.Group>
                <Form.Group id="rentMonth">
                  <Form.Label>Monthly Rent</Form.Label>
                  <Form.Control type="number" ref={rentRef} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Property Type</Form.Label>
                  <Form.Control as="select" ref={propTypeRef} required>
                    <option>Rent</option>
                    <option>Flat Share</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.File
                    label="Photo File"
                    onChange={onFileChange}
                    ref={photoRef}
                    required
                  />
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
