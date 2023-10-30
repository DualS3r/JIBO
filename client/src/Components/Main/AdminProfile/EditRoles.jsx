import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import "./editRoles.scss";

const initialValue = {
  role_name: "",
  description: "",
};
const arrow = (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
    <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z" />
  </svg>
);

export const EditRoles = () => {
  const [allRoles, setAllRoles] = useState([]);
  const [newRole, setNewRole] = useState(initialValue);
  const [reset, setReset] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewRole({ ...newRole, [name]: value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/tables/getAllRole")
      .then((res) => {
        setAllRoles(res.data);
      })
      .catch((err) => {});
  }, [newRole, reset]);

  const onsubmit = (e) => {
    axios
      .post("http://localhost:3000/admin/addRoles", newRole)
      .then((res) => {
        setNewRole(initialValue);
      })
      .catch((err) => setError(err.response.data));
  };

  const onDelete = (role) => {
    axios
      .post("http://localhost:3000/admin/deleteRole", role)
      .then((res) => {
        setReset(!reset);
      })
      .catch((err) => {});
  };

  return (
    <Row className="p-5 d-flex justify-content-center align-items-center ">
      <Col
        lg={2}
        className="styleInfo d-flex flex-column align-items-center justify-content-center"
      >
        <h5>Configurar especialidad</h5>
        <p className="fw-bold required">Especialidad*</p>
        <input
          type="text"
          id="role_name"
          name="role_name"
          onChange={handleChange}
          value={newRole.role_name}
        />
        <p className="fw-bold required">Descripción*</p>
        <input
          type="textarea"
          id="description"
          name="description"
          onChange={handleChange}
          value={newRole.description}
        />
        {error && <p className="mt-3 text-danger fw-bold">{error}</p>}
      </Col>
      <Col lg={1} className="d-flex justify-content-center my-5 my-lg-0">
        <button className="buttom2" onClick={onsubmit}>
          Añadir {arrow}
        </button>
      </Col>
      <Col lg={6}>
        <Row className="d-flex flex-column">
          <Col className="styleInfo">
            <h5 className="mb-3">Especialidades Activas</h5>
            <Row className="gap-3 justify-content-center my-5">
              {allRoles?.map((role, i) => {
                return (
                  <Col sm={3} key={i} className="formtSp">
                    <div>
                      <p className="m-0">{role.role_name}</p>
                    </div>
                    <div>
                      <button
                        className="styleButtonDelete"
                        onClick={() => onDelete(role)}
                      >
                        x
                      </button>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col className="d-flex justify-content-center">
            <h5>
              <span className="fw-bold text-danger">* Atención:</span> Si se
              borra una especialidad, hay que tener en cuenta que se borran
              todas las ofertas que tengan esa especialidad.
            </h5>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
