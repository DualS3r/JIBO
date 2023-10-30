import React, { useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

export const RoleSelectFilters = ({
  setRoleList,
  roleList,
  selectFilter,
  setSelectFilter,
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
      value={selectFilter.role}
      onChange={(e) =>
        setSelectFilter({ ...selectFilter, role: e.target.value })
      }
    >
      <option value="">Especialidad</option>
      {roleList?.map((e) => {
        return (
          <option key={e.role_id} value={e.role_id}>
            {e.role_name}
          </option>
        );
      })}
    </Form.Select>
  );
};
