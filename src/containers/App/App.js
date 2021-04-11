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
import PropertyView from "../Property/PropertyView";
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
            <PrivateRoute permission={"All"} exact path="/" component={Dashboard} />
            <PrivateRoute permission={"Admin"} path="/admin" component={AdminDashboard} />
            <PrivateRoute permission={"Host"} path="/host" component={HostDashboard} />
            <PrivateRoute permission={"Host"} path="/new-property" component={NewProperty} />
            <PrivateRoute permission={"All"} path="/update-profile" component={UpdateProfile} />
            <PrivateRoute permission={"All"} path="/profile" component={UserProfile} />
            <PrivateRoute
              path="/property/:propertyID"
              component={PropertyView}
            />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
