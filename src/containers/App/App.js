import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import SignUp from "../Auth/SignUp";
import Dashboard from "../Dashboard/Dashboard";
import AdminDashboard from "../Dashboard/AdminDashboard";
import HostDashboard from "../Dashboard/HostDashboard";
import Login from "../Auth/Login.js";
import ForgotPassword from "../Auth/ForgotPassword";
import UpdateProfile from "../UserProfile/UpdateProfile";
import UserProfile from "../UserProfile/UserProfile";
import NewProperty from "../Property/NewProperty";
import ViewProperty from "../Property/ViewProperty";
import EditProperty from "../Property/EditProperty";
import PrivateRoute from "../PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute
              permission={"All"}
              exact
              path="/"
              component={Dashboard}
            />
            <PrivateRoute
              permission={"Admin"}
              path="/admin"
              component={AdminDashboard}
            />
            <PrivateRoute
              permission={"Host"}
              path="/host"
              component={HostDashboard}
            />
            <PrivateRoute
              permission={"All"}
              path="/profile/update"
              component={UpdateProfile}
            />
            <PrivateRoute
              permission={"All"}
              path="/profile"
              component={UserProfile}
            />
            <PrivateRoute
              permission={"Host"}
              path="/property/new"
              component={NewProperty}
            />
            <PrivateRoute
              permission={"All"}
              exact path="/property/:propertyID"
              component={ViewProperty}
            />
            <PrivateRoute
              permission={"Host"}
              exact path="/property/edit/:propertyID"
              component={EditProperty}
            />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
