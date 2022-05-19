import React, { useState, useEffect } from "react";
import Signup from "./components/Signup/Signup";
import BarGraph from "./components/BarGraph/BarGraph";
import { LoginContext } from "./context/LoginContext";

const getLocalItem = localStorage.getItem("graph");

function App() {
  const [graph, setGraph] = useState(false);
  useEffect(() => {
    if (getLocalItem) {
      setGraph(true);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ setGraph }}>
      {!graph && <Signup />}
      {graph && <BarGraph />}
    </LoginContext.Provider>
  );
}

export default App;
