import React, { useState } from "react";
import axios from "axios";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      const { access_token } = response.data;
      sessionStorage.setItem("token", access_token);
      setMessage("Login successful");
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
            <Button
              type="submit"
              bg="blue.400"
              color="white"
              _hover={{
                bg: "blue.500",
              }}
            >
              Login
            </Button>
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
