import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import { products, priceRanges } from '../data/products';

const Home = ({ user, onLogout, onProductClick }) => {
	const [sortBy, setSortBy] = useState('featured');
	const [filters, setFilters] = useState({
		category: 'All',
		priceRange: priceRanges[0],
	});

	const visibleProducts = products;

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
						<div className='mb-8'>
							<div className='flex items-center justify-between mb-4'>
								<div className='flex items-center gap-3'>
									<div className='w-1 h-7 bg-blue-600 rounded-full' />
									<h1 className='text-3xl font-bold text-gray-900'>
										Discover Great Deals
									</h1>
								</div>

								<div className='flex items-center gap-2'>
									<label className='text-sm font-medium text-gray-700'>
										Sort:
									</label>
									<select
										value={sortBy}
										onChange={(e) =>
											setSortBy(e.target.value)
										}
										className='px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition cursor-pointer'>
										<option value='featured'>
											Featured
										</option>
										<option value='price-low'>
											Price: Low to High
										</option>
										<option value='price-high'>
											Price: High to Low
										</option>
										<option value='rating'>
											Highest Rated
										</option>
										<option value='name'>
											Name: A to Z
										</option>
									</select>
								</div>
							</div>

							<p className='text-gray-600 text-lg ml-7'>
								Explore our curated collection of products
							</p>
						</div>

						{visibleProducts.length > 0 ? (
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
								{visibleProducts.map((product) => (
									<ProductCard
										key={product.id}
										product={product}
										onClick={() =>
											onProductClick &&
											onProductClick(product.id)
										}
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
									No products available at the moment.
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
