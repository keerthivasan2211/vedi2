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
  const [loading, setLoading] = useState(true);

  // Local state to store manual input values before sending to server
  const [localQuantities, setLocalQuantities] = useState({});

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data);
  };

  const fetchCart = async () => {
    const res = await axios.get(`${API}/cart/display`);
    setCart(res.data.cartDetails);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCart()]);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("cart-open", showCart);
  }, [showCart]);

  const increaseCart = async (name) => {
    await axios.put(`${API}/cart/increase/${encodeURIComponent(name)}`);
    fetchCart();
  };

  const decreaseCart = async (name) => {
    await axios.put(`${API}/cart/decrease/${encodeURIComponent(name)}`);
    fetchCart();
  };

  // New function to set quantity directly
  const updateCartQuantity = async (name, quantity) => {
    await axios.put(`${API}/cart/update/${encodeURIComponent(name)}`, { quantity });
    fetchCart();
  };

  // Compute what to show in quantity: priority is manual input, otherwise server state
  const getQuantityToShow = (name) => {
    if (localQuantities[name] !== undefined) {
      return localQuantities[name];
    }
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
    const tableRows = cart.map((item) => [
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

    const originalTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const discountedTotal = (originalTotal * 0.85).toFixed(2);

    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    const fileDate = now.toISOString().split("T")[0];

    let yPos = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(12);
    doc.text(`Customer Name: ${billName}`, 14, yPos);
    doc.text(`Date: ${dateStr}`, 14, yPos + 10);
    doc.text(`Time: ${timeStr}`, 14, yPos + 20);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Original Total: ₹${originalTotal.toFixed(2)}`, 14, yPos + 35);
    doc.text(`Discounted Total: ₹${discountedTotal}`, 14, yPos + 45);

    doc.save(`${billName}_${fileDate}_invoice.pdf`);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>⏳ Products Loading , please wait...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by product or group..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
                      <input
                        type="number"
                        className="quantity-input"
                        min="0"
                        value={getQuantityToShow(item.name)}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setLocalQuantities((prev) => ({
                            ...prev,
                            [item.name]: isNaN(val) ? 0 : val
                          }));
                        }}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val)) {
                            updateCartQuantity(item.name, val);
                          }
                          setLocalQuantities((prev) => {
                            const next = { ...prev };
                            delete next[item.name];
                            return next;
                          });
                        }}
                      />
                      <button onClick={() => increaseCart(item.name)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

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

              <div className="cart-footer">
                <h3>Total: ₹{cart.reduce((sum, i) => sum + i.subtotal, 0).toFixed(2)}</h3>
                <h3>Discounted Total: ₹{(cart.reduce((sum, i) => sum + i.subtotal, 0) * 0.85).toFixed(2)}</h3>
                <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="cart-toggle-btn">
        {!showCart && <button onClick={() => setShowCart(true)}>Show Cart 🛒 ({cart.length})</button>}
      </div>
    </div>
  );
}

export default App;
