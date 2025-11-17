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
	const [sortBy, setSortBy] = useState('featured');

	// Combined filtered + sorted products
	const visibleProducts = products
		.filter((p) => {
			const inCategory =
				filters.category === 'All' || p.category === filters.category;
			const inPrice =
				p.price >= filters.priceRange.min &&
				p.price <= filters.priceRange.max;

			return inCategory && inPrice;
		})
		.sort((a, b) => {
			switch (sortBy) {
				case 'price-low':
					return a.price - b.price;
				case 'price-high':
					return b.price - a.price;
				case 'rating':
					return b.rating - a.rating;
				case 'name':
					return a.title.localeCompare(b.title);
				default:
					return 0;
			}
		});

	return (
		<div className='min-h-screen bg-gray-50'>
			<Navbar
				user={user}
				onLogout={onLogout}
			/>

			<div className='flex'>
				<Sidebar
					filters={filters}
					setFilters={setFilters}
				/>

				<main className='flex-1 p-6'>
					<div className='max-w-screen-2xl mx-auto'>
						{/* Main Header */}
						<div className='mb-8'>
							<div className='flex items-center gap-3 mb-3'>
								<div className='w-1 h-8 bg-blue-600 rounded-full'></div>
								<h1 className='text-4xl font-bold text-gray-900'>
									Discover Great Deals
								</h1>
							</div>
							<p className='text-lg text-gray-600 ml-7'>
								Explore our curated collection of products
							</p>
						</div>

						{/* Filter Summary + Sort Bar */}
						<div className='flex items-center justify-between mb-6 pb-4 border-b border-gray-200'>
							<div className='flex items-center gap-3'>
								<p className='text-sm font-semibold text-gray-900'>
									{visibleProducts.length}{' '}
									{visibleProducts.length === 1
										? 'Product'
										: 'Products'}
								</p>

								{/* Category badge */}
								{filters.category !== 'All' && (
									<span className='inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200'>
										{filters.category}
										<button
											onClick={() =>
												setFilters({
													...filters,
													category: 'All',
												})
											}
											className='hover:text-blue-900'>
											✕
										</button>
									</span>
								)}

								{/* Price badge */}
								{filters.priceRange.label !== 'All Prices' && (
									<span className='inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200'>
										{filters.priceRange.label}
										<button
											onClick={() =>
												setFilters({
													...filters,
													priceRange: priceRanges[0],
												})
											}
											className='hover:text-blue-900'>
											✕
										</button>
									</span>
								)}
							</div>

							{/* Sort Dropdown */}
							<div className='flex items-center gap-2'>
								<label className='text-sm font-medium text-gray-700'>
									Sort by:
								</label>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className='px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'>
									<option value='featured'>Featured</option>
									<option value='price-low'>
										Price: Low to High
									</option>
									<option value='price-high'>
										Price: High to Low
									</option>
									<option value='rating'>
										Highest Rated
									</option>
									<option value='name'>Name: A to Z</option>
								</select>
							</div>
						</div>

						{/* Products */}
						{visibleProducts.length > 0 ? (
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
								{visibleProducts.map((product) => (
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
