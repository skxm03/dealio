import { useState } from 'react';

const Navbar = ({ user, onLogout }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();
		// Search functionality will be implemented later
		console.log('Searching for:', searchQuery);
	};

	return (
		<nav className='bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm'>
			<div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<div className='shrink-0'>
						<h1 className='text-2xl font-bold text-blue-600'>
							Dealio
						</h1>
					</div>

					{/* Search Bar */}
					<form
						onSubmit={handleSearch}
						className='flex-1 max-w-2xl mx-8'>
						<div className='relative'>
							<input
								type='text'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder='Search for products...'
								className='w-full px-4 py-2 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
							/>
							<svg
								className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
						</div>
					</form>

					{/* User Profile */}
					<div className='flex items-center gap-4'>
						<div className='text-right'>
							<p className='text-sm font-semibold text-gray-900'>
								{user.name || user.email}
							</p>
							<p className='text-xs text-gray-500'>
								{user.email}
							</p>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
								<span className='text-blue-600 font-semibold text-sm'>
									{(user.name || user.email)
										.charAt(0)
										.toUpperCase()}
								</span>
							</div>
							<button
								onClick={onLogout}
								className='ml-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors'>
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
