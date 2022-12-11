import React from "react";

import { motion } from "framer-motion";
import "../../styles/product-card.scss";

import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { apiCallerWithToken } from "../../config/configAxios";
import { authSelector } from "../../redux/slices/authSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(authSelector);

  const addToCard = async () => {
    try {
      const res = await apiCallerWithToken(accessToken, dispatch).post(
        "cart/item",
        {
          productId: item.id,
          quantity: 1,
        }
      );
      const { message, data } = res.data;
      if (message === "Success") {
        dispatch(cartActions.addToCart(data));
        toast.success("Product added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item ">
        <Link to={`/shop/${item?.id}`}>
          <div className="product__img">
            <motion.img
              whileHover={{ scale: 0.9 }}
              src={item?.thumbnail}
              alt=""
            />
          </div>
          <div className="p-2 product__info">
            <h3 className="product__name">
              <span>{item?.name}</span>
            </h3>
            <span>{item?.productCategory.name}</span>
          </div>
        </Link>
        <div className="product__cart-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">{item?.price}đ</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCard}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
