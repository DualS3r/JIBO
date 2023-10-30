import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { JiboContext } from "../../../../Context/JiboContext";

export const ApplierPersonalData = () => {
  const { applierData } = useContext(JiboContext);

  return (
    <Row className="py-5 px-3 mb-5">
      <Col sm={12} className="mb-3 d-flex flex-column styleInfo">
        <Row>
          <Col sm={12}>
            <h5 className="py-4 ">Sobre mí</h5>
            <p>{applierData?.worker_bio}</p>
          </Col>
        </Row>
      </Col>

      <Col>
        <Row className="mb-3 d-flex justify-content-between">
          <Col
            lg={6}
            className=" mb-3 mb-lg-0 d-flex flex-column styleInfo styleWidthPersonal"
          >
            <Row>
              <Col className="d-flex " sm={12}>
                <h5 className="py-4">Datos personales</h5>
              </Col>
              <Col sm={4}>
                <p className="fw-bold">Nombre</p>
                <p>{applierData?.name}</p>
              </Col>
              <Col sm={4}>
                <p className="fw-bold">Apellidos</p>
                <p>{applierData?.last_name}</p>
              </Col>
              <Col sm={4}>
                <p className="fw-bold">DNI/NIE</p>
                <p>{applierData?.dni_cif}</p>
              </Col>
            </Row>
          </Col>
          <Col
            lg={5}
            className="d-flex flex-column styleInfo styleWidthPersonal"
          >
            <Row>
              <Col sm={12}>
                <h5 className="py-4 ">Datos de contacto</h5>
              </Col>
              <Col sm={6}>
                <p className="fw-bold">Correo electrónico</p>
                <p>{applierData?.email}</p>
              </Col>
              <Col sm={6}>
                <p className="fw-bold">Teléfono</p>
                <p>{applierData?.phone_number}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col sm={12} className="d-flex flex-column styleInfo">
        <Row>
          <Col sm={12}>
            <h5 className="py-4 ">Dirección</h5>
          </Col>
          <Col sm={6}>
            <p className="fw-bold">Dirección</p>
            <p>{applierData?.address}</p>
          </Col>
          <Col sm={6}>
            <p className="fw-bold">Código Postal</p>
            <p>{applierData?.zip_code}</p>
          </Col>
          <Col sm={6}>
            <p className="fw-bold">Provincia</p>
            <p>{applierData?.province}</p>
          </Col>
          <Col sm={6}>
            <p className="fw-bold">Ciudad</p>
            <p>{applierData?.city}</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
