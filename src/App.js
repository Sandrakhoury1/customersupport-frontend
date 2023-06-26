import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PageSwitch from "./Pages/PageSwitch";
import io from "socket.io-client";
// import Store from "./Redux/Store";
// import { Provider } from "react-redux";
export const socket = io.connect("http://localhost:8001");

function App() {
  return (
    <div className="App">
      <Router basename="/">
        {/* <Provider store={Store}> */}
        <PageSwitch />
        {/* </Provider> */}
      </Router>
    </div>
  );
}

export default App;
