import React, { useState, useEffect } from "react";
import "../../styles/product-listing.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
  let navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5432/getProducts");
      console.log(data);

      setAllProducts(data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(` http://localhost:5432/deleteProduct/${id}`);
      setRefetch(true);
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
    setRefetch(false);
  }, [refetch]);
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
                  <th>Name</th>
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
                    <tr key={product.productid}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="font-weight-bold mb-0">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
                      <td>
                        <img width="50px" src={product.image} alt={product.name} />
                      </td>
                      <td>{product.rating}</td>
                      <td>
                        <button onClick={() => handleEdit(product.productid)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(product.productid)}>
                          Delete
                        </button>
                        <button onClick={() => handleDetailsPage(product.productid)}>
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
