import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { JiboContext } from "../../../Context/JiboContext";
import axios from "axios";
import { Col, Dropdown, Row } from "react-bootstrap";
import "./allOffers.scss";

export const AllOffers = ({ setFilter, filterList, setFilterList }) => {
  const { workerData, userType } = useContext(JiboContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (filterList.length === 0 || filterList.length > 0) {
      axios
        .get("http://localhost:3000/offer/getAllOffer")
        .then((res) => {
          setFilterList(res.data);
          setFilter(3);
        })
        .catch((err) => {});
    }
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

  const onDeleteOffer = (owner_user_id, job_offer_id) => {
    axios
      .put(
        `http://localhost:3000/offer/deleteOffer/${owner_user_id}/${job_offer_id}`
      )
      .then((res) => {
        setFilterList(
          filterList.filter((e) => e.job_offer_id !== job_offer_id)
        );
      })
      .catch((err) => {});
  };

  const hideOffer = (owner_user_id, job_offer_id) => {
    axios
      .put(
        `http://localhost:3000/offer/completeOffer/${owner_user_id}/${job_offer_id}`
      )
      .then((res) => {
        setFilterList(
          filterList.filter((e) => e.job_offer_id !== job_offer_id)
        );
      })
      .catch((err) => {});
  };

  return (
    <Row>
      {filterList?.length > 0 ? (
        filterList.map((e, i) => {
          return (
            <Col sm={12} key={i} className="cardsCont2">
              <Row className="cardAllWorkers">
                <Col sm={12} className="d-flex justify-content-end">
                  <Dropdown className="dropButton">
                    <Dropdown.Toggle
                      className="border border-0 db2"
                      id="dropdown-basic"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu>
                      {userType === 1 ? (
                        <Dropdown.Item>
                          <button
                            onClick={() => checkOffer(e.job_offer_id)}
                            className="button1  complete"
                          >
                            Aplicar
                          </button>
                        </Dropdown.Item>
                      ) : (
                        <>
                          <Dropdown.Item>
                            <button
                              onClick={() =>
                                navigate(`/companyProfile/${e.owner_user_id}`)
                              }
                              className="button1  appliers"
                            >
                              Perfil empresa
                            </button>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <button
                              onClick={() =>
                                hideOffer(e.owner_user_id, e.job_offer_id)
                              }
                              className="button1  appliers"
                            >
                              Ocultar
                            </button>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <button
                              onClick={() =>
                                onDeleteOffer(e.owner_user_id, e.job_offer_id)
                              }
                              className="button1  delete"
                            >
                              Eliminar
                            </button>
                          </Dropdown.Item>
                        </>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col sm={12} className="col-12">
                  <h3>{e.title}</h3>
                </Col>
                <Col sm={12} className="lines">
                  <p>{e.description}</p>
                </Col>
                <Col xl={6} className="lines">
                  <h6>Provincia: </h6>
                  <p>{e.province}</p>
                </Col>
                <Col xl={6} className="lines">
                  <h6>Ciudad: </h6>
                  <p>{e.city}</p>
                </Col>
                <Col xl={6} className="lines">
                  <h6>Exp. mínima: </h6>
                  <p>{e.min_experience}</p>
                </Col>
                <Col xl={6} className="lines">
                  <h6>Salario mensual: </h6>
                  <p>{e.salary}€</p>
                </Col>
              </Row>
            </Col>
          );
        })
      ) : (
        <Col sm={12} className="my-5 d-flex justify-content-center">
          <h4>Aún no hay ofertas resgistradas</h4>
        </Col>
      )}
    </Row>
  );
};
