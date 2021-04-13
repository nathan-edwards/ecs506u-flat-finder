import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header/Header";

export default function PrivateRoute({
  component: Component,
  permission,
  ...rest
}) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser === null ? (
          <Redirect to="/login" />
        ) : currentUser &&
          currentUser.photoURL === "Admin" &&
          permission === "Admin" ? (
          <div>
             <Header />
            <Component {...props} />
          </div>
        ) : (currentUser &&
            currentUser.photoURL === "Host" &&
            permission === "Host") ||
          currentUser.photoURL === "Admin" ? (
          <div>
             <Header />
            <Component {...props} />
          </div>
        ) : currentUser && permission === "All" ? (
          <div>
            <Header />
            <Component {...props} />
          </div>
        ) : currentUser ? (
          <Redirect to="/" />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
