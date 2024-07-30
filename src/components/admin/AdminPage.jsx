// src/components/admin/AdminPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import {
  Container,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/react";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem("jwtToken");
        const response = await axios.get("http://localhost:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", response.data);
        // Directly set the users if response.data is an array
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container maxW="container.lg" mt={5}>
      <Heading mb={5}>User Management</Heading>
      {loading && <Spinner size="xl" />}
      {error && (
        <Alert status="error" mb={5}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {!loading && !error && <UserTable users={users} />}
    </Container>
  );
};

export default AdminPage;
