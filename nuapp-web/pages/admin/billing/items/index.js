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
import ItemForm from './ItemForm';


function Billing() {
  let [editing, setEditing] = useState(false);
  let [total, setTotal] = useState(0);
  let [items, setItems] = useState([]);
  let [month, setMonth] = useState(moment().format("MM"));
  let [day, setDay] = useState(moment().format("DD"));
  let [monthDays, setMonthDays] = useState([]);
  let [page, setPage] = useState(1);
  let [dateFilter, setDateFilter] = useState(moment().format("YYYY-MM-DD"));

  useEffect(async () => {
    const itemsArray = await getItems(dateFilter);
    setItems(itemsArray);
  }, []);

  const getItems = async (page = 1) => {
    const { data } = await fetch(`http://localhost:3001/item?page=${page}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return data;
  };

  const cancel = async () => {
    setItems(await getItems());
    setEditing(false);
  };

  const nextPage = async () => {
    const newPage = page + 1;
    setPage(newPage);
    setItems(await getItems(newPage));
  };

  const prevPage = async () => {
    const newPage = page === 1 ? 1 : page - 1;
    setPage(newPage);
    setItems(await getItems(newPage));
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
                          <Button
                            color="success"
                            onClick={() => setEditing(true)}
                          >
                            CREAR
                          </Button>
                        </Col>
                      </>
                    )}
                  </Row>
                </Container>
              </CardHeader>
              {!editing && (
                <>
                  {items.map(({ code, description, price }) => (
                    <Card
                      key={code}
                      style={{
                        width: "auto",
                      }}
                    >
                      <CardBody>
                        <CardText>
                          <Row>
                            <Col>{code}</Col>
                            <Col>{description}</Col>
                            <Col>${price}</Col>
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
              {editing && <ItemForm cancel={cancel} />}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

Billing.layout = Admin;

export default Billing;
