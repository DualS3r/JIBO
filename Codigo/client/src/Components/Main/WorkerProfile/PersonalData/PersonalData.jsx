import React, { useContext, useState } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import { ShowPersonalData } from "./ShowPersonalData";
import { EditPersonalData } from "./EditPersonalData";
import { Col, Form, Row } from "react-bootstrap";
import "./personalData.scss";

export const PersonalData = () => {
  const { workerData, setShowStatus, showStatus, userType } =
    useContext(JiboContext);
  const [editShow, setEditShow] = useState(false);

  const handleCheckboxChange = () => {
    //para qeu no salte el warning
  };

  return (
    <Row className="pb-5 mt-5">
      <Col sm={12} className="d-flex justify-content-end">
        {userType === 1 ? (
          <Form className="me-5 mt-5">
            <Form.Check
              checked={editShow}
              onChange={handleCheckboxChange}
              type="switch"
              id="custom-switch"
              onClick={() => {
                setEditShow(!editShow), setShowStatus(!showStatus);
              }}
              label="Modificar datos"
            />
          </Form>
        ) : null}
      </Col>
      <Col>
        {!editShow && (
          <ShowPersonalData setEditShow={setEditShow} workerData={workerData} />
        )}
        {editShow && <EditPersonalData setEditShow={setEditShow} />}
      </Col>
    </Row>
  );
};
