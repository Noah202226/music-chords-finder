import { useEffect, useState, useRef } from "react";

import Head from "next/head";

// Firebase
import { storage } from "./api/firebase";
import { fs } from "./api/firebase";
import { ref, deleteObject } from "firebase/storage";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

// Custom Components
import Images from "./api/components/Images";
import Modal from "./api/components/Modal";
import { Container, LinearProgress } from "@mui/material";
import Services from "./api/components/Services";
import SearchFile from "./api/components/SearchFile";

export default function Home() {
  // States

  const [images, setImages] = useState([]);
  const [isGettingData, setIsGettingData] = useState(true);

  const fsRef = collection(fs, "imglinks");

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const [text, setText] = useState("");

  const deleteFile = () => {
    if (image === null) return;
    setIsLoading(true);

    deleteObject(ref(storage, `images/${image.data.imageStorageId}`))
      .then(() => {
        deleteDoc(doc(fs, `imglinks/${image.id}`))
          .then(() => {
            setShowModal(false);
            setIsLoading(false);
          })
          .catch((e) => {
            alert(e);
            setShowModal(false);
          });
      })
      .catch((e) => {
        alert(e);
        setShowModal(false);
      });
  };

  useEffect(() => {
    onSnapshot(fsRef, (snapshot) => {
      setImages([]);
      snapshot.docs.map((doc) =>
        setImages((prev) => [...prev, { data: doc.data(), id: doc.id }])
      );
      setIsGettingData(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {/* <Services
        images={images}
        showModal={showModal}
        setShowModal={setShowModal}
        setImage={setImage}
      /> */}
      <SearchFile setText={setText} />
      <Images
        images={images}
        isGettingData={isGettingData}
        showModal={showModal}
        setShowModal={setShowModal}
        setImage={setImage}
        deleteFile={deleteFile}
        isLoading={isloading}
        text={text}
      />
    </Container>
  );
}
