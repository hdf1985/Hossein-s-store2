export default function Basket({ basket, removeFromBasket }) {
  const total = basket.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Your Basket</h2>
      {basket.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <>
          <ul>
            {basket.map((b, i) => (
              <li key={i}>
                {b.product_name} - ${b.price} × {b.quantity}
                <button
                  onClick={() => removeFromBasket(i)}
                  style={{ marginLeft: "10px", padding: "5px 10px", backgroundColor: "red", color: "white" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}