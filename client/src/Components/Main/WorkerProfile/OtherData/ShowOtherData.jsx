import React from "react";
import { Col } from "react-bootstrap";

export const ShowOtherData = ({ workerData }) => {
  return (
    <Col className="mb-5 px-0">
      <Col sm={12} className="mb-3 styleInfo">
        <h5 className="py-4">Formación</h5>
        <p>{workerData?.education}</p>
      </Col>
      <Col sm={12} className="mb-3 styleInfo">
        <h5 className="py-4">Experiencia laboral</h5>
        <p>{workerData?.job_experience}</p>
      </Col>
      <Col sm={12} className="mb-3 styleInfo">
        <h5 className="py-4">Habilidades</h5>
        <p>{workerData?.skills}</p>
      </Col>
    </Col>
  );
};
