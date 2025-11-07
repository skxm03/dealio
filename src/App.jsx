import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
	const [user, setUser] = useState(null);

	const handleLogin = (userData) => {
		setUser(userData);
		console.log('User logged in:', userData);
	};

	const handleLogout = () => {
		setUser(null);
		console.log('User logged out');
	};

	// If user is not logged in, show login page
	if (!user) {
		return <Login onLogin={handleLogin} />;
	}

	// If user is logged in, show home page with products
	return (
		<Home
			user={user}
			onLogout={handleLogout}
		/>
	);
}

export default App;
