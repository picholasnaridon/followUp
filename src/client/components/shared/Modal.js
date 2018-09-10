import React, { Component } from 'react';
import '../../assets/styles/modal.css'
import { Button, Grid, Row, Col } from 'react-bootstrap'
const Modal = ({ handleClose, show, children }) => {
  console.log(show)
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>

      <Grid className="modal-main">
        <Row style={{ marginTop: "3%" }}>
          <Col md={12}>
            {children}
          </Col>
        </Row>
        <br></br>
        <Row style={{ marginBottom: "3%" }}>
          <Col md={2} >
            <Button bsStyle="danger" onClick={handleClose}> Close</Button>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Modal