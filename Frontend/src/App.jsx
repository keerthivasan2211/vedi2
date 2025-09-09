import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./App.css";

const API = "https://vedi2-backend.onrender.com";

function App() {
  const [products, setProducts] = useState({});
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [billName, setBillName] = useState("");
  const [showCart, setShowCart] = useState(false);

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data);
  };

  const fetchCart = async () => {
    const res = await axios.get(`${API}/cart/display`);
    setCart(res.data.cartDetails);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("cart-open", showCart);
  }, [showCart]);

  const increaseCart = async (name) => {
    await axios.put(`${API}/cart/increase/${name}`);
    fetchCart();
  };

  const decreaseCart = async (name) => {
    await axios.put(`${API}/cart/decrease/${name}`);
    fetchCart();
  };

  const getQuantity = (name) => {
    const item = cart.find((i) => i.name === name);
    return item ? item.quantity : 0;
  };

  const filteredProducts = Object.keys(products).reduce((acc, group) => {
    const groupMatches = group.toLowerCase().includes(search.toLowerCase());
    const filteredItems = products[group].filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    if (groupMatches || filteredItems.length > 0) {
      acc[group] = filteredItems.length > 0 ? filteredItems : products[group];
    }
    return acc;
  }, {});

  const downloadPDF = () => {
    if (cart.length === 0) return;

    if (!billName.trim()) {
      alert("⚠️ Please enter your name before downloading the bill.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🛒 Firework Store Invoice", 14, 22);
    doc.setFontSize(12);
    doc.setTextColor(100);

    const tableColumn = ["Name", "Original Price", "Discounted Price", "Quantity", "Subtotal"];
    const tableRows = cart.map(item => [
      item.name,
      `₹${item.originalPrice.toFixed(2)}`,
      `₹${item.discountedPrice.toFixed(2)}`,
      item.quantity,
      `₹${item.subtotal.toFixed(2)}`
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [74, 144, 226] }
    });

    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const discountedTotal = total.toFixed(2);

    // ✅ Get current date and time
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();

    // ✅ Format date for filename (YYYY-MM-DD)
    const fileDate = now.toISOString().split("T")[0];

    doc.text(`Name: ${billName}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Date: ${dateStr}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text(`Time: ${timeStr}`, 14, doc.lastAutoTable.finalY + 30);
    doc.text(`Total: ₹${discountedTotal}`, 14, doc.lastAutoTable.finalY + 40);

    // ✅ Save with billName + date in file name
    doc.save(`${billName}_${fileDate}_invoice.pdf`);
  };

  return (
    <div className="App">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by product or group..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Main Layout: Products + Cart */}
      <div className="main-content">
        <div className="products">
          {Object.keys(filteredProducts).map((group) => (
            <div key={group} className="group">
              <h2>{group}</h2>

              <div className="group-items">
                {filteredProducts[group].map((item) => (
                  <div key={item.name} className="product-card">
                    <h3>{item.name}</h3>
                    <h3>{item.tamilName}</h3>
                    <p>Original Price: ₹{item.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <button onClick={() => decreaseCart(item.name)}>-</button>
                      <span className="quantity">{getQuantity(item.name)}</span>
                      <button onClick={() => increaseCart(item.name)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Panel */}
        <div className={`cart-panel ${showCart ? "show" : ""}`}>
          <div className="close-cart-btn">
            <button onClick={() => setShowCart(false)}>✖</button>
          </div>

          <h2>🛒 Cart</h2>
          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <>
              <div className="bill-name-input">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={billName}
                  onChange={(e) => setBillName(e.target.value)}
                />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>₹{item.originalPrice.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Footer */}
              <div className="cart-footer">
                <h3>
                  Total: ₹{cart.reduce((sum, i) => sum + i.subtotal, 0).toFixed(2)}
                </h3>
                <h3>
                  Discounted Total: ₹
                  {(cart.reduce((sum, i) => sum + i.subtotal, 0) * 0.85).toFixed(2)}
                </h3>
                <button className="download-btn" onClick={downloadPDF}>
                  Download PDF
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toggle button - only for small screens */}
      <div className="cart-toggle-btn">
        {!showCart && (
          <button onClick={() => setShowCart(true)}>
            Show Cart 🛒 ({cart.length})
          </button>
        )}
      </div>
    </div>
  );
}

export default App;