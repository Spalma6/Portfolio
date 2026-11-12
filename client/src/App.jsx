import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "../MainRouter";
import { AuthProvider } from "./AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </Router>
  );
};

export default App;
