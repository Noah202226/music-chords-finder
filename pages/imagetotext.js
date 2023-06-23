import React, { useState } from "react";

// Tesseract
import { createWorker } from "tesseract.js";

import Progress from "./api/components/Progress";

const Imagetotext = () => {
  const [imageText, setTextImage] = useState(null);
  const [data, setData] = useState("");

  const [percent, setPercent] = useState(0);
  const [load, setLoad] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const renderImageToText = async () => {
    console.log(imageText);
    if (imageText === null) return;
    const worker = await createWorker({
      logger: (m) => {
        setIsLoading(true);
        setLoad(m.progress);
      },
    });

    (async () => {
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(imageText);
      setData(text);
      await worker.terminate();
    })();
  };
  return (
    <>
      <div className="ImageToText-container">
        <div className="container">
          <div className="imageToTextForm">
            <h2>Image to text</h2>
            <div>
              <input
                type="file"
                placeholder="Image with text..."
                onChange={(e) => setTextImage(e.target.files[0])}
              />
              <button onClick={renderImageToText}>Get Text</button>
            </div>
            <Progress
              percent={percent}
              setPercent={setPercent}
              load={load}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          <textarea defaultValue={data}></textarea>
        </div>
      </div>
    </>
  );
};

export default Imagetotext;
