import { categories, priceRanges } from '../data/products';
import { products } from '../data/products';

const Sidebar = ({ filters, setFilters }) => {
	const handleCategoryChange = (category) => {
		setFilters({ ...filters, category });
	};

	const handlePriceRangeChange = (priceRange) => {
		setFilters({ ...filters, priceRange });
	};

	const clearFilters = () => {
		setFilters({
			category: 'All',
			priceRange: priceRanges[0],
		});
	};

	// Count products for each category
	const getCategoryCount = (category) => {
		if (category === 'All') return products.length;
		return products.filter((p) => p.category === category).length;
	};

	// Count products for each price range
	const getPriceRangeCount = (range) => {
		return products.filter(
			(p) => p.price >= range.min && p.price <= range.max
		).length;
	};

	// Check if any filters are active
	const hasActiveFilters =
		filters.category !== 'All' || filters.priceRange.label !== 'All Prices';

	return (
		<aside className='w-64 bg-white border-r border-gray-200 p-6 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto'>
			<div className='flex items-center justify-between mb-6 pb-4 border-b border-gray-200'>
				<div>
					<h2 className='text-lg font-bold text-gray-900'>Filters</h2>
					{hasActiveFilters && (
						<p className='text-xs text-blue-600 mt-1'>
							{filters.category !== 'All' &&
							filters.priceRange.label !== 'All Prices'
								? '2 active'
								: '1 active'}
						</p>
					)}
				</div>
				{hasActiveFilters && (
					<button
						onClick={clearFilters}
						className='text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors'>
						Clear All
					</button>
				)}
			</div>

			{/* Category Filter */}
			<div className='mb-6'>
				<h3 className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
					<svg
						className='w-4 h-4 text-gray-500'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
						/>
					</svg>
					Category
				</h3>
				<div className='space-y-2'>
					{categories.map((category) => {
						const count = getCategoryCount(category);
						const isSelected = filters.category === category;
						return (
							<label
								key={category}
								className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all ${
									isSelected
										? 'bg-blue-50 border border-blue-200'
										: 'hover:bg-gray-50 border border-transparent'
								}`}>
								<div className='flex items-center gap-2'>
									<input
										type='radio'
										name='category'
										checked={isSelected}
										onChange={() =>
											handleCategoryChange(category)
										}
										className='w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-200'
									/>
									<span
										className={`text-sm ${
											isSelected
												? 'font-semibold text-blue-700'
												: 'text-gray-700'
										}`}>
										{category}
									</span>
								</div>
								<span
									className={`text-xs ${
										isSelected
											? 'text-blue-600 font-semibold'
											: 'text-gray-500'
									}`}>
									{count}
								</span>
							</label>
						);
					})}
				</div>
			</div>

			{/* Price Range Filter */}
			<div className='mb-6'>
				<h3 className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
					<svg
						className='w-4 h-4 text-gray-500'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					Price Range
				</h3>
				<div className='space-y-2'>
					{priceRanges.map((range) => {
						const count = getPriceRangeCount(range);
						const isSelected =
							filters.priceRange.label === range.label;
						return (
							<label
								key={range.label}
								className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all ${
									isSelected
										? 'bg-blue-50 border border-blue-200'
										: 'hover:bg-gray-50 border border-transparent'
								}`}>
								<div className='flex items-center gap-2'>
									<input
										type='radio'
										name='priceRange'
										checked={isSelected}
										onChange={() =>
											handlePriceRangeChange(range)
										}
										className='w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-200'
									/>
									<span
										className={`text-sm ${
											isSelected
												? 'font-semibold text-blue-700'
												: 'text-gray-700'
										}`}>
										{range.label}
									</span>
								</div>
								<span
									className={`text-xs ${
										isSelected
											? 'text-blue-600 font-semibold'
											: 'text-gray-500'
									}`}>
									{count}
								</span>
							</label>
						);
					})}
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
