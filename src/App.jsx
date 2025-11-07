import { useState } from 'react';
import Login from './pages/Login';

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

	// If user is logged in, show welcome message (temporary)
	return (
		<div className='min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-5'>
			<div className='max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-12 text-center animate-fade-in-up'>
				<h1 className='text-4xl font-bold text-gray-900 mb-3'>
					Welcome to Dealio, {user.name}! 🎉
				</h1>
				<p className='text-lg text-gray-600 mb-8'>
					You are successfully logged in.
				</p>

				<div className='bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8'>
					<div className='space-y-2 text-left'>
						<p className='text-base text-gray-700'>
							<strong className='font-semibold text-gray-900'>
								Email:
							</strong>{' '}
							{user.email}
						</p>
						<p className='text-base text-gray-700'>
							<strong className='font-semibold text-gray-900'>
								Member since:
							</strong>{' '}
							{user.joinedDate}
						</p>
					</div>
				</div>

				<button
					onClick={handleLogout}
					className='py-3.5 px-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200'>
					Logout
				</button>
			</div>

			<style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
		</div>
	);
}

export default App;
