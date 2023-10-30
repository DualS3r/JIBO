import React, { useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

export const CitySelect = ({
  cityList,
  setCityList,
  handlechange,
  provinceId,
}) => {
  useEffect(() => {
    let url;
    if (provinceId > 0) {
      url = `http://localhost:3000/tables/getAllCityByProvince/${provinceId}`;
      axios
        .get(url)
        .then((res) => {
          setCityList(res.data);
        })
        .catch((err) => {});
    } else if (provinceId == 0) {
      setCityList([]);
    } else {
      url = `http://localhost:3000/tables/getAllCity`;
      axios
        .get(url)
        .then((res) => {
          setCityList(res.data);
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
      <option value="">Ciudad</option>

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
