import React from "react";

const Modal = (props) => {
  const {handlePopup,isSuccess,message} = props;
  return (
    <>
      <div className="shadow" style={{display:isSuccess?"block":"none"}} ></div>
      <div className={` ${isSuccess?"cutom-modal":"cutom-modal-up"}`}>
        <div className="mod-head-suc">Success</div>
        <span className="span">{message}</span>

        <div>
          <button className="btn btn-primary" onClick={handlePopup}>Ok</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
