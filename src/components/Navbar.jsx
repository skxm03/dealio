import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout, onMenuToggle, cart = [] }) => {
	const navigate = useNavigate();

	return (
		<nav className='bg-white shadow-sm sticky top-0 z-50'>
			<div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
				<button
					className='lg:hidden p-2 text-gray-600 mr-2'
					onClick={onMenuToggle}>
					☰
				</button>

				<h1
					className='text-2xl font-bold text-blue-600 cursor-pointer'
					onClick={() => navigate('/')}>
					Dealio
				</h1>

				<div className='flex items-center gap-5'>
					<button
						onClick={() => navigate('/cart')}
						className='relative text-gray-700 hover:text-blue-600 font-medium transition'>
						Cart
					</button>

					<p className='hidden sm:block text-sm text-gray-900 font-medium'>
						{user?.name}
					</p>

					<button
						onClick={onLogout}
						className='text-sm text-gray-700 hover:text-red-600 transition-colors'>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
