import { categories, priceRanges } from '../data/products';

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

	return (
		<aside className='w-64 bg-white border-r border-gray-200 p-6 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-lg font-bold text-gray-900'>Filters</h2>
				<button
					onClick={clearFilters}
					className='text-xs text-blue-600 hover:text-blue-700 font-medium'>
					Clear All
				</button>
			</div>

			{/* Category Filter */}
			<div className='mb-6'>
				<h3 className='text-sm font-semibold text-gray-700 mb-3'>
					Category
				</h3>
				<div className='space-y-2'>
					{categories.map((category) => (
						<label
							key={category}
							className='flex items-center gap-2 cursor-pointer group'>
							<input
								type='radio'
								name='category'
								checked={filters.category === category}
								onChange={() => handleCategoryChange(category)}
								className='w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-200'
							/>
							<span className='text-sm text-gray-700 group-hover:text-gray-900'>
								{category}
							</span>
						</label>
					))}
				</div>
			</div>

			{/* Price Range Filter */}
			<div className='mb-6'>
				<h3 className='text-sm font-semibold text-gray-700 mb-3'>
					Price Range
				</h3>
				<div className='space-y-2'>
					{priceRanges.map((range) => (
						<label
							key={range.label}
							className='flex items-center gap-2 cursor-pointer group'>
							<input
								type='radio'
								name='priceRange'
								checked={
									filters.priceRange.label === range.label
								}
								onChange={() => handlePriceRangeChange(range)}
								className='w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-200'
							/>
							<span className='text-sm text-gray-700 group-hover:text-gray-900'>
								{range.label}
							</span>
						</label>
					))}
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
