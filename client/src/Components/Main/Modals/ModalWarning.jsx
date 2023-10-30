import React, { useContext } from "react";
import { JiboContext } from "../../../Context/JiboContext";
import { Modal, Button } from "react-bootstrap";

export const ModalWarning = (props) => {
  const { setShowModal } = useContext(JiboContext);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="justify-content-center">
        <h2>¡Atención!</h2>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
        <div className="w-50 d-flex flex-column my-3">
          <h5 className="warningText">
            ¡Termina de completar tu perfil para disfrutar de todas las
            funciones de la aplicación!
          </h5>
          <h4>*Rellenar los campos obligatorios.</h4>
        </div>
        <div className="w-50 d-flex flex-column my-3">
          <Button onClick={() => setShowModal(0)}>Aceptar</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
