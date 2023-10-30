import React, { useState, useContext } from "react";
import { JiboContext } from "../../../../../Context/JiboContext";
import { ProvinceSelect } from "../../../ProvinceSelect/ProvinceSelect";
import { CitySelect } from "../../../CitySelect/CitySelect";
import { RoleSelect } from "../../../RoleSelect/RoleSelect";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

const initialValue = {
  title: "",
  province_id: null,
  city_id: null,
  role_id: null,
  salary: null,
  min_experience: "",
  description: "",
};

export const AddOffer = ({
  setEditShow,
  setChanges,
  changes,
}) => {
  const { companyData, setCompanyData } = useContext(JiboContext);
  const [cityList, setCityList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [inputOffer, setInputOffer] = useState(initialValue);
  const [provinceId, setProvinceId] = useState(0);
  const [error, setError] = useState("");
  const [changesProvince, setChangeProvince] = useState(false);
  const totalOffers = companyData.offers_availables - 1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputOffer({ ...inputOffer, [name]: value });
  };

  const handleCity = (e) => {
    const { name, value } = e.target;
    setInputOffer({ ...inputOffer, [name]: value });
  };

  const hadlerProvince = (e) => {
    if (e.target.value != "") {
      const { name, value } = e.target;
      setProvinceId(value);
      setChangeProvince(true);
      setInputOffer({ ...inputOffer, [name]: value });
    } else {
      setInputOffer({ ...inputOffer, city_id: "", province_id: "" });
    }
  };

  const handleRole = (e) => {
    setInputOffer({ ...inputOffer, role_id: Number(e.target.value) });
  };

  const onSubmit = (e) => {
    axios
      .post(
        `http://localhost:3000/offer/createOffer/${companyData.user_id}`,
        inputOffer
      )
      .then((res) => {
        substractAvailableOffers();
        setEditShow(false);
        setChanges(!changes);
      })
      .catch((err) => setError(err.response.data));
  };

  const substractAvailableOffers = () => {
    axios
      .put(
        `http://localhost:3000/company/substractOffer/${companyData.user_id}`,
        companyData
      )
      .then((res) => {
        setCompanyData({
          ...companyData,
          offers_availables: totalOffers,
        });
      })
      .catch((err) => {});
  };

  return (
    <Row className="d-flex justify-content-evenly flex-wrap py-5">
      <Col lg={4} className="styleInfo w-33">
        <Row className="d-flex align-items-center flex-column">
          <Col className="py-3">
            <p className="fw-bold required">Título de la oferta*</p>
            <input
              type="text"
              name="title"
              id="title"
              value={inputOffer.title}
              onChange={handleChange}
              placeholder="Título"
            />
          </Col>
          <Col className="py-3">
            <p className="fw-bold required">Provincia*</p>
            <ProvinceSelect
              provinceList={provinceList}
              setProvinceList={setProvinceList}
              handlechange={hadlerProvince}
              inputEdit={inputOffer}
            />
          </Col>
          <Col className="py-3">
            <p className="fw-bold required">Ciudad*</p>
            <CitySelect
              cityList={cityList}
              setCityList={setCityList}
              handlechange={handleCity}
              provinceId={provinceId}
              inputEdit={inputOffer}
              changesProvince={changesProvince}
              setInputEdit={setInputOffer}
            />
          </Col>
        </Row>
      </Col>

      <Col lg={4} className="styleInfo w-33">
        <Row className="d-flex flex-column align-items-center">
          <Col className="py-3">
            <p className="fw-bold required">Salario*</p>
            <input
              type="number"
              name="salary"
              id="salary"
              value={inputOffer.salary}
              onChange={handleChange}
              placeholder="Salario"
            />
          </Col>
          <Col className="py-3">
            <p className="fw-bold required">Experiencia mínima(años)*</p>
            <input
              type="number"
              name="min_experience"
              id="min_experience"
              value={inputOffer.min_experience}
              onChange={handleChange}
              placeholder="Experiencia mínima"
            />
          </Col>
        </Row>
      </Col>

      <Col lg={4} className="styleInfo w-33">
        <Row className="d-flex flex-column align-items-center">
          <Col className="py-3">
            <p className="fw-bold required">Descripción*</p>
            <input
              type="textarea"
              name="description"
              id="description"
              value={inputOffer.description}
              onChange={handleChange}
              placeholder="Descripción"
              rows={3}
            />
          </Col>

          <Col className="py-3">
            <p className="fw-bold required">Especialidad*</p>
            <RoleSelect
              setRoleList={setRoleList}
              roleList={roleList}
              handlechange={handleRole}
            />
          </Col>
        </Row>
      </Col>
      <Col className="d-flex flex-column justify-content-center align-items-center my-3">
        <Col>
          {error && <p className="mt-3 text-danger fw-bold">{error}</p>}
        </Col>
        <Col className="d-flex justify-content-center my-3">
          <button className="buttom2 mx-1" onClick={onSubmit}>
            Guardar
          </button>
          <button className="buttom2 mx-1" onClick={() => setEditShow(false)}>
            Cancelar
          </button>
        </Col>
      </Col>
    </Row>
  );
};
