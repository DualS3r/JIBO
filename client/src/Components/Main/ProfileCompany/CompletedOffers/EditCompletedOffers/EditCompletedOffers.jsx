import React, { useState, useContext, useEffect } from "react";
import { JiboContext } from "../../../../../Context/JiboContext";
import { ProvinceSelect } from "../../../ProvinceSelect/ProvinceSelect";
import { CitySelect } from "../../../CitySelect/CitySelect";
import { RoleSelect } from "../../../RoleSelect/RoleSelect";
import { Col, Row } from "react-bootstrap";
import axios from "axios";

const initialValue = {
  title: "",
  province_id: "",
  city_id: "",
  role_id: "",
  salary: "",
  min_experience: "",
  description: "",
};

export const EditCompletedOffers = ({
  offerList,
  setEditShow,
  changes,
  setChanges,
}) => {
  const { companyData, offerId } = useContext(JiboContext);
  const [cityList, setCityList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [changesProvince, setChangeProvince] = useState(false);
  const [editOffer, setEditOffer] = useState(initialValue);

  useEffect(() => {
    setEditOffer(offerList?.filter((e) => e.job_offer_id == offerId)[0]);
    setProvinceId(
      offerList?.filter((e) => e.job_offer_id == offerId)[0].province_id
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditOffer({ ...editOffer, [name]: value });
  };

  const handleRole = (e) => {
    setEditOffer({ ...editOffer, role_id: Number(e.target.value) });
  };

  const handleCity = (e) => {
    const { name, value } = e.target;
    setEditOffer({ ...editOffer, [name]: value });
  };

  const hadlerProvince = (e) => {
    if (e.target.value != "") {
      const { name, value } = e.target;
      setProvinceId(value);
      setChangeProvince(true);
      setEditOffer({ ...editOffer, [name]: value });
    } else {
      setEditOffer({ ...editOffer, city_id: "", province_id: "" });
    }
  };

  const onSubmit = (e) => {
    axios
      .put(
        `http://localhost:3000/offer/editOffer/${companyData.user_id}/${offerId}`,
        editOffer
      )
      .then((res) => {
        setEditShow(false);
        setChanges(!changes);
      })
      .catch((err) => {});
  };

  return (
    <Col className="d-flex justify-content-evenly flex-wrap py-5">
      <Col lg={4} className="styleInfo w-33">
        <Row className="d-flex flex-column">
          <Col className="py-3">
            <p className="fw-bold">Título de la oferta</p>
            <input
              type="text"
              name="title"
              id="title"
              value={editOffer?.title}
              onChange={handleChange}
              placeholder="Título"
            />
          </Col>
          <Col className="py-3">
            <p className="fw-bold">Provincia</p>
            <ProvinceSelect
              provinceList={provinceList}
              setProvinceList={setProvinceList}
              handlechange={hadlerProvince}
              inputEdit={editOffer}
            />
          </Col>
          <Col className="py-3">
            <p className="fw-bold">Ciudad</p>
            <CitySelect
              cityList={cityList}
              setCityList={setCityList}
              handlechange={handleCity}
              provinceId={provinceId}
              inputEdit={editOffer}
              changesProvince={changesProvince}
              setInputEdit={setEditOffer}
            />
          </Col>
        </Row>
      </Col>

      <Col lg={4} className="styleInfo w-33">
        <Row className="d-flex flex-column align-items-center">
          <Col className="py-3">
            <p className="fw-bold">Salario</p>
            <input
              type="text"
              name="salary"
              id="salary"
              value={editOffer?.salary}
              onChange={handleChange}
              placeholder="Salario"
            />
          </Col>
          <Col className="py-3">
            <p className="fw-bold">Experiencia mínima</p>
            <input
              type="text"
              name="min_experience"
              id="min_experience"
              value={editOffer?.min_experience}
              onChange={handleChange}
              placeholder="Experiencia mínima"
            />
          </Col>
        </Row>
      </Col>

      <Col lg={4} className="styleInfo w-33">
        <Row className="d-flex flex-column align-items-center">
          <Col className="py-3">
            <p className="fw-bold">Descripción</p>
            <input
              type="textarea"
              name="description"
              id="description"
              value={editOffer?.description}
              onChange={handleChange}
              placeholder="Descripción"
              rows={3}
            />
          </Col>

          <Col className="py-3">
            <p className="fw-bold">Especialidad</p>
            <RoleSelect
              setRoleList={setRoleList}
              roleList={roleList}
              handlechange={handleRole}
              inputEdit={editOffer}
            />
          </Col>
        </Row>
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
  );
};
