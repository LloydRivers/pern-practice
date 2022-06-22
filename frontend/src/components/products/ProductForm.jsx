import React, { useState } from "react";
import "../../styles/style.css";
import axios from "axios";

const ProductForm = () => {
  const formValues = {
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: 0.0,
  };
  const [form, setForm] = useState(formValues);

  const createProduct = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/createProduct",
        form
      );
      console.log("inserted data");

      setForm({
        title: "",
        price: 0.0,
        description: "",
        category: "",
        image: "",
        rating: 0.0,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container">
        <div className="title">
          <h2>Product Order Form</h2>
        </div>
        <div className="d-flex">
          <form onSubmit={createProduct}>
            <label>
              <span className="fname">
                Title <span className="required">*</span>
              </span>
              <input
                value={form.title}
                type="text"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
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
                // required
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
            <button type="submit">add product</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
