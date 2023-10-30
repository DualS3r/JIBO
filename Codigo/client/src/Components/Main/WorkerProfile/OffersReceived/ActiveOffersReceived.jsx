import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JiboContext } from "../../../../Context/JiboContext";
import axios from "axios";
import { Col, Dropdown, Row } from "react-bootstrap";

export const ActiveOffersReceived = () => {
  const { workerData } = useContext(JiboContext);
  const [offerList, setOfferList] = useState();
  const { company_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/offer/getActivesOfferOneUser/${company_id}`)
      .then((res) => {
        setOfferList(res.data);
      })
      .catch((err) => {});
  }, []);

  const onApply = (job_offer_id) => {
    axios
      .post(
        `http://localhost:3000/worker/workerApplyOffer/${workerData.user_id}`,
        { job_offer_id }
      )
      .then((res) => {})
      .catch((err) => {});
  };

  const checkOffer = (job_offer_id) => {
    axios
      .get(`http://localhost:3000/worker/allApplierOneOffer/${job_offer_id}`)
      .then((res) => {
        let data = res.data.find((e) => e.user_id === workerData.user_id);
        if (data === undefined) {
          onApply(job_offer_id);
        }
      })
      .catch((err) => {});
  };

  return (
    <Row>
      <Col className="mt-5">
        {offerList?.map((offer) => {
          return (
            <Col key={offer.job_offer_id} className="cardsCont my-5">
              <Row className="cardOffer">
                <Col sm={12} className="d-flex justify-content-end">
                  <Dropdown className="dropButton">
                    <Dropdown.Toggle
                      className="border border-0 db2"
                      id="dropdown-basic"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <button
                          onClick={() => checkOffer(offer.job_offer_id)}
                          className="button1 complete"
                        >
                          Aplicar
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col className="col-12">
                  <h3>{offer.role_name}</h3>
                </Col>
                <Col sm={6} className="lines">
                  <h6>Provincia: </h6>
                  <p>{offer.province}</p>
                </Col>
                <Col className="col-6 lines">
                  <h6>Ciudad: </h6>
                  <p>{offer.city}</p>
                </Col>
                <Col className="col-6 lines">
                  <h6>Exp. mínima: </h6>
                  <p>{offer.min_experience}</p>
                </Col>
                <Col className="col-6 lines">
                  <h6>Salario mensual: </h6>
                  <p>{offer.salary}€</p>
                </Col>
                <Col className="col-12">
                  <h6>Acerca de:</h6>
                </Col>
                <Col className="col-12">{offer.title}</Col>
              </Row>
            </Col>
          );
        })}
      </Col>
    </Row>
  );
};
