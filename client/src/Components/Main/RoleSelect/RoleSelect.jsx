import React, { useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

export const RoleSelect = ({
  roleList,
  setRoleList,
  inputEdit,
  handlechange,
}) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/tables/getAllRole")
      .then((res) => {
        setRoleList(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Form.Select
      aria-label="Default select example"
      className="custom-select"
      onChange={handlechange}
      name="role_id"
    >
      <option value={inputEdit && inputEdit.role_id}>
        {inputEdit?.role_name ? inputEdit.role_name : "Especialidad"}
      </option>
      {roleList?.map((role) => {
        return (
          <option key={role.role_id} value={`${role.role_id}`}>
            {role.role_name}
          </option>
        );
      })}
    </Form.Select>
  );
};
