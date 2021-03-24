import React, { useState } from "react";
import { Card, Button, CardContent } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";

export default function Dashboard() {
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
    <div>
      <Card>
        <CardContent>
          <h2>Profile</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
        </CardContent>
      </Card>
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
}
