import React, { useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

export const SectorSelect = ({ sectorList, setSectorList, handlechange }) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/tables/getAllSector")
      .then((res) => {
        setSectorList(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Form.Select
      aria-label="Default select example"
      className="custom-select"
      onChange={handlechange}
      name="sectors"
    >
      <option value="">Sector</option>
      {sectorList?.map((sector, index) => {
        return (
          <option key={index} value={`${sector.sector_id}`}>
            {sector.sector_name}
          </option>
        );
      })}
    </Form.Select>
  );
};
