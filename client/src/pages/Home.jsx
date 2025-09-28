import React from 'react'
import { useCart } from '../App'

const Home = () => {
  const { medicines, addToCart } = useCart()

  const handleAddToCart = (medicine) => {
    addToCart(medicine)
    alert(`${medicine.name} added to cart!`)
  }

  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1>Welcome to Dr. Nidhi's Formula</h1>
          <p>Your trusted online pharmacy for quality products</p>
        </div>

        <div className="medicines-grid">
          {medicines.map(medicine => (
            <div key={medicine.id} className="medicine-card">
              {/* Product Image */}
              <img src={medicine.img} alt={medicine.name} className="medicine-img" />
              
              <div className="medicine-company">{medicine.company}</div>
              <div className="medicine-name">{medicine.name}</div>
              <div className="medicine-pricing">
                <span className="medicine-mrp">MRP ₹{medicine.mrp.toFixed(2)}</span>
                <span className="medicine-price">₹{medicine.price.toFixed(2)}</span>
              </div>
              <div className="medicine-save">
                Save upto {Math.round(((medicine.mrp - medicine.price) / medicine.mrp) * 100)}%
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(medicine)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
