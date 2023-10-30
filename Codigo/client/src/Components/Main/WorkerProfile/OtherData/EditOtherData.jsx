import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import "./otherData.scss";

const initialValue = {
  skills: "",
  education: "",
  job_experience: "",
};

export const EditOtherData = ({ setEditShow }) => {
  const { workerData, setWorkerData } = useContext(JiboContext);
  const [editImput, setEditImput] = useState(initialValue);

  useEffect(() => {
    if (workerData) {
      setEditImput({
        ...workerData,
        education: workerData.education ? workerData.education : "",
        job_experience: workerData.job_experience
          ? workerData.job_experience
          : "",
        skills: workerData.skills ? workerData.skills : "",
      });
    }
  }, [workerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditImput({ ...editImput, [name]: value });
  };

  const onSubmit = (e) => {
    axios
      .put(
        `http://localhost:3000/worker/otherInfoWorker/${workerData.user_id}`,
        editImput
      )
      .then((res) => {
        setWorkerData({
          ...workerData,
          education: editImput.education,
          job_experience: editImput.job_experience,
          skills: editImput.skills,
        });
        setEditShow(false);
      })
      .catch((err) => {});
  };

  return (
    <Row>
      <Col sm={12} className="py-4 mb-3 styleInfo">
        <h5>Formación</h5>
        <textarea
          className="wInput100 hTextArea"
          type="text"
          id="education"
          name="education"
          onChange={handleChange}
          value={editImput.education}
        />
      </Col>
      <Col sm={12} className="py-4 mb-3 styleInfo">
        <h5>Experiencia laboral</h5>
        <textarea
          className="wInput100 hTextArea"
          type="text"
          id="job_experience"
          name="job_experience"
          onChange={handleChange}
          value={editImput.job_experience}
        />
      </Col>
      <Col sm={12} className="py-4 styleInfo">
        <h5>Habilidades</h5>
        <textarea
          className="wInput100 hTextArea"
          type="text"
          id="skills"
          name="skills"
          onChange={handleChange}
          value={editImput.skills}
        />
      </Col>
      <Col className="d-flex justify-content-center mt-3">
        <button className="buttom2 mb-5" onClick={onSubmit}>
          Guardar
        </button>
      </Col>
    </Row>
  );
};
