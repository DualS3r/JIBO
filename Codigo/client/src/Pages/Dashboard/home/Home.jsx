import React, { useContext } from "react";
import { JiboContext } from "../../../Context/JiboContext";
import { Carrousel } from "../../../Components/Main/Carrousel/Carrousel";
import { ModalRegistroCompany } from "../../../Components/Main/Modals/ModalRegistroCompany";
import { ModalRegistroWorker } from "../../../Components/Main/Modals/ModalRegistroWorker";
import { ModalLogin } from "../../../Components/Main/Modals/ModalLogin";
import { ModalSelectRegister } from "../../../Components/Main/Modals/ModalSelectRegister";
import { Col, Container, Row } from "react-bootstrap";
import "./home.scss";
import "../../../Style/general.scss";

export const Home = () => {
  const { showModal, setShowModal } = useContext(JiboContext);

  return (
    <Col className="ppal-height2 my-5 d-flex justify-content-center align-items-center">
      <Container>
        <Row className="d-flex justify-content-center  g-5">
          <Col
            none={12}
            lg={12}
            className="post_ppal d-flex flex-column justify-content-center align-items-center"
          >
            <Row className="align-items-center">
              <Col>
                <div className="color_text">
                  <h2>Crea, </h2>
                  <h2>crece y</h2>
                  <h2>encuentra!</h2>
                  <p className="me-5">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Voluptates architecto recusandae ipsum atque nostrum numquam
                    voluptatem similique delectus deleniti repellat!
                  </p>
                </div>
                <div className="d-flex flex-column align-items-start">
                  <button
                    className="my-3 text-start buttom2"
                    onClick={() => setShowModal(2)}
                  >
                    Tengo una empresa
                  </button>
                  <button
                    className="text-start buttom2"
                    onClick={() => setShowModal(3)}
                  >
                    Soy profesional
                  </button>
                </div>
              </Col>
              <Col
                none={12}
                lg={6}
                className="my-5 my-lg-0 d-flex align-items-center"
              >
                <Carrousel />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {showModal === 1 ? (
        <ModalLogin show={showModal} onHide={() => setShowModal(0)} />
      ) : showModal === 2 ? (
        <ModalRegistroCompany show={showModal} onHide={() => setShowModal(0)} />
      ) : showModal === 3 ? (
        <ModalRegistroWorker show={showModal} onHide={() => setShowModal(0)} />
      ) : (
        showModal === 4 && (
          <ModalSelectRegister
            show={showModal}
            onHide={() => setShowModal(0)}
          />
        )
      )}
    </Col>
  );
};
