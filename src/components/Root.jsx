import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import React from "react";

export const Root = () => {
  
  return (
    <Box
      minHeight={"100vh"}
    >
      <Navigation />
      <Outlet />
    </Box>
  );
};
