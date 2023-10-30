import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { JiboContext } from "../../Context/JiboContext";
import { ModalWarning } from "../../Components/Main/Modals/ModalWarning";
import { getLocalStorage } from "../../Utils/localStorageUtils";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Col, Container, Form, Row } from "react-bootstrap";
import "../../Style/general.scss";
import "./profileWorker.scss";

export const WorkerProfile = () => {
  const {
    userType,
    workerData,
    setWorkerData,
    showModal,
    setShowModal,
    showStatus,
    activeNavLat,
    setActiveNavLat,
  } = useContext(JiboContext);
  const navigate = useNavigate();
  const { img, user_id } = workerData;
  const { worker_id } = useParams();

  useEffect(() => {
    setActiveNavLat(1);
  }, []);

  useEffect(() => {
    const tokenStorage = getLocalStorage("token");
    const { type } = jwt_decode(tokenStorage);

    if (type === 0) {
      axios
        .get(`http://localhost:3000/worker/oneWorker/${worker_id}`)
        .then((res) => {
          setWorkerData(res?.data);
        })
        .catch((err) => {});
    }
  }, []);

  useEffect(() => {
    if (userType === 1) {
      if (workerData.complete_profile !== 1) {
        setShowModal(5);
      } else {
        setShowModal(0);
      }
    }
  }, [navigate]);

  const handleOption = (e) => {
    const { name, value } = e.target;
    let option = { open_work: value };

    axios
      .put(
        `http://localhost:3000/worker/worker_profile/option/${workerData.user_id}`,
        option
      )
      .then((res) => {
        setWorkerData({
          ...workerData,
          open_work: value,
        });
        console.log(value);
      })
      .catch((err) => {});
  };

  const onDelete = (Id) => {
    axios
      .put(`http://localhost:3000/worker/deleteWorker/${Id}`)
      .then((res) => {
        navigate("/search/allWorkers");
      })
      .catch((err) => {});
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
                    !workerData.img
                      ? `/images/profileImg/default.png`
                      : `http://localhost:3000/images/worker_profile/${img}`
                  }
                  alt=""
                />
              </Col>

              <Col sm={12}>
                {!showStatus ? (
                  <h3 className="mb-5">
                    {workerData.open_work === 1 || workerData.open_work === "1"
                      ? "DISPONIBLE"
                      : "NO DISPONIBLE"}
                  </h3>
                ) : (
                  <Form.Select
                    onChange={handleOption}
                    aria-label="Default select example"
                    name="open_work"
                  >
                    <option value={workerData.open_work}>
                      {workerData.open_work === 1 ||
                      workerData.open_work === "1"
                        ? "DISPONIBLE"
                        : "NO DISPONIBLE"}
                    </option>
                    <option value="1">DISPONIBLE</option>
                    <option value="0">NO DISPONIBLE</option>
                  </Form.Select>
                )}
              </Col>
              <Col
                sm={12}
                className={
                  activeNavLat === 1
                    ? `active_navigateLateral `
                    : `navigateLateral`
                }
              >
                <h5
                  onClick={() => {
                    setActiveNavLat(1), navigate(`/workerProfile/${user_id}`);
                  }}
                >
                  Datos personales
                </h5>
              </Col>
              <Col
                sm={12}
                className={
                  activeNavLat === 2
                    ? `active_navigateLateral `
                    : `navigateLateral`
                }
              >
                <h5
                  onClick={() => {
                    setActiveNavLat(2), navigate("otherData");
                  }}
                >
                  Otros datos
                </h5>
              </Col>
              <Col
                sm={12}
                className={
                  activeNavLat === 3
                    ? `active_navigateLateral `
                    : `navigateLateral`
                }
              >
                <h5
                  onClick={() => {
                    setActiveNavLat(3), navigate("curriculum");
                  }}
                >
                  Curriculum
                </h5>
              </Col>
              <Col
                sm={12}
                className={
                  activeNavLat === 4
                    ? `active_navigateLateral `
                    : `navigateLateral`
                }
              >
                <h5
                  onClick={() => {
                    setActiveNavLat(4), navigate("jobPreferences");
                  }}
                >
                  Preferencias laborales
                </h5>
              </Col>
              {userType === 0 && (
                <Col>
                  <button
                    onClick={() => onDelete(user_id)}
                    className="button2  delete"
                  >
                    Eliminar
                  </button>
                </Col>
              )}
            </Row>
          </Col>
          <Col lg={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
      {workerData.complete_profile === 0 && (
        <ModalWarning show={showModal} onHide={() => setShowModal(0)} />
      )}
    </Col>
  );
};
