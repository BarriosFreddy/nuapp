import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Button,
  Col,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
  Container,
  Card,
  CardBody,
  CardText,
} from "reactstrap";
import Quagga from "quagga";
import ValidationFeedback from "../../../../components/validationFeedback";
import env from "../../../../env";

const itemInitialState = {
  code: "",
  description: "",
  price: 0,
};

function ItemForm(props) {
  const [item, setItem] = useState(itemInitialState);
  const [loading, setLoading] = useState(false);
  const [failedValidations, setFailedValidations] = useState({
    code: false,
    description: false,
    price: false,
  });
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onChangeField = ({ target: { name, value } }) => {
    setItem({
      ...item,
      [name]: value,
    });
    setFailedValidations({ ...failedValidations, [name]: !value });
  };

  const populateFieldsForm = ({ _id, code, description, price }) => {
    setItem({
      ...item,
      _id,
      code,
      description,
      price,
    });
  };

  const clearFieldsForm = () => {
    setItem(itemInitialState);
  };

  const scanItem = () => {
    toggle();
    setTimeout(() => {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            constraints: {
              width: 450,
              height: 400,
              facingMode: "environment",
            },
            target: document.querySelector("#reader"), // Or '#yourElement' (optional)
          },
          decoder: {
            readers: ["ean_reader"],
          },
        },
        function(err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Ready to start");
          Quagga.start();
        }
      );
      Quagga.onDetected(({ codeResult: { code } }) => {
        console.log({ code });
        setItem({
          ...item,
          code,
        });
        setModal(false);
        Quagga.stop();
      });
      Quagga.onProcessed((result) => {
        const drawingCanvas = Quagga.canvas.dom.overlay;
        drawingCanvas.style.display = "none";
      });
    }, 300);
  };

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  const isValidForm = () => {
    const { code, description, price } = {
      ...item,
    };
    const failedValidationsObj = { ...failedValidations };
    failedValidationsObj.code = !code;
    failedValidationsObj.description = !description;
    failedValidationsObj.price = !price;

    setFailedValidations(failedValidationsObj);
    return Object.values(failedValidationsObj).every(
      (validation) => validation === false
    );
  };

  const save = async () => {
    if (isValidForm()) {
      await fetch(`${env.BASE_URL}/item`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item }), // body data type must match "Content-Type" header
      }).then((res) => res.json());
      props.cancel();
      clearFieldsForm();
    }
  };

  const cancel = () => {
    props.cancel();
  };

  return (
    <>
      <Container fluid>
        <Row style={{ margin: "40px 0" }}>
          <Col>
            <Button outline color="success" onClick={() => scanItem()}>
              ESCANEAR
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>Código</Col>
          <Col>
            <FormGroup>
              <Input
                type="text"
                name="code"
                value={item.code}
                onChange={(event) => onChangeField(event)}
              />
              {failedValidations.code && (
                <ValidationFeedback>Campo obligatorio</ValidationFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>Descripción</Col>
          <Col>
            <FormGroup>
              <Input
                type="text"
                name="description"
                placeholder="Description"
                value={item.description}
                onChange={(event) => onChangeField(event)}
              />
              {failedValidations.description && (
                <ValidationFeedback>Campo obligatorio</ValidationFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>Precio</Col>
          <Col>
            <FormGroup>
              <Input
                type="number"
                name="price"
                value={item.price}
                onChange={(event) => onChangeField(event)}
              />
              {failedValidations.price && (
                <ValidationFeedback>Campo obligatorio</ValidationFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col>
            <Button color="success" onClick={() => save()}>
              GUARDAR
            </Button>
          </Col>
          <Col>
            <Button color="light" onClick={() => cancel()}>
              CANCELAR
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Escaneando
        </ModalHeader>
        <ModalBody>
          <div id="reader" width="600px" style={{ maxWidth: "750px" }}></div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ItemForm;
