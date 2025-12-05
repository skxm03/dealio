import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
	const [user, setUser] = useState(null);
	const [cart, setCart] = useState([]);

	const handleLogin = (userData) => {
		setUser(userData);
	};

	const handleLogout = () => {
		setUser(null);
		setCart([]);
	};

	const addToCart = (product) => {
		setCart([...cart, product]);
	};

	const removeFromCart = (index) => {
		const updatedCart = [...cart];
		updatedCart.splice(index, 1);
		setCart(updatedCart);
	};

	return (
		<Routes>
			<Route
				path='/login'
				element={<Login onLogin={handleLogin} />}
			/>

			<Route
				path='/'
				element={
					<Home
						user={user}
						onLogout={handleLogout}
						cart={cart}
					/>
				}
			/>

			<Route
				path='/product/:id'
				element={
					<ProductDetail
						user={user}
						onLogout={handleLogout}
						addToCart={addToCart}
						cart={cart}
					/>
				}
			/>

			<Route
				path='/cart'
				element={
					<Cart
						user={user}
						onLogout={handleLogout}
						cart={cart}
						removeFromCart={removeFromCart}
					/>
				}
			/>
		</Routes>
	);
}

export default App;
