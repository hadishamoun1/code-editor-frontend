import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CodeEditor from "./components/CodeEditor";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodeEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
