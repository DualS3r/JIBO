import React, { useContext, useState } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "./curriculum.scss";

export const EditCurriculum = ({ setEditShow }) => {
  const { workerData, setWorkerData } = useContext(JiboContext);
  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    const newFormData = new FormData();
    newFormData.append("file", file);

    axios
      .put(
        `http://localhost:3000/worker/cvInfoWorker/${workerData.user_id}`,
        newFormData
      )
      .then((res) => {
        setEditShow(false);
        setWorkerData({ ...workerData, cv_file: res.data.docCv });
      })
      .catch(setEditShow(false));
  };

  return (
    <Row>
      <Col sm={12}>
        <h5 className="py-4 ">Curriculum</h5>
        <p className="fw-bold">Nombre del archivo</p>
        <p>{workerData?.cv_file}</p>
      </Col>
      <Col sm={6} className="d-flex align-items-center">
        <input type="file" name="cv_file" onChange={handleFile} />
      </Col>
      <Col sm={6}>
        <button className="buttom2 mb-3" onClick={onSubmit}>
          Guardar
        </button>
      </Col>

      <Col sm={12}>
        <iframe
          src={
            workerData.cv_file
              ? `http://localhost:3000/documents/worker_documents/${workerData.cv_file}`
              : ""
          }
          width="75%"
          height="550px"
          frameBorder="0"
          className="pb-5 "
        ></iframe>
      </Col>
    </Row>
  );
};
