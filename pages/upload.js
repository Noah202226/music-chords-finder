import React, { useState, useRef } from "react";

import { v4 } from "uuid";

// Firebase
import { storage, fs } from "./api/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

// Material Ui
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  LinearProgress,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useRouter } from "next/router";
import { Stack } from "@mui/system";

const Upload = () => {
  const [uploadImageData, setUploadImageData] = useState(null);
  const [genre, setGenre] = useState("worship");
  const [language, setLanguage] = useState("english");
  const [isUploading, setIsUploading] = useState(false);
  const [isDoneUploading, setIsDoneUploading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [imgName, setImgName] = useState("");
  const uploadBtn = useRef();
  const uploadFileRef = useRef();

  const router = useRouter();

  const fsRef = collection(fs, "imglinks");

  const uploadImage = () => {
    if (uploadImageData === null) {
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 3000);

      return;
    }

    setIsUploading(true);

    let uploadName = uploadImageData.name + v4();

    const imageRef = ref(storage, `images/${uploadName}`);

    uploadBytes(imageRef, uploadImageData)
      .then((snap) => {
        getDownloadURL(snap.ref).then((url) => {
          addDoc(fsRef, {
            imageName: imgName,
            imageStorageId: uploadName,
            genre: genre,
            language: language,
            url: url,
          })
            .then(() => {
              setIsUploading(false);
              setImgName("");
              setIsDoneUploading(true);

              setTimeout(() => {
                router.push("/");
              }, 3000);
            })
            .catch((e) => alert(e));
          setIsUploading(false);
        });
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Box sx={{ backgroundColor: "primary" }}>
      <Typography variant="overline">Upload New File</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadImage();
        }}
        style={{ display: "grid" }}
      >
        <Stack direction="row" justifyContent="space-between">
          <TextField
            ref={uploadFileRef}
            value={imgName}
            onChange={(e) => setImgName(e.target.value)}
            variant="outlined"
            label="Image Name"
            fullWidth
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            width="50%"
            marginX="2rem"
          >
            <Typography>Select File.</Typography>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setImgName(e.target.files[0].name.replace(/\.[^/.]+$/, ""));
                    setUploadImageData(e.target.files[0]);
                  }
                  return;
                }}
              />
              <UploadFileIcon />
            </IconButton>
          </Stack>
        </Stack>

        <FormControl>
          <Select
            labelId="demo-simple-select-helper-label"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <MenuItem value="worship">Worship</MenuItem>
            <MenuItem value="solemn">Solemn</MenuItem>
            <MenuItem value="hymno">Hymno</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="tagalog">Tagalog</MenuItem>
          </Select>
        </FormControl>

        <Button ref={uploadBtn} type="submit" variant="contained">
          Submit
        </Button>
      </form>

      {isUploading && <LinearProgress />}
      <Snackbar open={isDoneUploading} autoHideDuration={10000}>
        <Alert severity="success">
          File successfully uploaded. Redireting to Homepage ...
        </Alert>
      </Snackbar>
      <Snackbar open={isError} autoHideDuration={10000}>
        <Alert severity="error">Please select file first.</Alert>
      </Snackbar>
    </Box>
  );
};

export default Upload;
