import React, { useContext, useEffect, useState } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import { ProvinceSelect } from "../../ProvinceSelect/ProvinceSelect";
import { CitySelect } from "../../CitySelect/CitySelect";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import "./personalData.scss";

const initialValue = {
  name: "",
  last_name: "",
  dni_cif: "",
  email: "",
  phone_number: "",
  address: "",
  province_id: "",
  province: "",
  city: "",
  city_id: "",
  zip_code: "",
  worker_bio: "",
  movility: [],
  spected_roles: [],
};

export const EditPersonalData = ({ setEditShow }) => {
  const { workerData, setWorkerData, setShowStatus, showStatus } =
    useContext(JiboContext);
  const [editImput, setEditImput] = useState(initialValue);
  const [cityList, setCityList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [file, setFile] = useState();
  const [changesProvince, setChangeProvince] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (workerData) {
      setProvinceId(workerData.province_id);
      setEditImput({
        ...editImput,
        name: workerData.name ? workerData.name : "",
        last_name: workerData.last_name ? workerData.last_name : "",
        dni_cif: workerData.dni_cif ? workerData.dni_cif : "",
        email: workerData.email ? workerData.email : "",
        phone_number: workerData.phone_number ? workerData.phone_number : "",
        address: workerData.address ? workerData.address : "",
        province_id: workerData.province_id ? workerData.province_id : null,
        province: workerData.province ? workerData.province : "",
        city: workerData.city ? workerData.city : "",
        city_id: workerData.city_id ? workerData.city_id : null,
        zip_code: workerData.zip_code ? workerData.zip_code : "",
        worker_bio: workerData.worker_bio ? workerData.worker_bio : "",
        movility: workerData.movility ? workerData.movility : [],
        spected_roles: workerData.spected_roles ? workerData.spected_roles : [],
      });
    }
  }, [workerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setEditImput({ ...editImput, [name]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCity = (e) => {
    const { name, value } = e.target;
    setError("");
    setEditImput({ ...editImput, [name]: value });
  };

  const handleProvince = (e) => {
    if (e.target.value != "") {
      const { name, value } = e.target;
      setProvinceId(value);
      setChangeProvince(true);
      setError("");
      setEditImput({ ...editImput, [name]: value });
    } else {
      setEditImput({ ...editImput, city_id: "", province_id: "" });
    }
  };

  const onSubmit = (e) => {
    setChangeProvince(false);
    const newFormData = new FormData();

    let provinceName = provinceList.filter(
      (e) => e.province_id === Number(editImput.province_id)
    )[0]?.province;
    let cityName = cityList.filter(
      (e) => e.city_id === Number(editImput.city_id)
    )[0]?.city;

    newFormData.append("register", JSON.stringify(editImput));
    newFormData.append("file", file);

    axios
      .put(
        `http://localhost:3000/worker/editWorker/${workerData.user_id}`,
        newFormData
      )
      .then((res) => {
        let img = workerData.img;
        if (res.data.img) {
          img = res.data.img;
        }
        let is_complete = res.data.complete;
        setWorkerData({
          ...workerData,
          name: editImput?.name,
          last_name: editImput?.last_name,
          dni_cif: editImput?.dni_cif,
          email: editImput?.email,
          phone_number: editImput?.phone_number,
          address: editImput?.address,
          province: provinceName,
          province_id: editImput?.province_id,
          city: cityName,
          city_id: editImput?.city_id,
          zip_code: editImput?.zip_code,
          worker_bio: editImput?.worker_bio,
          img: img,
          complete_profile: is_complete,
        });
        setEditShow(false);
        setShowStatus(!showStatus);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <Row className="py-5 ">
      <Col sm={12} className="mb-3 d-flex flex-column styleInfo">
        <h5 className="py-3 ">Sobre mí</h5>
        <textarea
          className="hTextArea mb-3"
          type="text"
          id="worker_bio"
          name="worker_bio"
          onChange={handleChange}
          value={editImput?.worker_bio}
        />
      </Col>

      <Col>
        <Row className="mb-3 d-flex justify-content-between">
          <Col
            lg={6}
            className=" mb-3 mb-lg-0 d-flex flex-column styleInfo styleWidthPersonal"
          >
            <Row>
              <Col className="d-flex " sm={12}>
                <h5 className="py-3">Datos personales</h5>
              </Col>
              <Col sm={6}>
                <p className="fw-bold required">Nombre*</p>
                <input
                  className="wInput100"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={editImput?.name}
                />
              </Col>
              <Col sm={6}>
                <p className="fw-bold required">Apellidos*</p>
                <input
                  className="wInput100"
                  type="text"
                  id="last_name"
                  name="last_name"
                  onChange={handleChange}
                  value={editImput?.last_name}
                />
              </Col>
              <Col sm={12}>
                <p className="fw-bold required">DNI/NIE*</p>
                <input
                  className="wInput100"
                  type="text"
                  id="dni_cif"
                  name="dni_cif"
                  onChange={handleChange}
                  value={editImput.dni_cif}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={5} className="d-flex flex-column styleInfo">
            <Row>
              <Col sm={12}>
                <h5 className="py-3">Datos de contacto</h5>
              </Col>
              <Col sm={12}>
                <p className="fw-bold required">Correo electrónico*</p>
                <input
                  className="wInput100"
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={editImput?.email}
                />
              </Col>
              <Col sm={12}>
                <p className="fw-bold required">Teléfono*</p>
                <input
                  className="wInput100"
                  type="number"
                  id="phone_number"
                  name="phone_number"
                  onChange={handleChange}
                  value={editImput?.phone_number}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col sm={12} className="mb-3 d-flex flex-column styleInfo">
        <Row>
          <Col sm={12}>
            <h5 className="py-4 ">Dirección</h5>
          </Col>
          <Col sm={6}>
            <p className="fw-bold required">Dirección*</p>
            <input
              className="wInput100"
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              value={editImput?.address}
            />
          </Col>
          <Col sm={6}>
            <p className="fw-bold required">Código Postal*</p>
            <input
              className="wInput100"
              type="number"
              id="zip_code"
              name="zip_code"
              onChange={handleChange}
              value={editImput?.zip_code}
            />
          </Col>
          <Col sm={6} className="mb-3">
            <p className="fw-bold required">Provincia*</p>
            <ProvinceSelect
              provinceList={provinceList}
              setProvinceList={setProvinceList}
              handlechange={handleProvince}
              inputEdit={editImput}
            />
          </Col>
          <Col sm={6} className="mb-3">
            <p className="fw-bold required">Ciudad*</p>
            <CitySelect
              cityList={cityList}
              setCityList={setCityList}
              handlechange={handleCity}
              inputEdit={editImput}
              provinceId={provinceId}
              changesProvince={changesProvince}
              setInputEdit={setEditImput}
            />
          </Col>
        </Row>
      </Col>

      <Col
        sm={12}
        className="mb-3 d-flex flex-column align-items-center styleInfo"
      >
        <p className="fw-bold">Foto de Perfil</p>
        <input
          className="mb-0"
          type="file"
          id="img"
          name="img"
          onChange={handleFile}
        />
      </Col>
      <Col className="d-flex flex-column align-items-center justify-content-center">
        {error != "" && <p className="fw-bold text-danger">{error}</p>}
        <button className="buttom2" onClick={onSubmit}>
          Guardar
        </button>
      </Col>
    </Row>
  );
};
