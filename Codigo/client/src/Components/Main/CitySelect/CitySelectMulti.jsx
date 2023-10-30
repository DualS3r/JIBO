import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export const CitySelectMulti = ({
  handleChange,
  selectedProvinces,
  workerData,
}) => {
  const [cityTemp, setCityTemp] = useState([]);
  const options = cityTemp;

  useEffect(() => {
    axios
      .post("http://localhost:3000/tables/getAllCity/select", selectedProvinces)
      .then((res) => {
        let a = res.data;
        const newCityTemp = a.map((e) => ({
          value: `${e.city_id},${e.province_id}`,
          label: `${e.city}`,
        }));
        setCityTemp(newCityTemp);
      })
      .catch((err) => {});
  }, [selectedProvinces]);

  // const handleChange = (selectedRoles) =>{
  //   setSelectedCities(selectedCities)
  // }

  return (
    <>
      <Select
        defaultValue={workerData.movility}
        className="custom-select"
        onChange={(e) => handleChange(e, "cities")}
        options={options}
        isMulti
      />
    </>
  );
};
