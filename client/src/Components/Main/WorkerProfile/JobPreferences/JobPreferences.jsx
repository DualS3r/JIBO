import React, { useContext, useState } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import { ShowJobPreferences } from "./ShowJobPreferences";
import { EditJobPreferences } from "./EditJobPreferences";
import { Col, Form, Row } from "react-bootstrap";
import "./jobPreferences.scss";

export const JobPreferences = () => {
  const { workerData, userType } = useContext(JiboContext);
  const [editShow, setEditShow] = useState(false);

  return (
    <Row className="pb-5 mt-5">
      <Col sm={12} className="d-flex justify-content-end">
        {userType === 1 ? (
          <Form className="me-5 mt-5 mb-3">
            <Form.Check
              checked={editShow}
              type="switch"
              id="custom-switch"
              onClick={() => setEditShow(!editShow)}
              label="Modificar datos"
              readOnly
            />
          </Form>
        ) : null}
      </Col>
      {!editShow && <ShowJobPreferences workerData={workerData} />}
      {editShow && (
        <EditJobPreferences setEditShow={setEditShow} workerData={workerData} />
      )}
    </Row>
  );
};
