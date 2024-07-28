import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeEditor from "./components/CodeEditor";
import Landing from "./pages/landing/landing";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/CodeEditor" element={<CodeEditor />} />
        <Route path="/landing" element={<Landing/>} />
      </Routes>
    </Router>
  );
};

export default App;
