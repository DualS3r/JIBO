import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export const ProvinceSelectMulti = ({ selectedProvinces, handleChange }) => {
  const [provinceTemp, setProvinceTemp] = useState([]);
  const options = provinceTemp;

  useEffect(() => {
    axios
      .get("http://localhost:3000/tables/getAllprovince")
      .then((res) => {
        let a = res.data;

        const newProvinceTemp = a.map((e) => ({
          value: `${e.province_id}`,
          label: `${e.province}`,
        }));
        setProvinceTemp(newProvinceTemp);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Select
        defaultValue={selectedProvinces}
        className="custom-select"
        onChange={(e) => handleChange(e, "provinces")}
        options={options}
        isMulti
      />
    </>
  );
};
