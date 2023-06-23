import React from "react";

const Modal = ({ title, action, cancel, image }) => {
  return (
    <div className="modalContainer">
      <div>
        <h1>{title}</h1>

        <p style={{ display: "none" }}>{image.id}</p>
        <p>Are you sure to delete</p>

        <b>{image.data.imageName} ?</b>

        <div className="modalButtons">
          <button onClick={action}>Delete</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
