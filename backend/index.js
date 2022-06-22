// create express app
const express = require("express");
const app = express();
// Adding MassiveJS
const massive = require("massive");
require("dotenv").config();
const { URI } = process.env;

const cors = require("cors");
app.use(cors());
app.use(express.json());
const {
  getProducts,
  getSpecificProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("./controllers/productController");

massive(
  {
    connectionString: URI,
    ssl: { rejectUnauthorized: false },
  },
  {
    scripts: "./db",
  }
)
  .then((db) => {
    app.set("db", db);
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("DB Connection Failed!");
  });

const PORT = process.env.PORT || 4000;
app.get("/getProducts", getProducts);
app.get("/getSpecificProduct/:id", getSpecificProduct);
app.post("/createProduct", createProduct);
app.delete("/deleteProduct/:id", deleteProduct);
app.put("/updateProduct/:id", updateProduct);

/****************************************/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
