import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      const { access_token } = response.data;
      sessionStorage.setItem("jwtToken", access_token);

      // Decode the token to get the user's role
      const decodedToken = jwtDecode(access_token);
      const role = decodedToken.role; // Assuming the role is stored in the token

      if (role === "admin") {
        navigate("/admin"); // Redirect to admin page
      } else if (role === "user") {
        navigate("/landing"); // Redirect to user page
      } else {
        setMessage("Unknown role");
      }
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        maxW="lg"
        w="full"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="xl"
        rounded="lg"
        p={8}
        my={12}
      >
        <Heading fontSize="4xl" mb={4} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                bg="#00C0A3"
                color="white"
                _hover={{
                  bg: "#00A68D",
                }}
                maxWidth="200px"
                mt={5}
              >
                Login
              </Button>
            </Box>
            {message && (
              <Text
                color={message === "Login successful" ? "green.500" : "red.500"}
              >
                {message}
              </Text>
            )}
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
