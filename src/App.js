import React from "react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <nav></nav>
        <Routes>
          <Route path="/" element={<CodeEditor />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
