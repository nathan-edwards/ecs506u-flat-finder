import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert, Container, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "react-loaders";

import { firestore, storage } from "../../firebase";

export default function EditProperty() {
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
  const { currentUser } = useAuth();
  const history = useHistory();
  const { propertyID } = useParams();
  let property = useRef();

  const ref = firestore.collection("properties");

  async function fetchProperty(propertyID) {
    let data;
    const propertyRef = firestore.collection("properties").doc(`${propertyID}`);
    await propertyRef.get().then((doc) => {
      data = doc.data();
    });
    return data;
  }

  async function fetchData() {
    setLoading(true);
    let propertyData = {};
    try {
      propertyData = await fetchProperty(propertyID);
      property.current = propertyData;
    } catch {
      setError("Failed to fetch property");
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

  function editProperty(submission) {
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
    editProperty({
      id: uuidv4(),
      name: addressRef.current.value,
      desc: descRef.current.value,
      bedrooms: bedRef.current.value,
      bathrooms: bathRef.current.value,
      rentMonth: rentRef.current.value,
      rentWeek: Math.ceil(((rentRef.current.value * 12) / 365.25) * 7),
      propertyType: propTypeRef.current.value,
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
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Edit Property</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="display-name">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    ref={addressRef}
                    required
                    placeholder={property.current.name}
                  />
                </Form.Group>
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    ref={descRef}
                    required
                    placeholder={property.current.desc}
                  />
                </Form.Group>
                <Form.Group id="bathBed">
                  <Form.Row>
                    <Col>
                      <Form.Label>Bedrooms</Form.Label>
                      <Form.Control
                        as="select"
                        ref={bedRef}
                        required
                        placeholder={property.current.bedrooms}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4+</option>
                      </Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Bathroom</Form.Label>
                      <Form.Control
                        as="select"
                        ref={bathRef}
                        required
                        placeholder={property.current.bathrooms}
                      >
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
                  <Form.Control
                    type="number"
                    ref={rentRef}
                    required
                    placeholder={property.current.rentMonth}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Property Type</Form.Label>
                  <Form.Control
                    as="select"
                    ref={propTypeRef}
                    required
                    placeholder={property.current.propertyType}
                  >
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
