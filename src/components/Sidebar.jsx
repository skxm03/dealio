import { categories, priceRanges } from '../data/products';

const Sidebar = () => {
	const renderOption = (label) => (
		<label className='flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition'>
			<span className='text-sm text-gray-700'>{label}</span>
		</label>
	);

	return (
		<aside className='hidden lg:block w-64 bg-white border-r border-gray-200 p-6 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto'>
			<div className='mb-6 pb-4 border-gray-200'>
				<h2 className='text-lg font-bold text-gray-900'>Filters</h2>
			</div>

			<div className='mb-6'>
				<h3 className='text-sm font-semibold text-gray-700 mb-3'>
					Category
				</h3>
				<div className='space-y-2'>
					{categories.map((category) => renderOption(category))}
				</div>
			</div>

			<div>
				<h3 className='text-sm font-semibold text-gray-700 mb-3'>
					Price Range
				</h3>
				<div className='space-y-2'>
					{priceRanges.map((range) => renderOption(range.label))}
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
