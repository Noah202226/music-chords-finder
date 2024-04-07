import { Search } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { addDoc, collection, doc } from "firebase/firestore";
import React, { useRef } from "react";
import { fs } from "./api/firebase";
import { ref } from "firebase/storage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function yt() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const titleRef = useRef();
  const linkRef = useRef();

  const ytRef = collection(fs, "ytRef");

  const saveNewRef = (title, link) => {
    addDoc(ytRef, { title, link })
      .then(() => {
        titleRef.current.value = "";
        linkRef.current.value = "";
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <Search />
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Add new references
          </Typography>

          <TextField inputRef={titleRef} label="Title" variant="outlined" />
          <TextField inputRef={linkRef} label="link" variant="outlined" />

          <Button
            variant="contained"
            onClick={() =>
              saveNewRef(titleRef.current.value, linkRef.current.value)
            }
          >
            Save new reference
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default yt;
