import React, { useContext, useState, useEffect } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import { CitySelect } from "../../CitySelect/CitySelect";
import { ProvinceSelect } from "../../ProvinceSelect/ProvinceSelect";
import { SectorSelectMulti } from "../../SectorSelect/SectorSelectMulti";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import "./CompanyData.scss";

const initialValue = {
  name: "",
  phone_number: "",
  dni_cif: "",
  email: "",
  address: "",
  province_id: "",
  city_id: "",
  province: "",
  city: "",
  zip_code: "",
  contact_name: "",
  sectors: [],
  company_size: "",
  company_info: "",
  sepa_file: "",
};

export const EditCompanyData = ({ setEditShow }) => {
  const { companyData, setCompanyData } = useContext(JiboContext);
  const [inputEdit, setInputEdit] = useState(initialValue);
  const [docs, setDocs] = useState();
  const [image, setImage] = useState();
  const [cityList, setCityList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [changesProvince, setChangeProvince] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (companyData) {
      setProvinceId(companyData.province_id);
      setInputEdit({
        ...inputEdit,
        name: companyData.name ? companyData.name : "",
        phone_number: companyData.phone_number ? companyData.phone_number : "",
        dni_cif: companyData.dni_cif ? companyData.dni_cif : "",
        email: companyData.email ? companyData.email : "",
        address: companyData.address ? companyData.address : "",
        province_id: companyData.province_id ? companyData.province_id : null,
        city_id: companyData.city_id ? companyData.city_id : null,
        province: companyData.province ? companyData.province : "",
        city: companyData.city ? companyData.city : "",
        zip_code: companyData.zip_code ? companyData.zip_code : "",
        contact_name: companyData.contact_name ? companyData.contact_name : "",
        sectors: companyData.sectors ? companyData.sectors : [],
        company_size: companyData.company_size
          ? companyData.company_size
          : null,
        company_info: companyData.company_info ? companyData.company_info : "",
        sepa_file: companyData.sepa_file ? companyData.sepa_file : "",
      });
      setSelectedOption(companyData.sectors);
    }
  }, [companyData]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputEdit({ ...inputEdit, [name]: value });
    setError("");
  };

  const handleCity = (e) => {
    const { name, value } = e.target;
    setInputEdit({ ...inputEdit, [name]: Number(value) });
    setError("");
  };

  const hadlerProvince = (e) => {
    if (e.target.value != "") {
      const { name, value } = e.target;
      setProvinceId(value);
      setChangeProvince(true);
      setInputEdit({ ...inputEdit, [name]: Number(value) });
      setError("");
    } else {
      setInputEdit({ ...inputEdit, city_id: "", province_id: "" });
      setError("");
    }
  };

  const handleFiles = (e) => {
    if (e.target.name === "img") {
      setImage(e.target.files[0]);
      setError("");
    } else if (e.target.name === "sepa") {
      setDocs(e.target.files[0]);
      setError("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setChangeProvince(false);

    const newFormData = new FormData();

    let provinceName = provinceList.filter(
      (e) => e.province_id === Number(inputEdit.province_id)
    )[0]?.province;
    let cityName = cityList.filter(
      (e) => e.city_id === Number(inputEdit.city_id)
    )[0]?.city;

    let sectorIds = selectedOption.map((e) => Number(e.value));
    let data = { ...inputEdit, sectors: sectorIds };

    newFormData.append("sepa", docs);
    newFormData.append("img", image);
    newFormData.append("register", JSON.stringify(data));

    axios
      .put(
        `http://localhost:3000/company/editCompany/${companyData.user_id}`,
        newFormData
      )
      .then((res) => {
        let img = companyData.img;
        if (res.data.img) {
          img = res.data.img;
        }
        let sepa = companyData.sepa_file;
        if (res.data.sepa) {
          sepa = res.data.sepa;
        }
        setCompanyData({
          ...companyData,
          name: inputEdit.name,
          phone_number: inputEdit.phone_number,
          dni_cif: inputEdit.dni_cif,
          email: inputEdit.email,
          address: inputEdit.address,
          province: provinceName,
          province_id: inputEdit.province_id,
          city: cityName,
          city_id: inputEdit.city_id,
          zip_code: inputEdit.zip_code,
          contact_name: inputEdit.contact_name,
          sectors: selectedOption,
          company_size: inputEdit.company_size,
          company_info: inputEdit.company_info,
          img: img,
          sepa_file: sepa,
        });
        setEditShow(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <Col className="d-flex justify-content-evenly flex-wrap py-5">
      <Col lg={4} className="styleInfo w-33">
        <Row className="d-flex">
          <Col sm={12}>
            <h5 className="py-4">Datos empresa</h5>
          </Col>
          <Col sm={12} md={6} lg={12}>
            <p className="fw-bold required">Nombre*</p>
            <input
              type="text"
              name="name"
              id="name"
              value={inputEdit?.name}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </Col>
          <Col sm={12} md={6} lg={12}>
            <p className="fw-bold required">CIF*</p>
            <input
              type="text"
              name="dni_cif"
              id="dni_cif"
              value={inputEdit?.dni_cif}
              onChange={handleChange}
              placeholder="CIF"
            />
          </Col>
          <Col sm={12} md={6} lg={12}>
            <p className="fw-bold required">Dirección fiscal*</p>
            <input
              type="textarea"
              name="address"
              id="address"
              value={inputEdit?.address}
              onChange={handleChange}
              placeholder="Dirección Fiscal"
              rows={3}
            />
          </Col>
          <Col sm={12} md={6} lg={12}>
            <p className="fw-bold">Código Postal</p>
            <input
              type="number"
              name="zip_code"
              id="zip_code"
              value={inputEdit?.zip_code}
              onChange={handleChange}
              placeholder="Código Postal"
            />
          </Col>
          <Col sm={12} md={6} lg={12} className="mb-3">
            <p className="fw-bold">Provincia</p>
            <ProvinceSelect
              provinceList={provinceList}
              setProvinceList={setProvinceList}
              handlechange={hadlerProvince}
              inputEdit={inputEdit}
            />
          </Col>
          <Col sm={12} md={6} lg={12} className="mb-3">
            <p className="fw-bold">Ciudad</p>
            <CitySelect
              cityList={cityList}
              setCityList={setCityList}
              handlechange={handleCity}
              provinceId={provinceId}
              inputEdit={inputEdit}
              changesProvince={changesProvince}
              setInputEdit={setInputEdit}
            />
          </Col>
        </Row>
      </Col>

      <Col lg={4} className="styleInfo w-33">
        <Row className="d-flex">
          <Col sm={12} md={6} lg={12}>
            <Row>
              <Col sm={12}>
                <h5 className="py-4">Datos de contacto</h5>
              </Col>
              <Col sm={12}>
                <p className="fw-bold required">Contacto*</p>
                <input
                  type="text"
                  name="contact_name"
                  id="contact_name"
                  value={inputEdit?.contact_name}
                  onChange={handleChange}
                  placeholder="Persona de contacto"
                />
              </Col>
              <Col sm={12}>
                <p className="fw-bold required">Correo electrónico*</p>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={inputEdit?.email}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                />
              </Col>
              <Col sm={12}>
                <p className="fw-bold required">Teléfono*</p>
                <input
                  type="number"
                  name="phone_number"
                  id="phone_number"
                  value={inputEdit?.phone_number}
                  onChange={handleChange}
                  placeholder="teléfono"
                />
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={6} lg={12}>
            <Row>
              <Col sm={12}>
                <h5 className="py-4">Archivos</h5>
              </Col>
              <Col sm={12} className="d-flex flex-column py-3">
                <p className="fw-bold required">Documento SEPA*</p>
                <input name="sepa" onChange={handleFiles} type="file" />
              </Col>
              <Col sm={12} className="d-flex flex-column py-3">
                <p className="fw-bold">Foto Perfil</p>
                <input name="img" onChange={handleFiles} type="file" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col md={4} className="styleInfo w-33">
        <Row className="d-flex flex-column">
          <Col sm={12}>
            <h5 className="py-4">Otros datos</h5>
          </Col>
          <Col sm={12} className="mb-3">
            <p className="fw-bold required">Sector*</p>
            <SectorSelectMulti
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              handlechange={handleChange}
            />
          </Col>
          <Col sm={12}>
            <p className="fw-bold">Número de empleados</p>
            <input
              type="number"
              name="company_size"
              id="company_size"
              value={inputEdit?.company_size}
              onChange={handleChange}
              placeholder="Número de empleados"
            />
          </Col>
          <Col sm={12}>
            <p className="fw-bold">Cultura y valores de la empresa</p>
            <textarea
              name="company_info"
              id="company_info"
              value={inputEdit?.company_info}
              onChange={handleChange}
              type="textarea"
              placeholder="Cultura y Valores"
              className="text-area"
            />
          </Col>
        </Row>
      </Col>
      <Col className="d-flex flex-column justify-content-center align-items-center m-3">
        {error && <p className="mt-3 text-danger fw-bold">{error}</p>}
        <button className="buttom2" onClick={onSubmit}>
          Guardar
        </button>
      </Col>
    </Col>
  );
};
