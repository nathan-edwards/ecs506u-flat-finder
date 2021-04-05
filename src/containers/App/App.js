import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import SignUp from "../Auth/SignUp";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Auth/Login.js";
import ForgotPassword from "../Auth/ForgotPassword";
import UpdateProfile from "../UserProfile/UpdateProfile";
import UserProfile from "../UserProfile/UserProfile"
import NewProperty from "../PropertyCRUD/NewProperty"
import PrivateRoute from "../PrivateRoute";

function App() {
  return (
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/profile" component={UserProfile} />
              <PrivateRoute path="/new-property" component={NewProperty} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
  );
}

export default App;
