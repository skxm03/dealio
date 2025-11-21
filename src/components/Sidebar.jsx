import { categories, priceRanges } from '../data/products';

const Sidebar = () => {
	const renderOption = (label, groupName) => (
		<label className='flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer border border-transparent hover:bg-gray-50 transition'>
			<div className='flex items-center gap-2'>
				<input
					type='radio'
					name={groupName}
					className='w-4 h-4 text-blue-600 focus:ring-blue-200'
				/>
				<span className='text-sm text-gray-700'>{label}</span>
			</div>
		</label>
	);

	return (
		<aside className='w-64 bg-white border-r border-gray-200 p-6 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto'>
			<div className='mb-6 pb-4 border-b border-gray-200'>
				<h2 className='text-lg font-bold text-gray-900'>Filters</h2>
				<p className='text-xs text-gray-500 mt-1'>UI only</p>
			</div>

			<div className='mb-6'>
				<h3 className='text-sm font-semibold text-gray-700 mb-3'>
					Category
				</h3>
				<div className='space-y-2'>
					{categories.map((category) =>
						renderOption(category, 'category-group')
					)}
				</div>
			</div>

			<div>
				<h3 className='text-sm font-semibold text-gray-700 mb-3'>
					Price Range
				</h3>
				<div className='space-y-2'>
					{priceRanges.map((range) =>
						renderOption(range.label, 'price-group')
					)}
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
