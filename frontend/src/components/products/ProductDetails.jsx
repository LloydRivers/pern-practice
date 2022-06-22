import React, { useState, useEffect } from "react";
import "../../styles/details.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const productValues = {
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: 0.0,
  };

  const [product, setProduct] = useState(productValues);
  let navigate = useNavigate();

  const getSpecificProduct = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/getSpecificProduct/${id}`
      );
      console.log(data);
      setProduct(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getSpecificProduct(id);
  }, []);

  return (
    <div className="card-wrapper">
      <div className="card">
        <div>
          <img src={product.image} alt="product" />
        </div>

        <div className="product-content">
          <h2 className="product-title">{product.title}</h2>
          <a href="#" className="product-link">
            visit nike store
          </a>
          <div className="product-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <span>{product.rating}</span>
          </div>

          <div className="product-price">
            <p className="new-price">
              Price: <span>{product.price}</span>
            </p>
          </div>

          <div className="product-detail">
            <h2>{product.category}: </h2>
            <p>{product.description}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.
            </p>
            <ul>
              <li>
                Color: <span>Black</span>
              </li>
              <li>
                Available: <span>in stock</span>
              </li>
              <li>
                Category: <span>Shoes</span>
              </li>
              <li>
                Shipping Area: <span>All over the world</span>
              </li>
              <li>
                Shipping Fee: <span>Free</span>
              </li>
            </ul>
          </div>

          <div className="social-links">
            <p>Share At: </p>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
