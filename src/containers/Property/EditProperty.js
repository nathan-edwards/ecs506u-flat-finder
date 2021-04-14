import React, { useRef, useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Col,
  Row,
  Modal,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "react-loaders";

import { firestore, storage } from "../../firebase";

export default function EditProperty() {
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
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { currentUser } = useAuth();
  const history = useHistory();
  const { propertyID } = useParams();
  let property = useRef();

  const editRef = firestore.collection("properties");

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

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

  function editProperty(submission) {
    editRef
      .doc(submission.id)
      .set(submission)
      .catch((err) => {
        setError(err);
      });
    history.push("/host");
  }

  function removeProperty() {
    handleClose();
    editRef
      .doc(`${propertyID}`)
      .delete()
      .catch((err) => {
        setError(err);
      });
    history.push("/host");
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader type="ball-pulse" />;
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
    let postcodes = cityRef.current.value.toLowerCase().split();
    editProperty({
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
      rentMonth: rentRef.current.value,
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
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Warning Property Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this property?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={removeProperty}>
                Confirm Deletion
              </Button>
            </Modal.Footer>
          </Modal>
          <Card style={{ borderColor: "transparent" }}>
            <Card.Body>
              <h2 className="text-center mb-4">Edit Property</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="address">
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    ref={addressLine1Ref}
                    required
                    placeholder={titleCase(property.current.address[0])}
                  />
                </Form.Group>
                <Form.Group id="address">
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    type="text"
                    ref={addressLine2Ref}
                    required
                    placeholder={titleCase(property.current.address[1])}
                  />
                </Form.Group>
                <Form.Group id="address">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    ref={cityRef}
                    required
                    placeholder={titleCase(property.current.address[2])}
                  />
                </Form.Group>
                <Form.Group id="address">
                  <Form.Label>Postcode/Zipcode</Form.Label>
                  <Form.Control
                    type="text"
                    ref={postcodeRef}
                    required
                    placeholder={
                      property.current.address[3].toUpperCase() +
                      " " +
                      property.current.address[4].toUpperCase()
                    }
                  />
                </Form.Group>
                <Form.Group id="address">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    ref={countryRef}
                    required
                    placeholder={titleCase(property.current.address[5])}
                  />
                </Form.Group>
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    ref={descRef}
                    required
                    placeholder={titleCase(property.current.desc)}
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
                <Row>
                  <Col>
                    <Button
                      disabled={loading}
                      className="w-100"
                      variant="danger"
                      onClick={handleShow}
                    >
                      Delete
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      disabled={loading}
                      className="w-100"
                      type="submit"
                      style={{
                        backgroundColor: "#4DB790",
                        borderColor: "#4DB790",
                      }}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
