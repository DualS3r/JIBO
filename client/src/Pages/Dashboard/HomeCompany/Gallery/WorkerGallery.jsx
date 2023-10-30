import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import "./WorkerGallery.scss";

export const WorkerGallery = () => {
  const [workerList, setWorkerList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/worker/workerLimit")
      .then((res) => {
        setWorkerList(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Col className="d-flex justify-content-evenly">
      <Row className="container d-flex justify-content-evenly">
        <Col sm={12} className="d-flex justify-content-center mb-5">
          <h3>Nuestros profesionales</h3>
        </Col>

        {workerList.length === 0 ? (
          <Col sm={12} className="mb-5">
            <h4>Nada que mostrar...</h4>
          </Col>
        ) : (
          workerList.map((worker, index) => {
            if (index === 1 || index === 4 || index === 7) {
              return (
                <Col
                  sm={12}
                  md={5}
                  lg={3}
                  key={index}
                  className="mb-5 workerCard-1"
                >
                  <img
                    src={`http://localhost:3000/images/worker_profile/${worker.img}`}
                    alt="trabajador"
                    className="gallery-img"
                  />
                  <hr />
                  <h4>{worker.name}</h4>
                </Col>
              );
            } else {
              return (
                <Col
                  sm={12}
                  md={5}
                  lg={3}
                  key={index}
                  className="mb-5 workerCard"
                >
                  <img
                    src={`http://localhost:3000/images/worker_profile/${worker.img}`}
                    alt="trabajador"
                    className="gallery-img"
                  />
                  <hr />
                  <h4>{worker.name}</h4>
                </Col>
              );
            }
          })
        )}
      </Row>
    </Col>
  );
};
