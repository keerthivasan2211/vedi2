import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./App.css";

const API = "https://crackers-app.onrender.com"; // backend server

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ cartDetails: [] });
  const [search, setSearch] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    axios.get(`${API}/products`).then((res) => setProducts(res.data)).catch(console.error);
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios.get(`${API}/cart/display`).then((res) => setCart(res.data)).catch(console.error);
  };

  const addToCart = (name) => {
    axios.post(`${API}/cart`, { name }).then(fetchCart).catch(console.error);
  };

  const decreaseFromCart = (name) => {
    axios.put(`${API}/cart/decrease/${name}`).then(fetchCart).catch(console.error);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const getProductQuantity = (name) => {
    const item = cart.cartDetails.find((c) => c.name === name);
    return item ? item.quantity : 0;
  };

  const total = cart.cartDetails.reduce((sum, item) => sum + item.subtotal, 0);

  const downloadBill = () => {
    if (!cart.cartDetails.length) {
      alert("Cart is empty. Add products to download the bill.");
      return;
    }
    if (!customerName.trim()) {
      alert("Enter customer name to download the bill.");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`${customerName} Bill`, doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Invoice No: INV-${Math.floor(Math.random() * 100000)}`, 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42);
    doc.text(`Billed To: ${customerName}`, 20, 49);

    autoTable(doc, {
      head: [["Product", "Price", "Qty", "Subtotal"]],
      body: cart.cartDetails.map((item) => [
        item.name,
        `₹${item.discountedPrice.toFixed(2)}`,
        item.quantity,
        `₹${item.subtotal.toFixed(2)}`
      ]),
      startY: 60,
      theme: "grid",
      headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255], fontSize: 11, fontStyle: "bold" },
      bodyStyles: { textColor: [50, 50, 50], fontSize: 10 }
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`Grand Total: ₹${total.toFixed(2)}`, doc.internal.pageSize.getWidth() - 20, doc.lastAutoTable.finalY + 15, { align: "right" });

    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text("Thank you for your purchase!", doc.internal.pageSize.getWidth() / 2, doc.lastAutoTable.finalY + 30, { align: "center" });

    doc.save(`Invoice_${customerName}_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="app-container">
      {/* Product Section */}
      <div className="product-section">
        <h1 className="section-title">Product Catalog</h1>
        <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" />
        <ul className="product-list">
          {filteredProducts.length ? filteredProducts.map((p) => (
            <li key={p.name} className="product-item">
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-desc">{p.description}</p>
                <p className="product-price">₹{p.price.toFixed(2)}</p>
                <p className="product-discount">₹{(p.price * 0.85).toFixed(2)} (15% OFF)</p>
              </div>
              <div className="product-actions">
                <button onClick={() => addToCart(p.name)} className="btn add">+</button>
                <span className="quantity">{getProductQuantity(p.name)}</span>
                <button onClick={() => decreaseFromCart(p.name)} className="btn remove">-</button>
              </div>
            </li>
          )) : <p className="no-products">No products available</p>}
        </ul>
      </div>

      {/* Mobile Toggle Button */}
      <button className="toggle-invoice-btn" onClick={() => setShowInvoice(!showInvoice)}>
        ☰ {showInvoice ? "Hide Invoice" : "Show Invoice"}
      </button>

      {/* Overlay */}
      {showInvoice && <div className="overlay" onClick={() => setShowInvoice(false)}></div>}

      {/* Invoice Section (Top Drawer) */}
      <div className={`bill-section ${showInvoice ? "show-top" : ""}`}>
        <h2 className="section-title">Invoice Preview</h2>
        <input type="text" placeholder="Enter customer name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="customer-input" />
        <div className="bill-table-container">
          {cart.cartDetails.length ? (
            <table className="bill-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartDetails.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td className="text-right text-green">₹{item.discountedPrice.toFixed(2)}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-right">₹{item.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p className="empty-cart">Cart is empty</p>}
        </div>
        <div className="total-section">
          <span className="total-amount">Total: ₹{total.toFixed(2)}</span>
          <button onClick={downloadBill} className="download-button">Download Invoice</button>
        </div>
      </div>
    </div>
  );
}

export default App;
