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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: password,
      });
      setMessage("User registered successfully");
    } catch (error) {
      setMessage("Error registering user");
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
          Signup
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
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
              Signup
            </Button>
            {message && (
              <Text
                color={
                  message === "User registered successfully"
                    ? "green.500"
                    : "red.500"
                }
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

export default Signup;
