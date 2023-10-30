import React, { useEffect, useRef } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

export const CitySelect = ({
  cityList,
  setCityList,
  handlechange,
  provinceId,
  inputEdit,
  changesProvince,
  setInputEdit,
}) => {
  const selectRef = useRef();

  useEffect(() => {
    let url;
    if (provinceId > 0 || inputEdit.province_id > 0) {
      url = `http://localhost:3000/tables/getAllCityByProvince/${
        provinceId || inputEdit.province_id
      }`;
      axios
        .get(url)
        .then((res) => {
          setCityList(res.data);
          if (changesProvince) {
            setInputEdit({
              ...inputEdit,
              city_id: res.data[0].city_id,
              city: res.data[0].city,
            });
          }
        })
        .catch((err) => {});
    } else if (provinceId === null || provinceId === 0) {
      setCityList([]);
    } else {
      url = `http://localhost:3000/tables/getAllCity`;
      axios
        .get(url)
        .then((res) => {
          setCityList(res.data);
          setInputEdit({
            ...inputEdit,
            city_id: res.data[0].city_id,
            city: res.data[0].city,
          });
        })
        .catch((err) => {});
    }
  }, [provinceId]);

  return (
    <Form.Select
      aria-label="Default select example"
      className="custom-select"
      onChange={handlechange}
      name="city_id"
    >
      <option value={inputEdit ? inputEdit.city_id : ""}>
        {inputEdit.city ? inputEdit.city : "Ciudad"}
      </option>

      {cityList?.map((city, index) => {
        return (
          <option key={index} value={`${city.city_id}`}>
            {city.city}
          </option>
        );
      })}
    </Form.Select>
  );
};
