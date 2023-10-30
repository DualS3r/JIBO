import React from "react";
import { Modal, Button, Row, Col, Table } from "react-bootstrap";
import "./modals.scss";

export const ModalViewTransaction = ({
  show,
  setShowModal,
  transactionData,
}) => {
  const calcDate = (data) => {
    let splitedData = data.split(" ");
    return `${splitedData[2]} ${splitedData[1]} ${splitedData[3]}`;
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="justify-content-center">
        <h2>Transacciones</h2>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center flex-column ">
        <Row>
          {transactionData && transactionData.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>FECHA</th>
                  <th>HORA</th>
                  <th>TIPO DE BONO</th>
                  <th>PRECIO</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((transaction) => (
                  <tr key={transaction.buy_id}>
                    <td>{calcDate(transaction?.buy_date)}</td>
                    <td>{transaction?.buy_hour}</td>
                    <td>{transaction?.name}</td>
                    <td>{transaction?.price}€</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Col sm={12} className="my-5 d-flex justify-content-center">
              <p>Aún no hay transacciones</p>
            </Col>
          )}
        </Row>
        <div className="w-50 d-flex flex-column my-3">
          <Button className="btn-modal" onClick={() => setShowModal(false)}>
            Aceptar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
