import auraImg from '../assets/products/aura-1.jpg';
import auraImg2 from '../assets/products/aura-2.jpg';
import auraImg3 from '../assets/products/aura-3.jpg';
import auraImg4 from '../assets/products/aura-4.jpg';
import auraStudio1 from '../assets/products/aura-studio-1.jpg';
import auraStudio2 from '../assets/products/aura-studio-2.jpg';
import auraStudio3 from '../assets/products/aura-studio-3.jpg';
import auraStudio4 from '../assets/products/aura-studio-4.jpg';

import magsafeImg from '../assets/products/magsafe-1.jpg';
import magsafeImg2 from '../assets/products/magsafe-2.jpg';
import magsafeStudio1 from '../assets/products/magsafe-studio-1.jpg';
import magsafeStudio2 from '../assets/products/magsafe-studio-2.jpg';
import magsafeStudio3 from '../assets/products/magsafe-studio-3.jpg';
import magsafeStudio4 from '../assets/products/magsafe-studio-4.jpg';

import walletImg from '../assets/products/wallet-1.jpg';
import walletImg2 from '../assets/products/wallet-2.jpg';
import walletStudio1 from '../assets/products/wallet-studio-1.jpg';
import walletStudio2 from '../assets/products/wallet-studio-2.jpg';
import walletStudio3 from '../assets/products/wallet-studio-3.jpg';
import walletStudio4 from '../assets/products/wallet-studio-4.jpg';

import teeImg from '../assets/products/tee-1.jpg';
import teeStudio1 from '../assets/products/tee-studio-1.jpg';
import teeStudio2 from '../assets/products/tee-studio-2.jpg';
import teeStudio3 from '../assets/products/tee-studio-3.jpg';
import teeStudio4 from '../assets/products/tee-studio-4.jpg';

import pourOverImg from '../assets/products/pourover-1.jpg';
import pourOverStudio1 from '../assets/products/pourover-studio-1.jpg';
import pourOverStudio2 from '../assets/products/pourover-studio-2.jpg';
import pourOverStudio3 from '../assets/products/pourover-studio-3.jpg';
import pourOverStudio4 from '../assets/products/pourover-studio-4.jpg';

import deskLightImg from '../assets/products/desklight-1.jpg';
import deskLightStudio1 from '../assets/products/desklight-studio-1.jpg';
import deskLightStudio2 from '../assets/products/desklight-studio-2.jpg';
import deskLightStudio3 from '../assets/products/desklight-studio-3.jpg';
import deskLightStudio4 from '../assets/products/desklight-studio-4.jpg';

import penImg from '../assets/products/pen-1.jpg';
import penStudio1 from '../assets/products/pen-studio-1.jpg';
import penStudio2 from '../assets/products/pen-studio-2.jpg';
import penStudio3 from '../assets/products/pen-studio-3.jpg';
import penStudio4 from '../assets/products/pen-studio-4.jpg';

import overshirtImg from '../assets/products/overshirt-1.jpg';
import overshirtStudio1 from '../assets/products/overshirt-studio-1.jpg';
import overshirtStudio2 from '../assets/products/overshirt-studio-2.jpg';
import overshirtStudio3 from '../assets/products/overshirt-studio-3.jpg';
import overshirtStudio4 from '../assets/products/overshirt-studio-4.jpg';

const products = [
  {
    id: 1,
    title: "Aura Wireless Studio ANC",
    fullTitle: "Aura Wireless Studio Active Noise Cancelling Headphones",
    brand: "Mini Audio Labs",
    label: "AUDIO & ACOUSTICS",
    subLabel: "Audio",
    category: "electronics",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 184,
    recommendPercent: 98,
    price: 249,
    oldPrice: 289,
    isNew: false,
    colors: ["#065f46", "#1e293b", "#cbd5f5"],
    image: auraImg,
    sku: "MS-ANC-09",
    description: "Precision-tuned custom beryllium drivers paired with studio hybrid noise cancellation, sculpted memory-foam cushions, and lossless low-latency audio transmission.",
    images: [auraImg, auraImg2, auraImg3, auraImg4],
    productBadges: ["Flagship Acoustic", "Studio Master Tuned"],
    award: "2024 DESIGN EXCELLENCE AWARD RECIPIENT",
    dispatchNote: "Dispatches Today",
    stockLocation: "Seattle, WA",
    stockLeft: 7,
    klarnaInstallments: 4,
    colorOptions: [
      { hex: "#065f46", name: "Pine Forest Green" },
      { hex: "#1e293b", name: "Midnight Navy" },
      { hex: "#cbd5f5", name: "Cloud Lavender" },
    ],
    finishMaterial: "ANODIZED SATIN",
    earCushionOptions: [
      { name: "Memory Foam", desc: "Included standard • High passive seal", priceAdd: 0 },
      { name: "Cooling Gel Mesh", desc: "Breathable weave for extended sessions", priceAdd: 15 },
    ],
    materials: ["Perforated Leather", "Knit Cashmere"],
    features: [
      { title: "Smart Hybrid ANC", desc: "Dual feedback mics cancelling 42dB" },
      { title: "45-Hour Endurance", desc: "15-minute fast recharge gives 6 hours" },
      { title: "Bespoke Drivers", desc: "Custom 40mm bio-cellulose high-rigidity" },
    ],
    specs: {
      "Driver Size": "40mm Bio-Cellulose",
      "Noise Cancellation": "Hybrid ANC, 42dB reduction",
      "Battery Life": "45 hours (ANC on)",
      "Charging": "USB-C, 15-min fast charge",
      "Weight": "268g",
    },
    shippingInfo: "Free express shipping on orders over $75. Ships within 24 hours from our Seattle warehouse. Standard delivery 3-5 business days, express 1-2 business days.",
    returnsInfo: "30-day risk-free trial. Free returns with prepaid shipping label included in every box.",
    whatsInBox: ["Aura Wireless Studio ANC Headphones", "USB-C Charging Cable", "Travel Case", "Quick Start Guide"],
    studioPhotos: [
      { image: auraStudio1, handle: "@julian_arch" },
      { image: auraStudio2, handle: "@sara.sound" },
      { image: auraStudio3, handle: "@nordic_vibes" },
      { image: auraStudio4, handle: "@dev_marcus" },
    ],
    reviewsList: [
      { id: 1, rating: 5, date: "3 days ago", title: "Unmatched neutrality for mixing on the go.", text: "As a sound designer, I normally avoid active noise cancelling because it warps mid-range vocal separation. The Aura is the rare exception. The isolation is startlingly quiet without any audible hiss.", author: "Elias Lindqvist", verified: true, meta: "Verified Buyer • Space Gray / Gel Cushions" },
      { id: 2, rating: 5, date: "1 week ago", title: "Eight-hour flight bliss. Zero temple pressure.", text: "The clamping pressure is dialed to absolute perfection. Wore these nonstop on a flight from Seattle to Frankfurt. Battery had 78% remaining when I landed. Truly exquisite craftsmanship.", author: "Maya Vance", verified: true, meta: "Verified Buyer • Sandstone Cream" },
      { id: 3, rating: 5, date: "2 weeks ago", title: "Replaced both my office and gym sets.", text: "The cooling gel pads are well worth the fifteen bucks upgrade. Smooth bluetooth multipoint transitions seamlessly between my MacBook and phone. High-end industrial design meets real function.", author: "Thomas Chen", verified: true, meta: "Verified Buyer • Matte Obsidian" },
    ],
    engineeredPrecision: {
      eyebrow: "ENGINEERED PRECISION",
      title: "Sound reproduction free from acoustic distortion.",
      text: "Traditional ANC headphones compromise high-frequency presence to squash low-end drone. Aura deploys real-time continuous atmospheric DSP calibration, analyzing your acoustic seal 48,000 times per second.",
      stats: [
        { value: "42dB", label: "ACTIVE NOISE FLOOR REDUCTION" },
        { value: "0.05%", label: "ULTRA-LOW THD STANDARD" },
      ],
      chartNoteLeft: "Bass Extension: Sub-audible 10Hz linear bass",
      chartNoteRight: "Zero Harsh Peaks in 4kHz - 8kHz Presence Band",
      frequencyResponse: [
        { freq: "20 Hz", aura: 62, harman: 58 },
        { freq: "60 Hz", aura: 74, harman: 70 },
        { freq: "150 Hz", aura: 80, harman: 78 },
        { freq: "250 Hz", aura: 82, harman: 80 },
        { freq: "500 Hz", aura: 78, harman: 79 },
        { freq: "1 kHz", aura: 76, harman: 77 },
        { freq: "2 kHz", aura: 79, harman: 78 },
        { freq: "4 kHz", aura: 85, harman: 82 },
        { freq: "8 kHz", aura: 83, harman: 80 },
        { freq: "12 kHz", aura: 77, harman: 76 },
        { freq: "20 kHz", aura: 72, harman: 71 },
      ],
    },
    ratingBreakdown: { 5: 91, 4: 7, 3: 1.5, 2: 0.5, 1: 0 },
    inStock: true,
  },
  {
    id: 2,
    title: "Aluminum MagSafe Stand",
    fullTitle: "Precision Aluminum MagSafe Desk Stand",
    brand: "Workspace Studio",
    label: "WORKSPACE TECH",
    subLabel: "Desktop",
    category: "electronics",
    badge: "Staff Pick",
    rating: 4.8,
    reviews: 92,
    recommendPercent: 95,
    price: 58,
    oldPrice: null,
    isNew: true,
    colors: ["#cbd5f5", "#1e293b"],
    image: magsafeImg,
    sku: "WS-MGS-02",
    description: "Ergonomic aluminum stand with seamless magnetic alignment, weighted anti-slip base, and multi-angle adjustment for optimal desktop viewing.",
    images: [magsafeImg, magsafeImg2],
    productBadges: ["Ergonomic Build", "MagSafe Compatible"],
    award: null,
    dispatchNote: "Dispatches Today",
    stockLocation: "Seattle, WA",
    stockLeft: 14,
    klarnaInstallments: 4,
    colorOptions: [
      { hex: "#cbd5f5", name: "Silver Aluminum" },
      { hex: "#1e293b", name: "Space Gray" },
    ],
    finishMaterial: "BRUSHED ALUMINUM",
    materials: ["Solid Aluminum", "Silicone Pads"],
    features: [
      { title: "Strong Magnetic Grip", desc: "Secure alignment for fast wireless charging support" },
      { title: "Adjustable Hinge", desc: "Dual-axis smooth tilt and rotation" },
    ],
    specs: {
      "Material": "Anodized Aluminum",
      "Compatibility": "MagSafe enabled devices",
      "Weight": "320g",
    },
    shippingInfo: "Free express shipping on orders over $75.",
    returnsInfo: "30-day risk-free trial.",
    whatsInBox: ["Aluminum MagSafe Stand", "User Manual"],
    studioPhotos: [
      { image: magsafeStudio1, handle: "@desk_setup" },
      { image: magsafeStudio2, handle: "@minimalworkspace" },
      { image: magsafeStudio3, handle: "@tech_by_oliver" },
      { image: magsafeStudio4, handle: "@modern_desk" },
    ],
    reviewsList: [
      { id: 1, rating: 5, date: "4 days ago", title: "Perfect addition to my desk.", text: "The aluminum finish feels premium and the stand holds my phone securely while keeping my workspace clean and organized.", author: "Daniel Brooks", verified: true, meta: "Verified Buyer • Silver" },
      { id: 2, rating: 5, date: "1 week ago", title: "Simple, solid and beautifully made.", text: "I love how minimal this stand looks. MagSafe snaps into place instantly and the weight keeps it completely stable.", author: "Nora Bennett", verified: true, meta: "Verified Buyer • Space Gray" },
      { id: 3, rating: 4, date: "2 weeks ago", title: "Makes my desk much cleaner.", text: "Great build quality and a very clean design. It has become one of those small accessories I use every day.", author: "James Carter", verified: true, meta: "Verified Buyer • Silver" },
    ],
    engineeredPrecision: {
      eyebrow: "ENGINEERED PRECISION",
      title: "Magnetic alignment engineered for effortless viewing.",
      text: "A precision-machined aluminum frame combines a weighted base with a finely tuned hinge system, creating a stable platform for your MagSafe-enabled device from every viewing angle.",
      stats: [
        { value: "320g", label: "WEIGHTED STABILITY" },
        { value: "360°", label: "FULL ROTATION RANGE" },
      ],
      chartNoteLeft: "Base Stability: Weighted anti-slip foundation",
      chartNoteRight: "Hinge Precision: Smooth dual-axis adjustment",
      "frequencyResponse": [
  { "freq": "20Hz", "aura": 72, "harman": 70 },
  { "freq": "50Hz", "aura": 75, "harman": 73 },
  { "freq": "100Hz", "aura": 78, "harman": 76 },
  { "freq": "200Hz", "aura": 80, "harman": 79 },
  { "freq": "500Hz", "aura": 82, "harman": 81 },
  { "freq": "1kHz", "aura": 84, "harman": 83 },
  { "freq": "2kHz", "aura": 86, "harman": 85 },
  { "freq": "5kHz", "aura": 84, "harman": 83 },
  { "freq": "10kHz", "aura": 81, "harman": 80 },
  { "freq": "20kHz", "aura": 78, "harman": 77 }
]
    },
    
    ratingBreakdown: { 5: 84, 4: 11, 3: 3, 2: 1, 1: 1 },
    inStock: true,
  },
  {
    id: 3,
    title: "Veg-Tanned Slim Wallet",
    fullTitle: "Vegetable-Tanned Minimalist Leather Slim Wallet",
    brand: "Craft & Hide",
    label: "EVERYDAY CARRY",
    subLabel: "Accessories",
    category: "accessories",
    badge: null,
    rating: 4.9,
    reviews: 310,
    recommendPercent: 97,
    price: 45,
    oldPrice: null,
    isNew: false,
    colors: ["#5b3a0a", "#1e293b", "#065f46"],
    image: walletImg,
    sku: "CH-WAL-03",
    description: "Handcrafted from full-grain vegetable-tanned leather designed to age gracefully over time while securely holding your daily essentials.",
    images: [walletImg, walletImg2],
    productBadges: ["Full-Grain Leather", "Handmade"],
    award: null,
    dispatchNote: "Dispatches Today",
    stockLocation: "Portland, OR",
    stockLeft: 19,
    klarnaInstallments: 4,
    colorOptions: [
      { hex: "#5b3a0a", name: "Saddle Brown" },
      { hex: "#1e293b", name: "Charcoal Black" },
      { hex: "#065f46", name: "Forest Tan" },
    ],
    finishMaterial: "WAXED FULL-GRAIN",
    materials: ["Full-Grain Italian Leather"],
    features: [
      { title: "Slim Profile", desc: "Holds up to 8 cards and folded cash comfortably" },
      { title: "Patina Finish", desc: "Ages naturally with unique character" },
    ],
    specs: {
      "Capacity": "1-8 cards + cash",
      "Dimensions": "10cm x 7cm",
      "Weight": "45g",
    },
    shippingInfo: "Free standard shipping on orders over $75.",
    returnsInfo: "30-day return policy.",
    whatsInBox: ["Veg-Tanned Slim Wallet", "Cotton Dust Bag"],
    studioPhotos: [
      { image: walletStudio1, handle: "@leather_daily" },
      { image: walletStudio2, handle: "@minimalcarry" },
      { image: walletStudio3, handle: "@crafted_goods" },
      { image: walletStudio4, handle: "@everyday_essentials" },
    ],
    reviewsList: [
      { id: 1, rating: 5, date: "5 days ago", title: "Beautiful leather and incredibly slim.", text: "The leather feels fantastic in hand and the wallet takes up almost no space in my pocket. The craftsmanship is excellent.", author: "Liam Anderson", verified: true, meta: "Verified Buyer • Natural Tan" },
      { id: 2, rating: 5, date: "1 week ago", title: "Exactly what I wanted.", text: "I wanted something simple without unnecessary bulk. The stitching is clean and the leather already has a beautiful character.", author: "Sophie Miller", verified: true, meta: "Verified Buyer • Dark Brown" },
      { id: 3, rating: 4, date: "3 weeks ago", title: "Minimal and very well made.", text: "Fits my essential cards perfectly and feels much more premium than my previous wallet.", author: "Noah Wilson", verified: true, meta: "Verified Buyer • Black" },
    ],
    engineeredPrecision: {
      eyebrow: "CRAFTED PRECISION",
      title: "Minimal construction. Maximum everyday utility.",
      text: "Every panel is cut from full-grain vegetable-tanned leather and finished by hand, creating a slim silhouette that carries your essentials while developing a unique patina over time.",
      stats: [
        { value: "8", label: "MAX CARD CAPACITY" },
        { value: "45g", label: "ULTRA-LIGHT WEIGHT" },
      ],
      chartNoteLeft: "Profile: Minimal everyday carry",
      chartNoteRight: "Material: Full-Grain Italian Leather",
      "frequencyResponse": [
  { "freq": "20Hz", "aura": 70, "harman": 69 },
  { "freq": "50Hz", "aura": 73, "harman": 72 },
  { "freq": "100Hz", "aura": 76, "harman": 75 },
  { "freq": "200Hz", "aura": 79, "harman": 78 },
  { "freq": "500Hz", "aura": 81, "harman": 80 },
  { "freq": "1kHz", "aura": 83, "harman": 82 },
  { "freq": "2kHz", "aura": 85, "harman": 84 },
  { "freq": "5kHz", "aura": 83, "harman": 82 },
  { "freq": "10kHz", "aura": 80, "harman": 79 },
  { "freq": "20kHz", "aura": 77, "harman": 76 }
]
    },
    ratingBreakdown: { 5: 89, 4: 8, 3: 2, 2: 0.5, 1: 0.5 },
    inStock: true,
  },
  {
    id: 4,
    title: "Supima Cotton Heavyweight Tee",
    fullTitle: "Premium Supima Cotton Heavyweight Essential Tee",
    brand: "Baseline Apparel",
    label: "WARDROBE BASELINE",
    subLabel: "Apparel",
    category: "fashion",
    badge: null,
    rating: 4.7,
    reviews: 76,
    recommendPercent: 93,
    price: 38,
    oldPrice: null,
    isNew: false,
    colors: ["#cbd5f5", "#1e293b", "#ffffff"],
    image: teeImg,
    sku: "BA-TEE-04",
    description: "Luxuriously soft heavyweight tee crafted from 100% US-grown Supima cotton for superior drape, breathability, and everyday durability.",
    images: [teeImg],
    productBadges: ["100% Supima Cotton", "Pre-shrunk"],
    award: null,
    dispatchNote: "Dispatches Today",
    stockLocation: "Los Angeles, CA",
    stockLeft: 25,
    klarnaInstallments: 4,
    colorOptions: [
      { hex: "#cbd5f5", name: "Haze Blue" },
      { hex: "#1e293b", name: "Jet Black" },
      { hex: "#ffffff", name: "Optic White" },
    ],
    finishMaterial: "240 GSM JERSEY",
    materials: ["100% Supima Cotton"],
    features: [
      { title: "Reinforced Collar", desc: "Ribbed collar that maintains shape wash after wash" },
      { title: "Tailored Fit", desc: "Modern cut that flatters without restricting movement" },
    ],
    specs: {
      "Material": "Supima Cotton",
      "Weight": "240 GSM Heavyweight",
      "Care": "Machine wash cold",
    },
    shippingInfo: "Standard shipping applies.",
    returnsInfo: "Easy exchanges within 30 days.",
    whatsInBox: ["Supima Cotton Tee"],
    studioPhotos: [
      { image: teeStudio1, handle: "@streetwear_daily" },
      { image: teeStudio2, handle: "@minimal_style" },
      { image: teeStudio3, handle: "@menswear_edit" },
      { image: teeStudio4, handle: "@urban_layers" },
    ],
    reviewsList: [
      { id: 1, rating: 5, date: "3 days ago", title: "The quality is immediately noticeable.", text: "The cotton feels incredibly soft while still having a substantial weight. The fit is clean and holds its shape beautifully.", author: "Ethan Parker", verified: true, meta: "Verified Buyer • Off White / L" },
      { id: 2, rating: 5, date: "1 week ago", title: "My new everyday favorite.", text: "Perfect thickness and a very comfortable fit. After several washes it still looks and feels like new.", author: "Olivia Reed", verified: true, meta: "Verified Buyer • Black / M" },
      { id: 3, rating: 4, date: "2 weeks ago", title: "Excellent heavyweight tee.", text: "The fabric has a premium feel and the construction is excellent. Definitely worth having a few in different colors.", author: "Lucas Martin", verified: true, meta: "Verified Buyer • Stone / XL" },
    ],
    engineeredPrecision: {
      eyebrow: "FABRIC ENGINEERING",
      title: "Premium cotton engineered for everyday wear.",
      text: "Woven from 100% US-grown Supima cotton, the heavyweight 240 GSM jersey balances softness, structure, and durability while maintaining its shape wash after wash.",
      stats: [
        { value: "240", label: "GSM HEAVYWEIGHT FABRIC" },
        { value: "100%", label: "SUPIMA COTTON" },
      ],
      chartNoteLeft: "Fabric Weight: Dense 240 GSM Jersey",
      chartNoteRight: "Construction: Reinforced Collar & Seams",
      "frequencyResponse": [
  { "freq": "20Hz", "aura": 74, "harman": 71 },
  { "freq": "50Hz", "aura": 77, "harman": 74 },
  { "freq": "100Hz", "aura": 80, "harman": 77 },
  { "freq": "200Hz", "aura": 82, "harman": 80 },
  { "freq": "500Hz", "aura": 84, "harman": 82 },
  { "freq": "1kHz", "aura": 86, "harman": 84 },
  { "freq": "2kHz", "aura": 88, "harman": 86 },
  { "freq": "5kHz", "aura": 86, "harman": 84 },
  { "freq": "10kHz", "aura": 83, "harman": 81 },
  { "freq": "20kHz", "aura": 80, "harman": 78 }
]
    },
    ratingBreakdown: { 5: 78, 4: 15, 3: 5, 2: 1, 1: 1 },
    inStock: true,
  },

     {
    id: 5,
    title: "Ceramic Pour-Over & Carafe",
    fullTitle: "Artisan Ceramic Pour-Over Cone and Glass Carafe Set",
    brand: "Morning Ritual Co.",
    label: "MORNING RITUAL",
    subLabel: "Kitchen",
    category: "home",
    badge: "Trending",
    rating: 4.8,
    reviews: 115,
    recommendPercent: 96,
    price: 62,
    oldPrice: 72,
    isNew: false,
    colors: ["#e0e7ff", "#1e293b"],
    image: pourOverImg,
    sku: "MR-COP-05",
    description: "Hand-glazed ceramic dripper paired with heat-resistant borosilicate glass carafe designed for an optimal, clean-tasting morning brew.",
    images: [pourOverImg],
    productBadges: ["Hand-Glazed", "Heat Resistant"],
    award: null,
    dispatchNote: "Dispatches Today",
    stockLocation: "Chicago, IL",
    stockLeft: 8,
    klarnaInstallments: 4,
    colorOptions: [
      { hex: "#e0e7ff", name: "Off White Ceramic" },
      { hex: "#1e293b", name: "Matte Charcoal" },
    ],
    finishMaterial: "MATTE GLAZE",
    materials: ["Ceramic", "Borosilicate Glass", "Cork"],
    features: [
      { title: "Spiral Ribs", desc: "Maximizes airflow for clean extraction" },
      { title: "Thermal Retention", desc: "Keeps coffee hot longer in the glass carafe" },
    ],
    specs: {
      "Capacity": "600ml / 4 Cups",
      "Material": "Ceramic & Borosilicate Glass",
    },
    shippingInfo: "Carefully packaged with break-proof guarantee.",
    returnsInfo: "30-day return policy.",
    whatsInBox: ["Ceramic Dripper", "Glass Carafe", "Cork Collar", "Sample Filters"],
    studioPhotos: [
      { image: pourOverStudio1, handle: "@morning_brew" },
      { image: pourOverStudio2, handle: "@coffee_at_home" },
      { image: pourOverStudio3, handle: "@slow_coffee" },
      { image: pourOverStudio4, handle: "@daily_roast" },
    ],
    reviewsList: [
      { id: 1, rating: 5, date: "2 days ago", title: "Makes my morning coffee feel special.", text: "The ceramic feels substantial and the pour is incredibly smooth. It looks beautiful sitting on my kitchen counter.", author: "Emma Collins", verified: true, meta: "Verified Buyer • Matte White" },
      { id: 2, rating: 5, date: "1 week ago", title: "Beautiful design and great coffee.", text: "The brewer is easy to use and the carafe holds enough for two generous cups. Cleanup is also surprisingly simple.", author: "Ryan Cooper", verified: true, meta: "Verified Buyer • Sandstone" },
      { id: 3, rating: 5, date: "2 weeks ago", title: "A gorgeous addition to my coffee setup.", text: "Everything feels thoughtfully designed. The ceramic has a lovely finish and the whole set feels much more premium than expected.", author: "Clara Evans", verified: true, meta: "Verified Buyer • Matte White" },
    ],
    engineeredPrecision: {
      eyebrow: "BREWING PRECISION",
      title: "A controlled pour for a cleaner morning cup.",
      text: "The spiral-ribbed ceramic cone is engineered to maintain consistent airflow and extraction, while the borosilicate carafe preserves temperature without compromising clarity.",
      stats: [
        { value: "600ml", label: "BREWING CAPACITY" },
        { value: "4", label: "STANDARD CUP SERVINGS" },
      ],
      chartNoteLeft: "Extraction: Controlled airflow through spiral ribs",
      chartNoteRight: "Thermal: Heat-resistant borosilicate glass",
      "frequencyResponse": [
  { "freq": "20Hz", "aura": 76, "harman": 72 },
  { "freq": "50Hz", "aura": 79, "harman": 75 },
  { "freq": "100Hz", "aura": 82, "harman": 78 },
  { "freq": "200Hz", "aura": 84, "harman": 81 },
  { "freq": "500Hz", "aura": 87, "harman": 84 },
  { "freq": "1kHz", "aura": 89, "harman": 86 },
  { "freq": "2kHz", "aura": 91, "harman": 88 },
  { "freq": "5kHz", "aura": 89, "harman": 86 },
  { "freq": "10kHz", "aura": 86, "harman": 83 },
  { "freq": "20kHz", "aura": 82, "harman": 79 }
]
    },
    ratingBreakdown: { 5: 86, 4: 10, 3: 3, 2: 0.5, 1: 0.5 },
    inStock: true,
  },
        {
    id: 6,
    title: "Ambient Desk Bar Light",
    fullTitle: "Smart LED Monitor and Ambient Desk Bar Light",
    brand: "Lum Lumen",
    label: "LIGHTING & FOCUS",
    subLabel: "Lighting",
    category: "home",
    badge: null,
    rating: 4.9,
    reviews: 240,
    recommendPercent: 99,
    price: 89,
    oldPrice: null,
    isNew: true,
    colors: ["#1e293b"],
    image: deskLightImg,
    sku: "LL-DBL-06",
    description: "Asymmetric optical design that illuminates your desk surface without screen glare, featuring adjustable color temperature and backlight glow.",
    images: [deskLightImg],
    productBadges: ["Zero Screen Glare", "Touch Controls"],
    award: "Lighting Innovation 2025",
    dispatchNote: "Dispatches Today",
    stockLocation: "Seattle, WA",
    stockLeft: 12,
    klarnaInstallments: 4,
    colorOptions: [{ hex: "#1e293b", name: "Matte Black" }],
    finishMaterial: "MATTE ALUMINUM ALLOY",
    materials: ["Aluminum Alloy", "ABS"],
    features: [
      { title: "Asymmetric Lighting", desc: "Illuminates desk area only, keeping light off the screen" },
      { title: "Dual Light Source", desc: "Front work light plus back ambient mood glow" },
    ],
    specs: {
      "Power": "USB Powered (5V/2A)",
      "Color Temp": "2700K - 6500K",
      "Length": "45cm",
    },
    shippingInfo: "Free express shipping on orders over $75.",
    returnsInfo: "30-day risk-free trial.",
    whatsInBox: ["Desk Light Bar", "Mounting Clip", "Wireless Remote Control", "USB-C Cable"],
    studioPhotos: [
      { image: deskLightStudio1, handle: "@cozy_workspace" },
      { image: deskLightStudio2, handle: "@desk_after_dark" },
      { image: deskLightStudio3, handle: "@setup_inspo" },
      { image: deskLightStudio4, handle: "@minimal_setup" },
    ],
    reviewsList: [
      { id: 1, rating: 5, date: "4 days ago", title: "Completely changed my workspace.", text: "The light creates a soft atmosphere without being distracting. It makes evening work sessions much more comfortable.", author: "Adam Foster", verified: true, meta: "Verified Buyer • Warm White" },
      { id: 2, rating: 5, date: "1 week ago", title: "Clean design and beautiful lighting.", text: "It takes almost no space on my desk and the lighting is beautifully diffused. The build quality is excellent.", author: "Mia Thompson", verified: true, meta: "Verified Buyer • Graphite" },
      { id: 3, rating: 4, date: "3 weeks ago", title: "Perfect for a cozy desk setup.", text: "I mainly use it at night and the ambient glow is exactly what I wanted. It looks great behind my monitor.", author: "Henry Scott", verified: true, meta: "Verified Buyer • Warm White" },
    ],
    engineeredPrecision: {
      eyebrow: "LIGHTING PRECISION",
      title: "Focused illumination without screen glare.",
      text: "An asymmetric optical design directs light precisely onto the workspace while minimizing reflections on your display, with independent front and rear lighting for focused work and ambient atmosphere.",
      stats: [
        { value: "2700K", label: "WARM LIGHT RANGE" },
        { value: "6500K", label: "COOL LIGHT RANGE" },
      ],
      chartNoteLeft: "Front Light: Focused workspace illumination",
      chartNoteRight: "Back Light: Soft ambient mood glow",
      "frequencyResponse": [
  { "freq": "20Hz", "aura": 73, "harman": 70 },
  { "freq": "50Hz", "aura": 76, "harman": 73 },
  { "freq": "100Hz", "aura": 79, "harman": 76 },
  { "freq": "200Hz", "aura": 82, "harman": 79 },
  { "freq": "500Hz", "aura": 85, "harman": 82 },
  { "freq": "1kHz", "aura": 87, "harman": 84 },
  { "freq": "2kHz", "aura": 89, "harman": 86 },
  { "freq": "5kHz", "aura": 87, "harman": 84 },
  { "freq": "10kHz", "aura": 84, "harman": 81 },
  { "freq": "20kHz", "aura": 81, "harman": 78 }
]
    },
    ratingBreakdown: { 5: 91, 4: 6, 3: 2, 2: 0.5, 1: 0.5 },
    inStock: true,
  },
       {
    id: 7,
    title: "Titanium Machined Pen",
    fullTitle: "Aerospace-Grade Titanium Machined Bolt-Action Pen",
    brand: "Precision Tools Co.",
    label: "PRECISION TOOLS",
    subLabel: "Stationery",
    category: "accessories",
    badge: null,
    rating: 4.6,
    reviews: 48,
    recommendPercent: 92,
    price: 54,
    oldPrice: null,
    isNew: false,
    colors: ["#cbd5f5", "#1e293b"],
    image: penImg,
    sku: "PT-PEN-07",
    description: "Precision CNC-machined from solid aerospace-grade titanium with an addictive satisfying bolt-action mechanism and smooth German ink refill.",
    images: [penImg],
    productBadges: ["Grade 5 Titanium", "Lifetime Build"],
    award: null,
    dispatchNote: "Dispatches Today",
    stockLocation: "Austin, TX",
    stockLeft: 15,
    klarnaInstallments: 4,
    colorOptions: [
      { hex: "#cbd5f5", name: "Raw Titanium" },
      { hex: "#1e293b", name: "Anodized Slate" },
    ],
    finishMaterial: "STONEWASHED TITANIUM",
    materials: ["Grade 5 Titanium"],
    features: [
      { title: "Bolt-Action Mechanism", desc: "Fidget-friendly, highly reliable deployment" },
      { title: "Indestructible Body", desc: "Built to withstand daily carry and extreme conditions" },
    ],
    specs: {
      "Material": "Grade 5 Titanium",
      "Refill": "Schmidt 9000 EasyFlow",
      "Length": "135mm",
    },
    shippingInfo: "Standard shipping available.",
    returnsInfo: "30-day money-back guarantee.",
    whatsInBox: ["Titanium Pen", "Extra Refill", "Hard Case"],
    studioPhotos: [
      { image: penStudio1, handle: "@everyday_carry" },
      { image: penStudio2, handle: "@pen_collectors" },
      { image: penStudio3, handle: "@minimal_edc" },
      { image: penStudio4, handle: "@crafted_tools" },
    ],
    reviewsList: [
      { id: 1, rating: 5, date: "3 days ago", title: "Feels like a precision instrument.", text: "The machining is incredible and the titanium body feels both light and extremely durable. The mechanism is wonderfully smooth.", author: "Jack Harrison", verified: true, meta: "Verified Buyer • Stonewashed Titanium" },
      { id: 2, rating: 5, date: "1 week ago", title: "My favorite everyday pen.", text: "It has the perfect weight and balance. The finish gives it a really premium feel without making it look flashy.", author: "Grace Wilson", verified: true, meta: "Verified Buyer • Raw Titanium" },
      { id: 3, rating: 5, date: "2 weeks ago", title: "Exceptional build quality.", text: "Every detail feels intentional, from the machining to the click mechanism. It is easily the nicest pen I have owned.", author: "Benjamin Lee", verified: true, meta: "Verified Buyer • Dark Titanium" },
    ],
    engineeredPrecision: {
      eyebrow: "MACHINED PRECISION",
      title: "A writing instrument built like a precision tool.",
      text: "CNC-machined from aerospace-grade Grade 5 titanium, every surface and mechanism is engineered for tactile precision, dependable deployment, and long-term everyday carry.",
      stats: [
        { value: "135mm", label: "PRECISION MACHINED BODY" },
        { value: "G5", label: "AEROSPACE-GRADE TITANIUM" },
      ],
      chartNoteLeft: "Mechanism: Precision bolt-action deployment",
      chartNoteRight: "Finish: Stonewashed Grade 5 Titanium",
      "frequencyResponse": [
  { "freq": "20Hz", "aura": 71, "harman": 69 },
  { "freq": "50Hz", "aura": 74, "harman": 72 },
  { "freq": "100Hz", "aura": 77, "harman": 75 },
  { "freq": "200Hz", "aura": 80, "harman": 78 },
  { "freq": "500Hz", "aura": 83, "harman": 81 },
  { "freq": "1kHz", "aura": 85, "harman": 83 },
  { "freq": "2kHz", "aura": 87, "harman": 85 },
  { "freq": "5kHz", "aura": 85, "harman": 83 },
  { "freq": "10kHz", "aura": 82, "harman": 80 },
  { "freq": "20kHz", "aura": 79, "harman": 77 }
]
    },
    ratingBreakdown: { 5: 72, 4: 17, 3: 7, 2: 2, 1: 2 },
    inStock: true,
  },
       {
    id: 8,
    title: "Merino Wool Overshirt",
    fullTitle: "Structured Heavyweight Merino Wool Overshirt",
    brand: "Baseline Apparel",
    label: "STRUCTURED WEAR",
    subLabel: "Outerwear",
    category: "fashion",
    badge: null,
    rating: 4.9,
    reviews: 63,
    recommendPercent: 98,
    price: 125,
    oldPrice: null,
    isNew: true,
    colors: ["#065f46", "#1e293b"],
    image: overshirtImg,
    sku: "BA-OVS-08",
    description: "Naturally thermoregulating structured overshirt tailored from premium boiled merino wool, offering clean lines and versatile layering comfort.",
    images: [overshirtImg],
    productBadges: ["100% Boiled Merino", "Thermoregulating"],
    award: null,
    dispatchNote: "Dispatches Today",
    stockLocation: "New York, NY",
    stockLeft: 5,
    klarnaInstallments: 4,
    colorOptions: [
      { hex: "#065f46", name: "Forest Pine" },
      { hex: "#1e293b", name: "Dark Navy" },
    ],
    finishMaterial: "BOILED MERINO WOOL",
    materials: ["100% Merino Wool"],
    features: [
      { title: "Natural Temperature Control", desc: "Keeps you warm in winter and breathable in cool seasons" },
      { title: "Structured Collar", desc: "Maintains crisp shape whether worn open or buttoned" },
    ],
    specs: {
      "Material": "100% Boiled Merino Wool",
      "Care": "Dry clean recommended",
    },
    shippingInfo: "Free express shipping on orders over $75.",
    returnsInfo: "30-day hassle-free returns.",
    whatsInBox: ["Merino Wool Overshirt"],
    studioPhotos: [
      { image: overshirtStudio1, handle: "@modern_layers" },
      { image: overshirtStudio2, handle: "@minimal_wardrobe" },
      { image: overshirtStudio3, handle: "@menswear_daily" },
      { image: overshirtStudio4, handle: "@quiet_style" },
    ],
    reviewsList: [
      { id: 1, rating: 5, date: "3 days ago", title: "Incredibly soft and beautifully structured.", text: "The merino wool feels soft against the skin while the overshirt still has enough structure to look polished. It has quickly become my favorite layering piece.", author: "Alexander Reed", verified: true, meta: "Verified Buyer • Charcoal / L" },
      { id: 2, rating: 5, date: "1 week ago", title: "Perfect for cool evenings.", text: "Warm without feeling heavy, and the fit is exactly what I was looking for. The fabric and stitching both feel exceptionally high quality.", author: "Sophie Morgan", verified: true, meta: "Verified Buyer • Sand / M" },
      { id: 3, rating: 4, date: "2 weeks ago", title: "A very versatile overshirt.", text: "I can wear it over a T-shirt during the day or layer it over a sweater when it gets colder. The merino fabric looks refined and holds its shape well.", author: "Nathan Brooks", verified: true, meta: "Verified Buyer • Forest / XL" },
    ],
    engineeredPrecision: {
      eyebrow: "TEXTILE ENGINEERING",
      title: "Natural performance woven into structured form.",
      text: "Premium boiled merino wool naturally regulates temperature while providing a structured silhouette, creating an overshirt designed for comfortable layering across changing conditions.",
      stats: [
        { value: "100%", label: "BOILED MERINO WOOL" },
        { value: "5", label: "STOCKING UNITS LEFT" },
      ],
      chartNoteLeft: "Thermoregulation: Natural temperature control",
      chartNoteRight: "Structure: Dense boiled wool construction",
      "frequencyResponse": [
  { "freq": "20Hz", "aura": 75, "harman": 72 },
  { "freq": "50Hz", "aura": 78, "harman": 75 },
  { "freq": "100Hz", "aura": 81, "harman": 78 },
  { "freq": "200Hz", "aura": 83, "harman": 81 },
  { "freq": "500Hz", "aura": 86, "harman": 84 },
  { "freq": "1kHz", "aura": 88, "harman": 86 },
  { "freq": "2kHz", "aura": 90, "harman": 88 },
  { "freq": "5kHz", "aura": 88, "harman": 86 },
  { "freq": "10kHz", "aura": 85, "harman": 83 },
  { "freq": "20kHz", "aura": 82, "harman": 80 }
]
    },
    ratingBreakdown: { 5: 90, 4: 7, 3: 2, 2: 0.5, 1: 0.5 },
    inStock: true,
  },
];
export default products;