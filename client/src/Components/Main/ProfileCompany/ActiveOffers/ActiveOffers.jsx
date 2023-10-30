import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JiboContext } from "../../../../Context/JiboContext";
import { AddOffer } from "./AddOffer/AddOffer";
import axios from "axios";
import { Col, Row, Dropdown, Button } from "react-bootstrap";
import "./ActiveOffers.scss";

export const ActiveOffers = () => {
  const { companyData, setOfferId } = useContext(JiboContext);
  const [editShow, setEditShow] = useState(false);
  const [offerList, setOfferList] = useState();
  const [changes, setChanges] = useState(true);
  const navigate = useNavigate();
  const { user_id, offers_availables } = companyData;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/offer/getActivesOfferOneUser/${user_id}`)
      .then((res) => {
        setOfferList(res.data);
      })
      .catch((err) => {});
  }, [changes]);

  const onDelete = (id) => {
    axios
      .put(`http://localhost:3000/offer/deleteOffer/${user_id}/${id}`)
      .then((res) => {
        setOfferList(offerList.filter((e) => e.job_offer_id !== id));
      })
      .catch((err) => {});
  };

  const onComplete = (id) => {
    axios
      .put(`http://localhost:3000/offer/completeOffer/${user_id}/${id}`)
      .then((res) => {
        setOfferList(offerList.filter((e) => e.job_offer_id !== id));
        deleteAppliers(id);
      })
      .catch((err) => {});
  };

  const deleteAppliers = (offer_id) => {
    axios
      .post("http://localhost:3000/worker/deleteAppliersOffer", { offer_id })
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <Row className="py-5 d-flex justify-content-center">
      <Col>
        <Row className="d-flex flex-column">
          <Col className="d-flex align-items-baseline">
            <h5 className="py-4">Ofertas de trabajo:</h5>
            {!editShow && offers_availables > 0 && (
              <Button
                variant="dark"
                onClick={() => setEditShow(true)}
                className="mx-3 add-button"
              >
                +
              </Button>
            )}
          </Col>
        </Row>
      </Col>
      {offerList && offerList.length > 0 ? (
        <>
          {!editShow &&
            offerList.map((offer) => {
              return (
                <Col sm={12} key={offer.job_offer_id} className="mb-3">
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
                              onClick={() => {
                                navigate(
                                  `/companyProfile/${user_id}/viewAppliers`
                                ),
                                  setOfferId(offer.job_offer_id);
                              }}
                              className="button1  appliers"
                            >
                              Candidatos
                            </button>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <button
                              onClick={() => onDelete(offer.job_offer_id)}
                              className="button1 delete"
                            >
                              Eliminar
                            </button>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <button
                              onClick={() => onComplete(offer.job_offer_id)}
                              className="button1 complete"
                            >
                              Completar
                            </button>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    <Col sm={12}>
                      <h3>{offer.role_name}</h3>
                    </Col>
                    <Col xl={6} className="lines">
                      <h6>Provincia: </h6>
                      <p>{offer.province}</p>
                    </Col>
                    <Col xl={6} className="lines">
                      <h6>Ciudad: </h6>
                      <p>{offer.city}</p>
                    </Col>
                    <Col xl={6} className="lines">
                      <h6>Exp. mínima: </h6>
                      <p>{offer.min_experience}</p>
                    </Col>
                    <Col xl={6} className="lines">
                      <h6>Salario mensual: </h6>
                      <p>{offer.salary}€</p>
                    </Col>
                    <Col sm={12} className="lines">
                      <h6>Sobre la oferta:</h6>
                    </Col>
                    <Col sm={12}>{offer.title}</Col>
                  </Row>
                </Col>
              );
            })}
        </>
      ) : (
        <Col sm={12}>
          <h5>Aún no hay ofertas publicadas</h5>
        </Col>
      )}
      {editShow && (
        <AddOffer
          setEditShow={setEditShow}
          setChanges={setChanges}
          changes={changes}
          offerList={offerList}
          setOfferList={setOfferList}
        />
      )}
    </Row>
  );
};
