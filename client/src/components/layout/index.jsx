import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "actualComponents/Navbar";
import Sidebar from "actualComponents/Sidebar";
import { useGetUserQuery } from "state/api";
const Layout = () => {
  //to check whthr the display is mobile or not
  const isNotMobile = useMediaQuery("(min-width: 600px)");
  console.log("It is NOT a Mobile screen: " + isNotMobile);

  //getting the userid from state
  const userId = useSelector((state)=>state.global.userId)
  const {data} = useGetUserQuery(userId)
  // console.log(data)

  //setting state for side bar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  
  return (
    // if its a mobile then display is block, if not then display is flex
    <Box display={isNotMobile ? "flex" : "block"} width="100%" height="100%">
      {/* passing props to the sidebar */}
      <Sidebar
        user={data || {}} //if data is undefined(incase of loading) then send empty object
        isNotMobile={isNotMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}//if data is undefined(incase of loading) then send empty object
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

/*In the provided code, Outlet is a component from React Router. It's used to render child routes within a parent route.

Here's how it works:

When you define nested routes in React Router, you have a parent route that can render some content (in this case, it's the Layout component).
Inside this parent route, you can use the Outlet component to specify where the child routes should be rendered.
The child routes are specified in a separate route configuration file or within the parent component using the Routes component from React Router. */
