import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

function App() {
	const [user, setUser] = useState(null);

	const handleLogin = (userData) => {
		setUser(userData);
	};

	const handleLogout = () => {
		setUser(null);
	};

	// Protected routes wrapper
	const ProtectedRoute = ({ children }) => {
		return user ? (
			children
		) : (
			<Navigate
				to='/login'
				replace
			/>
		);
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
					<ProtectedRoute>
						<Home
							user={user}
							onLogout={handleLogout}
						/>
					</ProtectedRoute>
				}
			/>

			<Route
				path='/product/:id'
				element={
					<ProtectedRoute>
						<ProductDetail
							user={user}
							onLogout={handleLogout}
						/>
					</ProtectedRoute>
				}
			/>

			{/* Redirect unknown routes */}
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
