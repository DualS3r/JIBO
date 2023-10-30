import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ModalSendAdvisor = (props) => {
  const { setShowModal } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="justify-content-center">
        <h2>¡Enhorabuena!</h2>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
        <div className="w-50 d-flex flex-column my-3">
          <h5>
            Su correo ha sido enviado satisfactoriamente, le deseamos suerte con
            la busquedad de personal.
          </h5>
        </div>
        <div className="w-50 d-flex flex-column my-3">
          <Button onClick={() => setShowModal(0)}>Aceptar</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
