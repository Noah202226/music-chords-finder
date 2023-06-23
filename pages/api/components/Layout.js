import {
  Home,
  UploadFileRounded,
  TextFieldsOutlined,
  AutoStoriesOutlined,
  VolunteerActivismOutlined,
  Groups3TwoTone,
  ElectricBoltOutlined,
  ArrowUpwardRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  CssBaseline,
  Divider,
  Drawer,
  Fab,
  GlobalStyles,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";

import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";
import Logo from "../../res/images/pmcc_logo.png";
import Footer from "./Footer";

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { deepPurple } from "@mui/material/colors";

const drawerWidth = 60;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: 16,

    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  // necessary for content to be below app bar

  justifyContent: "flex-end",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: `${drawerWidth}px`,
  }),
}));

const Layout = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menus = [
    {
      text: "Home",
      icon: <Home />,
      path: "/",
    },
    {
      text: "Upload",
      icon: <UploadFileRounded />,
      path: "/upload",
    },
    // {
    //   text: "Image Scapper",
    //   icon: <TextFieldsOutlined />,
    //   path: "/imagetotext",
    // },
  ];
  const menus2 = [
    {
      text: "Divine Worship",
      icon: <ElectricBoltOutlined />,
      path: "/divineWorship",
    },
    {
      text: "Bible Study",
      icon: <AutoStoriesOutlined />,
      path: "/bibleStudy",
    },
    {
      text: "Prayer Meeting",
      icon: <VolunteerActivismOutlined />,
      path: "/prayerMeeting",
    },
    {
      text: "Kawan Meeting",
      icon: <Groups3TwoTone />,
      path: "/kawan",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App bar */}

      <AppBar
        position="fixed"
        open={open}
        sx={{ background: "none", color: "black" }}
      >
        <Toolbar>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "100%",

              // maxWidth: "1360px",
              // marginX: "auto",
            }}
          >
            <Typography variant="h6" noWrap component="div" textAlign="center">
              Image Chords Finder
            </Typography>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      {/* Sidebar */}

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          overflow: "hidden",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            overflow: "hidden",
            background: "success",
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
        color="success"
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {menus.map((item) => (
            <ListItemButton key={item.text} onClick={handleDrawerClose}>
              <Tooltip
                title={item.text}
                placement="right"
                arrow
                TransitionComponent={Zoom}
              >
                <Link href={item.path} onClick={handleDrawerClose}>
                  <ListItemIcon onClick={handleDrawerClose}>
                    {item.icon}
                  </ListItemIcon>
                  {/* <ListItemText
                  sx={{
                    display: { xs: "none", sm: "block" },
                    transition: "1s",
                  }}
                  primary={item.text}
                /> */}
                </Link>
              </Tooltip>
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <Divider />
        <List>
          {menus2.map((item) => (
            <Link key={item.text} href={item.path}>
              <Tooltip
                title={item.text}
                placement="right"
                arrow
                TransitionComponent={Zoom}
              >
                <ListItemButton onClick={handleDrawerClose}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {/* <ListItemText
                  sx={{
                    display: { xs: "none", sm: "block" },
                    transition: "1s",
                  }}
                  primary={item.text}
                /> */}
                </ListItemButton>
              </Tooltip>
            </Link>
          ))}
        </List>
      </Drawer>

      <Main style={{ width: "100%", marginTop: "1rem", flexGrow: "1" }}>
        <Box id="top-here" sx={(theme) => theme.mixins.toolbar}></Box>

        {children}

        <Fab id="fab-arrowup" href="#top-here">
          <ArrowUpwardRounded />
        </Fab>
      </Main>
    </Box>
  );
};

export default Layout;
