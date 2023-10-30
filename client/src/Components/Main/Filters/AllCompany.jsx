import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminActions } from "../../../Hooks/useAdminActions";
import axios from "axios";
import { Col, Dropdown, Row } from "react-bootstrap";
import { ModalViewTransaction } from "../Modals/ModalViewTransaction";
import "./allCompany.scss";

export const AllCompany = ({ setFilter, filterList, setFilterList }) => {
  const navigate = useNavigate();
  const [showTransactions, setShowTransactions] = useState(false);
  const { setting, adminActions } = useAdminActions();

  useEffect(() => {
    if (filterList.length === 0 || filterList.type != 2) {
      axios
        .get("http://localhost:3000/company/allCompany")
        .then((res) => {
          setFilterList(res.data);
          setFilter(2);
        })
        .catch((err) => {});
    }
  }, []);

  const deleteCompany = (id) => {
    adminActions(id, 3);
    setFilterList(filterList.filter((e) => e.user_id !== id));
  };

  const enableCompany = (id) => {
    adminActions(id, 2);
  };

  const disableCompany = (id) => {
    adminActions(id, 4);
  };

  const transactionCompany = (id) => {
    adminActions(id, 1);
    setShowTransactions(true);
  };

  return (
    <Row>
      {filterList?.length > 0 ? (
        filterList.map((e, i) => {
          return (
            <Col key={i} className="cardsCont3 col-12">
              <Row className="cardAllCompany">
                <Col sm={12} className="d-flex justify-content-end">
                  <Dropdown className="dropButton">
                    <Dropdown.Toggle
                      className="border border-0 db2"
                      id="dropdown-basic"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <button
                          onClick={() =>
                            navigate(`/companyProfile/${e.user_id}`)
                          }
                          className="button2 profile"
                        >
                          Ver Perfil
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button
                          onClick={() => enableCompany(e.user_id)}
                          className="button2 complete"
                        >
                          Validar
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button
                          onClick={() => disableCompany(e.user_id)}
                          className="button2 disable"
                        >
                          Inhabilitar
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button
                          className="button2 delete"
                          onClick={() => deleteCompany(e.user_id)}
                        >
                          Eliminar
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button
                          onClick={() => transactionCompany(e.user_id)}
                          className="button2 transaction"
                        >
                          Transacciones
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col className="col-12">
                  <h3>{e.name}</h3>
                </Col>
                <Col sm={12} className="lines">
                  <Row>
                    <Col lg={6} className="lines">
                      <h6>CIF:</h6>
                      <p>{e.dni_cif}</p>
                    </Col>
                    <Col lg={6} className="lines">
                      <h6>Dirección fiscal:</h6>
                      <p>{e.address}</p>
                    </Col>
                    <Col lg={6} className="lines">
                      <h6>Teléfono:</h6>
                      <p>{e.phone_number}</p>
                    </Col>
                    <Col lg={6} className="lines">
                      <h6>Persona de contacto:</h6>
                      <p>{e.contact_name}</p>
                    </Col>
                    <Col lg={6} className="lines">
                      <h6>Correo electrónico:</h6>
                      <p>{e.email}</p>
                    </Col>
                    <Col lg={6} className="lines">
                      <h6>Ofertas disponibles:</h6>
                      <p>{e.offers_availables}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          );
        })
      ) : (
        <Col sm={12} className="my-5 d-flex justify-content-center">
          <h4>Aún no hay empresas registradas</h4>
        </Col>
      )}
      {showTransactions && (
        <ModalViewTransaction
          show={showTransactions}
          setShowModal={setShowTransactions}
          transactionData={setting}
        />
      )}
    </Row>
  );
};
