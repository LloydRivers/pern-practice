import React, { useState, useEffect } from "react";
import "../../styles/product-listing.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
  let navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/getProducts");
      console.log(data);

      setAllProducts(data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(` http://localhost:4000/deleteProduct/${id}`);
    } catch (e) {
      console.log(e);
    }
  };
  const handleEdit = async (id) => {
    navigate(`/edit/${id}`);
  };
  const handleDetailsPage = async (id) => {
    navigate(`/details/${id}`);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    ///getProducts
    <>
      <div className="container">
        <div className="row py-5">
          <div className="col-12">
            <table
              id="example"
              className="table table-hover"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="font-weight-bold mb-0">
                              {product.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
                      <td>
                        <img width="50px" src={product.image} />
                      </td>
                      <td>{product.rating}</td>
                      <td>
                        <button onClick={() => handleEdit(product.id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(product.id)}>
                          Delete
                        </button>
                        <button onClick={() => handleDetailsPage(product.id)}>
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
