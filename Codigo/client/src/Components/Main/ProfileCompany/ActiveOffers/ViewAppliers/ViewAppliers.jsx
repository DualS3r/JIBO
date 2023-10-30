import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JiboContext } from "../../../../../Context/JiboContext";
import axios from "axios";
import { Col, Dropdown, Row } from "react-bootstrap";
import "./ViewAppliers.scss";

export const ViewAppliers = () => {
  const { offerId, setApplierData } = useContext(JiboContext);
  const [dataOffer, setDataOffer] = useState();
  const [appliersList, setAppliersList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/offer/getOneOffer/${offerId}`)
      .then((res) => {
        setDataOffer(res.data[0]);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/worker/allWorkerApplierOffer/${offerId}`)
      .then((res) => {
        setAppliersList(res.data);
      })
      .catch((err) => {});
  }, []);

  const viewApplier = (user_id) => {
    axios
      .get(`http://localhost:3000/worker/oneWorker/${user_id}`)
      .then((res) => {
        setApplierData(res.data);
        navigate(`/viewApplierProfile/${user_id}`);
      })
      .catch((err) => {});
  };

  return (
    <Row className="py-5">
      <Col className="cardsCont col-12">
        <Row className="cardOffer">
          <Col sm={12} className="d-flex justify-content-end"></Col>
          <Col sm={12}>
            <h3>{dataOffer?.role_name}</h3>
          </Col>
          <Col sm={6} className="lines">
            <h6>Provincia: </h6>
            <p>{dataOffer?.province}</p>
          </Col>
          <Col xl={6} className="lines">
            <h6>Ciudad: </h6>
            <p>{dataOffer?.city}</p>
          </Col>
          <Col xl={6} className="lines">
            <h6>Exp. mínima: </h6>
            <p>{dataOffer?.min_experience}</p>
          </Col>
          <Col xl={6} className="lines">
            <h6>Salario mensual: </h6>
            <p>{dataOffer?.salary}€</p>
          </Col>
          <Col sm={12}>
            <h6>Sobre la oferta:</h6>
          </Col>
          <Col sm={12}>{dataOffer?.title}</Col>
        </Row>
        {appliersList && appliersList.length > 0 ? (
          <Row>
            {appliersList.map((e) => {
              console.log(e);
              return (
                <Col key={e.user_id} className="cardsCont2 col-12">
                  <Row className="cardAllWorkers">
                    <Col sm={12} className=" d-flex justify-content-end">
                      <Dropdown className="dropButton">
                        <Dropdown.Toggle
                          className="border border-0 db2"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <button
                              onClick={() => viewApplier(e.user_id)}
                              className="buttonAppliers  profiles"
                            >
                              Ver perfil
                            </button>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <button
                              onClick={() => {
                                window.location.href = `mailto:${e.email}`;
                              }}
                              className="buttonAppliers  email"
                            >
                              Enviar
                            </button>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <button
                              onClick={() => {
                                window.open(
                                  `https://api.whatsapp.com/send?phone=${e.phone_number}`
                                );
                              }}
                              className="buttonAppliers  message"
                            >
                              Enviar Mensaje
                            </button>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    <Col className="col-12">
                      <h3>{e.name}</h3>
                    </Col>
                    <Col sm={12} className="lines">
                      <p>{e.worker_bio}</p>
                    </Col>
                  </Row>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Col sm={12} className="d-flex justify-content-center mt-5">
            <h5>Esta oferta aún no tiene candidatos</h5>
          </Col>
        )}
      </Col>
    </Row>
  );
};
