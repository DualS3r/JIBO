import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAdminActions } from "../../Hooks/useAdminActions";
import { JiboContext } from "../../Context/JiboContext";
import { getLocalStorage } from "../../Utils/localStorageUtils";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ModalWarning } from "../../Components/Main/Modals/ModalWarning";
import { ModalViewTransaction } from "../../Components/Main/Modals/ModalViewTransaction";
import { Col, Container, Row } from "react-bootstrap";
import "../../Style/general.scss";
import "./profileWorker.scss";

export const CompanyProfile = () => {
  const {
    userType,
    companyData,
    setCompanyData,
    showModal,
    setShowModal,
    activeNavLat,
    setActiveNavLat,
  } = useContext(JiboContext);
  const { img, is_validated, user_id } = companyData;
  const navigate = useNavigate();
  const [showTransactions, setShowTransactions] = useState(false);
  const { company_id } = useParams();
  const { setting, adminActions } = useAdminActions();

  useEffect(() => {
    setActiveNavLat(5);
  }, []);

  useEffect(() => {
    const tokenStorage = getLocalStorage("token");
    const { type } = jwt_decode(tokenStorage);
    if (type === 0) {
      axios
        .get(`http://localhost:3000/company/getOneCompany/${company_id}`)
        .then((res) => {
          setCompanyData(res.data?.result);
        })
        .catch((err) => {});
    }
  }, []);

  useEffect(() => {
    if (userType === 2) {
      if (companyData.complete_profile !== 1) {
        setShowModal(5);
      } else {
        setShowModal(0);
      }
    }
  }, [navigate]);

  const deleteCompany = (id) => {
    adminActions(id, 3);
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
    <Col>
      <Container>
        <Row className="d-flex">
          <Col lg={3} className="mb-0">
            <Row className="gap-3 me-lg-5 text-center">
              <Col sm={12}>
                <img
                  className="profile-img"
                  src={
                    !img
                      ? `/images/profileImg/default.png`
                      : `http://localhost:3000/images/company_profile/${img}`
                  }
                  alt=""
                />
              </Col>
              <Col sm={12}>
                {companyData.is_validated === 1 && (
                  <h3 className="mb-1">CUENTA ACTIVA</h3>
                )}
                {companyData.is_validated === 0 && (
                  <h3 className="mb-1">CUENTA INACTIVA</h3>
                )}
              </Col>
              <Col sm={12}>
                <h5 className="mb-5">
                  Ofertas disponibles: {companyData?.offers_availables}
                </h5>
              </Col>
              <Col
                sm={12}
                className={
                  activeNavLat === 5
                    ? `active_navigateLateral `
                    : `navigateLateral`
                }
              >
                <h5
                  onClick={() => {
                    setActiveNavLat(5), navigate(`/companyProfile/${user_id}`);
                  }}
                >
                  Datos de empresa
                </h5>
              </Col>
              {is_validated === 1 || userType === 0 ? (
                <>
                  {userType === 2 && (
                    <Col
                      sm={12}
                      className={
                        activeNavLat === 6
                          ? `active_navigateLateral `
                          : `navigateLateral`
                      }
                    >
                      <h5
                        onClick={() => {
                          setActiveNavLat(6), navigate("buyVoucher");
                        }}
                      >
                        Comprar ofertas
                      </h5>
                    </Col>
                  )}
                  <Col
                    sm={12}
                    className={
                      activeNavLat === 7
                        ? `active_navigateLateral `
                        : `navigateLateral`
                    }
                  >
                    <h5
                      onClick={() => {
                        setActiveNavLat(7), navigate("activeOffers");
                      }}
                    >
                      Ofertas activas
                    </h5>
                  </Col>
                  <Col
                    sm={12}
                    className={
                      activeNavLat === 8
                        ? `active_navigateLateral `
                        : `navigateLateral`
                    }
                  >
                    <h5
                      onClick={() => {
                        setActiveNavLat(8), navigate("completedOffers");
                      }}
                    >
                      Ofertas completadas
                    </h5>
                  </Col>
                  {userType === 0 && (
                    <>
                      <Col>
                        <button
                          onClick={() => enableCompany(user_id)}
                          className="button2 complete"
                        >
                          Validar
                        </button>
                      </Col>
                      <Col>
                        <button
                          onClick={() => disableCompany(user_id)}
                          className="button2 disable"
                        >
                          Inhabilitar
                        </button>
                      </Col>
                      <Col>
                        <button
                          onClick={() => deleteCompany(user_id)}
                          className="button2 delete"
                        >
                          Eliminar
                        </button>
                      </Col>
                      <Col>
                        <button
                          onClick={() => transactionCompany(user_id)}
                          className="button2 transaction"
                        >
                          Transacciones
                        </button>
                      </Col>
                    </>
                  )}
                </>
              ) : null}
            </Row>
          </Col>
          <Col sm={12} lg={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
      {showModal === 5 && (
        <ModalWarning show={showModal} onHide={() => setShowModal(0)} />
      )}

      {showTransactions && (
        <ModalViewTransaction
          show={showTransactions}
          setShowModal={setShowTransactions}
          transactionData={setting}
        />
      )}
    </Col>
  );
};
