
import { useState } from 'react'
import './App.css'

const foods = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 199, image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600' },
  { id: 2, name: 'Classic Burger', category: 'Burger', price: 149, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600' },
  { id: 3, name: 'Creamy Pasta', category: 'Pasta', price: 179, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600' },
  { id: 4, name: 'Veg Sandwich', category: 'Snacks', price: 99, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600' },
  { id: 5, name: 'French Fries', category: 'Snacks', price: 89, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600' },
  { id: 6, name: 'Chocolate Cake', category: 'Dessert', price: 129, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600' }
]

function App() {
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [ordered, setOrdered] = useState(false)

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(search.toLowerCase())
  )

  const addToCart = (food) => {
    setCart(oldCart => {
      const found = oldCart.find(item => item.id === food.id)
      if (found) {
        return oldCart.map(item =>
          item.id === food.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...oldCart, { ...food, qty: 1 }]
    })
    setOrdered(false)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#home">🍽️ FoodTrack</a>
        <nav>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <button className="cart-button" onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})
          </button>
        </nav>
      </header>

      <section className="hero" id="home">
        <div>
          <p className="eyebrow">FRESH · TASTY · DELIVERED</p>
          <h1>Your cravings,<br />our <span>priority.</span></h1>
          <p>Discover delicious food and follow your order, all in one place.</p>
          <a className="primary-button" href="#menu">Explore Menu ↓</a>
        </div>
        <div className="hero-art">🍕</div>
      </section>

      <main id="menu" className="menu-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MADE FRESH FOR YOU</p>
            <h2>Our Menu</h2>
          </div>
          <input
            className="search"
            style={{ color: "black", backgroundColor: "white" }}
            type="search"
            placeholder="Search food..."
            value={search}
            
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {showCart ? (
          <section className="cart-panel">
            <h2>Your Cart</h2>
            {cart.length === 0 ? <p>Your cart is empty. Add something delicious!</p> :
              cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <span>{item.name} × {item.qty}</span>
                  <strong>₹{item.price * item.qty}</strong>
                  <button onClick={() => setCart(cart.filter(food => food.id !== item.id))}>Remove</button>
                </div>
              ))
            }
            <h3>Total: ₹{total}</h3>
            {cart.length > 0 && (
              <button className="primary-button" onClick={() => {
                setOrdered(true)
                setCart([])
              }}>Place Order</button>
            )}
            {ordered && <p className="success">Order placed successfully! 🎉 This is a demo order.</p>}
            <button className="secondary-button" onClick={() => setShowCart(false)}>Back to Menu</button>
          </section>
        ) : (
          <div className="food-grid">
            {filteredFoods.map(food => (
              <article className="food-card" key={food.id}>
                <img className="food-image" src={food.image} alt={food.name} loading="lazy" />
                <div className="food-info">
                  <span className="category">{food.category}</span>
                  <h3>{food.name}</h3>
                  <div className="food-bottom">
                    <strong>₹{food.price}</strong>
                    <button onClick={() => addToCart(food)}>+ Add</button>
                  </div>
                </div>
              </article>
            ))}
            {filteredFoods.length === 0 && <p>No matching food found.</p>}
          </div>
        )}
      </main>

      <footer>Made with ❤️ for food lovers · FoodTrack Demo</footer>
    </div>
  )
}

export default App
