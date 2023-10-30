import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { JiboContext } from "../../../../Context/JiboContext";

export const ApplierOtherData = () => {
  const { applierData } = useContext(JiboContext);
  return (
    <Col className="py-5 px-1 mb-5">
      <Col sm={12} className="mb-3 styleInfo">
        <h5 className="py-4 ">Formación</h5>
        <p>{applierData?.education}</p>
      </Col>
      <Col sm={12} className="mb-3 styleInfo">
        <h5 className="py-4 ">Experiencia laboral</h5>
        <p>{applierData?.job_experience}</p>
      </Col>
      <Col sm={12} className="mb-3 styleInfo">
        <h5 className="py-4 ">Habilidades</h5>
        <p>{applierData?.skills}</p>
      </Col>
    </Col>
  );
};
