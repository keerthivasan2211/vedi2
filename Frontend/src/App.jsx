import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./App.css";

const API = "https://vedi2-backend.onrender.com"; // your Render backend

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(true); // loader state

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.name === product.name);
    if (existing) {
      const updated = cart.map((item) =>
        item.name === product.name
          ? { ...item, qty: item.qty + 1, subtotal: (item.qty + 1) * item.price }
          : item
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...product, qty: 1, subtotal: product.price }]);
    }
  };

  // Totals
  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const discountedTotal = (total * 0.85).toFixed(2);

  // Download bill
  const downloadBill = () => {
    if (!customerName.trim()) {
      alert("Please enter your name");
      return;
    }

    const now = new Date();
    const dateTime = now.toLocaleString();
    const billName = `${customerName}_${now.toISOString().replace(/[:.]/g, "-")}.pdf`;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Fireworks Store Bill", 14, 20);
    doc.setFontSize(12);
    doc.text(`Customer: ${customerName}`, 14, 30);
    doc.text(`Date & Time: ${dateTime}`, 14, 37);

    autoTable(doc, {
      head: [["Product", "Qty", "Price", "Subtotal"]],
      body: cart.map((item) => [
        item.name,
        item.qty,
        `₹${item.price}`,
        `₹${item.subtotal.toFixed(2)}`
      ]),
      startY: 45,
    });

    doc.text(`Total: ₹${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Discounted (15% OFF): ₹${discountedTotal}`, 14, doc.lastAutoTable.finalY + 20);

    doc.save(billName);
  };

  return (
    <div className="App">
      <h1>🎆 Fireworks Store 🎆</h1>

      {/* Loader */}
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>⏳ Products Loading...</p>
        </div>
      ) : (
        <>
          {/* Products */}
          <div className="product-section">
            <h2>Products</h2>
            {products.map((p, i) => (
              <div key={i} className="product">
                <span>
                  {p.name} - ₹{p.price}
                </span>
                <button onClick={() => addToCart(p)}>Add</button>
              </div>
            ))}
          </div>

          {/* Cart */}
          <div className="cart-section">
            <h2>🛒 Cart</h2>
            {cart.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <span>{item.name}</span>
                  <div className="qty-controls">
                    <button
                      onClick={() => {
                        if (item.qty > 1) {
                          const updatedCart = [...cart];
                          updatedCart[index].qty -= 1;
                          updatedCart[index].subtotal =
                            updatedCart[index].qty * updatedCart[index].price;
                          setCart(updatedCart);
                        }
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => {
                        const newQty = parseInt(e.target.value) || 1;
                        if (newQty > 0) {
                          const updatedCart = [...cart];
                          updatedCart[index].qty = newQty;
                          updatedCart[index].subtotal =
                            updatedCart[index].qty * updatedCart[index].price;
                          setCart(updatedCart);
                        }
                      }}
                      style={{
                        width: "50px",
                        textAlign: "center",
                        margin: "0 5px",
                      }}
                    />
                    <button
                      onClick={() => {
                        const updatedCart = [...cart];
                        updatedCart[index].qty += 1;
                        updatedCart[index].subtotal =
                          updatedCart[index].qty * updatedCart[index].price;
                        setCart(updatedCart);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <span>₹{item.subtotal.toFixed(2)}</span>
                </div>
              ))
            )}

            {cart.length > 0 && (
              <>
                <h3>Total: ₹{total.toFixed(2)}</h3>
                <h3>Discounted (15%): ₹{discountedTotal}</h3>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ marginTop: "10px", padding: "5px" }}
                />
                <button onClick={downloadBill} style={{ marginTop: "10px" }}>
                  Download Bill
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;