import React, { useContext } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import { Col } from "react-bootstrap";

export const ShowCurriculum = () => {
  const { workerData } = useContext(JiboContext);
  return (
    <Col sm={12}>
      <h5 className="py-4">Curriculum</h5>
      {workerData?.cv_file ? (
        <>
          <p className="fw-bold">Nombre del archivo</p>
          <p>{workerData.cv_file}</p>
          <iframe
            src={`http://localhost:3000/documents/worker_documents/${workerData.cv_file}`}
            frameBorder="0"
            className="iframeCv"
          ></iframe>
        </>
      ) : (
        <h5>Sube tu CV</h5>
      )}
    </Col>
  );
};
