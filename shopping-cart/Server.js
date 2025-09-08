const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// ---------------- PRELOADED PRODUCTS ----------------
let products = [
    { name: "7 Cm Electric Sparklers (10 Pcs)", tamilName: "7 Cm எலெக்ட்ரிக் கம்பி(10 Pcs) ", price: 110.00, description: "7 cm electric sparkler firework",group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்" },
  { name: "7 Cm Colour Sparklers (10 Pcs)", tamilName: "7 Cm கலர் கம்பி(10 Pcs) ", price: 120.00, description: "7 cm color sparkler firework",group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்"},
  { name: "10 Cm Electric Sparklers (10 Pcs)", tamilName: "10 Cm எலெக்ட்ரிக் கம்பி(10 Pcs)", price: 166.00, description: "10 cm electric sparkler firework",group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்" },
  { name: "10 Cm Colour Sparklers (10 Pcs)", tamilName: "10 Cm கலர் கம்பி (10 Pcs)", price: 176.00, description: "10 cm color sparkler firework" ,group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்" },
  { name: "12 Cm Electric Sparklers (10 Pcs)", tamilName: "12 Cm எலெக்ட்ரிக் கம்பி (10 Pcs)", price: 240.00, description: "12 cm electric sparkler firework",group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்" },
  { name: "12 Cm Colour Sparklers (10 Pcs)", tamilName: " 12 Cm கலர் கம்பி (10 Pcs)", price: 260.00, description: "12 cm color sparkler firework" ,group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்"},
  { name: "12 Cm Green Sparklers (10 Pcs)", tamilName: " 12 Cm கிரீன் கம்பி (10 Pcs)", price: 276.00, description: "12 cm green sparkler firework",group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்" },
  { name: "12 Cm Red Sparklers (10 Pcs)", tamilName: "12 Cm ரெட் கம்பி (10 Pcs)", price: 310.00, description: "12 cm red sparkler firework" ,group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்"},
  { name: "15 Cm Electric Sparklers (10 Pcs)", tamilName: "15 Cm எலெக்ட்ரிக் கம்பி (10 Pcs)", price: 374.00, description: "15 cm electric sparkler firework" ,group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்"},
  { name: "15 Cm Colour Sparklers (10 Pcs)", tamilName: "15 Cm கலர் கம்பி (10 Pcs)", price: 396.00, description: "15 cm color sparkler firework",group:"SPARKLERS" ,tamilgroup:"கம்பி மத்தாப்புகள்"},
  { name: "30 Cm Electric Sparklers (5 Pcs)", tamilName: " 30 Cm எலெக்ட்ரிக் கம்பி (5 Pcs)", price: 374.00, description: "30 cm electric sparkler firework",group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்" },
  { name: "30 Cm Colour Sparklers (5 Pcs)", tamilName: "30 Cm கலர் கம்பி (5 Pcs)", price: 396.00, description: "30 cm color sparkler firework" ,group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்"},
  { name: "50 Cm Electric Sparklers (5 Pcs)", tamilName: " 50 Cm எலெக்ட்ரிக் கம்பி (5 Pcs)", price: 1740.00, description: "50 cm electric sparkler firework" ,group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்"},
  { name: "50 Cm Colour Sparklers (5 Pcs)", tamilName: "50 Cm கலர் கம்பி (5 Pcs)", price: 1900.00, description: "50 cm color sparkler firework",group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்" },
  { name: "50 Cm Green Sparklers (5 Pcs)", tamilName: "50 Cm கிரீன் கம்பி (5 Pcs)", price: 1980.00, description: "50 cm green sparkler firework",group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்" },
  { name: "Rotating Sparklers", tamilName: "Ñசுழற்சி கம்பி மத்தாப்பு", price: 2200.00, description: "Rotating sparkler firework",group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்"},
  { name: "75 Cm Colour Sparklers", tamilName: "75 Cm கலர் கம்பி ", price: 3246.00, description: "75 cm color sparkler firework",group:"SPARKLERS",tamilgroup:"கம்பி மத்தாப்புகள்"},
  { name: "4\" Lakshmi", tamilName: '4"லட்சுமி (5 Pcs)', price: 166.00, description: "4-inch Lakshmi flash sound cracker" ,group:"FLASH SOUND CRACKERS",tamilgroup:"ஒற்றை வெடிகள்"},
  { name: "4\" Dlx. Lakshmi", tamilName: ' 4" டிலக்ஸ் லட்சுமி', price: 276.00, description: "4-inch deluxe Lakshmi flash sound cracker" ,group:"FLASH SOUND CRACKERS",tamilgroup:"ஒற்றை வெடிகள்"},
  { name: "4\" Gold Lakshmi", tamilName: '4" கோல்ட் லட்சுமி', price: 254.00, description: "4-inch gold Lakshmi flash sound cracker" ,group:"FLASH SOUND CRACKERS",tamilgroup:"ஒற்றை வெடிகள்"},
  { name: "4\" Super Deluxe Lakshmi", tamilName: '4" சூப்பர் டிலக்ஸ் லட்சுமி', price: 308.00, description: "4-inch super deluxe Lakshmi flash sound cracker" ,group:"FLASH SOUND CRACKERS",tamilgroup:"ஒற்றை வெடிகள்"},
  { name: "3½\" Lakshmi Crackers", tamilName: "3½\"லட்சுமி கிராக்கர்ஸ்", price: 132.00, description: "3.5-inch Lakshmi cracker" ,group:"FLASH SOUND CRACKERS",tamilgroup:"ஒற்றை வெடிகள்"},
  { name: "2¾\" Bird Crackers", tamilName: "2¾\" குருவி கிராக்கர்ஸ்", price: 88.00, description: "2.75-inch bird cracker" ,group:"FLASH SOUND CRACKERS",tamilgroup:"ஒற்றை வெடிகள்"},
  { name: "Two Sound", tamilName: "2 சவுண்ட் (5 Pcs)", price: 396.00, description: "Dual sound cracker" ,group:"FLASH SOUND CRACKERS",tamilgroup:"ஒற்றை வெடிகள்"},
  { name: "5\" Bahubali Sup Spl Deluxe", tamilName: "5\" பாகுபலி சூப்பர் ஸ்பெஷல் டிலக்ஸ் (5 Pcs)", price: 440.00, description: "5-inch Bahubali super special deluxe cracker" ,group:"FLASH SOUND CRACKERS",tamilgroup:"ஒற்றை வெடிகள்"},
  { name: "5\" Jallikattu Sup Spl Deluxe", tamilName: "5\" ஜல்லிகட்டு சூப்பர் ஸ்பெஷல் டிலக்ஸ் (5 Pcs)", price: 500.00, description: "5-inch Jallikattu super special deluxe cracker" ,group:"FLASH SOUND CRACKERS",tamilgroup:"ஒற்றை வெடிகள்"},
  { name: "Bullet Bomb (10 Pcs)", tamilName: " புல்லெட் பாம்(10 Pcs)", price: 220.00, description: "Bullet-style atom bomb firework",group:"ATOM BOMB",tamilgroup:"அணுகுண்டு" },
  { name: "Hydro Bomb (10 Pcs)", tamilName: 'ஹைட்ரோ பாம் (10 Pcs)', price: 600.00, description: "Hydro-style atom bomb firework",group:"ATOM BOMB",tamilgroup:"அணுகுண்டு"},
  { name: "King Bomb (3 Ply) (10 Pcs)", tamilName: " கிங் பாம் (3 Ply) (10 Pcs)", price: 800.00, description: "King multi-layered atom bomb firework",group:"ATOM BOMB",tamilgroup:"அணுகுண்டு" },
  { name: "Classic Bomb (5 Ply) (10 Pcs)", tamilName: "கிளாசிக் பாம்(5 Ply) (10 Pcs)", price: 1000.00, description: "Classic multi-layered atom bomb firework" ,group:"ATOM BOMB",tamilgroup:"அணுகுண்டு"},
  { name: "Tracer Bomb (7 Ply) (10 Pcs)", tamilName: "ட்ரேஸர் பாம் (7 Ply) (10 Pcs)", price: 1600.00, description: "Tracer multi-layered atom bomb firework" ,group:"ATOM BOMB",tamilgroup:"அணுகுண்டு"},
  { name: "Agni Bomb (10 Pcs)", tamilName: "அக்னி பாம் (10 Pcs)", price: 2000.00, description: "Agni atom bomb firework" ,group:"ATOM BOMB",tamilgroup:"அணுகுண்டு"},
  { name: "Digital Bomb (10 Pcs)", tamilName: "டிஜிட்டல் பாம்(10 Pcs)", price: 2400.00, description: "Digital atom bomb firework" ,group:"ATOM BOMB",tamilgroup:"அணுகுண்டு"},
  { name: "Red Bijili (100 Pcs)", tamilName: " ரெட் பிட்ஜிலி(100 Pcs)", price: 340.00, description: "Red bijili cracker",group:" BIJILI CRACKERS",tamilgroup:"பிட்ஜிலி வெடிகள்" },
  { name: "Stripped Bijili (100 Pcs)", tamilName: "ஸ்டிரிப்ப்ட் பிட்ஜிலி (100 Pcs)", price: 360.00, description: "Striped bijili cracker",group:" BIJILI CRACKERS",tamilgroup:"பிட்ஜிலி வெடிகள்" },
  { name: "Ground Chakkar Big (10 Pcs)", tamilName: "தரைசக்கரம் பெரியது (10 Pcs)", price: 400.00, description: "Big ground chakkar firework" ,group:" GROUND CHAKKAR",tamilgroup:"தரைசக்கரம்"},
  { name: "Ground Chakkar Special (10 Pcs)", tamilName: "தரைசக்கரம் ஸ்பெஷல் (10 Pcs)", price: 600.00, description: "Special ground chakkar firework" ,group:" GROUND CHAKKAR",tamilgroup:"தரைசக்கரம்"},
  { name: "Ground Chakkar Deluxe (10 Pcs)", tamilName: " தரைசக்கரம் டிலக்ஸ் (10 Pcs)", price: 1200.00, description: "Deluxe ground chakkar firework",group:" GROUND CHAKKAR" ,tamilgroup:"தரைசக்கரம்"},
  { name: "Ground Chakkar Spl (Plastic Wheel)", tamilName: "தரைசக்கரம் ஸ்பெஷல் (பிளாஸ்டிக் வீல்)", price: 800.00, description: "Special plastic wheel ground chakkar" ,group:" GROUND CHAKKAR",tamilgroup:"தரைசக்கரம்"},
  { name: "Ground Chakkar Dlx (Plastic Wheel)", tamilName: "தரைசக்கரம் டிலக்ஸ் (பிளாஸ்டிக் வீல்)", price: 1600.00, description: "Deluxe plastic wheel ground chakkar" ,group:" GROUND CHAKKAR",tamilgroup:"தரைசக்கரம்"},
  { name: "Flower Pots Small (10 Pcs)", tamilName: " பூச்சட்டி சிறியாது", price: 560.00, description: "Small flower pot firework",group:"  FLOWER POTS",tamilgroup:"பூச்சட்டி" },
  { name: "Flower Pots Big (10 Pcs)", tamilName: " பூச்சட்டி பெரியது ", price: 760.00, description: "Big flower pot firework",group:"  FLOWER POTS",tamilgroup:"பூச்சட்டி" },
  { name: "Flower Pots Special (10 Pcs)", tamilName: "பூச்சட்டி ஸ்பெஷல்", price: 960.00, description: "Special flower pot firework",group:"  FLOWER POTS",tamilgroup:"பூச்சட்டி" },
  { name: "Flower Pots Asoka (10 Pcs)", tamilName: " பூச்சட்டி அசோகா", price: 1160.00, description: "Asoka flower pot firework",group:"  FLOWER POTS",tamilgroup:"பூச்சட்டி" },
  { name: "Flower Pots Deluxe (5 Pcs)", tamilName: " பூச்சட்டி டிலக்ஸ்", price: 1800.00, description: "Deluxe flower pot firework",group:"  FLOWER POTS",tamilgroup:"பூச்சட்டி" },
  { name: "Flower Pots Super Dlx. (2 Pcs)", tamilName: "பூச்சட்டி சூப்பர் டிலக்ஸ் (2 Pcs)", price: 1000.00, description: "Super deluxe flower pot firework",group:"  FLOWER POTS",tamilgroup:"பூச்சட்டி" },
  { name: "Flower Pots Colour Koti (10 Pcs)", tamilName: "பூச்சட்டி கலர் கொட்டி  (10 Pcs)", price: 2000.00, description: "Colour koti flower pot firework",group:"  FLOWER POTS",tamilgroup:"பூச்சட்டி" },
  { name: "Colour Koti Deluxe (10 Pcs)", tamilName: "கலர் கொட்டி டிலக்ஸ் (10 Pcs)", price: 3600.00, description: "Deluxe colour koti firework",group:"  FLOWER POTS",tamilgroup:"பூச்சட்டி" },
  { name: "Baby Rocket (10 Pcs)", tamilName: " பேபி ராக்கெட் (10 Pcs)", price: 264.00, description: "Baby rocket firework" ,group:"ROCKETS",tamilgroup:"ராக்கெட்"},
  { name: "Rocket Bomb (10 Pcs)", tamilName: "ராக்கெட் பாம்  (10 Pcs)", price: 490.00, description: "Rocket bomb firework" ,group:"ROCKETS",tamilgroup:"ராக்கெட்"},
  { name: "Lunik Express (10 Pcs)", tamilName: "லூனிக் எக்ஸ்பிரஸ்  (10 Pcs)", price: 960.00, description: "Lunik express rocket firework" ,group:"ROCKETS",tamilgroup:"ராக்கெட்"},
  { name: "1.5' Twinkling Star (10 Pcs)", tamilName: "1.5' ட்விங்க்லிங் ஸ்டார்  (10 Pcs)", price: 220.00, description: "1.5 ft twinkling star firework",group:" TWINKLING STAR & PENCIL",tamilgroup:"ட்விங்க்லிங் ஸ்டார் & பென்சில்"},
  { name: "4' Twinkling Star (10 Pcs)", tamilName: "4' ட்விங்க்லிங் ஸ்டார்  (10 Pcs)", price: 660.00, description: "4 ft twinkling star firework",group:" TWINKLING STAR & PENCIL",tamilgroup:"ட்விங்க்லிங் ஸ்டார் & பென்சில்"},
  { name: "Crackling Kingdom (2 Pcs)", tamilName: "க்ராக்லிங் கிங்டம் (2 Pcs)", price: 2600.00, description: "Crackling kingdom firework",group:" TWINKLING STAR & PENCIL",tamilgroup:"ட்விங்க்லிங் ஸ்டார் & பென்சில்"},
  { name: "Mercury Torch (1 Pcs)", tamilName: "மெர்குரி டோர்ச் (1 Pcs)", price: 200.00, description: "Mercury torch firework",group:" TWINKLING STAR & PENCIL",tamilgroup:"ட்விங்க்லிங் ஸ்டார் & பென்சில்"},
  { name: "Selfie Stick Red Green (5 Pcs)", tamilName: "செல்ஃபி ஸ்டிக் ரெட் கிரீன் (5 Pcs)", price: 1400.00, description: "Red green selfie stick firework",group:" TWINKLING STAR & PENCIL",tamilgroup:"ட்விங்க்லிங் ஸ்டார் & பென்சில்"},
  { name: "Electric Stone (10 Pcs)", tamilName: "எலெக்ட்ரிக் ஸ்டோன்", price: 88.00, description: "Electric stone fancy firework",group:" FANCY FIREWORKS",tamilgroup:"ஃபான்சி ரகங்கள்"},
  { name: "Tip Top (10 Pcs)", tamilName: " டிப் டாப்  (10 Pcs)", price: 242.00, description: "Tip top fancy firework",group:" FANCY FIREWORKS",tamilgroup:"ஃபான்சி ரகங்கள்"},
  { name: "Pop Corn (10 Pcs)", tamilName: " பாப் கோர்ன் (10 Pcs)", price: 500.00, description: "Pop corn fancy firework",group:" FANCY FIREWORKS",tamilgroup:"ஃபான்சி ரகங்கள்"},
  { name: "Toys Cartoon Box (10 Pcs)", tamilName: "டாய்ஸ் கார்டூன் பாக்ஸ் (10 Pcs)", price: 176.00, description: "Toys cartoon box fancy firework",group:" FANCY FIREWORKS",tamilgroup:"ஃபான்சி ரகங்கள்"},
  { name: "Silver Queen (5 Pcs)", tamilName: "சில்வர் குயின் (5 Pcs)", price: 680.00, description: "Silver queen colour fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Colour Rain (5 Pcs)", tamilName: "கலர் ரெய்ன் (5 Pcs)", price: 680.00, description: "Colour rain fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Peacock Feather (5 Pcs)", tamilName: "மயில் இறகு (5 Pcs)", price: 680.00, description: "Peacock feather fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Golden Star (5 Pcs)", tamilName: "கோல்டன் ஸ்டார் (5 Pcs)", price: 680.00, description: "Golden star fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Green Garden (5 Pcs)", tamilName:  "கிரீன் கார்டன் (5 Pcs)", price: 680.00, description: "Green garden fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Red Star (5 Pcs)", tamilName:  "ரெட் ஸ்டார் (5 Pcs)", price: 680.00, description: "Red star fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Teddy", tamilName: "டெடி", price: 1600.00, description: "Teddy colour fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "9000", tamilName: "9000", price: 1600.00, description: "9000 colour fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Golden Peacock", tamilName:  "கோல்டன் பீக்காக்", price: 1600.00, description: "Golden peacock fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Thunder", tamilName:  " தண்டர்", price: 1600.00, description: "Thunder colour fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Colour Pots (5 Pcs)", tamilName: "கலர் பாட்ஸ்(5 Pcs)", price: 960.00, description: "Colour pots fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "5 Colour Deluxe Fountain (5 Pcs)", tamilName: "5 கலர் டிலக்ஸ் ஃபவுண்டேன் (5 Pcs)", price: 3000.00, description: "5 colour deluxe fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Photo Flash (5 Pcs)", tamilName: "  போட்டோ ஃபிளாஷ் (5 Pcs)", price: 800.00, description: "Photo flash fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Rainbow Smoke (5 Pcs)", tamilName: "போட்டோ ஃபிளாஷ் (5 Pcs)", price: 1800.00, description: "Rainbow smoke fountain",group:" COLOUR FOUNTAIN",tamilgroup:"கலர் ஃபவுண்டேன்"},
  { name: "Siren (2 Pcs)", tamilName: " சைரன் (2 Pcs)", price: 1700.00, description: "Siren whistling novelty" ,group:" WHISTLING NOVALTIES",tamilgroup:"விஸ்லிங் நவால்டீஸ்"},
  { name: "Siren (5 Pcs)", tamilName: " சைரன் (5 Pcs)", price: 1700.00, description: "Siren whistling novelty",group:" WHISTLING NOVALTIES",tamilgroup:"விஸ்லிங் நவால்டீஸ்"},
  { name: "Turbo Wheel (5 Pcs) 4x4", tamilName: "டர்போ வீல் (5 Pcs) 4x4 ", price: 1800.00, description: "Turbo wheel whistling novelty",group:" WHISTLING NOVALTIES",tamilgroup:"விஸ்லிங் நவால்டீஸ்"},
  { name: "Lollipop (5 Pcs)", tamilName: " லாலிப்பாப் (5 Pcs)", price: 2750.00, description: "Lollipop whistling novelty",group:" WHISTLING NOVALTIES",tamilgroup:"விஸ்லிங் நவால்டீஸ்"},
  { name: "Drone (5 Pcs)", tamilName: "ட்ரோன் (5 Pcs)", price: 2400.00, description: "Drone new novelty",group:" NEW NOVALTIES",tamilgroup:"நியூ நவால்டீஸ்"},
  { name: "Gun (5 Pcs)", tamilName: " கன் (5 Pcs)", price: 2400.00, description: "Gun new novelty" ,group:" NEW NOVALTIES",tamilgroup:" நியூ நவால்டீஸ்"},
  { name: "Helicopter (5 Pcs)", tamilName: "ஹெலிகாப்டர் (5 Pcs)", price: 1200.00, description: "Helicopter new novelty" ,group:" NEW NOVALTIES",tamilgroup:" நியூ நவால்டீஸ்"},
  { name: "Emu Egg", tamilName: " ஈமு முட்டை", price: 3000.00, description: "Emu egg new novelty" ,group:" NEW NOVALTIES",tamilgroup:" நியூ நவால்டீஸ்"},
  { name: "Pamparam (5 Pcs)", tamilName: "பம்பரம் (5 Pcs)", price: 1100.00, description: "Pamparam new novelty" ,group:" NEW NOVALTIES",tamilgroup:" நியூ நவால்டீஸ்"},
  { name: "Jack Pot (2 Pcs)", tamilName: "ஜாக் பாட் (2 Pcs)", price: 3300.00, description: "Jack pot new novelty" ,group:" NEW NOVALTIES",tamilgroup:" நியூ நவால்டீஸ்"},
  { name: "Butterfly (Red & Green & White)", tamilName: "பட்டர்பிளை (ரெட் & கிரீன் & வைட்)", price: 880.00, description: "Butterfly new novelty" ,group:" NEW NOVALTIES",tamilgroup:" நியூ நவால்டீஸ்"},
  { name: "Bada Peacock", tamilName: "படா பீக்காக்", price: 4840.00, description: "Bada peacock new novelty" ,group:" NEW NOVALTIES",tamilgroup:" நியூ நவால்டீஸ்"},
  { name: "Water Falls", tamilName: " வாட்டர் ஃபால்ஸ்", price: 3080.00, description: "Water falls new novelty" ,group:" NEW NOVALTIES",tamilgroup:" நியூ நவால்டீஸ்"},
  { name: "Flying Dancer (10 Pcs)", tamilName: "ஃப்லைங் டான்சர் (10 Pcs)", price: 880.00, description: "Flying dancer new novelty" ,group:" NEW NOVALTIES",tamilgroup:" நியூ நவால்டீஸ்"},
  { name: "Money in Bank", tamilName: " மனீ இன் பேங்க்", price: 2100.00, description: "Money in bank colour fountain",group:" COLOUR FOUNTAIN",tamilgroup:" கலர் ஃபவுண்டேன்" },
  { name: "Gittar", tamilName: "கிட்டார்", price: 2800.00, description: "Guitar colour fountain" ,group:" COLOUR FOUNTAIN",tamilgroup:" கலர் ஃபவுண்டேன்" },
  { name: "Cannon Ball", tamilName: "கேனன் பால்", price: 1700.00, description: "Cannon ball colour fountain" ,group:" COLOUR FOUNTAIN",tamilgroup:" கலர் ஃபவுண்டேன்" },
  { name: "Bus", tamilName:" பஸ்", price: 2800.00, description: "Bus colour fountain" ,group:" COLOUR FOUNTAIN",tamilgroup:" கலர் ஃபவுண்டேன்" },
  { name: "Car", tamilName: "கார்", price: 2200.00, description: "Car colour fountain" ,group:" COLOUR FOUNTAIN",tamilgroup:" கலர் ஃபவுண்டேன்" },
  { name: "Beer Tin", tamilName: "பியர் டின்", price: 1234.00, description: "Beer tin colour fountain",group:" `COLOUR FOUNTAIN`",tamilgroup:" கலர் ஃபவுண்டேன்"  },
  { name: "Kattayutham", tamilName: "கட்டாயுதம்", price: 2200.00, description: "Kattayutham colour fountain",group:" COLOUR FOUNTAIN" ,tamilgroup:" கலர் ஃபவுண்டேன்" },
  { name: "12 Shot", tamilName: "12 ஷாட்", price: 1600.00, description: "12 shot repeating firework" ,group:" REPEATING SHOTS",tamilgroup:"ரிபீட்டிங் ஷாட்ஸ்"},
  { name: "25 Shot", tamilName: "25 ஷாட்", price: 2300.00, description: "25 shot repeating firework",group:" REPEATING SHOTS",tamilgroup:"ரிபீட்டிங் ஷாட்ஸ்"},
  { name: "1\" Chotta Fancy", tamilName: '1"சோட்டா ஃபான்சி', price: 328.00, description: "1-inch chotta fancy repeating firework" ,group:" REPEATING SHOTS",tamilgroup:"ரிபீட்டிங் ஷாட்ஸ்"},
  { name: "30 Shots", tamilName: "30 ஷாட்ஸ்", price: 4400.00, description: "30 shots repeated firework",group:"  REPEATED SHOTS",tamilgroup:"ரிபீட்டிங் ஷாட்ஸ்"},
  { name: "60 Shots", tamilName: "60 ஷாட்ஸ்", price: 8800.00, description: "60 shots repeated firework" ,group:"  REPEATED SHOTS",tamilgroup:"ரிபீட்டிங் ஷாட்ஸ்"},
  { name: "120 Shots", tamilName: "120 ஷாட்ஸ்", price: 17600.00, description: "120 shots repeated firework",group:"  REPEATED SHOTS",tamilgroup:"ரிபீட்டிங் ஷாட்ஸ்" },
  { name: "240 Shots", tamilName: "240 ஷாட்ஸ்", price: 35200.00, description: "240 shots repeated firework",group:"  REPEATED SHOTS",tamilgroup:"ரிபீட்டிங் ஷாட்ஸ்" },
  { name: "2\" Fancy", tamilName: '2"  ஃபான்சி', price: 1100.00, description: "2-inch aerial fancy firework" ,group:"  AERIAL FANCY ",tamilgroup:"ஏரியல் ஃபான்சி "},
  { name: "2\" (2 Pcs) Fancy", tamilName: '2" (2 Pcs)  ஃபான்சி', price: 2200.00, description: "2-inch 2-piece aerial fancy firework" ,group:"  AERIAL FANCY ",tamilgroup:"ஏரியல் ஃபான்சி "},
  { name: "2\" (3 Pcs) Fancy", tamilName: '2" (3 Pcs)  ஃபான்சி', price: 2500.00, description: "2-inch 3-piece aerial fancy firework" ,group:"  AERIAL FANCY ",tamilgroup:"ஏரியல் ஃபான்சி "},
  { name: "3 1/2\" Fancy", tamilName: '3½"  ஃபான்சி', price: 3300.00, description: "3.5-inch aerial fancy firework",group:"  AERIAL FANCY ",tamilgroup:"ஏரியல் ஃபான்சி " },
  { name: "4\" Fancy", tamilName: '4" ஃபான்சி', price: 4000.00, description: "4-inch aerial fancy firework" ,group:"  AERIAL FANCY ",tamilgroup:"ஏரியல் ஃபான்சி "},
  { name: "4\" Fancy Double Ball", tamilName: '4" ஃபான்சி டபுள் பால்', price: 5500.00, description: "4-inch double ball aerial fancy firework" ,group:"  AERIAL FANCY ",tamilgroup:"ஏரியல் ஃபான்சி "},
  { name: "5\" Fancy", tamilName: '5"  ஃபான்சி', price: 7600.00, description: "5-inch aerial fancy firework" ,group:"  AERIAL FANCY ",tamilgroup:"ஏரியல் ஃபான்சி "},
  { name: "5\" (2 Pcs) Mega Fancy", tamilName: '5" (2 Pcs) மெகா ஃபான்சி', price: 14400.00, description: "5-inch 2-piece mega aerial fancy firework",group:"  AERIAL FANCY ",tamilgroup:"ஏரியல் ஃபான்சி " },
  { name: "6\" Super Mega Fancy", tamilName: '6"  சூப்பர் மெகா ஃபான்சி', price: 14800.00, description: "6-inch super mega aerial fancy firework" ,group:"  AERIAL FANCY ",tamilgroup:"ஏரியல் ஃபான்சி "},
  { name: "Deluxe Match 10 in One", tamilName: "டிலக்ஸ் மேச்ஸ் (10 இன் 1)", price: 0.00, description: "Deluxe match set" ,group:"   MATCHES, CAPS, SNAKE TABLETS NET RATE (NO DISCOUNT) ",tamilgroup:"மேச்ஸ், காப்ஸ், ஸ்நேக் டேப்லெட்ஸ் நெட் ரேட் (NO DISCOUNT)"},
  { name: "Super Deluxe Match (10 in One)", tamilName: "சூப்பர் டிலக்ஸ் மேச்ஸ் (10 இன் 1)", price: 0.00, description: "Super deluxe match set"  ,group:"   MATCHES, CAPS, SNAKE TABLETS NET RATE (NO DISCOUNT) ",tamilgroup:"மேச்ஸ், காப்ஸ், ஸ்நேக் டேப்லெட்ஸ் நெட் ரேட் (NO DISCOUNT)"},
  { name: "Lap Top (10 in One)", tamilName: " லேப் டாப் (10 இன் 1)", price: 0.00, description: "Lap top match set"  ,group:"   MATCHES, CAPS, SNAKE TABLETS NET RATE (NO DISCOUNT) ",tamilgroup:"மேச்ஸ், காப்ஸ், ஸ்நேக் டேப்லெட்ஸ் நெட் ரேட் (NO DISCOUNT)"},
  { name: "Roll Cap", tamilName: " ரோல் கேப்", price: 0.00, description: "Roll cap" ,group:"   MATCHES, CAPS, SNAKE TABLETS NET RATE (NO DISCOUNT) " ,tamilgroup:"மேச்ஸ், காப்ஸ், ஸ்நேக் டேப்லெட்ஸ் நெட் ரேட் (NO DISCOUNT)"},
  { name: "Ring Cap", tamilName: "ரிங் கேப்", price: 0.00, description: "Ring cap"  ,group:"   MATCHES, CAPS, SNAKE TABLETS NET RATE (NO DISCOUNT) ",tamilgroup:"மேச்ஸ், காப்ஸ், ஸ்நேக் டேப்லெட்ஸ் நெட் ரேட் (NO DISCOUNT)"},
  { name: "Snake Tablet Big (1 Dozen)", tamilName: "ஸ்நேக் டேப்லெட் பெரியது (1 டஜன்)", price: 0.00, description: "Big snake tablet"  ,group:"   MATCHES, CAPS, SNAKE TABLETS NET RATE (NO DISCOUNT) ",tamilgroup:"மேச்ஸ், காப்ஸ், ஸ்நேக் டேப்லெட்ஸ் நெட் ரேட் (NO DISCOUNT)"},
  { name: "Anaconda (10 Pcs)", tamilName: "அனகாண்டா (10 Pcs)", price: 0.00, description: "Anaconda snake tablet"  ,group:"   MATCHES, CAPS, SNAKE TABLETS NET RATE (NO DISCOUNT) ",tamilgroup:"மேச்ஸ், காப்ஸ், ஸ்நேக் டேப்லெட்ஸ் நெட் ரேட் (NO DISCOUNT)"},
  { name: "Gun", tamilName: "கன்", price: 0.00, description: "Gun cap"  ,group:"   MATCHES, CAPS, SNAKE TABLETS NET RATE (NO DISCOUNT) ",tamilgroup:"மேச்ஸ், காப்ஸ், ஸ்நேக் டேப்லெட்ஸ் நெட் ரேட் (NO DISCOUNT)"},
  { name: "Royal Gun", tamilName: "ராயல் கன்", price: 0.00, description: "Royal gun cap"  ,group:"   MATCHES, CAPS, SNAKE TABLETS NET RATE (NO DISCOUNT) ",tamilgroup:"மேச்ஸ், காப்ஸ், ஸ்நேக் டேப்லெட்ஸ் நெட் ரேட் (NO DISCOUNT)"},
  { name: "A1 Gift Box (18 Items)", tamilName: "A1 கிஃப்ட் பாக்ஸ் (18 பொருட்கள்)", price: 0.00, description: "A1 gift box with 18 items" ,group:"   GIFT BOXES ",tamilgroup:" கிஃப்ட் பாக்ஸ்கள்" },
  { name: "A2 Gift Box (23 Items)", tamilName: "A2 கிஃப்ட் பாக்ஸ் (23 பொருட்கள்)", price: 0.00, description: "A2 gift box with 23 items" ,group:"   GIFT BOXES ",tamilgroup:" கிஃப்ட் பாக்ஸ்கள்" },
  { name: "A3 Gift Box (31 Items)", tamilName: "A3 கிஃப்ட் பாக்ஸ் (31 பொருட்கள்)", price: 0.00, description: "A3 gift box with 31 items"  ,group:"   GIFT BOXES ",tamilgroup:" கிஃப்ட் பாக்ஸ்கள்"},
  { name: "A4 Gift Box (45 Items)", tamilName: "A4 கிஃப்ட் பாக்ஸ் (45 பொருட்கள்)", price: 0.00, description: "A4 gift box with 45 items" ,group:"   GIFT BOXES ",tamilgroup:" கிஃப்ட் பாக்ஸ்கள்" },
  { name: "A5 Gift Box (50 Items)", tamilName: "A5 கிஃப்ட் பாக்ஸ் (50 பொருட்கள்)", price: 0.00, description: "A5 gift box with 50 items" ,group:"   GIFT BOXES ",tamilgroup:" கிஃப்ட் பாக்ஸ்கள்" }
];

// Cart array
let cart = [];

// Get products grouped by category
app.get("/products", (req, res) => {
  const grouped = {};
  products.forEach((p) => {
    const key = p.group + " - " + p.tamilgroup;  // create a proper combined key
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });
  console.log(grouped);
  res.json(grouped);
});

// Get cart details
app.get("/cart/display", (req, res) => {
  const cartDetails = cart.map((item) => {
    const product = products.find((p) => p.name === item.name);
    const discountedPrice = parseFloat((product.price * 0.85).toFixed(2));
    const subtotal = parseFloat((product.price * item.quantity).toFixed(2));
    return {
      ...item,
      originalPrice: product.price,
      discountedPrice,
      subtotal,
    };
  });
  res.json({ cartDetails });
});

// Increase quantity
app.put("/cart/increase/:name", (req, res) => {
  const { name } = req.params;
  const cartItem = cart.find((i) => i.name === name);
  if (cartItem) cartItem.quantity += 1;
  else cart.push({ name, quantity: 1 });
  res.json({ success: true });
});

// Decrease quantity
app.put("/cart/decrease/:name", (req, res) => {
  const { name } = req.params;
  const cartItem = cart.find((i) => i.name === name);
  if (cartItem) {
    cartItem.quantity -= 1;
    if (cartItem.quantity <= 0) cart = cart.filter((i) => i.name !== name);
  }
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
