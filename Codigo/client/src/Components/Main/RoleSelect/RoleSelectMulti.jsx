import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export const RoleSelectMulti = ({ selectedRoles, handleChange }) => {
  const [roleTemp, setRoleTemp] = useState([]);
  const options = roleTemp;

  useEffect(() => {
    axios
      .get("http://localhost:3000/tables/getAllRole")
      .then((res) => {
        let a = res.data;

        const newRoleTemp = a.map((e) => ({
          value: `${e.role_id}`,
          label: `${e.role_name}`,
        }));
        setRoleTemp(newRoleTemp);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Select
        defaultValue={selectedRoles}
        className="custom-select"
        onChange={(e) => handleChange(e, "roles")}
        options={options}
        isMulti
      />
    </>
  );
};
