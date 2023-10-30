import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JiboContext } from "../../../Context/JiboContext";
import { saveLocalStorageItem } from "../../../Utils/localStorageUtils";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Modal } from "react-bootstrap";

const initialLogin = {
  email: "",
  password: "",
};

export const ModalLogin = (props) => {
  const [inputLogin, setInputLogin] = useState(initialLogin);
  const [showMsg, setShowMsg] = useState(false);
  const { setShowModal, setIsLogged, setUserType, setActiveNavLat } =
    useContext(JiboContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputLogin({ ...inputLogin, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/index/login", inputLogin)
      .then((res) => {
        const dataUser = jwt_decode(res.data);
        const { user_id, type } = dataUser;

        saveLocalStorageItem("token", res.data);
        setUserType(type);
        setIsLogged(true);
        if (type === 1) {
          navigate(`/workerProfile/${user_id}`);
          setActiveNavLat(1);
        } else if (type === 2) {
          navigate(`/companyProfile/${user_id}`);
          setActiveNavLat(5);
        } else if (type === 0) {
          navigate(`/admin`);
        }

        setShowModal(0);
      })
      .catch((err) => {
        setShowMsg(true);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="justify-content-center">
        <h2>Inicia sesión</h2>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
        <div className="w-50 d-flex flex-column my-3">
          <label htmlFor="email">Correo electrónico</label>
          <input
            className="styleInputRegister"
            type="email"
            id="email"
            name="email"
            value={inputLogin.email}
            onChange={handleChange}
          />
        </div>
        <div className="w-50 d-flex flex-column my-3">
          <label htmlFor="password">Contraseña</label>
          <input
            className="styleInputRegister"
            type="password"
            id="password"
            name="password"
            value={inputLogin.password}
            onChange={handleChange}
          />
        </div>

        <div className="w-50 d-flex flex-column align-items-center my-3">
          {showMsg && (
            <p style={{ color: "black" }} className="fw-bold">
              Email o password incorrectos
            </p>
          )}
          <button className="buttom2 mb-2" onClick={onSubmit}>
            Iniciar sesión
          </button>
          <p className="text-center">
            ¿No estás registrado?{" "}
            <span onClick={() => setShowModal(4)} className="linkNav-Modal">
              Regístrate!
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};
