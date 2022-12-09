import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet.js/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { apiCallerWithToken } from "../config/configAxios";
import { authSelector } from "../redux/slices/authSlice";
import { cartActions, cartSelector } from "../redux/slices/cartSlice";
import "../styles/checkout.scss";

const Checkout = () => {
  const [state, setState] = useState({ fullName: "", phone: "", address: "" });
  const { accessToken } = useSelector(authSelector);
  const { cart } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.items.length > 0) {
      try {
        const res = await apiCallerWithToken(accessToken, dispatch).patch(
          "order/account/payment",
          {
            ...state,
            paymentMethod: "COD",
          }
        );
        const { message, data } = res.data;
        if (message === "Success") {
          dispatch(cartActions.setCart({ items: [] }));
          setState({ fullName: "", phone: "", address: "" });
          toast.success("Thanh toán thành công");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />

      <section>
        <Form className="billing-form" onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col lg="8">
                <h6 className="mb-4 fw-bold text-center fs-4">
                  Billing Information
                </h6>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-100"
                    name="fullName"
                    value={state.fullName}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="numer"
                    placeholder="Phone number"
                    className="w-100"
                    name="phone"
                    value={state.phone}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-100"
                    name="address"
                    value={state.address}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg="4">
                <div className="checkout__cart">
                  <h6>
                    Total Qty:{" "}
                    <span>
                      {cart
                        ? cart.items.reduce((p, c) => c.quantity + p, 0)
                        : 0}
                    </span>
                  </h6>
                  <h6>
                    Subtotal:{" "}
                    <span>
                      {cart
                        ? cart.items.reduce(
                            (p, c) => c.quantity * c.product?.price + p,
                            0
                          )
                        : 0}
                      đ
                    </span>
                  </h6>
                  <h6>
                    Free Shipping: <br />
                    free shipping<span>0đ</span>
                  </h6>
                  <h4>
                    Total Cost:{" "}
                    <span>
                      {cart
                        ? cart.items.reduce(
                            (p, c) => c.quantity * c.product?.price + p,
                            0
                          )
                        : 0}
                      đ
                    </span>
                  </h4>
                  <button type="submit" className="buy__btn auth__btn w-100">
                    Place an order
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </Form>
      </section>
    </Helmet>
  );
};

export default Checkout;
