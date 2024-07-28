import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CodeEditor from "./components/CodeEditor/CodeEditor";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodeEditor />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
