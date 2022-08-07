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
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";
import moment from "moment";
import BillingForm from "./billingForm";

function Billing() {
  let [editing, setEditing] = useState(false);
  let [saving, setSaving] = useState(false);
  let [bills, setBills] = useState([]);

  useEffect(async () => {
    setBills(await getBills());
  }, []);

  const getBills = async () => {
    const { data } = await fetch(`http://localhost:3001/bill/date/123`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return data;
  };

  const cancel = async () => {
    setEditing(false);
    setBills(await getBills());
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
                  <Col sm="4¡2">
                    <h3 className="mb-0">Facturación</h3>
                  </Col>
                  <Col>
                    {!editing && (
                      <Button
                        color="success"
                        size="sm"
                        onClick={() => setEditing(true)}
                      >
                        CREAR
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              {!editing && (
                <>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Billing number</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Number of items</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {bills.map(({ createdAt, code, items, total }) => (
                        <tr key={code}>
                          <td>{moment(createdAt).format("HH:mm a")}</td>
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
