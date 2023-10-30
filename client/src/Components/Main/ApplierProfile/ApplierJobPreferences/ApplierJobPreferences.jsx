import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { JiboContext } from "../../../../Context/JiboContext";

export const ApplierJobPreferences = () => {
  const { applierData } = useContext(JiboContext);
  const { movility, spected_roles } = applierData;

  return (
    <Row className="py-5 px-3 mb-5">
      <Col className="styleInfo">
        <Row>
          <Col className="d-flex " sm={12}>
            <h5 className="py-4">Preferencias Laborales</h5>
          </Col>
          <Col sm={4}>
            <p className="fw-bold">Salario deseado</p>
            <p>{applierData?.spected_salary}</p>
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
