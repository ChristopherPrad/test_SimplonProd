import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import AddForm from "./components/AddForm";
import AllContact from "./components/AllContact";
// Ceux qui contient toute l'app et les routes correspondant aux components
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/addcontact" component={AddForm} />
          <Route exact path="/allcontact" component={AllContact} />
        </div>
      </Router>
    );
  }
}

export default App;
