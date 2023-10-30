import React, { useContext, useState } from "react";
import { JiboContext } from "../../../Context/JiboContext";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./modals.scss";

const initialValue = {
  name: "",
  phone_number: "",
  dni_cif: "",
  email: "",
  password: "",
  conditions: false,
};

export const ModalRegistroCompany = (props) => {
  const { setShowModal, showError, setShowError } = useContext(JiboContext);
  const [inputCompany, setInputCompany] = useState(initialValue);
  const [error, SetError] = useState(false);

  const handleChange = (e) => {
    if (e.target.checked) {
      const { name, checked } = e.target;

      setInputCompany({ ...inputCompany, [name]: checked });
      setShowError(false);
      SetError("");
    } else {
      const { name, value } = e.target;

      setInputCompany({ ...inputCompany, [name]: value });
      setShowError(false);
      SetError("");
    }
  };

  const onSubmit = (e) => {
    const { conditions } = inputCompany;

    if (conditions === true) {
      axios
        .post("http://localhost:3000/company/registerCompany", inputCompany)
        .then((res) => {
          setShowModal(1);
        })
        .catch((err) => {
          SetError(err.response.data);
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
        <h2>Regístrate como empresa!</h2>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
        <div>
          <div className="w-100 d-flex flex-column my-3">
            <label htmlFor="company_name">Nombre de la empresa</label>
            <input
              className="styleInputRegister"
              type="text"
              id="company_name"
              name="name"
              onChange={handleChange}
              value={inputCompany.name}
            />
          </div>
          <div className="w-50 d-flex justify-content-between my-3 ">
            <div className="d-flex flex-column ">
              <label htmlFor="phone">Teléfono de contacto</label>
              <input
                className="styleInputRegister"
                type="number"
                id="phone"
                name="phone_number"
                onChange={handleChange}
                value={inputCompany.phone_number}
              />
            </div>
            <div className="d-flex flex-column ms-3">
              <label htmlFor="dni_cif">NIF o CIF</label>
              <input
                className="styleInputRegister"
                type="text"
                id="dni_cif"
                name="dni_cif"
                onChange={handleChange}
                value={inputCompany.dni_cif}
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
              value={inputCompany.email}
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
              value={inputCompany.password}
            />
          </div>
          <div className="d-flex justify-content-center align-items-start">
            <div>
              <input
                className="me-3"
                type="checkbox"
                id="checkbox"
                name="conditions"
                onChange={handleChange}
                value={inputCompany.conditions}
              />
            </div>
            <div>
              <label htmlFor="checkbox">Acepto las condiciones</label>
            </div>
          </div>
        </div>

        <div className="w-50 d-flex flex-column  align-items-center my-3">
          {error != "" ? (
            <p className="text-dark fw-bold text-center">{error}</p>
          ) : showError ? (
            <p className="text-dark fw-bold text-center">
              Tienes que aceptar los terminos y condiciones
            </p>
          ) : (
            <p> &nbsp;</p>
          )}
          <button className="buttom2" onClick={onSubmit}>
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
