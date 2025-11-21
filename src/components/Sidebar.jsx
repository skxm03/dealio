import { categories, priceRanges } from '../data/products';

const Sidebar = ({ filters, setFilters }) => {
	const clearFilters = () => {
		setFilters({
			category: 'All',
			priceRange: priceRanges[0],
		});
	};

	const hasActiveFilters =
		filters.category !== 'All' || filters.priceRange.label !== 'All Prices';

	const renderOption = (label, selected, onClick) => (
		<label
			className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition ${
				selected
					? 'bg-blue-50 border border-blue-200'
					: 'border border-transparent hover:bg-gray-50'
			}`}>
			<div className='flex items-center gap-2'>
				<input
					type='radio'
					checked={selected}
					onChange={onClick}
					className='w-4 h-4 text-blue-600 focus:ring-blue-200'
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
		</label>
	);

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
						className='text-xs text-blue-600 hover:text-blue-700 transition-colors'>
						Clear
					</button>
				)}
			</div>

			<div className='mb-6'>
				<h3 className='text-sm font-semibold text-gray-700 mb-3'>
					Category
				</h3>
				<div className='space-y-2'>
					{categories.map((category) =>
						renderOption(
							category,
							filters.category === category,
							() => setFilters({ ...filters, category })
						)
					)}
				</div>
			</div>

			<div>
				<h3 className='text-sm font-semibold text-gray-700 mb-3'>
					Price Range
				</h3>
				<div className='space-y-2'>
					{priceRanges.map((range) =>
						renderOption(
							range.label,
							filters.priceRange.label === range.label,
							() => setFilters({ ...filters, priceRange: range })
						)
					)}
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
