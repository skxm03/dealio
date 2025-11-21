const Navbar = ({ user, onLogout }) => {
	const displayName = user?.name || user?.email || 'Guest';
	const initial = displayName[0]?.toUpperCase() || 'G';

	return (
		<nav className='bg-white border-b shadow-sm sticky top-0 z-50'>
			<div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
				<h1 className='text-2xl font-bold text-blue-600'>Dealio</h1>

				<div className='flex items-center gap-4'>
					<div className='hidden sm:block text-right'>
						<p className='text-sm font-semibold text-gray-900'>
							{displayName}
						</p>
						<p className='text-xs text-gray-500'>{user.email}</p>
					</div>

					<div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
						<span className='text-blue-600 font-semibold'>
							{initial}
						</span>
					</div>

					<button
						onClick={onLogout}
						className='px-3 py-2 text-sm text-gray-700 hover:text-red-600 transition-colors'>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
