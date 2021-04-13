import React, { useState } from "react";
import { Card, Button, Alert, Form, FormControl } from "react-bootstrap";
import'bootstrap/dist/css/bootstrap.min.css';
import "./HostDashboard.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";


export default function HostDashboard() {
    const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.pushState("/login");
    } catch {
      setError("Failed to log out");
    }
  }
    
    return (
        <>
            <Card className="profile_section">
                <Card.Body>
                <h2 className="text-center mb-4"><b>Profile</b></h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <h4 id="profile_name">
                    <strong>Name</strong> <br></br>
                </h4>
                <p id="display_name">{currentUser.displayName}</p>
                
                <h4 id="profile_email">
                    <strong>Email</strong> <br></br>
                </h4>
                <p id="display_email">{currentUser.email}</p>

                <h4 id="profile_user_type">
                    <strong>User Type</strong> <br></br>
                </h4>
                <p id="display_user_type">{currentUser.photoURL}</p>

                <Link id="update_profile" to="/update-profile" className="btn btn-primary w-100 mt-3">
                    Update Profile
                </Link>
                </Card.Body>
            </Card>

            <Card className="host_tools_section">
        <Card.Body>
          <h2 className="text-center mb-4"><b>Host Tools</b></h2>
          <br></br>
          <Button className="create_listing" variant="primary"> Create Listing </Button>
          <Button className="update_listing_information" variant="primary"> Update Listing Information </Button>
        </Card.Body>
        </Card>
   
          <div className="w-100 text-center mt-2">
        <Button id="log_out" variant="link" className="btn-primary" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}