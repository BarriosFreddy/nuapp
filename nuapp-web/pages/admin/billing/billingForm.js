import React, { useState } from "react";
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
} from "reactstrap";
import Quagga from "quagga";

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

function BillingForm() {
  const [billing, setBilling] = useState({
    code: "",
    description: "",
    quantity: 0,
    price: 0,
  });
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onChangeField = ({ target: { name, value } }) => {
    setBilling({
      ...billing,
      [name]: value,
    });
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

  const save = () => {
    const itemsArray = Object.assign([], items);
    itemsArray.push(billing);
    setItems(itemsArray);
    if (itemsArray.length > 0) {
      const totalAmount = itemsArray
        .map(({ price, quantity }) => +quantity * +price)
        .reduce((acc, value) => +acc + +value, 0);
      setTotal(totalAmount);
    }
  };

  return (
    <>
      <Table responsive hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ code, description, quantity, price }, index) => (
            <tr key={index}>
              <th>{index}</th>
              <th>{code}</th>
              <th>{description}</th>
              <th>{quantity}</th>
              <th>{price}</th>
              <th>{+price * +quantity}</th>
            </tr>
          ))}
          <tr>
            <td colSpan={4}></td>
            <td>Total</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>
              <Button onClick={() => scanItem()}>Scan</Button>
            </td>
            <td>
              <FormGroup>
                <Input
                  type="text"
                  name="code"
                  value={billing.code}
                  onChange={(event) => onChangeField(event)}
                />
              </FormGroup>
            </td>
            <td>
              <FormGroup>
                <Input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={billing.description}
                  onChange={(event) => onChangeField(event)}
                />
              </FormGroup>
            </td>
            <td>
              <FormGroup>
                <Input
                  type="number"
                  name="quantity"
                  value={billing.quantity}
                  onChange={(event) => onChangeField(event)}
                />
              </FormGroup>
            </td>
            <td>
              <FormGroup>
                <Input
                  type="number"
                  name="price"
                  value={billing.price}
                  onChange={(event) => onChangeField(event)}
                />
              </FormGroup>
            </td>
            <td>
              <Button onClick={() => save()}>Add</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Scanning
        </ModalHeader>
        <ModalBody>
          <div id="reader" width="600px" style={{ maxWidth: "750px" }}></div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default BillingForm;
