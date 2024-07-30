import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import Landing from "./pages/landing/landing";
import Chat from "./pages/chats/chat";
import Login  from "./components/Login/Login";
import Message from "./pages/messages/message";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/CodeEditor" element={<CodeEditor />} />
        <Route path="/landing" element={<Landing/>} />
        <Route path="/chats" element={<Chat/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/message" element={<Message/>} />
      </Routes>
    </Router>
  );
};

export default App;
