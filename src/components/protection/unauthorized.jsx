import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Unauthorized = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box textAlign="center">
        <Heading fontSize="4xl">Unauthorized</Heading>
        <Text mt={4}>You do not have permission to access this page.</Text>
      </Box>
    </Box>
  );
};

export default Unauthorized;
