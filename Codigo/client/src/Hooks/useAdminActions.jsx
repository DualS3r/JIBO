import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JiboContext } from "../Context/JiboContext";
import axios from "axios";

export const useAdminActions = () => {
  const { companyData, setCompanyData } = useContext(JiboContext);
  const [setting, setSetting] = useState();
  const navigate = useNavigate();

  const adminActions = (id, type) => {
    if (type === 1) {
      axios
        .get(`http://localhost:3000/admin/companyTransaction/${id}`)
        .then((res) => {
          setSetting(res.data);
        })
        .catch((err) => {});
    } else if (type === 2) {
      axios
        .put(`http://localhost:3000/admin/enableCompany/${id}`)
        .then((res) => {
          setCompanyData({ ...companyData, is_validated: 1 });
        })
        .catch((err) => {});
    } else if (type === 3) {
      axios
        .put(`http://localhost:3000/company/deleteCompany/${id}`)
        .then((res) => {
          navigate("/search/allCompany");
        })
        .catch((err) => {});
    } else if (type === 4) {
      axios
        .put(`http://localhost:3000/admin/disableCompany/${id}`)
        .then((res) => {
          setCompanyData({ ...companyData, is_validated: 0 });
        })
        .catch((err) => {});
    }
  };

  return { setting, adminActions };
};
