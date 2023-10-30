import React, { useContext } from "react";
import { JiboContext } from "../../../Context/JiboContext";
import { Modal } from "react-bootstrap";

export const ModalSelectRegister = (props) => {
  const { setShowModal } = useContext(JiboContext);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="justify-content-center">
        <h2>Regístrate</h2>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
        <div className="w-50 d-flex flex-column my-3">
          <button className="buttom2" onClick={() => setShowModal(2)}>
            Eres empresa
          </button>
        </div>
        <div className="w-50 d-flex flex-column my-3">
          <button className="buttom2" onClick={() => setShowModal(3)}>
            Eres profesional
          </button>
        </div>

        <div className="w-50 d-flex flex-column align-items-center my-3">
          <p className="text-center">
            ¿Ya estás registrado?{" "}
            <span onClick={() => setShowModal(1)} className="linkNav-Modal">
              Inicia sesión
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};
