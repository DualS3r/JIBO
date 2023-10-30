import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JiboContext } from "../../../Context/JiboContext";
import axios from "axios";
import { Col, Dropdown, Row } from "react-bootstrap";
import { ModalSendAdvisor } from "../Modals/ModalSendAdvisor";
import "./allWorkers.scss";

const initialValue = {
  worker_id: "",
  email: "",
  company_id: "",
};

export const AllWorkers = ({ setFilter, filterList, setFilterList }) => {
  const { companyData, userType } = useContext(JiboContext);
  const [sendData, setSendData] = useState(initialValue);
  const [showModal, setShowModal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (filterList.length === 0 || filterList.type !== 1) {
      axios
        .get("http://localhost:3000/worker/allWorkers", userType)
        .then((res) => {
          setFilterList(res.data);
          setFilter(1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onSendOffer = (e_mail, id) => {
    let data = {
      ...sendData,
      worker_id: id,
      email: e_mail,
      user_id: companyData.user_id,
    };

    axios
      .post("http://localhost:3000/company/sendOffer", data)
      .then((res) => {
        setShowModal(1);
      })
      .catch((err) => {});
  };

  const onDelete = (worker_id) => {
    axios
      .put(`http://localhost:3000/worker/deleteWorker/${worker_id}`)
      .then((res) => {
        setFilterList(filterList.filter((e) => e.user_id !== worker_id));
      })
      .catch((err) => {});
  };

  return (
    <>
      <Row>
        {filterList?.length > 0 ? (
          filterList.map((e, i) => {
            return (
              <Col key={i} className="cardsCont2 col-12">
                <Row className="cardAllWorkers">
                  <Col sm={12} className="d-flex justify-content-end">
                    <Dropdown className="dropButton">
                      <Dropdown.Toggle
                        className="border border-0 db2"
                        id="dropdown-basic"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu>
                        {userType === 2 ? (
                          <Dropdown.Item>
                            <button
                              onClick={() => onSendOffer(e.email, e.user_id)}
                              className="button1 email"
                            >
                              Enviar Oferta
                            </button>
                          </Dropdown.Item>
                        ) : userType === 0 ? (
                          <>
                            <Dropdown.Item>
                              <button
                                onClick={() =>
                                  navigate(`/workerProfile/${e.user_id}`)
                                }
                                className="button2  appliers"
                              >
                                Ver Perfil
                              </button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <button
                                onClick={() => onDelete(e.user_id)}
                                className="button2  delete"
                              >
                                Eliminar
                              </button>
                            </Dropdown.Item>
                          </>
                        ) : null}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col className="col-12">
                    <h3>{e.name}</h3>
                  </Col>
                  <Col sm={12} className="lines">
                    <p>{e.worker_bio}</p>
                  </Col>
                  {userType === 0 && (
                    <>
                      <Col lg={6} className="lines">
                        <h6>Apellidos: </h6>
                        <p>{e.last_name}</p>
                      </Col>
                      <Col lg={6} className="lines">
                        <h6>Dirección: </h6>
                        <p>{e.address}</p>
                      </Col>
                      <Col lg={6} className="lines">
                        <h6>Email: </h6>
                        <p>{e.email}</p>
                      </Col>
                      <Col lg={6} className="lines">
                        <h6>Teléfono: </h6>
                        <p>{e.phone_number}</p>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            );
          })
        ) : (
          <Col sm={12} className="my-5 d-flex justify-content-center">
            <h4>Aún no hay profesionales registrados</h4>
          </Col>
        )}
      </Row>
      <ModalSendAdvisor
        show={showModal}
        setShowModal={setShowModal}
        onHide={() => setShowModal(0)}
      />
    </>
  );
};
