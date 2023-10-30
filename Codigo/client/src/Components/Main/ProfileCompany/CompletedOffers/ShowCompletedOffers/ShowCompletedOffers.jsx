import React from "react";
import { Col, Row, Dropdown, Button } from "react-bootstrap";

export const ShowCompletedOffers = ({
  offerList,
  onDelete,
  onRenew,
  editShow,
  setEditShow,
  setOfferId,
  offers_availables,
}) => {
  return (
    <Row className="py-5">
      <Col>
        <Row className="d-flex flex-column">
          <Col className="d-flex align-items-baseline">
            <h5 className="py-4">Ofertas completadas:</h5>
          </Col>
        </Row>
      </Col>
      {offerList?.length > 0 ? (
        offerList.map((offer) => (
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
                          setEditShow(!editShow);
                          setOfferId(offer.job_offer_id);
                        }}
                        className="button edit"
                      >
                        Editar
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <button
                        onClick={() => onDelete(offer.job_offer_id)}
                        className="button delete"
                      >
                        Eliminar
                      </button>
                    </Dropdown.Item>
                    {offers_availables > 0 && (
                      <Dropdown.Item>
                        <button
                          onClick={() => onRenew(offer.job_offer_id)}
                          className="button renove"
                        >
                          Renovar
                        </button>
                      </Dropdown.Item>
                    )}
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
              <Col xl={6} className=" lines">
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
        ))
      ) : (
        <Col sm={12}>
          <h5>Aún no hay ofertas completadas</h5>
        </Col>
      )}
    </Row>
  );
};
