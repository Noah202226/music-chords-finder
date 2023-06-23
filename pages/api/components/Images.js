import React, { useState } from "react";

import Link from "next/link";
import SearchFile from "./SearchFile";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Card,
  CardMedia,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Button,
  Typography,
  Tooltip,
  LinearProgress,
  Box,
  Skeleton,
} from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import Footer from "./Footer";
import Masonry from "react-masonry-css";
import { Stack } from "@mui/system";
import { green } from "@mui/material/colors";

const Images = ({
  images,
  isGettingData,
  setShowModal,
  showModal,
  setImage,
  deleteFile,
  isLoading,
  text,
}) => {
  const [genreFilter, setGenreFilter] = useState();
  const [isEnglishFilter, setIsEnglishFilter] = useState();

  const handleClose = () => {
    setShowModal(false);
  };

  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    900: 3,
    700: 2,
    500: 1,
  };

  const filteredImages = images.filter((img) => {
    if (genreFilter === undefined && isEnglishFilter === undefined) {
      return img.data.imageName.toLowerCase().includes(text);
    } else if (genreFilter === "All" && isEnglishFilter === "All") {
      return img.data.imageName.toLowerCase().includes(text);
    } else if (genreFilter === "All" && isEnglishFilter === undefined) {
      return img.data.imageName.toLowerCase().includes(text);
    } else if (genreFilter === undefined && isEnglishFilter === "All") {
      return img.data.imageName.toLowerCase().includes(text);
    } else if (genreFilter === "All" && isEnglishFilter === "All") {
      return img.data.imageName.toLowerCase().includes(text);
    } else if (genreFilter !== undefined && isEnglishFilter === undefined) {
      return (
        img.data.imageName.toLowerCase().includes(text) &&
        img.data.genre === genreFilter
      );
    } else if (genreFilter === undefined && isEnglishFilter !== undefined) {
      return (
        img.data.imageName.toLowerCase().includes(text) &&
        img.data.language === isEnglishFilter
      );
    } else if (genreFilter === "All" && isEnglishFilter !== undefined) {
      return (
        img.data.imageName.toLowerCase().includes(text) &&
        img.data.language === isEnglishFilter
      );
    } else if (genreFilter !== undefined && isEnglishFilter === "All") {
      return (
        img.data.imageName.toLowerCase().includes(text) &&
        img.data.genre === genreFilter
      );
    } else {
      return (
        img.data.imageName.toLowerCase().includes(text) &&
        img.data.genre === genreFilter &&
        img.data.language === isEnglishFilter
      );
    }
  });

  return (
    <div>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deleting File"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you are sure to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(!showModal)} autoFocus>
            No
          </Button>
          <Button onClick={() => deleteFile()}>YES</Button>
        </DialogActions>
        {isLoading && <LinearProgress />}
      </Dialog>

      <Grid
        container
        sx={{
          paddingY: (theme) => theme.spacing(2),

          alignItems: "center",
          justifyItems: "space-between",
        }}
      >
        <Grid item xs={12} md={6}>
          <span
            style={{
              color: "seagreen",
              fontWeight: "bolder",
              fontSize: "1.2rem",
            }}
          >
            Total File: {isGettingData ? "0" : filteredImages.length}
          </span>
        </Grid>

        <Grid
          container
          item
          xs={12}
          md={6}
          spacing={3}
          flexGrow={1}
          rowSpacing={2}
          marginTop={{ xs: 1, md: 0 }}
        >
          <Grid item xs={6}>
            <FormControl>
              <InputLabel>Genre</InputLabel>
              <Select onChange={(e) => setGenreFilter(e.target.value)} native>
                <option>All</option>
                <option value="worship">Worship</option>
                <option value="solemn">Solemn</option>
                <option value="hymno">Hymno</option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl>
              <InputLabel>Language</InputLabel>
              <Select
                onChange={(e) => setIsEnglishFilter(e.target.value)}
                native
              >
                <option>All</option>
                <option value="english">English</option>
                <option value="tagalog">Tagalog</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {isGettingData ? (
        <Stack direction={{ xs: "column", md: "row" }} gap={1}>
          <Box width={225}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={180} />
              <Skeleton variant="circular" width={25} height={25} />
            </Stack>
            <Skeleton variant="rectangular" width={225} height={180} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={150} />
          </Box>

          <Box width={225}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={180} />
              <Skeleton variant="circular" width={25} height={25} />
            </Stack>
            <Skeleton variant="rectangular" width={225} height={180} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={150} />
          </Box>

          <Box width={225}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={180} />
              <Skeleton variant="circular" width={25} height={25} />
            </Stack>
            <Skeleton variant="rectangular" width={225} height={180} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={150} />
          </Box>

          <Box width={225}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={180} />
              <Skeleton variant="circular" width={25} height={25} />
            </Stack>
            <Skeleton variant="rectangular" width={225} height={180} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={150} />
          </Box>

          <Box width={225}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={180} />
              <Skeleton variant="circular" width={25} height={25} />
            </Stack>
            <Skeleton variant="rectangular" width={225} height={180} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={150} />
          </Box>
        </Stack>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredImages.map((img) => (
            <div key={img.id}>
              <Card className={img.data.genre}>
                <Stack spacing={1} p={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Tooltip title={img.data.imageName}>
                      <Typography noWrap>{img.data.imageName}</Typography>
                    </Tooltip>
                    <IconButton
                      onClick={(e) => {
                        setImage(img);
                        setShowModal(!showModal);
                      }}
                    >
                      <DeleteOutlineOutlined />
                    </IconButton>
                  </Stack>

                  {img.data.url ? (
                    <Link href={img.data.url} target="_blank">
                      <CardMedia
                        component="img"
                        height="140"
                        image={img.data.url}
                        alt={img.data.imageName}
                        sx={{ border: green["300"], borderWidth: 2 }}
                      />
                    </Link>
                  ) : (
                    <Skeleton variant="rectangular" />
                  )}

                  <Stack direction="row" alignItems="center">
                    <Box>
                      <Typography variant="caption">
                        {img.data.genre.toUpperCase()}
                      </Typography>
                      <Typography variant="caption">,</Typography>
                      <Typography variant="caption">
                        {img.data.language.toUpperCase()}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Card>
            </div>
          ))}
        </Masonry>
      )}

      <Footer />
    </div>
  );
};

export default Images;
