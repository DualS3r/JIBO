import React from "react";
import { Col, Row } from "react-bootstrap";
import "./jobPreferences.scss";

export const ShowJobPreferences = ({ workerData }) => {
  const { movility, spected_roles } = workerData;

  return (
    <Row className="mb-5 d-flex">
      <Col sm={12} className="styleInfo">
        <Row>
          <Col sm={12}>
            <h5 className="py-4 ">Preferencias Laborales</h5>
          </Col>
          <Col sm={4}>
            <p className="fw-bold">Salario deseado</p>
            <p>{workerData?.spected_salary}</p>
          </Col>
          <Col sm={4}>
            <p className="fw-bold">Ciudad deseada</p>
            {movility?.map((e) => {
              return <p key={e.value}>{e.label}</p>;
            })}
          </Col>
          <Col sm={4}>
            <p className="fw-bold">Especialidades deseadas</p>
            {spected_roles?.map((e, i) => {
              return <p key={i}>{e.label}</p>;
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
