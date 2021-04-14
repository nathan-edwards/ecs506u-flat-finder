import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/AuthContext";

import { firestore, storage } from "../../firebase";

export default function NewProperty() {
  const addressLine1Ref = useRef();
  const addressLine2Ref = useRef();
  const cityRef = useRef();
  const postcodeRef = useRef();
  const countryRef = useRef();
  const descRef = useRef();
  const bedRef = useRef();
  const bathRef = useRef();
  const rentRef = useRef();
  const propTypeRef = useRef();
  const furnishTypeRef = useRef();
  const photoRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const { currentUser } = useAuth();
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
    let postcodes = postcodeRef.current.value.toLowerCase().split(" ");
    if (addressLine2Ref.current.value === null) {
      addressLine2Ref.current = "n/a";
    }
    if (photoRef.current.value === null) {
      photoRef.current = "n/a";
    }
    addProperty({
      id: uuidv4(),
      address: [
        addressLine1Ref.current.value.toLowerCase(),
        addressLine2Ref.current.value.toLowerCase(),
        cityRef.current.value.toLowerCase(),
        postcodes[0],
        postcodes[1],
        countryRef.current.value.toLowerCase(),
      ],
      desc: descRef.current.value,
      bedrooms: bedRef.current.value,
      bathrooms: bathRef.current.value,
      rentMonth: parseInt(rentRef.current.value),
      rentWeek: Math.ceil(((rentRef.current.value * 12) / 365.25) * 7),
      propertyType: propTypeRef.current.value,
      furnishType: furnishTypeRef.current.value,
      photo: photoUrl,
      host: currentUser.uid,
    });
    history.push("/");
    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Card style={{borderColor: "transparent"}}>
            <Card.Body>
              <h2 className="text-center mb-4">New Property</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="address">
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control type="text" ref={addressLine1Ref} required />
                </Form.Group>
                <Form.Group id="address">
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control type="text" ref={addressLine2Ref} />
                </Form.Group>
                <Form.Group id="address">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" ref={cityRef} required />
                </Form.Group>
                <Form.Group id="address">
                  <Form.Label>Postcode/Zipcode</Form.Label>
                  <Form.Control type="text" ref={postcodeRef} required />
                </Form.Group>
                <Form.Group id="address">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" ref={countryRef} required />
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
                    <option>House</option>
                    <option>Flat Share</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Furnished Type</Form.Label>
                  <Form.Control as="select" ref={furnishTypeRef} required>
                    <option>Furnished</option>
                    <option>Unfurnished</option>
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
                <Button disabled={loading} className="w-100" type="submit" style={{backgroundColor: "#4DB790", borderColor: "#4DB790"}}>
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
