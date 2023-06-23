import React, { useEffect, useState } from "react";

const Progress = ({ load, isLoading, setIsLoading }) => {
  useEffect(() => {
    if (load == 1) {
      setIsLoading(false);
    }
  }, [load, isLoading, setIsLoading]);
  return (
    <>
      {isLoading && (
        <div className="progress">
          <div
            style={{
              height: "100%",
              width: `${load * 100}%`,
              backgroundColor: "red",
              transition: "width 0.5s",
              //   zIndex: "1",
              padding: "1em",
            }}
          ></div>
          <span>{load * 100}%</span>
        </div>
      )}
    </>
  );
};

export default Progress;
