import React, { createContext, useContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom' 

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'
import Account from './pages/Account.jsx'
import PurchaseHistory from './pages/PurchaseHistory.jsx'
import Footer from './components/Footer.jsx'
import logo from './logo.jpg'

// Import product images from src folder
import product1 from './product1.jpg'
import product2 from './product2.jpg'
import product3 from './product3.jpg'
import product4 from './product4.jpg'
import product5 from './product5.jpg'
import product6 from './product6.jpg'
import product7 from './product7.jpg'
import product8 from './product8.jpg'
import product9 from './product9.jpg'

const CartContext = createContext()
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}

const medicines = [
  { id: 1, name: "Moisturizer for Dry Skin", company: "Dr.Nidhi's Formula", mrp: 499, price: 349, img: product1 },
  { id: 2, name: "Sunscreen SPF 50", company: "Dr.Nidhi's Formula", mrp: 499, price: 349, img: product2 },
  { id: 3, name: "Lip Repair Balm", company: "Dr.Nidhi's Formula", mrp: 293.44, price: 249, img: product3 },
  { id: 4, name: "Night Repair Cream", company: "Dr.Nidhi's Formula", mrp: 379.69, price: 319, img: product4 },
  { id: 5, name: "Vitamin C Face Serum", company: "Dr.Nidhi's Formula", mrp: 399, price: 249, img: product5 },
  { id: 6, name: "Hand Repair Cream", company: "Dr.Nidhi's Formula", mrp: 150, price: 120, img: product6 },
  { id: 7, name: "Anti-Acne Cream", company: "Dr.Nidhi's Formula", mrp: 399, price: 299, img: product7 },
  { id: 8, name: "Face Wash Gel", company: "Dr.Nidhi's Formula", mrp: 299, price: 199, img: product8 },
  { id: 9, name: "Crack Heal Cream", company: "Dr.Nidhi's Formula", mrp: 499, price: 349, img: product9 }
  
]

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ name: 'Suresh', email: 'test@drnidhi.com' })

  const addToCart = (medicine) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === medicine.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevItems, { ...medicine, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id) => setCartItems(prevItems => prevItems.filter(item => item.id !== id))

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) removeFromCart(id)
    else setCartItems(prevItems => prevItems.map(item => item.id === id ? { ...item, quantity } : item))
  }

  const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0)
  const getTotalPrice = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    medicines,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser
  }

  return (
    <CartContext.Provider value={cartContextValue}>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              {!isAuthenticated && <Route path="/login" element={<Login />} />}
              {isAuthenticated && <Route path="/account" element={<Account />} />}
              {isAuthenticated && <Route path="/purchase-history" element={<PurchaseHistory />} />}
              {isAuthenticated 
  ? <Route path="/cart" element={<Cart />} /> 
  : <Route path="/cart" element={<Login />} />
}
 />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartContext.Provider>
  )
}

const Navbar = () => {
  const { getTotalItems, isAuthenticated, setIsAuthenticated, user } = useCart()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    setIsAuthenticated(false)
    setOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logo} alt="Dr. Nidhi's Formula" style={{ height: '40px', borderRadius: '8px' }} />
          <h2>Dr. Nidhi's Formula</h2>
        </Link>

        <div className="nav-links" style={{ alignItems: 'center', gap: '1rem' }}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart <span className="cart-count">{getTotalItems()}</span>
          </Link>

          {!isAuthenticated && <Link to="/login" className="nav-link">Login</Link>}

          {isAuthenticated && (
            <div className="profile-menu">
              <button
                className="avatar-circle"
                onClick={() => setOpen(!open)}
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </button>

              {open && (
                <div className="profile-dropdown">
                  <Link to="/account" className="profile-link">My Account</Link>
                  <Link to="/purchase-history" className="profile-link">Purchase History</Link>
                  <button onClick={handleLogout} className="profile-link logout-btn">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}


export default App
