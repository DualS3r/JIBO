import React, { useContext, useState } from "react";
import { JiboContext } from "../../../Context/JiboContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { CitySelect } from "../../../Components/Main/CitySelect/CitySelectFilters";
import { RoleSelectFilters } from "../../../Components/Main/RoleSelect/RoleSelectFilters";
import { SectorSelect } from "../../../Components/Main/SectorSelect/SectorSelect";
import { ProvinceSelect } from "../../../Components/Main/ProvinceSelect/ProvinceSelect";
import { ValidateSelect } from "../../../Components/Main/ValidateSelect/ValidateSelect";
import { Col, Container, Row } from "react-bootstrap";

const initialFilter = {
  city_id: "",
  province_id: "",
  name: "",
  last_name: "",
  role: "",
  sectors: "",
  is_validated: "",
};

const initialNameLast_name = {
  name: "",
  last_name: "",
};

export const SearchView = ({ filter, setFilterList }) => {
  const { userType } = useContext(JiboContext);
  const [roleList, setRoleList] = useState();
  const [cityList, setCityList] = useState();
  const [provinceList, setProvinceList] = useState();
  const [provinceId, setProvinceId] = useState(0);
  const [selectFilter, setSelectFilter] = useState(initialFilter);
  const [selectName, setSelectName] = useState(initialNameLast_name);
  const [sectorList, setSectorList] = useState();

  const img = null;

  const handleCity = (e) => {
    const { name, value } = e.target;
    setSelectFilter({ ...selectFilter, [name]: value });
  };

  const handleSector = (e) => {
    const { name, value } = e.target;
    setSelectFilter({ ...selectFilter, [name]: value });
  };

  const hadlerProvince = (e) => {
    if (e.target.value != "") {
      const { name, value } = e.target;
      setProvinceId(value);
      setSelectFilter({ ...selectFilter, [name]: value });
    } else {
      setSelectFilter({ ...selectFilter, city_id: "", province_id: "" });
    }
  };

  const hadlerChange = (e) => {
    const { name, value } = e.target;
    if (name !== "is_validated") {
      setSelectName({ ...selectName, [name]: value });
    } else {
      setSelectFilter({ ...selectFilter, [name]: value });
    }
  };

  const onSubmit = () => {
    let filterFinal = {
      ...selectFilter,
      name: selectName.name,
      last_name: selectName.last_name,
    };

    //Consulta Worker
    if (userType !== 1 && filter == 1) {
      axios
        .post("http://localhost:3000/worker/allWorkers/filters", filterFinal)
        .then((res) => {
          setFilterList(res.data);
        })
        .catch((err) => {});

      //Consulta Company
    } else if (userType === 0 && filter == 2) {
      axios
        .post("http://localhost:3000/company/allCompany/filters", filterFinal)
        .then((res) => {
          setFilterList(res.data);
        })
        .catch((err) => {});

      //Consulta Offers
    } else if (userType !== 2 && filter == 3) {
      axios
        .post("http://localhost:3000/offer/getAllOffer/filters", filterFinal)
        .then((res) => {
          setFilterList(res.data);
        })
        .catch((err) => {});
    }
  };

  return (
    <Col>
      <Container>
        <Row className="d-flex">
          <Col className="mt-5" sm={3}>
            <Row className="gap-3 text-center">
              {filter === 2 && (
                <>
                  <Col sm={12}>
                    <SectorSelect
                      sectorList={sectorList}
                      setSectorList={setSectorList}
                      handlechange={handleSector}
                    />
                  </Col>
                  <Col sm={12}>
                    <ValidateSelect hadlerChange={hadlerChange} />
                  </Col>
                </>
              )}

              {filter != 2 && (
                <Col sm={12}>
                  <RoleSelectFilters
                    roleList={roleList}
                    setRoleList={setRoleList}
                    setSelectFilter={setSelectFilter}
                    selectFilter={selectFilter}
                  />
                </Col>
              )}

              <Col sm={12}>
                <ProvinceSelect
                  provinceList={provinceList}
                  setProvinceList={setProvinceList}
                  handlechange={hadlerProvince}
                />
              </Col>

              <Col sm={12}>
                <CitySelect
                  cityList={cityList}
                  setCityList={setCityList}
                  handlechange={handleCity}
                  provinceId={provinceId}
                />
              </Col>

              {filter === 1 && (
                <>
                  <Col sm={12}>
                    <h6></h6>
                    <input
                      className="w-100"
                      placeholder="Nombre"
                      type="text"
                      name="name"
                      onChange={hadlerChange}
                    />
                  </Col>
                  <Col sm={12}>
                    <input
                      className="w-100"
                      placeholder="Apellidos"
                      type="text"
                      name="last_name"
                      onChange={hadlerChange}
                    />
                  </Col>
                </>
              )}
              <Col sm={12}>
                <button className="buttom2" onClick={onSubmit}>
                  Aplicar filtro
                </button>
              </Col>
            </Row>
          </Col>

          <Col sm={9} className="mt-5">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </Col>
  );
};
