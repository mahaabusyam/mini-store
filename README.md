🛍️ Mini Store

A modern, responsive e-commerce web application built with React, Vite, Material UI, and Redux Toolkit.

Mini Store provides a clean shopping experience with product browsing, categories, product details, wishlist, shopping bag, and a complete checkout flow.

---

✨ Features

- 🛍️ Browse products with a modern e-commerce interface
- 🔎 Product search
- 🗂️ Product category filtering
- 🏷️ Product badges such as Best Seller, New, and Sale
- ⭐ Product ratings and reviews
- 📦 Detailed product pages
- 🛒 Shopping bag / cart
- ➕ Increase and decrease product quantities
- 🗑️ Remove products from the cart
- 💾 Cart persistence using "localStorage"
- ❤️ Wishlist with "localStorage" persistence
- 💳 Complete checkout page with payment form and validation
- 📊 Product-specific information and visual data
- 📱 Fully responsive design
- 🎨 Modern Material UI components
- ✨ Clean and premium-style visual design

---

🛠️ Technologies

Frontend

- React 19
- Vite
- JavaScript (ES6+)
- Material UI (MUI)
- MUI Icons
- Emotion
- React Router

State Management

- Redux Toolkit
- React Redux
- "localStorage" for persistent cart and wishlist data

Data & API

- Axios
- Local product data
- JSON data for trending products

Styling

- Material UI
- Responsive layouts
- Custom theme

---

📂 Project Structure

mini-store/
│
├── public/
│   └── data/
│       └── trending.json
│
├── src/
│   ├── api/
│   │   └── axiosInstance.js
│   │
│   ├── app/
│   │   └── store.js
│   │
│   ├── assets/
│   │   └── products/
│   │       └── # Local product images
│   │
│   ├── data/
│   │   └── localProducts.js
│   │       └── # Product data with local images
│   │
│   ├── components/
│   │   ├── AnnouncementBar.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── CategoryBar.jsx
│   │   ├── ProductsSection.jsx
│   │   ├── BagItem.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── StudioPhotos.jsx
│   │   ├── ReviewsList.jsx
│   │   └── ...
│   │
│   ├── features/
│   │   ├── cart/
│   │   │   └── cartSlice.js
│   │   ├── products/
│   │   │   └── productsSlice.js
│   │   └── trending/
│   │       └── trendingSlice.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Checkout.jsx
│   │   └── ...
│   │
│   ├── theme/
│   │   └── theme.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md

---

🛍️ Product Experience

Each product can contain detailed information such as:

- Product title
- Full product title
- Brand
- Category
- Price
- Rating
- Number of reviews
- Product description
- Product images
- Product specifications
- Studio photos
- Customer reviews
- Rating breakdown
- Technical information

Some products also include specialized information such as frequency response and audio-related specifications.

---

🧩 Main Product Categories

The store supports multiple categories, including:

- 🎧 Electronics
- 🎒 Accessories
- 👕 Fashion
- 🏠 Home
- 🆕 New Arrivals
- 🔥 Sale

---

🔌 Data Fetching

The project uses two different approaches for product-related data.

🛍️ Product Data

Main product data is stored locally in:

src/data/localProducts.js

Products are imported directly into the application rather than being fetched through Axios.

import localProducts from '../data/localProducts';

Product images are also stored locally inside:

src/assets/products/

The project no longer relies on "products.json" for the main product catalog.

🔥 Trending Products

Trending products are still fetched using Axios from:

public/data/trending.json

Example:

const { data } = await api.get('/data/trending.json');

This keeps the main product catalog local while using Axios for the separate trending products data source.

---

🎨 Design

The project uses a custom Material UI theme with a modern, clean, and premium e-commerce aesthetic.

Main Theme Colors

Primary:   #065F46
Secondary: #003D2E

The interface uses clean typography, spacious layouts, product cards, badges, drawers, responsive navigation, and interactive elements to create a polished shopping experience.

---

📱 Responsive Design

Mini Store is designed to work across:

- 📱 Mobile
- 📲 Tablet
- 💻 Laptop
- 🖥️ Desktop

The navigation and shopping experience adapt to smaller screens with a dedicated mobile menu and responsive layouts.

---

🛒 Shopping Experience

The store provides a complete shopping flow:

Browse Products
      ↓
Product Details
      ↓
Add to Bag
      ↓
Shopping Bag
      ↓
Checkout
      ↓
Payment Form & Validation

Users can manage product quantities, remove products, review their order summary, and complete the checkout form.

---

❤️ Wishlist

The wishlist allows users to save products for later.

Wishlist data is persisted using:

localStorage

This means saved wishlist items remain available after refreshing the page.

---

🔄 State Management

Redux Toolkit is used to manage application state.

The application uses Redux for managing important shopping-related state such as the cart and product/trending data.

Cart and wishlist information is persisted using "localStorage".

Example structure:

Store
│
├── Cart
│   ├── items
│   ├── quantities
│   └── total
│
├── Products
│   └── product data
│
└── Trending
    └── trending products

---

📦 Product Details

The product details experience includes:

- Product gallery
- Product information
- Pricing
- Ratings
- Reviews
- Product specifications
- Studio photos
- Rating breakdown
- Additional product-specific information

For audio products, the interface can also display technical information such as frequency response data.

---

⚙️ Installation

Clone the repository:

git clone https://github.com/mahaabusyam/mini-store.git

Navigate to the project:

cd mini-store

Install dependencies:

npm install

Start the development server:

npm run dev

Then open the local development URL shown by Vite.

---

📦 Main Dependencies

{
  "@emotion/cache": "^11.14.0",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.1",
  "@mui/icons-material": "^9.4.0",
  "@mui/material": "^9.4.0",
  "@reduxjs/toolkit": "^2.12.0",
  "axios": "^1.20.0",
  "react": "^19.2.8",
  "react-dom": "^19.2.8",
  "react-redux": "^9.3.0",
  "react-router-dom": "^7.18.4",
  "recharts": "^3.10.1",
  "stylis": "^4.4.0",
  "stylis-plugin-rtl": "^2.1.1"
}
---

🚀 Development

This project was built as a practical frontend project to strengthen skills in:

- React
- Redux Toolkit
- Material UI
- React Router
- API/data fetching
- Responsive design
- Component architecture
- State management
- Local storage
- E-commerce UI development

---

📸 Project Preview

Add screenshots of the Mini Store interface here.

Suggested screenshots:

Home Page
Product Details
Shopping Bag
Checkout Page
Mobile Navigation
Wishlist

---

🔮 Future Improvements

Possible future improvements include:

- 🔐 User authentication
- 💰 Real payment gateway integration such as Stripe
- 📦 Order tracking
- 🔍 Advanced search and filtering
- 👤 User profile and account management
- 🌐 Backend integration
- 🗄️ Real database integration
- ☁️ Product management dashboard
- 📈 Sales analytics

---

👩‍💻 Author

Maha Abu Syam

Computer Systems Engineering Student
Frontend Developer

Skills

- HTML
- CSS
- JavaScript
- Bootstrap
- React
- Material UI
- Redux Toolkit
- Responsive Web Design

---

📄 License

This project was created for educational and portfolio purposes.