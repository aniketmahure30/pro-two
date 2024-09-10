import React, { Suspense, lazy } from "react";
import "./App.css";
// const MainUtils = lazy(() => import("proOne/utils"));
import { getNames } from "../../pro-one/src/utils";
console.log("🚀 ~ getNames:", getNames)
// console.log("🚀 ~ MainUtils:", MainUtils)


function App() {
  return (
    <div className="App">
      <header className="App-header">Demo app 2</header>
    </div>
  );
}

export default App;
