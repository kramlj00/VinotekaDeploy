import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
/*import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";*/
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import Wines from "./pages/wines";
import Sidebar from "./components/Sidebar/Sidebar";
import ToggleBars from "./features/toggle";

function App() {
  return (
    <Router>
      <ToggleBars />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/wines" exact component={Wines} />
      </Switch>
    </Router>
  );
}

export default App;
