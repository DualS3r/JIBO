import { createContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../Utils/localStorageUtils";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const JiboContext = createContext();

export const JiboProvider = (props) => {
  const [showModal, setShowModal] = useState(0);
  const [showError, setShowError] = useState(false);
  const [token, setToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [userType, setUserType] = useState(-1);
  const [workerData, setWorkerData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [offerId, setOfferId] = useState(0);
  const [showStatus, setShowStatus] = useState(false);
  const [applierData, setApplierData] = useState({});
  const [activeNavLat, setActiveNavLat] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenStorage = getLocalStorage("token");

    if (tokenStorage) {
      setToken(tokenStorage);
      const { user_id, type } = jwt_decode(tokenStorage);

      if (type === 1) {
        axios
          .get(`http://localhost:3000/worker/oneWorker/${user_id}`)
          .then((res) => {
            setWorkerData(res.data);
            setIsLogged(true);
            setUserType(res.data?.type);
            setActiveNavLat(1);
          })
          .catch((err) => {});
      } else if (type === 2) {
        axios
          .get(`http://localhost:3000/company/getOneCompany/${user_id}`)
          .then((res) => {
            if (res.data?.result.complete_profile === 1) {
              setShowModal(1);
            }
            setCompanyData(res.data?.result);
            setIsLogged(true);
            setUserType(res.data?.result.type);
            navigate(`/companyProfile/${user_id}`);
            setActiveNavLat(5);
          })
          .catch((err) => {});
      } else if (type === 0) {
        setIsLogged(true);
        setUserType(0);
        navigate("/admin");
      }
    }
  }, [isLogged]);

  return (
    <JiboContext.Provider
      value={{
        showModal,
        setShowModal,
        showError,
        setShowError,
        isLogged,
        setIsLogged,
        userType,
        setUserType,
        workerData,
        setWorkerData,
        companyData,
        setCompanyData,
        offerId,
        setOfferId,
        showStatus,
        setShowStatus,
        applierData,
        setApplierData,
        activeNavLat,
        setActiveNavLat,
        token,
      }}
    >
      {props.children}
    </JiboContext.Provider>
  );
};
