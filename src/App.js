import React, { Suspense, lazy } from "react";
import "./App.css";
import { getUserName } from "proOne/utils";

function App() {

  return (
    <div className="App">
      <header className="App-header">Welcome to Child App {getUserName()}</header>
    </div>
  );
}

export default App;
