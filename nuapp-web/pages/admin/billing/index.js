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
  CardBody,
  CardText,
  CardTitle,
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
  let [monthDays, setMonthDays] = useState([]);
  let [page, setPage] = useState(1);
  let [dateFilter, setDateFilter] = useState(moment().format("YYYY-MM-DD"));

  useEffect(async () => {
    const billsArray = await getBills(dateFilter);
    setBills(billsArray);
    calculateTotal(billsArray);
    // await getDailyBills(dateFilter);
    getDaysOfTheMonth(+month);
  }, []);

  const getBills = async (date) => {
    const { data } = await fetch(`http://localhost:3001/bill/date/${date}?page=${page}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return data;
  };
/* 
  const getDailyBills = async (date, page = 1) => {
    const { data } = await fetch(`http://localhost:3001/bill/daily/${date}?page=${page}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setIsThisDateClosed(!!data);
  }; */

  const cancel = async () => {
    const billsArray = await getBills(dateFilter);
    setBills(billsArray);
    calculateTotal(billsArray);
    setEditing(false);
    //await getDailyBills(dateFilter);
  };

  const calculateTotal = (billsArray) => {
    if (billsArray.length > 0) {
      const totalAmount = billsArray
        .map(({ total }) => total)
        .reduce((acc, value) => +acc + +value, 0);
      setTotal(totalAmount);
      return;
    }
    setTotal(0);
  };

/*   const closeDay = async () => {
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
  }; */

  const onChangeFilterDate = async ({ target: { name, value } }) => {
    let dateFilterTemp = ''
    if (name === "day") {
      setDay(value);
      dateFilterTemp = `${moment().format("YYYY")}-${month}-${value}`;
    } else if (name == "month") {
      setMonth(value);
      getDaysOfTheMonth(+value);
      dateFilterTemp = `${moment().format("YYYY")}-${value}-${day}`
    }
    setDateFilter(dateFilterTemp);
    const billsArray = await getBills(dateFilterTemp);
    setBills(billsArray);
    calculateTotal(billsArray);
    //await getDailyBills(dateFilterTemp);
  };

  const getDaysOfTheMonth = (month) => {
    const endMonth = moment()
      .month(--month)
      .endOf("month")
      .date();
    const days = [];
    for (let index = 1; index <= endMonth; index++) {
      days.push(
        moment()
          .month(--month)
          .date(index)
          .format("DD")
      );
    }
    setMonthDays(days);
  };

  const nextPage = async () => {
    const newPage = page + 1;
    setPage(newPage);
    await getBills(dateFilter, newPage);
  };

  const prevPage = async () => {
    const newPage = page === 1 ? 1 : page - 1;
    setPage(newPage);
    await getBills(dateFilter, newPage);

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
                <Container>
                  <Row>
                    {!editing && (
                      <>
                        <Col xs="4">
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
                            <option value="09">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                          </Input>
                        </Col>
                        <Col xs="4">
                          <Input
                            type="select"
                            name="day"
                            value={day}
                            onChange={onChangeFilterDate}
                          >
                            {monthDays.map((day) => (
                              <option value={day}>{day}</option>
                            ))}
                          </Input>
                        </Col>
                        {/* !isThisDateClosed && */}
                        <Col xs="4">
                          <Button
                            color="success"
                            onClick={() => setEditing(true)}
                          >
                            CREAR
                          </Button>
                        </Col>
                        {/*                       {!editing && (
                        <>
                          {!isThisDateClosed && (
                            <Col lg="2">
                              <Button color="primary" onClick={closeDay}>
                                CIERRE
                              </Button>
                            </Col>
                          )}
                        
                        </>
                      )} */}
                        <Col xs="8" style={{ paddingTop: "15px" }}>
                          <strong>Total ${total}</strong>
                        </Col>{" "}
                      </>
                    )}
                  </Row>
                </Container>
              </CardHeader>
              {!editing && (
                <>
                  {/*    <Table className="align-items-center table-flush" responsive>
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
                  </Table>*/}
                  {bills.map(({ createdAt, code, items, total }) => (
                    <Card
                      key={code}
                      style={{
                        width: "auto",
                      }}
                    >
                      <CardBody>
                        <CardText>
                          <Row>
                            <Col>Productos</Col>
                            <Col>{items.length}</Col>
                            <Col>Total</Col>
                            <Col>${total}</Col>
                          </Row>
                        </CardText>
                      </CardBody>
                    </Card>
                  ))}

                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => prevPage()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => nextPage()}
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
