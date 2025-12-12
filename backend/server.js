const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ match the filename
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

app.listen(5001, () => {
  console.log("Backend running on port 5001 -> http://localhost:5001");
});


