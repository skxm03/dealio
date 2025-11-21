import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

function App() {
	const [user, setUser] = useState(null);
	const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'product'
	const [selectedProductId, setSelectedProductId] = useState(null);

	const handleLogin = (userData) => {
		setUser(userData);
		console.log('User logged in:', userData);
	};

	const handleLogout = () => {
		setUser(null);
		setCurrentPage('home');
		console.log('User logged out');
	};

	const handleProductClick = (productId) => {
		setSelectedProductId(productId);
		setCurrentPage('product');
	};

	const handleBackToHome = () => {
		setCurrentPage('home');
		setSelectedProductId(null);
	};

	// If user is not logged in, show login page
	if (!user) {
		return <Login onLogin={handleLogin} />;
	}

	// If viewing product detail
	if (currentPage === 'product' && selectedProductId) {
		return (
			<ProductDetail
				user={user}
				onLogout={handleLogout}
				productId={selectedProductId}
				onBackToHome={handleBackToHome}
			/>
		);
	}

	// If user is logged in, show home page with products
	return (
		<Home
			user={user}
			onLogout={handleLogout}
			onProductClick={handleProductClick}
		/>
	);
}

export default App;
