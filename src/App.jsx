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
		setCart([...cart, product]); // 👈 super simple add
	};

	const removeFromCart = (index) => {
		const newCart = [...cart];
		newCart.splice(index, 1); // 👈 remove by index
		setCart(newCart);
	};

	const Protected = ({ children }) => {
		if (!user)
			return (
				<Navigate
					to='/login'
					replace
				/>
			);
		return children;
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
					<Protected>
						<Home
							user={user}
							onLogout={handleLogout}
							cart={cart}
						/>
					</Protected>
				}
			/>

			<Route
				path='/product/:id'
				element={
					<Protected>
						<ProductDetail
							user={user}
							onLogout={handleLogout}
							addToCart={addToCart}
							cart={cart}
						/>
					</Protected>
				}
			/>

			<Route
				path='/cart'
				element={
					<Protected>
						<Cart
							user={user}
							onLogout={handleLogout}
							cart={cart}
							removeFromCart={removeFromCart}
						/>
					</Protected>
				}
			/>

			<Route
				path='*'
				element={
					<Navigate
						to='/'
						replace
					/>
				}
			/>
		</Routes>
	);
}

export default App;
