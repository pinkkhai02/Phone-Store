import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "../styles/home.scss";
import Helmet from "../components/Helmet.js/Helmet";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import Clock from "../components/UI/Clock";

import heroImg from "../assets/images/hero-img.png";
import products from "../assets/data/products";
import counterImg from "../assets/images/counter-timer-img.png";
import axios from "axios";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const year = new Date().getFullYear();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios("http://localhost:8080/api/product", {
          params: { limit: 4 },
        });
        const { message, data } = res.data;
        if (message === "Success") {
          setTrendingProducts(data.items);
        }
      } catch (error) {}
    })();
  }, []);

  // useEffect(() => {
  //   const filteredTrendingProducts = products.filter(
  //     (item) => item.category === "chair"
  //   );

  //   const filteredBestSalesProducts = products.filter(
  //     (item) => item.category === "sofa"
  //   );

  //   const filteredMobileProducts = products.filter(
  //     (item) => item.category === "mobile"
  //   );

  //   const filteredWirelessProducts = products.filter(
  //     (item) => item.category === "wireless"
  //   );

  //   const filteredPopularProducts = products.filter(
  //     (item) => item.category === "watch"
  //   );

  //   setTrendingProducts(filteredTrendingProducts);
  //   setBestSalesProducts(filteredBestSalesProducts);
  //   setMobileProducts(filteredMobileProducts);
  //   setWirelessProducts(filteredWirelessProducts);
  //   setPopularProducts(filteredPopularProducts);
  // }, []);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year} </p>
                <h2>Make Your Life More Minimalistic & Modern</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
                  pariatur. Tempore eum non a dolorem qui ex veritatis magnam
                  architecto aspernatur blanditiis, fugiat et illo sint placeat
                  assumenda? Dolorum, itaque?
                </p>

                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop"> Shop now</Link>
                </motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending__product">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Produtcs</h2>
            </Col>
            <ProductsList data={trendingProducts} />
          </Row>
        </Container>
      </section>

      {/* <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center ">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />

              <motion.button whileTap={{ scale: 1.2 }} className="store__btn">
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>

            <Col lg="6" md="6" className="text-end">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            <ProductsList data={mobileProducts} />
            <ProductsList data={wirelessProducts} />
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Popular Category</h2>
            </Col>
            <ProductsList data={popularProducts} />
          </Row>
        </Container>
      </section> */}
    </Helmet>
  );
};

export default Home;
