import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JiboContext } from "../../Context/JiboContext";
import jwt_decode from "jwt-decode";
import { Col } from "react-bootstrap";
import "./error.scss";

export const Error = () => {
  const { setShowModal } = useContext(JiboContext);
  const navigate = useNavigate();
  const url = useParams();

  useEffect(() => {
    let token = localStorage.getItem("token");
    const propiedades = Object.keys(url);

    if (token && url[propiedades[0]] === "") {
      const { user_id } = jwt_decode(token);
      navigate(`/workerProfile/${user_id}`);
    } else if (token && url !== "") {
      navigate(url);
    } else if (!token) {
      navigate("/");
      setShowModal(1);
    }
  }, []);

  return (
    <Col className="d-flex justify-content-center">
      <img className="errorImgFormat" src="/images/maxresdefault.jpg" alt="" />
    </Col>
  );
};
