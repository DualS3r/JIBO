import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export const SectorSelectMulti = ({ selectedOption, setSelectedOption }) => {
  const [sectorTemp, setSectorTemp] = useState([]);
  const options = sectorTemp;

  useEffect(() => {
    axios
      .get("http://localhost:3000/tables/getAllSector")
      .then((res) => {
        let a = res.data;

        const newSectorTemp = a.map((e) => ({
          value: `${e.sector_id}`,
          label: `${e.sector_name}`,
        }));
        setSectorTemp(newSectorTemp);
      })
      .catch((err) => {});
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <>
      <Select
        value={selectedOption}
        className="custom-select"
        onChange={handleChange}
        options={options}
        isMulti
      />
    </>
  );
};
