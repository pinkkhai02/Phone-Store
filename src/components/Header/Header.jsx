import React, { useEffect } from "react";
import "./header.scss";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiCallerWithToken } from "../../config/configAxios";
import { cartActions, cartSelector } from "../../redux/slices/cartSlice";
import { authSelector } from "../../redux/slices/authSlice";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  // const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();

  const navigateToCart = () => {
    navigate("/cart");
  };

  const { accessToken, user } = useSelector(authSelector);
  const { cart } = useSelector(cartSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        if (accessToken) {
          const res = await Promise.allSettled([
            apiCallerWithToken(accessToken, dispatch).get("cart/account"),
          ]);
          const { code, message, data } = res[0].value.data;
          if (code === 200 && message === "Success") {
            console.log(data);
            dispatch(cartActions.setCart(data));
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accessToken, dispatch]);

  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper">
            <Link to="/home">
              <div className="logo">
                <img src={logo} alt="" />
                <div>
                  <h1>Multimart</h1>
                  <p>Since 1995</p>
                </div>
              </div>
            </Link>

            <div className="navigation">
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <Link
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">
                  {cart ? cart.items.reduce((p, c) => p + c.quantity, 0) : 0}
                </span>
              </span>
              <span>
                <Link to={user ? "/signup" : "/profile"}>
                  <motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="" />
                </Link>
              </span>
            </div>

            <div className="mobile__menu">
              <span>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
