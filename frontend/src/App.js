import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Basket from "./components/Basket";

function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("ALL");
  const [quantities, setQuantities] = useState({}); // ✅ store quantities here

  useEffect(() => {
    axios.get("http://localhost:5001/api/products")
      .then(res => {
        console.log("API sample:", res.data[0]); // 👈 log the first product
        setProducts(res.data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);
  

  const addToBasket = (item) => {
    const quantity = quantities[item.id] || 1;
    setBasket([...basket, { ...item, quantity }]);
  };

  const updateQuantity = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.product_name &&
      p.product_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "ALL" || p.main_category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>🛍️ Welcome to Hossein Store</h1>

      {/* Search + Category Filter */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for goods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="ALL">All Categories</option>
          <option value="GROCERIES">Groceries</option>
          <option value="CLOTHING">Clothing</option>
          <option value="FURNITURE">Furniture</option>
        </select>
      </div>

      {/* Product list */}
      <ProductList
        products={filteredProducts}
        addToBasket={addToBasket}
        updateQuantity={updateQuantity}
        quantities={quantities}
      />

      {/* Basket */}
      <Basket basket={basket} removeFromBasket={(i) => {
        const newBasket = basket.filter((_, index) => index !== i);
        setBasket(newBasket);
      }} />
    </div>
  );
}

export default App;

