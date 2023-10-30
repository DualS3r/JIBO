import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../../../../Utils/localStorageUtils";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

export const OffersApply = () => {
  const [offersList, setOffersList] = useState([]);

  useEffect(() => {
    const tokenStorage = getLocalStorage("token");
    const { user_id } = jwt_decode(tokenStorage);

    axios
      .get(`http://localhost:3000/worker/workerOffers/${user_id}`)
      .then((res) => {
        setOffersList(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Row className="my-5">
      {offersList.length > 0 ? (
        offersList.map((e) => (
          <Col key={e.job_offer_id} className="cardsCont2 col-12">
            <Row className="cardAllWorkers">
              <Col className="col-12">
                <h3>{e.title}</h3>
                <h5>{e.role_name}</h5>
              </Col>
              <Col
                sm={6}
                className="lines d-flex flex-column align-items-start"
              >
                <h6>Provincia:</h6>
                <p>{e.province}</p>
              </Col>
              <Col
                sm={6}
                className="lines d-flex flex-column align-items-start"
              >
                <h6>Ciudad:</h6>
                <p>{e.city}</p>
              </Col>
              <Col
                sm={6}
                className="lines d-flex flex-column align-items-start"
              >
                <h6>Salario:</h6>
                <p>{e.salary}</p>
              </Col>

              <Col
                sm={6}
                className="lines d-flex flex-column align-items-start"
              >
                <h6>Experiencia necesaria:</h6>
                <p>{e.min_experience}</p>
              </Col>

              <Col
                sm={12}
                className="lines d-flex flex-column align-items-start"
              >
                <h6>Descripción:</h6>
                <p>{e.description}</p>
              </Col>
            </Row>
          </Col>
        ))
      ) : (
        <Col sm={12}>
          <h5>Aún no te has inscrito en ninguna oferta</h5>
        </Col>
      )}
    </Row>
  );
};
