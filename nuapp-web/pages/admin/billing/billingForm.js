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
import ValidationFeedback from "../../../components/validationFeedback";
import env from "../../../env";

const formatsToSupport = [
  "AZTEC",
  "CODABAR",
  "CODE_39",
  "CODE_93",
  "CODE_128",
  "DATA_MATRIX",
  "MAXICODE",
  "ITF",
  "EAN_13",
  "EAN_8",
  "PDF_417",
  "RSS_14",
  "RSS_EXPANDED",
  "UPC_A",
  "UPC_E",
  "UPC_EAN_EXTENSION",
];

const ENTER_KEYCODE = 13;

const billInitialState = {
  code: "",
  description: "",
  quantity: 0,
  price: 0,
};

function BillingForm(props) {
  const [billing, setBilling] = useState(billInitialState);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [failedValidations, setFailedValidations] = useState({
    code: false,
    description: false,
    quantity: false,
    price: false,
  });
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onChangeField = ({ target: { name, value } }) => {
    setBilling({
      ...billing,
      [name]: value,
    });
    setFailedValidations({ ...failedValidations, [name]: !value });
  };

  const onKeyDownCodeField = async ({ keyCode }) => {
    if (keyCode === ENTER_KEYCODE) {
      const { code } = billing;
      const item = await getItemByCode(code);
      item && populateFieldsForm(item);
    }
  };

  const getItemByCode = async (code) => {
    const { data } = await fetch(
      `${env.BASE_URL}/item/code/${code}`
    ).then((res) => res.json());
    return data;
  };

  const populateFieldsForm = ({ _id, code, description, price }) => {
    setBilling({
      ...billing,
      _id,
      code,
      description,
      price,
      quantity: 1,
    });
  };

  const clearFieldsForm = () => {
    setBilling(billInitialState);
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
        setBilling({
          ...billing,
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
    const { code, description, quantity, price } = {
      ...billing,
    };
    const failedValidationsObj = { ...failedValidations };
    failedValidationsObj.code = !code;
    failedValidationsObj.description = !description;
    failedValidationsObj.quantity = !quantity;
    failedValidationsObj.price = !price;

    setFailedValidations(failedValidationsObj);
    return Object.values(failedValidationsObj).every(
      (validation) => validation === false
    );
  };

  const addItem = () => {
    if (isValidForm()) {
      const itemsArray = Object.assign([], items);
      itemsArray.unshift(billing);
      setItems(itemsArray);
      calculateTotal(itemsArray);
      clearFieldsForm();
    }
  };

  const calculateTotal = (itemsArray) => {
    if (itemsArray.length > 0) {
      const totalAmount = itemsArray
        .map(({ price, quantity }) => +quantity * +price)
        .reduce((acc, value) => +acc + +value, 0);
      setTotal(totalAmount);
    }
  };

  const save = async () => {
    if (items.length > 0) {
      await fetch(`${env.BASE_URL}/bill`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, total: total }), // body data type must match "Content-Type" header
      }).then((res) => res.json());
      props.cancel();
    }
  };

  const cancel = () => {
    props.cancel();
  };

  return (
    <>
      <Container fluid>
        <Row>
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

        <Row style={{ marginTop: "20px" }}>
          <Col>Código</Col>
          <Col>
            <FormGroup>
              <Input
                bsSize="sm"
                type="text"
                name="code"
                value={billing.code}
                onChange={(event) => onChangeField(event)}
                onKeyDown={(event) => onKeyDownCodeField(event)}
              />
              {failedValidations.code && (
                <ValidationFeedback>Campo obligatorio</ValidationFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>Cantidad</Col>
          <Col>
            <FormGroup>
              <Input
                bsSize="sm"
                type="number"
                name="quantity"
                value={billing.quantity}
                onChange={(event) => onChangeField(event)}
              />
              {failedValidations.quantity && (
                <ValidationFeedback>Campo obligatorio</ValidationFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>Descripción</Col>
          <Col>
            {billing.description}
            {/* <FormGroup>
                <Input
                  bsSize="sm"
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={billing.description}
                  onChange={(event) => onChangeField(event)}
                />
                {failedValidations.description && (
                  <ValidationFeedback>Campo obligatorio</ValidationFeedback>
                )}
              </FormGroup> */}
          </Col>
        </Row>
        <Row>
          <Col>Precio</Col>
          <Col>
            {billing.price}
            {/* <FormGroup>
                <Input
                bsSize="sm"
                type="number"
                name="price"
                value={billing.price}
                onChange={(event) => onChangeField(event)}
                />
                {failedValidations.price && (
                  <ValidationFeedback>Campo obligatorio</ValidationFeedback>
                  )}
                </FormGroup> */}
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col>
            <Button outline color="success" onClick={() => scanItem()}>
              ESCANEAR
            </Button>
          </Col>
          <Col>
            <Button outline color="success" onClick={() => addItem()}>
              AGREGAR
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>Total {"    " + total}</Col>
        </Row>

        {items.map(({ code, description, quantity = 0, price = 0 }, index) => (
          <Card
            key={code}
            style={{
              width: "auto",
            }}
          >
            <CardBody>
              <CardText>
                <Row>
                  <Col xs="8">
                    <Row>
                      <Col> {description}</Col>
                    </Row>
                    <Row>
                      <Col>Cantidad</Col>
                      <Col>{quantity}</Col>
                    </Row>
                    <Row>
                      <Col>Valor</Col>
                      <Col>{price}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <string>Subtotal</string>
                      </Col>
                      <Col>{+price * +quantity}</Col>
                    </Row>
                    <Row></Row>
                  </Col>
                  <Col xs="1">
                    <Button outline color="light" onClick={() => deleteItem()}>
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </CardText>
            </CardBody>
          </Card>
        ))}
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

export default BillingForm;
