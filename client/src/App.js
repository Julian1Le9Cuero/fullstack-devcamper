import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Bootcamps from "./components/Bootcamps/Bootcamps";
import Bootcamp from "./components/Bootcamp/Bootcamp";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ManageBootcamp from "./components/ManageBootcamp/ManageBootcamp";
import BootcampForm from "./components/ManageBootcamp/BootcampForm";
import ManageCourses from "./components/ManageCourses/ManageCourses";
import CourseForm from "./components/ManageCourses/CourseForm";
import ManageReviews from "./components/ManageReviews/ManageReviews";
import ReviewForm from "./components/ManageReviews/ReviewForm";
import BootcampReviews from "./components/BootcampReviews/BootcampReviews";
import ManageAccount from "./components/ManageAccount/ManageAccount";
import UpdatePassword from "./components/ManageAccount/UpdatePassword";
import ForgotPassword from "./components/ManageAccount/ForgotPassword";
import ResetPassword from "./components/ManageAccount/ResetPassword";

import { loadUser } from "./redux/actions/auth";

import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/bootcamps" exact component={Bootcamps} />
            <Route path="/bootcamp/:id" exact component={Bootcamp} />
            <PrivateRoute
              path="/manage-bootcamp"
              exact
              component={ManageBootcamp}
            />
            <PrivateRoute path="/add-bootcamp" exact component={BootcampForm} />
            <PrivateRoute
              path="/manage-courses"
              exact
              component={ManageCourses}
            />
            <PrivateRoute path="/add-course" exact component={CourseForm} />
            <PrivateRoute
              path="/manage-reviews"
              exact
              component={ManageReviews}
            />
            <PrivateRoute path="/add-review" exact component={ReviewForm} />
            <Route
              exact
              path="/bootcamps/reviews/:bootcampId"
              component={BootcampReviews}
            />
            <PrivateRoute
              path="/manage-account"
              exact
              component={ManageAccount}
            />
            <PrivateRoute
              path="/update-password"
              exact
              component={UpdatePassword}
            />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route
              path="/reset-password/:resettoken"
              exact
              component={ResetPassword}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
