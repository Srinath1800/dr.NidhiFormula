import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../App'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { setIsAuthenticated } = useCart()

  const dummyCredentials = {
    email: 'test@drnidhi.com',
    password: '123456'
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (formData.email === dummyCredentials.email && formData.password === dummyCredentials.password) {
      alert('Login successful! Welcome to Dr. Nidhi\'s Formula.')
      setFormData({ email: '', password: '' })
      setIsAuthenticated(true)  // Set auth true on login success
      navigate('/')             // Redirect to home page
    } else {
      alert('Invalid credentials. Please try again.\n\nDemo credentials:\nEmail: test@drnidhi.com\nPassword: 123456')
    }
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-card">
            <div className="card-header">
              <h2>Login to Your Account</h2>
              <p>Access your pharmacy account</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>
            </form>

            <div className="demo-credentials">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: test@drnidhi.com</p>
              <p>Password: 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
