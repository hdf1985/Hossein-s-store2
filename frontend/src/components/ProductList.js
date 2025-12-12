export default function ProductList({ products, addToBasket, updateQuantity, quantities }) {
  return (
    <div>
      <h2>Available Goods</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map(p => (
            <li key={p.id} style={{ marginBottom: "10px" }}>
              <span>{p.product_name} - ${p.price}</span>

              {/* Quantity selector */}
              <input
                type="number"
                min="1"
                value={quantities[p.id] || 1}
                onChange={(e) => updateQuantity(p.id, parseInt(e.target.value))}
                style={{ width: "60px", marginLeft: "10px" }}
              />

              {/* Add to basket button */}
              <button
                onClick={() => addToBasket(p)}
                style={{ marginLeft: "10px", padding: "5px 10px" }}
              >
                Add to Basket
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}