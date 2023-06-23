import React from "react";

import Image from "next/image";
import Link from "next/link";

import {
  AppBar,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
const Header = () => {
  const pages = [
    { text: "Home", link: "/" },
    { text: "Upload File", link: "/upload" },
    { text: "Image to text", link: "/imagetotext" },
  ];
  return (
    <AppBar position="fixed" open>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.text}>
                <Typography textAlign="center">{page.text}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
