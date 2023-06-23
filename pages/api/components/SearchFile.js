import { TextField } from "@mui/material";
import React from "react";

const SearchFile = ({ setText }) => {
  return (
    <>
      <TextField
        className="search"
        variant="filled"
        label="Search ..."
        fullWidth
        type="search"
        color="success"
        onChange={(e) => setText(e.target.value.toLocaleLowerCase())}
      />
    </>
  );
};

export default SearchFile;
