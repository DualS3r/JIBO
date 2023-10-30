import { Col, Row } from "react-bootstrap";
import "./CompanyData.scss";

export const ShowCompanyData = ({ companyData }) => {
  const { sectors } = companyData;

  return (
    <Col className="d-flex justify-content-evenly flex-wrap py-5">
      <Col lg={4} className="styleInfo w-33">
        <Row className="d-flex flex-wrap column">
          <Col sm={12}>
            <h5 className="py-4">Datos empresa</h5>
          </Col>
          <Col sm={12} md={6} lg={12}>
            <p className="fw-bold">Nombre</p>
            <p>{companyData?.name}</p>
          </Col>
          <Col sm={12} md={6} lg={12}>
            <p className="fw-bold">CIF</p>
            <p>{companyData?.dni_cif}</p>
          </Col>
          <Col sm={12} md={6} lg={12}>
            <p className="fw-bold">Dirección fiscal</p>
            <p>{companyData?.address}</p>
          </Col>
          <Col sm={12} md={6} lg={12}>
            <p className="fw-bold">Código Postal</p>
            <p>{companyData?.zip_code}</p>
          </Col>
          <Col sm={12} md={6} lg={12}>
            <p className="fw-bold">Provincia</p>
            <p>{companyData?.province}</p>
          </Col>
          <Col sm={12} md={6} lg={12}>
            <p className="fw-bold">Ciudad</p>
            <p>{companyData?.city}</p>
          </Col>
        </Row>
      </Col>

      <Col lg={4} className="styleInfo w-33">
        <Row className="d-flex">
          <Col sm={12} md={6} lg={12}>
            <Row>
              <Col sm={12}>
                <h5 className="py-4">Datos de contacto</h5>
              </Col>
              <Col sm={12}>
                <p className="fw-bold">Contacto</p>
                <p>{companyData?.contact_name}</p>
              </Col>
              <Col sm={12}>
                <p className="fw-bold">Correo electrónico</p>
                <p>{companyData?.email}</p>
              </Col>
              <Col sm={12}>
                <p className="fw-bold">Teléfono</p>
                <p>{companyData?.phone_number}</p>
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={6} lg={12}>
            <Row>
              <Col sm={12}>
                <h5 className="py-4">Archivos</h5>
              </Col>
              <Col sm={12}>
                <p className="fw-bold">Documento SEPA</p>
                <p>
                  {companyData?.sepa_file
                    ? "Documento sepa cumplimentado"
                    : "Falta documento sepa"}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col lg={4} className="styleInfo w-33">
        <Row className="d-flex flex-column">
          <Col sm={12}>
            <h5 className="py-4">Otros datos</h5>
          </Col>
          <Col sm={12}>
            <p className="fw-bold">Sector</p>
            {sectors?.map((sector) => {
              return <p key={sector.value}>{sector.label}</p>;
            })}
          </Col>
          <Col sm={12}>
            <p className="fw-bold">Número de empleados</p>
            <p>{companyData?.company_size}</p>
          </Col>
          <Col sm={12} className="p-1">
            <p className="fw-bold">Cultura y valores de la empresa</p>
            <p className="p-width">{companyData?.company_info}</p>
          </Col>
        </Row>
      </Col>
    </Col>
  );
};
