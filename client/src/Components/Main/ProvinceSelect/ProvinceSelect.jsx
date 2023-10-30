import React, { useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

export const ProvinceSelect = ({
  provinceList,
  setProvinceList,
  handlechange,
  inputEdit,
}) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/tables/getAllProvince")
      .then((res) => {
        setProvinceList(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Form.Select
      aria-label="Default select example"
      className="custom-select"
      onChange={handlechange}
      name="province_id"
    >
      <option value={inputEdit ? inputEdit.province_id : ""}>
        {inputEdit?.province ? inputEdit?.province : "Provincia"}
      </option>

      {provinceList?.map((province, index) => {
        return (
          <option key={index} value={`${province.province_id}`}>
            {province.province}
          </option>
        );
      })}
    </Form.Select>
  );
};
