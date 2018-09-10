import React, { Component } from 'react';
import '../../assets/styles/modal.css'

const Modal = ({ handleClose, show, children }) => {
  console.log(show)
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button
          onClick={handleClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal