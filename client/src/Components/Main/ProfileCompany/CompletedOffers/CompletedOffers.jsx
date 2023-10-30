import React, { useContext, useEffect, useState } from "react";
import { JiboContext } from "../../../../Context/JiboContext";
import axios from "axios";
import { ShowCompletedOffers } from "./ShowCompletedOffers/ShowCompletedOffers";
import { EditCompletedOffers } from "./EditCompletedOffers/EditCompletedOffers";
import { Col, Row } from "react-bootstrap";
import "./CompletedOffers.scss";

export const CompletedOffers = () => {
  const { companyData, setCompanyData, setOfferId } = useContext(JiboContext);
  const [offerList, setOfferList] = useState(null);
  const [changes, setChanges] = useState(true);
  const [editShow, setEditShow] = useState(false);
  const { offers_availables, user_id } = companyData;
  const totalOffers = offers_availables - 1;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/offer/getCompletedOfferOneUser/${user_id}`)
      .then((res) => {
        setOfferList(res.data);
      })
      .catch((err) => {});
  }, [changes]);

  const onDelete = (id) => {
    axios
      .put(`http://localhost:3000/offer/deleteOffer/${user_id}/${id}`)
      .then((res) => {
        setOfferList(offerList.filter((e) => e.job_offer_id !== id));
      })
      .catch((err) => {});
  };

  const onRenew = (id) => {
    axios
      .put(`http://localhost:3000/offer/renewOffer/${user_id}/${id}`)
      .then((res) => {
        setOfferList(offerList.filter((e) => e.job_offer_id !== id));
        substractAvailableOffers();
      })
      .catch((err) => {});
  };

  const substractAvailableOffers = () => {
    axios
      .put(
        `http://localhost:3000/company/substractOffer/${user_id}`,
        companyData
      )
      .then((result) => {
        setCompanyData({
          ...companyData,
          offers_availables: totalOffers,
        });
      })
      .catch((error) => {});
  };

  return (
    <Row>
      <Col>
        {!editShow && (
          <ShowCompletedOffers
            offerList={offerList}
            onDelete={onDelete}
            onRenew={onRenew}
            editShow={editShow}
            setEditShow={setEditShow}
            setOfferId={setOfferId}
            offers_availables={offers_availables}
          />
        )}
        {editShow && (
          <EditCompletedOffers
            offerList={offerList}
            setEditShow={setEditShow}
            changes={changes}
            setChanges={setChanges}
          />
        )}
      </Col>
    </Row>
  );
};
