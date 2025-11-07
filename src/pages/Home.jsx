import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import { products, priceRanges } from '../data/products';

const Home = ({ user, onLogout }) => {
	const [filters, setFilters] = useState({
		category: 'All',
		priceRange: priceRanges[0],
	});

	// Filter products based on selected filters
	const filteredProducts = products.filter((product) => {
		const matchesCategory =
			filters.category === 'All' || product.category === filters.category;
		const matchesPrice =
			product.price >= filters.priceRange.min &&
			product.price <= filters.priceRange.max;

		return matchesCategory && matchesPrice;
	});

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Navigation Bar */}
			<Navbar
				user={user}
				onLogout={onLogout}
			/>

			<div className='flex'>
				{/* Sidebar */}
				<Sidebar
					filters={filters}
					setFilters={setFilters}
				/>

				{/* Main Content */}
				<main className='flex-1 p-6'>
					<div className='max-w-screen-2xl mx-auto'>
						{/* Header */}
						<div className='mb-6'>
							<h2 className='text-2xl font-bold text-gray-900 mb-2'>
								Discover Great Deals
							</h2>
							<p className='text-gray-600'>
								{filteredProducts.length} products found
							</p>
						</div>

						{/* Products Grid */}
						{filteredProducts.length > 0 ? (
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
								{filteredProducts.map((product) => (
									<ProductCard
										key={product.id}
										product={product}
									/>
								))}
							</div>
						) : (
							<div className='text-center py-16'>
								<svg
									className='mx-auto h-12 w-12 text-gray-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
								<h3 className='mt-4 text-lg font-medium text-gray-900'>
									No products found
								</h3>
								<p className='mt-2 text-sm text-gray-500'>
									Try adjusting your filters to see more
									results.
								</p>
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
};

export default Home;
