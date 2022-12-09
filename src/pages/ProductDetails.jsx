import React, { useEffect, useState } from "react";
import "../styles/product-details.scss";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet.js/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { authSelector } from "../redux/slices/authSlice";
import { apiCallerWithToken } from "../config/configAxios";

const ProductDetails = () => {
  const { tab, setTab } = useState("desc");
  const { id } = useParams();
  const dispatch = useDispatch();
  // const product = products.find((item) => item.id === id);

  // const {
  //   imgUrl,
  //   productName,
  //   price,
  //   avgRating,
  //   reviews,
  //   description,
  //   shortDesc,
  // } = product;
  const [product, setProduct] = useState();
  const { accessToken } = useSelector(authSelector);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios("http://localhost:8080/api/product/" + id);
        const { message, data } = res.data;
        if (message === "Success") {
          setProduct(data);
        }
      } catch (error) {}
    })();
  }, [id]);
  console.log(product);

  const addToCart = async () => {
    try {
      const res = await apiCallerWithToken(accessToken, dispatch).post(
        "cart/item",
        {
          productId: product.id,
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
    <Helmet title={product?.name}>
      <CommonSection title={product?.name} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={product?.thumbnail} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{product?.name}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-line"></i>
                    </span>
                  </div>

                  {/* <p>
                    (<span>{avgRating}</span> ratings)
                  </p> */}
                </div>

                <span className="product__price">{product?.price}đ</span>
                <p className="mt-3">{product?.description}</p>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Col lg="12">
            <div className="tab__wrapper d-flex align-items-center gap-5">
              <h6
                className={`${tab === "desc" ? "active__tab" : ""}`}
                onClick={() => setTab("desc")}
              >
                Description
              </h6>
              <h6
                className={`${tab === "rev" ? "active__tab" : ""}`}
                onClick={() => setTab("rev")}
              >
                {/* Reviews ({reviews.length}) */}
              </h6>
            </div>
            <div className="tab__content mt-5">
              <p>{product?.description}</p>
            </div>
          </Col>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
