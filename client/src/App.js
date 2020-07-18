import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Bootcamps from "./components/Bootcamps/Bootcamps";

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
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
