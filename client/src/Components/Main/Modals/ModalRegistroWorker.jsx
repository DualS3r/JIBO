import React, { useContext, useState } from "react";
import { JiboContext } from "../../../Context/JiboContext";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./modals.scss";

const initialValue = {
  name: "",
  last_name: "",
  phone_number: "",
  dni_cif: "",
  email: "",
  password: "",
  conditions: false,
};

export const ModalRegistroWorker = (props) => {
  const { setShowModal, showError, setShowError } = useContext(JiboContext);
  const [inputWorker, setInputWorker] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.checked) {
      const { name, checked } = e.target;

      setInputWorker({ ...inputWorker, [name]: checked });
      setShowError(false);
      setError("");
    } else {
      const { name, value } = e.target;

      setInputWorker({ ...inputWorker, [name]: value });
      setShowError(false);
      setError("");
    }
  };

  const onSubmit = (e) => {
    const { conditions } = inputWorker;

    if (conditions === true) {
      axios
        .post("http://localhost:3000/worker/registerWorker", inputWorker)
        .then((res) => {
          const { result1 } = res.data;
          setShowModal(1);
        })
        .catch((err) => {
          setError(err.response.data);
        });
    } else {
      setShowError(true);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="justify-content-center">
        <h2>Regístrate como trabajador!</h2>
      </Modal.Header>
      <Modal.Body className="ppal-modal d-flex justify-content-center align-items-center flex-column">
        <div>
          <div className="d-flex justify-content-between  my-3 ">
            <div className="d-flex flex-column">
              <label htmlFor="name">Nombre</label>
              <input
                className="styleInputRegister"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={inputWorker.name}
              />
            </div>
            <div className="d-flex flex-column ms-3">
              <label htmlFor="last_name">Apellidos</label>
              <input
                className="styleInputRegister"
                type="text"
                id="last_name"
                name="last_name"
                onChange={handleChange}
                value={inputWorker.last_name}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between my-3">
            <div className="d-flex flex-column ">
              <label htmlFor="phone">Teléfono de contacto</label>
              <input
                className="styleInputRegister"
                type="number"
                id="phone"
                name="phone_number"
                onChange={handleChange}
                value={inputWorker.phone_number}
              />
            </div>
            <div className="d-flex flex-column ms-3">
              <label htmlFor="dni_cif">DNI o NIE</label>
              <input
                className="styleInputRegister"
                type="text"
                id="dni_cif"
                name="dni_cif"
                onChange={handleChange}
                value={inputWorker.dni_cif}
              />
            </div>
          </div>
          <div className="w-100 d-flex flex-column my-3">
            <label htmlFor="email">Correo electrónico</label>
            <input
              className="styleInputRegister"
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={inputWorker.email}
            />
          </div>
          <div className="w-100 d-flex flex-column my-3">
            <label htmlFor="password">Contraseña</label>
            <input
              className="styleInputRegister"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={inputWorker.password}
            />
          </div>
          <div className="d-flex justify-content-center align-items-start">
            <div>
              <input
                className="me-3"
                type="checkbox"
                id="conditions"
                name="conditions"
                value={inputWorker.conditions}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="conditions">Acepto las condiciones</label>
            </div>
          </div>
        </div>

        <div className="w-50 d-flex flex-column align-items-center my-3">
          {error != "" ? (
            <p className="text-dark fw-bold text-center">{error}</p>
          ) : showError ? (
            <p className="text-dark fw-bold text-center">
              Tienes que aceptar los terminos y condiciones
            </p>
          ) : (
            <p> &nbsp;</p>
          )}
          <button className="buttom2 mb-2" onClick={onSubmit}>
            Aceptar
          </button>
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
