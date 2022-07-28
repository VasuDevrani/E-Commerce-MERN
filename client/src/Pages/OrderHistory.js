import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }

    const getOrders = async () => {
      const { data } = await axios.post("/api/order/get", {
        userId: userInfo._id,
      });
      data.reverse();
      setOrders(data);
      console.log(data);
    };

    getOrders();
  }, [userInfo._id]);

  return (
    <div className="container my-5">
      {orders.map((order) => (
        <Row className="mt-3">
          <ListGroup>
            <ListGroup.Item variant="warning">
              <span>Product Id: </span>
              <span> {order._id} </span>
            </ListGroup.Item>
            <ListGroup.Item variant="dark">
              <Row>
                <Col>
                  <ListGroup>
                    <ListGroup.Item>Date</ListGroup.Item>
                    <ListGroup.Item> {order.createdAt.substring(0, 10)} </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col>
                  <ListGroup>
                    <ListGroup.Item>Shipping Address</ListGroup.Item>
                    <ListGroup.Item>
                      {order.shippingAddress.address}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col>
                  <ListGroup>
                    <ListGroup.Item>paymentMethod</ListGroup.Item>
                    <ListGroup.Item>{order.paymentMethod}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col>
                  <ListGroup>
                    <ListGroup.Item>Total Price</ListGroup.Item>
                    <ListGroup.Item>
                      Rs{" "}
                      {Math.round((order.totalPrice + Number.EPSILON) * 100) /
                        100}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item variant="dark">
              <Row>
                <Col >Items: </Col>
                <Col sm={9}>
                  <Row>
                    <Col>
                      <ListGroup>
                        <ListGroup.Item>Name:</ListGroup.Item>

                        {order.orderItems.map((Item) => (
                          <ListGroup.Item>{Item.slug}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                    <Col>
                      <ListGroup>
                        <ListGroup.Item>Quantity:</ListGroup.Item>
                        {order.orderItems.map((Item) => (
                          <ListGroup.Item>x {Item.quantity}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                    <Col>
                      <ListGroup>
                        <ListGroup.Item>Price:</ListGroup.Item>
                        {order.orderItems.map((Item) => (
                          <ListGroup.Item>Rs {Item.price}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Row>
      ))}
    </div>
  );
}
