import React, { useContext, useEffect, useState } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import { RoleSelectMulti } from "../../RoleSelect/RoleSelectMulti";
import { CitySelectMulti } from "../../CitySelect/CitySelectMulti";
import { ProvinceSelectMulti } from "../../ProvinceSelect/ProvinceSelectMulti";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import "./jobPreferences.scss";

export const EditJobPreferences = ({ setEditShow }) => {
  const { workerData, setWorkerData } = useContext(JiboContext);
  const [editImput, setEditImput] = useState(workerData);
  const [selectedCities, setSelectedCities] = useState(workerData.movility);
  const [selectedRoles, setSelectedRoles] = useState(workerData.spected_roles);
  const [selectedProvinces, setSelectedProvinces] = useState(null);
  const [error, setError] = useState(false);
  let roles = [];

  useEffect(
    (e) => {
      if (selectedRoles) {
        roles = selectedRoles.map((e) => Number(e.value));
        setError(false);
      }
    },
    [selectedRoles]
  );

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setEditImput({ ...editImput, [name]: value });
    setError(false);
  };

  const handleChange = (e, name) => {
    if (name === "cities") {
      setSelectedCities(e);
      setError(false);
    } else if (name === "roles") {
      setSelectedRoles(e);
      setError(false);
    } else if (name === "provinces") {
      setSelectedProvinces(e);
      setError(false);
    }
  };

  const onSubmit = () => {
    axios
      .put(
        `http://localhost:3000/worker/preferInfoWorker/${workerData.user_id}`,
        { editImput, selectedCities, selectedRoles }
      )
      .then((res) => {
        let is_complete = res.data.complete;

        setWorkerData({
          ...workerData,
          spected_salary: editImput.spected_salary,
          movility: selectedCities,
          spected_roles: selectedRoles,
          complete_profile: is_complete,
        });
        setEditShow(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <Row className="flex-column">
      <Col className="styleInfo">
        <Row>
          <Col className="d-flex " sm={12}>
            <h5 className="py-4">Preferencias Laborales</h5>
          </Col>
          <Col sm={6} lg={3}>
            <p className="fw-bold required">Salario deseado*</p>
            <input
              type="number"
              name="spected_salary"
              id="spected_salary"
              onChange={handleChangeInput}
              value={editImput.spected_salary ? editImput.spected_salary : ""}
            />
          </Col>

          <Col sm={6} lg={3}>
            <p className="fw-bold">Provincia deseada</p>
            <ProvinceSelectMulti
              selectedProvinces={selectedProvinces}
              setSelectedProvinces={setSelectedProvinces}
              handleChange={handleChange}
            />
          </Col>

          <Col sm={6} lg={3}>
            <p className="fw-bold required">Ciudad deseada*</p>
            <CitySelectMulti
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
              handleChange={handleChange}
              selectedProvinces={selectedProvinces}
              workerData={workerData}
            />
          </Col>
          <Col sm={6} lg={3}>
            <p className="fw-bold required">Especialidades deseadas*</p>
            <RoleSelectMulti
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
              handleChange={handleChange}
            />
          </Col>
        </Row>
      </Col>

      <Col className="d-flex flex-column align-items-center justify-content-center">
        {error != "" && <p className="mt-3 text-danger fw-bolder">{error}</p>}
        <button className="buttom2 mt-3" onClick={onSubmit}>
          Guardar
        </button>
      </Col>
    </Row>
  );
};
