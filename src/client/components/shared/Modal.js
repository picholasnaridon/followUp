import React, { Component } from 'react';
import '../../assets/styles/modal.css'
import { Button, Grid, Row, Col } from 'react-bootstrap'
const Modal = ({ handleClose, show, children }) => {
  console.log(show)
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <Grid className="modal-main">
        <Row style={{ marginTop: "2%", marginBottom: "1%" }}>
          <Col lg={1} lgPush={11} md={1} mdPush={10} sm={1} smPush={9} xs={1} xsPush={8}>
            <Button bsStyle="danger" onClick={handleClose} > Close</Button>
          </Col>
        </Row>
        <Row >
          <Col md={12}>
            {children}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Modal