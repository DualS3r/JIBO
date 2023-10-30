import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import "./CompanyGallery.scss";

export const CompanyGallery = () => {
  const [offerList, setOfferList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/offer/getAllOfferLimit")
      .then((res) => {
        setOfferList(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Col className="d-flex justify-content-evenly">
      <Row className="container d-flex justify-content-evenly">
        <Col sm={12} className="d-flex justify-content-center my-5">
          <h3>Ofertas más recientes</h3>
        </Col>

        {offerList.length === 0 ? (
          <Col sm={12} className="my-5">
            <h4>Nada que mostrar...</h4>
          </Col>
        ) : (
          offerList.map((offer, index) => {
            return (
              <Col sm={12} md={5} lg={3} key={index} className="oferta">
                <h4>{offer.title}</h4>
                <hr />
                <p>{offer.description}</p>
              </Col>
            );
          })
        )}
      </Row>
    </Col>
  );
};
