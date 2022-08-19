import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  Input,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";
import moment from "moment";
import BillingForm from "./billingForm";

function Billing() {
  let [editing, setEditing] = useState(false);
  let [isThisDateClosed, setIsThisDateClosed] = useState(false);
  let [total, setTotal] = useState(0);
  let [bills, setBills] = useState([]);
  let [month, setMonth] = useState(moment().format("MM"));
  let [day, setDay] = useState(moment().format("DD"));
  let dateFilter = `${moment().year()}-`;

  useEffect(async () => {
    const billsArray = await getBills(moment().format("YYYY-MM-DD"));
    setBills(billsArray);
    calculateTotal(billsArray);
    await getDailyBills(moment().format("YYYY-MM-DD"));
  }, []);

  const getBills = async (date) => {
    const { data } = await fetch(`http://localhost:3001/bill/date/${date}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return data;
  };

  const getDailyBills = async (date) => {
    const { data } = await fetch(`http://localhost:3001/bill/daily/${date}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setIsThisDateClosed(!!data);
  };

  const cancel = async () => {
    const billsArray = await getBills(moment().format("YYYY-MM-DD"));
    setBills(billsArray);
    calculateTotal(billsArray);
    setEditing(false);
    await getDailyBills(moment().format("YYYY-MM-DD"));
  };

  const calculateTotal = (billsArray) => {
    if (billsArray.length > 0) {
      const totalAmount = billsArray
        .map(({ total }) => total)
        .reduce((acc, value) => +acc + +value, 0);
      setTotal(totalAmount);
    }
  };

  const closeDay = async () => {
    const { data } = await fetch(`http://localhost:3001/bill/close`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: `${moment().year()}-${month}-${day}`,
        total,
      }),
    }).then((res) => res.json());
    !!data && setIsThisDateClosed(true);
  };

  const onChangeFilterDate = async ({ target: { name, value } }) => {
    if (name === "day") {
      setDay(value);
      dateFilter += `${month}-${value}`;
    } else if (name == "month") {
      setMonth(value);
      dateFilter += `${value}-${day}`;
    }
    const billsArray = await getBills(dateFilter);
    setBills(billsArray);
    calculateTotal(billsArray);
    await getDailyBills(dateFilter);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow border-10">
              <CardHeader className="border-0">
                <Row>
                  <Col sm="1">
                    <h3 className="mb-0">Facturación</h3>
                  </Col>
                  <Col sm="1">
                    <Input
                      id="exampleSelect"
                      name="month"
                      type="select"
                      value={month}
                      onChange={onChangeFilterDate}
                    >
                      <option value="01">Enero</option>
                      <option value="02">Febrero</option>
                      <option value="03">Marzo</option>
                      <option value="04">Abril</option>
                      <option value="05">Mayo</option>
                      <option value="08">Agosto</option>
                    </Input>
                  </Col>
                  <Col sm="1">
                    <Input
                      type="select"
                      name="day"
                      value={day}
                      onChange={onChangeFilterDate}
                    >
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                    </Input>
                  </Col>
                  <Col>
                    {!editing && !isThisDateClosed && (
                      <Button color="success" onClick={() => setEditing(true)}>
                        CREAR
                      </Button>
                    )}
                  </Col>

                  {!editing && (
                    <>
                      {!isThisDateClosed && (
                        <Col sm="1">
                          <Button color="primary" onClick={closeDay}>
                            CIERRE
                          </Button>
                        </Col>
                      )}
                      <Col sm="1">
                        <strong>Total ${total}</strong>
                      </Col>
                    </>
                  )}
                </Row>
              </CardHeader>
              {!editing && (
                <>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Código de factura</th>
                        <th scope="col">Total</th>
                        <th scope="col">Nº productos</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {bills.map(({ createdAt, code, items, total }) => (
                        <tr key={code}>
                          <td>
                            {moment(createdAt).format("YYYY/MM/DD HH:mm a")}
                          </td>
                          <td>{code}</td>
                          <td>${total}</td>
                          <td>{items.length}</td>
                          <td>
                            <Button color="primary" size="sm">
                              VER
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </nav>
                  </CardFooter>
                </>
              )}
              {editing && <BillingForm cancel={cancel} />}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

Billing.layout = Admin;

export default Billing;
