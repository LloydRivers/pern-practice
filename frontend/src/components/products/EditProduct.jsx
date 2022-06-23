import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const formValues = {
  name: "",
  price: "",
  description: "",
  category: "",
  image: "",
  rating: "",
};
const EditProduct = () => {
  let navigate = useNavigate();
  const [form, setForm] = useState(formValues);
  let { id } = useParams();

  const getSpecificProduct = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5432/getSpecificProduct/${id}`
      );
      console.log('getSpecific', data);
      const { name, price, description, category, image, rating } = data;
      setForm({ name, price, description, category, image, rating });
      console.log(data, "Success");
    } catch (e) {
      console.log(e);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const dataToUpdate = { ...form, productid: id }
    console.log('updateProduct', dataToUpdate);
    try {
      await axios.put(
        `http://localhost:5432/updateProduct/${id}`,
        dataToUpdate
      );
      console.log("updated data");
      setForm(formValues);
      navigate(`/list`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSpecificProduct(id);
    console.log("Joey Fandango");
  }, []);
  return (
    <div className="container">
      <div className="title">
        <h2>Edit Product</h2>
      </div>
      <div className="d-flex">
        <form onSubmit={(e) => updateProduct(e)}>
          <label>
            <span className="fname">
              Name <span className="required">*</span>
            </span>
            <input
              value={form.name}
              type="text"
              onChange={(e) => setForm({ ...form, Name: e.target.value })}
            />
          </label>
          <label>
            <span className="lname">
              Price <span className="required">*</span>
            </span>
            <input
              value={form.price}
              type="number"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </label>
          <label>
            <span>Description</span>
            <input
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              type="text"
              name="cn"
            />
          </label>
          <label></label>
          <label>
            <span>
              Category <span className="required">*</span>
            </span>
            <input
              type="text"
              placeholder="category..."
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </label>
          <label>
            <span>
              Image <span className="required">*</span>
            </span>
            <input
              type="text"
              placeholder="link to your image..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </label>
          <label>
            <span>
              Rating <span className="required">*</span>
            </span>
            <input
              type="number"
              placeholder="enter rating..."
              required
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            />
          </label>
          <button type="submit">update product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
