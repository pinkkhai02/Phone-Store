import React from "react";
import "../styles/cart.scss";

import Helmet from "../components/Helmet.js/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { motion } from "framer-motion";
import { cartActions, cartSelector } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { apiCallerWithToken } from "../config/configAxios";
import { authSelector } from "../redux/slices/authSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const { cart } = useSelector(cartSelector);

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />

      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cart.items.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Delete</th>
                  </thead>
                  {cart?.items.map((item, index) => {
                    return <Tr item={item} key={index} />;
                  })}
                  {/* {cartItems.map((item, index) => (
                    <Tr item={item} key={index} />
                  ))} */}
                  <tbody></tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">
                    {cart
                      ? cart.items.reduce(
                          (p, c) => p + c.quantity * c.product?.price,
                          0
                        )
                      : 0}
                    đ
                  </span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                taxes and shipping will calculte in checkout
              </p>
              <div>
                <button className="buy__btn w-100 ">
                  <Link to="/checkout">Checkout</Link>
                </button>
                <button className="buy__btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(authSelector);
  const deleteProduct = async () => {
    try {
      const res = await apiCallerWithToken(accessToken, dispatch).delete(
        "cart/item/" + item.id
      );

      const { message } = res.data;
      if (message === "Success") {
        dispatch(cartActions.deleteCartItem(item.id));
      }
    } catch (error) {}
  };
  return (
    <>
      <tr>
        <td>
          <img src={item.product.thumbnail} alt="" />
        </td>
        <td>{item.product.name}</td>
        <td>{item.product.price}đ</td>
        <td>{item.quantity}</td>
        <td>
          <motion.i
            whileTap={{ scale: 1.2 }}
            onClick={deleteProduct}
            className="ri-delete-bin-line"
          ></motion.i>
        </td>
      </tr>

      {/* <tr>
      <td>
        <img src={item.thumbnail} alt="" />
      </td>
      <td>{item.name}</td>
      <td>${item.price}</td>
      <td>{item.quantity}px</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          className="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr> */}
    </>
  );
};

export default Cart;
