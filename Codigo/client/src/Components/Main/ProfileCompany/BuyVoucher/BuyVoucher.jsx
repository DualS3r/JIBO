import React, { useContext, useEffect, useState } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import axios from "axios";
import { Col, Row, Form } from "react-bootstrap";
import "./BuyVoucher.scss";

const initialValue = {
  price: "",
  voucher_id: "",
  offers_number: "",
  offers_availables: "",
};

export const BuyVoucher = () => {
  const [voucherList, setVoucherList] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(initialValue);
  const [totalOffers, setTotalOffers] = useState(0);
  const { companyData, setCompanyData } = useContext(JiboContext);
  const { user_id, offers_availables } = companyData;

  useEffect(() => {
    axios
      .get("http://localhost:3000/tables/getAllVoucher")
      .then((res) => {
        setVoucherList(res.data);
      })
      .catch((err) => {});
  }, []);

  const handleChange = (e) => {
    setSelectedVoucher({
      ...selectedVoucher,
      price: voucherList.filter(
        (elem) => elem.voucher_id === Number(e.target.value)
      )[0]?.price,
      voucher_id: Number(e.target.value),
      offers_number: voucherList.filter(
        (elem) => elem.voucher_id === Number(e.target.value)
      )[0]?.offers_number,
      offers_availables: offers_availables,
    });
    setTotalOffers(
      offers_availables +
        voucherList.filter(
          (elem) => elem.voucher_id === Number(e.target.value)
        )[0]?.offers_number
    );
  };

  const onSubmit = () => {
    axios
      .post(
        `http://localhost:3000/company/buyVoucher/${user_id}`,
        selectedVoucher
      )
      .then((res) => {
        addUpAvailableOffer();
      })
      .catch((err) => {});
  };

  const addUpAvailableOffer = () => {
    axios
      .put(
        `http://localhost:3000/company/updateOffer/${user_id}`,
        selectedVoucher
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
    <Row className="py-5 ofertas">
      <Col none={12}>
        <Row className="d-flex flex-column ">
          <Col>
            <h5 className="py-4">Ofertas</h5>
          </Col>
          <Col className="styleInfo py-4">
            <h5 className="rose">Comprar ofertas</h5>
            <p>Selecciona el número de ofertas</p>
            <Form.Select
              className="mb-5 custom-select"
              aria-label="Default select example"
              onChange={handleChange}
              value={selectedVoucher.voucher_id}
            >
              <option>Elija una opción</option>
              {voucherList.length != 0 &&
                voucherList?.map((voucher) => {
                  return (
                    <option key={voucher.voucher_id} value={voucher.voucher_id}>
                      {voucher.name} - {voucher.price} €
                    </option>
                  );
                })}
            </Form.Select>
            <Col>
              <button onClick={onSubmit} className="mt-5 buttom2">
                Añadir ofertas
              </button>
            </Col>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
