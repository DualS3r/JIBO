import React, { useContext, useState } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import { ShowOtherData } from "./ShowOtherData";
import { EditOtherData } from "./EditOtherData";
import { Col, Form, Row } from "react-bootstrap";
import "./otherData.scss";

export const OtherData = () => {
  const { workerData, userType } = useContext(JiboContext);
  const [editShow, setEditShow] = useState(false);

  const handleCheckboxChange = () => {
    //para que no salte el warning
  };

  return (
    <Row className="pb-5 mt-5">
      <Col sm={12} className="d-flex justify-content-end">
        {userType === 1 ? (
          <Form className="me-5 mt-5 mb-3">
            <Form.Check
              checked={editShow}
              onChange={handleCheckboxChange}
              type="switch"
              id="custom-switch"
              onClick={() => setEditShow(!editShow)}
              label="Modificar datos"
            />
          </Form>
        ) : null}
      </Col>
      {!editShow && <ShowOtherData workerData={workerData} />}
      {editShow && (
        <EditOtherData setEditShow={setEditShow} workerData={workerData} />
      )}
    </Row>
  );
};
