import React from "react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import AdminPage from "./components/admin/AdminPage";
import ExcelUpload from "./components/Excel/Excel";
import Landing from "./pages/landing/landing";
import ProtectedRoute from "./components/protection/RouteProtection";
import Unauthorized from "./components/protection/unauthorized";
import Chat from "./pages/chats/chat";
import Message from "./pages/messages/message";


function App() {
  return (
    <Router>
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <nav></nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/editor"
            element={<ProtectedRoute requiredRole="user" />}
          >
            <Route path="/editor" element={<CodeEditor />} />
          </Route>

          <Route
            path="/landing"
            element={<ProtectedRoute requiredRole="user" />}
          >
            <Route path="/landing" element={<Landing />} />
          </Route>

          <Route
            path="/admin"
            element={<ProtectedRoute requiredRole="admin" />}
          >
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route
            path="/excel"
            element={<ProtectedRoute requiredRole="admin" />}
          >
            <Route path="/excel" element={<ExcelUpload />} />
          </Route>
          <Route
            path="/chats"
            element={<ProtectedRoute requiredRole="user" />}
          >
            <Route path="/chats" element={<Chat />} />
          </Route>
          <Route
            path="/message"
            element={<ProtectedRoute requiredRole="user" />}
          >
            <Route path="/message" element={<Message />} />
          </Route>
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
