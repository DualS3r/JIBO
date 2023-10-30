import React, { useContext, useEffect, useState } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import { ShowCompanyData } from "./ShowCompanyData";
import { EditCompanyData } from "./EditCompanyData";
import { Col, Form, Row } from "react-bootstrap";
import "./CompanyData.scss";

export const CompanyData = () => {
  const { companyData, userType } = useContext(JiboContext);
  const [editShow, setEditShow] = useState(false);

  return (
    <Row className="pb-5">
      <Col sm={12} className="d-flex justify-content-end">
        {userType === 2 && (
          <Form className="me-5 mt-5">
            <Form.Check
              checked={editShow ? true : false}
              type="switch"
              id="custom-switch"
              onClick={() => setEditShow(!editShow)}
              label="Modificar datos"
              readOnly
            />
          </Form>
        )}
      </Col>
      {!editShow && <ShowCompanyData companyData={companyData} />}
      {editShow && (
        <EditCompanyData setEditShow={setEditShow} companyData={companyData} />
      )}
    </Row>
  );
};
