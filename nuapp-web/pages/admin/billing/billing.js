import React, { useState } from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";
import moment from "moment";
import BillingForm from "./billingForm";

function Billing() {
  let [editing, setEditing] = useState(false);

  const save = () => {

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
                    <h3 className="mb-0">Billing</h3>
                  </Col>
                  <Col>
                    {!editing && (
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => setEditing(true)}
                      >
                        Create
                      </button>
                    )}
                    {editing && (
                      <>
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() => save()}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => setEditing(false)}
                        >
                          Cancel
                        </button>
                      </>
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
                      <tr>
                        <td>{moment().format("HH:mm a")}</td>
                        <td>DF000000001</td>
                        <td>$20</td>
                        <td>3</td>
                        <td>
                          <button
                            className="btn btn-light btn-sm"
                            type="button"
                          >
                            Show
                          </button>
                        </td>
                      </tr>
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
              {editing && <BillingForm />}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

Billing.layout = Admin;

export default Billing;
