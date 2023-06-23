/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";

import { fs } from "./api/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { AutoStoriesOutlined, Groups3TwoTone } from "@mui/icons-material";

function BibleStudy() {
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [worshipData, setWorshipData] = useState([]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const [change1, setChange1] = useState(false);
  const [change2, setChange2] = useState(false);
  const [change3, setChange3] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(images[1]);
  const filteredByText = images.filter((img) =>
    img.data.imageName.toLowerCase().includes(text.toLowerCase())
  );

  const colRef = collection(fs, "imglinks");
  const worshipColRef = collection(fs, "bibleStudy");

  const getAllImages = () => {
    setImages([]);
    getDocs(colRef).then((snapshot) =>
      snapshot.docs.map((doc) => {
        setImages((prev) => [...prev, { data: doc.data(), id: doc.id }]);
        setOpen(true);
      })
    );
  };
  const getAllImages2 = () => {
    setImages([]);
    getDocs(colRef).then((snapshot) =>
      snapshot.docs.map((doc) => {
        setImages((prev) => [...prev, { data: doc.data(), id: doc.id }]);
        setOpen2(true);
      })
    );
  };
  const getAllImages3 = () => {
    setImages([]);
    getDocs(colRef).then((snapshot) =>
      snapshot.docs.map((doc) => {
        setImages((prev) => [...prev, { data: doc.data(), id: doc.id }]);
        setOpen3(true);
      })
    );
  };

  const changeWorship1 = (img) => {
    setChange1(true);
    setDoc(doc(fs, "bibleStudy", "song1"), {
      imageName: img.data.imageName,
      url: img.data.url,
    })
      .then((data) => {
        setOpen(false);
        setTimeout(() => {
          setChange1(false);
          setText("");
        }, 3000);
      })
      .catch((e) => alert(e));
  };
  const changeWorship2 = (img) => {
    setChange2(true);
    setDoc(doc(fs, "bibleStudy", "song2"), {
      imageName: img.data.imageName,
      url: img.data.url,
    })
      .then((data) => {
        setOpen2(false);
        setTimeout(() => {
          setChange2(false);
          setText("");
        }, 3000);
      })
      .catch((e) => alert(e));
  };
  const changeWorship3 = (img) => {
    setChange3(true);
    setDoc(doc(fs, "bibleStudy", "song3"), {
      imageName: img.data.imageName,
      url: img.data.url,
    })
      .then((data) => {
        setOpen3(false);
        setTimeout(() => {
          setChange3(false);
          setText("");
        }, 3000);
      })
      .catch((e) => alert(e));
  };

  useEffect(() => {
    onSnapshot(worshipColRef, (snapshot) => {
      setWorshipData([]);
      snapshot.docs.map((doc) => {
        setWorshipData((prev) => [...prev, { data: doc.data(), id: doc.id }]);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Typography variant="h5" textAlign={"center"} marginY={2}>
        BIBLE STUDY
        <AutoStoriesOutlined />,
      </Typography>

      <Dialog open={open} sx={{ p: 0 }}>
        <DialogTitle>Selecting file for Worship 1</DialogTitle>
        <TextField
          // fullWidth
          variant="outlined"
          type="search"
          placeholder="Search ..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          sx={{ marginX: 3 }}
        ></TextField>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setText("");
            }}
          >
            Cancel
          </Button>
        </DialogActions>
        <DialogContent>
          <List sx={{ pt: 0 }}>
            {images &&
              filteredByText.map((img) => (
                <ListItem key={img.id} disableGutters>
                  <ListItemButton onClick={() => changeWorship1(img)}>
                    <ListItemText primary={img.data.imageName} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>

      <Dialog open={open2} sx={{ p: 0 }}>
        <DialogTitle>Selecting file for Worship 2</DialogTitle>
        <TextField
          // fullWidth
          variant="outlined"
          type="search"
          placeholder="Search ..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          sx={{ marginX: 3 }}
        ></TextField>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen2(false);
              setText("");
            }}
          >
            Cancel
          </Button>
        </DialogActions>
        <DialogContent>
          <List sx={{ pt: 0 }}>
            {images &&
              filteredByText.map((img) => (
                <ListItem key={img.id} disableGutters>
                  <ListItemButton onClick={() => changeWorship2(img)}>
                    <ListItemText primary={img.data.imageName} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>

      <Dialog open={open3} sx={{ p: 0 }}>
        <DialogTitle>Selecting file for Worship 3</DialogTitle>
        <TextField
          // fullWidth
          variant="outlined"
          type="search"
          placeholder="Search ..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          sx={{ marginX: 3 }}
        ></TextField>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen3(false);
              setText("");
            }}
          >
            Cancel
          </Button>
        </DialogActions>
        <DialogContent>
          <List sx={{ pt: 0 }}>
            {images &&
              filteredByText.map((img) => (
                <ListItem key={img.id} disableGutters>
                  <ListItemButton onClick={() => changeWorship3(img)}>
                    <ListItemText primary={img.data.imageName} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>

      <Grid container padding={1} spacing={0.5}>
        <Grid item xs={12} md={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardContent>
              {worshipData &&
                worshipData
                  .filter((doc) => doc.id === "song1")
                  .map((data) => (
                    <Stack key={data.id}>
                      <Stack>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          noWrap
                        >
                          {data.data.imageName}
                        </Typography>
                        <CardActions
                          onClick={getAllImages}
                          sx={{ alignSelf: "flex-end" }}
                        >
                          <Button size="small">Update</Button>
                        </CardActions>
                      </Stack>
                      <Paper>
                        {/* <Image
                          src={data.data.url}
                          width={150}
                          height={200}
                          alt={data.data.imageName}
                        /> */}
                        <img
                          style={{ width: "100%" }}
                          src={data.data.url}
                          alt={data.data.imageName}
                        />
                      </Paper>
                    </Stack>
                  ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardContent>
              {worshipData &&
                worshipData
                  .filter((doc) => doc.id === "song2")
                  .map((data) => (
                    <Stack key={data.id}>
                      <Stack>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          noWrap
                        >
                          {data.data.imageName}
                        </Typography>
                        <CardActions
                          onClick={getAllImages2}
                          sx={{ alignSelf: "flex-end" }}
                        >
                          <Button size="small">Update</Button>
                        </CardActions>
                      </Stack>
                      <Paper>
                        {/* <Image
                          src={data.data.url}
                          width={150}
                          height={200}
                          alt={data.data.imageName}
                        /> */}
                        <img
                          style={{ width: "100%" }}
                          src={data.data.url}
                          alt={data.data.imageName}
                        />
                      </Paper>
                    </Stack>
                  ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardContent>
              {worshipData &&
                worshipData
                  .filter((doc) => doc.id === "song3")
                  .map((data) => (
                    <Stack key={data.id}>
                      <Stack>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          noWrap
                        >
                          {data.data.imageName}
                        </Typography>
                        <CardActions
                          onClick={getAllImages3}
                          sx={{ alignSelf: "flex-end" }}
                        >
                          <Button size="small">Update</Button>
                        </CardActions>
                      </Stack>
                      <Paper>
                        {/* <Image
                          src={data.data.url}
                          width={150}
                          height={200}
                          alt={data.data.imageName}
                        /> */}
                        <img
                          style={{ width: "100%" }}
                          src={data.data.url}
                          alt={data.data.imageName}
                        />
                      </Paper>
                    </Stack>
                  ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={change1}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert variant="filled" severity="success">
          Song 1 changed successfully...
        </Alert>
      </Snackbar>

      <Snackbar
        open={change2}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert variant="filled" severity="success">
          Song 2 changed successfully...
        </Alert>
      </Snackbar>

      <Snackbar
        open={change3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert variant="filled" severity="success">
          Song 3 changed successfully...
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BibleStudy;
