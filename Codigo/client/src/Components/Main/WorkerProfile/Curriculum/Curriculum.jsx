import React, { useContext, useState } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import { ShowCurriculum } from "./ShowCurriculum";
import { EditCurriculum } from "./EditCurriculum";
import { Row, Col, Form } from "react-bootstrap";
import "./curriculum.scss";

export const Curriculum = () => {
  const { userType } = useContext(JiboContext);
  const [editShow, setEditShow] = useState(false)

  return (
    <Row className="pb-5 mt-5">
      <Col sm={12} className="d-flex justify-content-end">
        {userType === 1 ?
        <Form className="me-5 mt-5 mb-3">
          <Form.Check
            checked = {editShow }
            onChange={handleCheckboxChange}
            type="switch"
            id="custom-switch"
            onClick={() => setEditShow(!editShow)}
            label="Modificar datos"
          />
        </Form>
        : null}
      </Col>
      {!editShow && <ShowCurriculum/>}
      {editShow && <EditCurriculum
      setEditShow={setEditShow}
      editShow={ editShow}
      />}
    </Row>
  );
};
