import { categories, priceRanges, products } from '../data/products';

const Sidebar = ({ filters, setFilters }) => {
	const clearFilters = () => {
		setFilters({
			category: 'All',
			priceRange: priceRanges[0],
		});
	};

	// One generic count function
	const getCount = (item, type) => {
		if (type === 'category') {
			if (item === 'All') return products.length;
			return products.filter((p) => p.category === item).length;
		}
		if (type === 'price') {
			return products.filter(
				(p) => p.price >= item.min && p.price <= item.max
			).length;
		}
	};

	const hasActiveFilters =
		filters.category !== 'All' || filters.priceRange.label !== 'All Prices';

	// Reusable option renderer
	const renderOption = (label, selected, count, onClick) => (
		<label
			className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all ${
				selected
					? 'bg-blue-50 border border-blue-200'
					: 'hover:bg-gray-50 border border-transparent'
			}`}>
			<div className='flex items-center gap-2'>
				<input
					type='radio'
					checked={selected}
					onChange={onClick}
					className='w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-200'
				/>
				<span
					className={`text-sm ${
						selected
							? 'font-semibold text-blue-700'
							: 'text-gray-700'
					}`}>
					{label}
				</span>
			</div>

			<span
				className={`text-xs ${
					selected ? 'text-blue-600 font-semibold' : 'text-gray-500'
				}`}>
				{count}
			</span>
		</label>
	);

	return (
		<aside className='w-64 bg-white border-r border-gray-200 p-6 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto'>
			{/* Header */}
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

			{/* Category Section */}
			<div className='mb-6'>
				<h3 className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
					Category
				</h3>

				<div className='space-y-2'>
					{categories.map((category) =>
						renderOption(
							category,
							filters.category === category,
							getCount(category, 'category'),
							() => setFilters({ ...filters, category })
						)
					)}
				</div>
			</div>

			{/* Price Section */}
			<div>
				<h3 className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
					Price Range
				</h3>

				<div className='space-y-2'>
					{priceRanges.map((range) =>
						renderOption(
							range.label,
							filters.priceRange.label === range.label,
							getCount(range, 'price'),
							() => setFilters({ ...filters, priceRange: range })
						)
					)}
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
