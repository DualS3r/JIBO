import React from "react";
import Form from "react-bootstrap/Form";

export const ValidateSelect = ({ hadlerChange }) => {
  return (
    <Form.Select
      aria-label="Default select example"
      className="custom-select"
      onChange={hadlerChange}
      name="is_validated"
    >
      <option value="">Escoge una opción</option>
      <option value="1">Validado</option>
      <option value="0">No validado</option>
    </Form.Select>
  );
};
