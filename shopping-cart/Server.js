const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

/* ---------------- PRELOADED PRODUCTS ---------------- */
let products = [
  { name: "7 Cm Electric Sparklers (10 Pcs)", tamilName: "7 ùN.Á GXdh¬d Lm© (10 Àv)", price: 110.00, description: "7 cm electric sparkler firework" },
  { name: "7 Cm Colour Sparklers (10 Pcs)", tamilName: "7 ùN.Á LXo Lm© (10 Àv)", price: 120.00, description: "7 cm color sparkler firework" },
  { name: "10 Cm Electric Sparklers (10 Pcs)", tamilName: "10 ùN.Á GXdh¬d Lm© (10 Àv)", price: 166.00, description: "10 cm electric sparkler firework" },
  { name: "10 Cm Colour Sparklers (10 Pcs)", tamilName: "10 ùN.Á LXo Lm© (10 Àv)", price: 176.00, description: "10 cm color sparkler firework" },
  { name: "12 Cm Electric Sparklers (10 Pcs)", tamilName: "12 ùN.Á GXdh¬d Lm© (10 Àv)", price: 240.00, description: "12 cm electric sparkler firework" },
  { name: "12 Cm Colour Sparklers (10 Pcs)", tamilName: "12 ùN.Á LXo Lm© (10 Àv)", price: 260.00, description: "12 cm color sparkler firework" },
  { name: "12 Cm Green Sparklers (10 Pcs)", tamilName: "12 ùN.Á TfûN Lm© (10 Àv)", price: 276.00, description: "12 cm green sparkler firework" },
  { name: "12 Cm Red Sparklers (10 Pcs)", tamilName: "12 ùN.Á £Yl× Lm© (10 Àv)", price: 310.00, description: "12 cm red sparkler firework" },
  { name: "15 Cm Electric Sparklers (10 Pcs)", tamilName: "15 ùN.Á GXdh¬d Lm© (10 Àv)", price: 374.00, description: "15 cm electric sparkler firework" },
  { name: "15 Cm Colour Sparklers (10 Pcs)", tamilName: "15 ùN.Á LXo Lm© (10 Àv)", price: 396.00, description: "15 cm color sparkler firework" },
  { name: "30 Cm Electric Sparklers (5 Pcs)", tamilName: "30 ùN.Á GXdh¬d Lm© (5 Àv)", price: 374.00, description: "30 cm electric sparkler firework" },
  { name: "30 Cm Colour Sparklers (5 Pcs)", tamilName: "30 ùN.Á LXo Lm© (5 Àv)", price: 396.00, description: "30 cm color sparkler firework" },
  { name: "50 Cm Electric Sparklers (5 Pcs)", tamilName: "50 ùN.Á GXdh¬d Lm© (5 Àv)", price: 1740.00, description: "50 cm electric sparkler firework" },
  { name: "50 Cm Colour Sparklers (5 Pcs)", tamilName: "50 ùN.Á LXo Lm© (5 Àv)", price: 1900.00, description: "50 cm color sparkler firework" },
  { name: "50 Cm Green Sparklers (5 Pcs)", tamilName: "50 ùN.Á TfûN Lm© (5 Àv)", price: 1980.00, description: "50 cm green sparkler firework" },
  { name: "Rotating Sparklers", tamilName: "ÑZt£ Lm© UjRôl×", price: 2200.00, description: "Rotating sparkler firework" },
  { name: "75 Cm Colour Sparklers", tamilName: "75 ùN.Á LXo Lm©", price: 3246.00, description: "75 cm color sparkler firework" },
  { name: "4\" Lakshmi", tamilName: "4\" ùXhÑª (5 Pcs)", price: 166.00, description: "4-inch Lakshmi flash sound cracker" },
  { name: "4\" Dlx. Lakshmi", tamilName: "4\" ùXhÑª (5 Pcs)", price: 276.00, description: "4-inch deluxe Lakshmi flash sound cracker" },
  { name: "4\" Gold Lakshmi", tamilName: "4\" úLôpÓ XhÑª (5 Pcs)", price: 254.00, description: "4-inch gold Lakshmi flash sound cracker" },
  { name: "4\" Super Deluxe Lakshmi", tamilName: "4\" ãlTo ¼Xdv XhÑª (5 Pcs)", price: 308.00, description: "4-inch super deluxe Lakshmi flash sound cracker" },
  { name: "3½\" Lakshmi Crackers", tamilName: "3½\" ùXhÑª ¡WôdLov (5 Pcs)", price: 132.00, description: "3.5-inch Lakshmi cracker" },
  { name: "2¾\" Bird Crackers", tamilName: "2¾\" ÏÚ® ¡WôdLov (5 Pcs)", price: 88.00, description: "2.75-inch bird cracker" },
  { name: "Two Sound", tamilName: "2 NÜih (5 Pcs)", price: 396.00, description: "Dual sound cracker" },
  { name: "5\" Bahubali Sup Spl Deluxe", tamilName: "5\" TôÏLã.vùT`p ¼Xdv (5 Pcs)", price: 440.00, description: "5-inch Bahubali super special deluxe cracker" },
  { name: "5\" Jallikattu Sup Spl Deluxe", tamilName: "5\" _pdLhÓã.vùT.¼Xdv (5 Pcs)", price: 500.00, description: "5-inch Jallikattu super special deluxe cracker" },
  { name: "Bullet Bomb (10 Pcs)", tamilName: "×pXh Tôm (10 Pcs)", price: 220.00, description: "Bullet-style atom bomb firework" },
  { name: "Hydro Bomb (10 Pcs)", tamilName: "ûahúWô Tôm (10 Pcs)", price: 600.00, description: "Hydro-style atom bomb firework" },
  { name: "King Bomb (3 Ply) (10 Pcs)", tamilName: "¡e Tôm (3 Ply) (10 Pcs)", price: 800.00, description: "King multi-layered atom bomb firework" },
  { name: "Classic Bomb (5 Ply) (10 Pcs)", tamilName: "¡[ô£d Tôm (5 Ply) (10 Pcs)", price: 1000.00, description: "Classic multi-layered atom bomb firework" },
  { name: "Tracer Bomb (7 Ply) (10 Pcs)", tamilName: "¥úWNo Tôm (7 Ply) (10 Pcs)", price: 1600.00, description: "Tracer multi-layered atom bomb firework" },
  { name: "Agni Bomb (10 Pcs)", tamilName: "Ad² Tôm (10 Pcs)", price: 2000.00, description: "Agni atom bomb firework" },
  { name: "Digital Bomb (10 Pcs)", tamilName: "¥´hPp Tôm (10 Pcs)", price: 2400.00, description: "Digital atom bomb firework" },
  { name: "Red Bijili (100 Pcs)", tamilName: "£Yl× ©´ (100 Pcs)", price: 340.00, description: "Red bijili cracker" },
  { name: "Stripped Bijili (100 Pcs)", tamilName: "úLôÓ ©´ (100 Pcs)", price: 360.00, description: "Striped bijili cracker" },
  { name: "Ground Chakkar Big (10 Pcs)", tamilName: "RûWNdLWm ùT¬VÕ (10 Àv)", price: 400.00, description: "Big ground chakkar firework" },
  { name: "Ground Chakkar Special (10 Pcs)", tamilName: "RûWNdLWm vùT`p (10 Àv)", price: 600.00, description: "Special ground chakkar firework" },
  { name: "Ground Chakkar Deluxe (10 Pcs)", tamilName: "RûWNdLWm ¼Xdv (10 Àv)", price: 1200.00, description: "Deluxe ground chakkar firework" },
  { name: "Ground Chakkar Spl (Plastic Wheel)", tamilName: "RûWNdLWm vùT`p(©[ôv¥d)", price: 800.00, description: "Special plastic wheel ground chakkar" },
  { name: "Ground Chakkar Dlx (Plastic Wheel)", tamilName: "RûWNdLWm ¼Xdv (©[ôv¥d)", price: 1600.00, description: "Deluxe plastic wheel ground chakkar" },
  { name: "Flower Pots Small (10 Pcs)", tamilName: "éfNh¥ £±VÕ (10 Àv)", price: 560.00, description: "Small flower pot firework" },
  { name: "Flower Pots Big (10 Pcs)", tamilName: "éfNh¥ ©d (10 Àv)", price: 760.00, description: "Big flower pot firework" },
  { name: "Flower Pots Special (10 Pcs)", tamilName: "éfNh¥ vùT`p (10 Àv)", price: 960.00, description: "Special flower pot firework" },
  { name: "Flower Pots Asoka (10 Pcs)", tamilName: "éfNh¥ AúNôLô (10 Àv)", price: 1160.00, description: "Asoka flower pot firework" },
  { name: "Flower Pots Deluxe (5 Pcs)", tamilName: "éfNh¥ ¼Lpv (5 Àv)", price: 1800.00, description: "Deluxe flower pot firework" },
  { name: "Flower Pots Super Dlx. (2 Pcs)", tamilName: "éfNh¥ ãlTo ¼Xdv (2 Àv)", price: 1000.00, description: "Super deluxe flower pot firework" },
  { name: "Flower Pots Colour Koti (10 Pcs)", tamilName: "éfNh¥ LXo úLôh¥ (10 Àv)", price: 2000.00, description: "Colour koti flower pot firework" },
  { name: "Colour Koti Deluxe (10 Pcs)", tamilName: "LXo úLôh¥ ¼Xdv (10 Àv)", price: 3600.00, description: "Deluxe colour koti firework" },
  { name: "Baby Rocket (10 Pcs)", tamilName: "úT© WôdùLh (10 Àv)", price: 264.00, description: "Baby rocket firework" },
  { name: "Rocket Bomb (10 Pcs)", tamilName: "WôdùLh Tôm (10 Àv)", price: 490.00, description: "Rocket bomb firework" },
  { name: "Lunik Express (10 Pcs)", tamilName: "í²d Gdv©Wv (10 Àv)", price: 960.00, description: "Lunik express rocket firework" },
  { name: "1.5' Twinkling Star (10 Pcs)", tamilName: "¥®eL°e vPôo (10 Àv)", price: 220.00, description: "1.5 ft twinkling star firework" },
  { name: "4' Twinkling Star (10 Pcs)", tamilName: "¥®eL°e vPôo (10 Àv)", price: 660.00, description: "4 ft twinkling star firework" },
  { name: "Crackling Kingdom (2 Pcs)", tamilName: "¡Wôd¡e ¡ePm (2 Àv)", price: 2600.00, description: "Crackling kingdom firework" },
  { name: "Mercury Torch (1 Pcs)", tamilName: "ùUodÏ¬ Pôof (1 Àv)", price: 2000.00, description: "Mercury torch firework" },
  { name: "Selfie Stick Red Green (5 Pcs)", tamilName: "ùNp© v¥d (ùWh ¡Ãu (5 Àv)", price: 1400.00, description: "Red green selfie stick firework" },
  { name: "Electric Stone (10 Pcs)", tamilName: "GXdP¬d vúPôu (10 Àv)", price: 88.00, description: "Electric stone fancy firework" },
  { name: "Tip Top (10 Pcs)", tamilName: "¥l Pôl úYpÓ (10 Àv)", price: 242.00, description: "Tip top fancy firework" },
  { name: "Pop Corn (10 Pcs)", tamilName: "Tôl Lôu (10 Àv)", price: 500.00, description: "Pop corn fancy firework" },
  { name: "Toys Cartoon Box (10 Pcs)", tamilName: "Pônv Lôohåu (10 Àv)", price: 176.00, description: "Toys cartoon box fancy firework" },
  { name: "Silver Queen (5 Pcs)", tamilName: null, price: 680.00, description: "Silver queen colour fountain" },
  { name: "Colour Rain (5 Pcs)", tamilName: null, price: 680.00, description: "Colour rain fountain" },
  { name: "Peacock Feather (5 Pcs)", tamilName: null, price: 680.00, description: "Peacock feather fountain" },
  { name: "Golden Star (5 Pcs)", tamilName: null, price: 680.00, description: "Golden star fountain" },
  { name: "Green Garden (5 Pcs)", tamilName: null, price: 680.00, description: "Green garden fountain" },
  { name: "Red Star (5 Pcs)", tamilName: null, price: 680.00, description: "Red star fountain" },
  { name: "Teddy", tamilName: null, price: 1600.00, description: "Teddy colour fountain" },
  { name: "9000", tamilName: null, price: 1600.00, description: "9000 colour fountain" },
  { name: "Golden Peacock", tamilName: null, price: 1600.00, description: "Golden peacock fountain" },
  { name: "Thunder", tamilName: null, price: 1600.00, description: "Thunder colour fountain" },
  { name: "Colour Pots (5 Pcs)", tamilName: null, price: 960.00, description: "Colour pots fountain" },
  { name: "5 Colour Deluxe Fountain (5 Pcs)", tamilName: null, price: 3000.00, description: "5 colour deluxe fountain" },
  { name: "Photo Flash (5 Pcs)", tamilName: null, price: 800.00, description: "Photo flash fountain" },
  { name: "Rainbow Smoke (5 Pcs)", tamilName: null, price: 1800.00, description: "Rainbow smoke fountain" },
  { name: "Siren (2 Pcs)", tamilName: null, price: 1700.00, description: "Siren whistling novelty" },
  { name: "Siren (5 Pcs)", tamilName: null, price: 1700.00, description: "Siren whistling novelty" },
  { name: "Turbo Wheel (5 Pcs) 4x4", tamilName: null, price: 1800.00, description: "Turbo wheel whistling novelty" },
  { name: "Lollipop (5 Pcs)", tamilName: null, price: 2750.00, description: "Lollipop whistling novelty" },
  { name: "Drone (5 Pcs)", tamilName: null, price: 2400.00, description: "Drone new novelty" },
  { name: "Gun (5 Pcs)", tamilName: null, price: 2400.00, description: "Gun new novelty" },
  { name: "Helicopter (5 Pcs)", tamilName: null, price: 1200.00, description: "Helicopter new novelty" },
  { name: "Emu Egg", tamilName: null, price: 3000.00, description: "Emu egg new novelty" },
  { name: "Pamparam (5 Pcs)", tamilName: null, price: 1100.00, description: "Pamparam new novelty" },
  { name: "Jack Pot (2 Pcs)", tamilName: null, price: 3300.00, description: "Jack pot new novelty" },
  { name: "Butterfly (Red & Green & White)", tamilName: null, price: 880.00, description: "Butterfly new novelty" },
  { name: "Bada Peacock", tamilName: null, price: 4840.00, description: "Bada peacock new novelty" },
  { name: "Water Falls", tamilName: null, price: 3080.00, description: "Water falls new novelty" },
  { name: "Flying Dancer (10 Pcs)", tamilName: null, price: 880.00, description: "Flying dancer new novelty" },
  { name: "Money in Bank", tamilName: null, price: 2100.00, description: "Money in bank colour fountain" },
  { name: "Gittar", tamilName: null, price: 2800.00, description: "Guitar colour fountain" },
  { name: "Cannon Ball", tamilName: null, price: 1700.00, description: "Cannon ball colour fountain" },
  { name: "Bus", tamilName: null, price: 2800.00, description: "Bus colour fountain" },
  { name: "Car", tamilName: null, price: 2200.00, description: "Car colour fountain" },
  { name: "Beer Tin", tamilName: null, price: 1234.00, description: "Beer tin colour fountain" },
  { name: "Kattayutham", tamilName: null, price: 2200.00, description: "Kattayutham colour fountain" },
  { name: "12 Shot", tamilName: null, price: 1600.00, description: "12 shot repeating firework" },
  { name: "25 Shot", tamilName: null, price: 3300.00, description: "25 shot repeating firework" },
  { name: "1\" Chotta Fancy", tamilName: null, price: 528.00, description: "1-inch chotta fancy repeating firework" },
  { name: "30 Shots", tamilName: null, price: 4400.00, description: "30 shots repeated firework" },
  { name: "60 Shots", tamilName: null, price: 8800.00, description: "60 shots repeated firework" },
  { name: "120 Shots", tamilName: null, price: 17600.00, description: "120 shots repeated firework" },
  { name: "240 Shots", tamilName: null, price: 35200.00, description: "240 shots repeated firework" },
  { name: "2\" Fancy", tamilName: null, price: 1100.00, description: "2-inch aerial fancy firework" },
  { name: "2\" (2 Pcs) Fancy", tamilName: null, price: 2200.00, description: "2-inch 2-piece aerial fancy firework" },
  { name: "2\" (3 Pcs) Fancy", tamilName: null, price: 3300.00, description: "2-inch 3-piece aerial fancy firework" },
  { name: "3 1/2\" Fancy", tamilName: null, price: 3960.00, description: "3.5-inch aerial fancy firework" },
  { name: "4\" Fancy", tamilName: null, price: 7220.00, description: "4-inch aerial fancy firework" },
  { name: "4\" Fancy Double Ball", tamilName: null, price: 6000.00, description: "4-inch double ball aerial fancy firework" },
  { name: "5\" Fancy", tamilName: null, price: 7600.00, description: "5-inch aerial fancy firework" },
  { name: "5\" (2 Pcs) Mega Fancy", tamilName: null, price: 14800.00, description: "5-inch 2-piece mega aerial fancy firework" },
  { name: "6\" Super Mega Fancy", tamilName: null, price: 14800.00, description: "6-inch super mega aerial fancy firework" },
  { name: "Deluxe Match 10 in One", tamilName: null, price: 0.00, description: "Deluxe match set" },
  { name: "Super Deluxe Match (10 in One)", tamilName: null, price: 0.00, description: "Super deluxe match set" },
  { name: "Lap Top (10 in One)", tamilName: null, price: 0.00, description: "Lap top match set" },
  { name: "Roll Cap", tamilName: null, price: 0.00, description: "Roll cap" },
  { name: "Ring Cap", tamilName: null, price: 0.00, description: "Ring cap" },
  { name: "Snake Tablet Big (1 Dozen)", tamilName: null, price: 0.00, description: "Big snake tablet" },
  { name: "Anaconda (10 Pcs)", tamilName: null, price: 0.00, description: "Anaconda snake tablet" },
  { name: "Gun", tamilName: null, price: 0.00, description: "Gun cap" },
  { name: "Royal Gun", tamilName: null, price: 0.00, description: "Royal gun cap" },
  { name: "A1 Gift Box (18 Items)", tamilName: null, price: 0.00, description: "A1 gift box with 18 items" },
  { name: "A2 Gift Box (23 Items)", tamilName: null, price: 0.00, description: "A2 gift box with 23 items" },
  { name: "A3 Gift Box (31 Items)", tamilName: null, price: 0.00, description: "A3 gift box with 31 items" },
  { name: "A4 Gift Box (45 Items)", tamilName: null, price: 0.00, description: "A4 gift box with 45 items" },
  { name: "A5 Gift Box (50 Items)", tamilName: null, price: 0.00, description: "A5 gift box with 50 items" }
];

let cart = [];

/* ---------------- PRODUCT ROUTES ---------------- */

// Get all products
app.get("/products", (req, res) => {
  res.send(products);
});

/* ---------------- CART ROUTES ---------------- */

// Add product to cart
app.post("/cart", (req, res) => {
  const { name } = req.body;
  const product = products.find((p) => p.name === name);
  if (!product) {
    return res.status(404).send({ error: "Product not found" });
  }

  const existing = cart.find((item) => item.name === product.name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  res.status(201).send({ message: "Added to cart", cart });
});

// Decrease quantity or remove product from cart
app.put("/cart/decrease/:name", (req, res) => {
  const name = req.params.name;
  const product = products.find((p) => p.name === name);

  if (!product) {
    return res.status(404).send({ error: "Product not found" });
  }

  const cartIndex = cart.findIndex((item) => item.name === product.name);

  if (cartIndex === -1) {
    return res.status(404).send({ error: "Product not in cart" });
  }

  if (cart[cartIndex].quantity > 1) {
    cart[cartIndex].quantity -= 1;
  } else {
    cart.splice(cartIndex, 1);
  }

  res.send({ message: "Quantity decreased", cart });
});

// Display cart with 20% discount applied per product
app.get("/cart/display", (req, res) => {
  const cartDetails = cart.map((item) => {
    const originalPrice = item.price;
  const discountedPrice = parseFloat((originalPrice * 0.85).toFixed(2));
    const subtotal = discountedPrice * item.quantity;

    return {
      name: item.name,
      originalPrice,
      discountedPrice,
      quantity: item.quantity,
      subtotal,
    };
  });

  const total = cartDetails.reduce((sum, item) => sum + item.subtotal, 0);

  res.send({ cartDetails, total });
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
