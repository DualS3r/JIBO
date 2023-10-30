import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { JiboContext } from "../../../../Context/JiboContext";

export const ApplierCurriculum = () => {
  const { applierData } = useContext(JiboContext);

  return (
    <Col sm={12} className="p-5">
      <h5 className="py-4 ">Curriculum</h5>
      <p className="fw-bold">Nombre del archivo</p>
      <p>{applierData?.cv_file}</p>
      <iframe
        src={
          applierData.cv_file
            ? `http://localhost:3000/documents/worker_documents/${applierData.cv_file}`
            : ""
        }
        width="75%"
        height="700px"
        className="py-4 "
      ></iframe>
    </Col>
  );
};
