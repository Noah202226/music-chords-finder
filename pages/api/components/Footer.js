import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        borderTopWidth: "5px",
        borderTopColor: "success.dark",
        borderTopStyle: "double",

        p: (theme) => theme.spacing(2),
        textAlign: "center",
        marginTop: (theme) => theme.spacing(2),
      }}
    >
      <Typography> PMCC 4th Watch - Music Ministry</Typography>
    </Box>
  );
};

export default Footer;
