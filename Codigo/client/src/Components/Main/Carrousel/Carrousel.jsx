import React from "react";
import { Carousel } from "react-bootstrap";
import "./carousel.scss";

export const Carrousel = () => {
  return (
    <Carousel className="ppal-carrousel">
      <Carousel.Item interval={3000}>
        <img src="/images/slides/1.jpeg" alt="" />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img src="/images/slides/2.jpeg" alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="/images/slides/3.jpeg" alt="" />
      </Carousel.Item>
    </Carousel>
  );
};
