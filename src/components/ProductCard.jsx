const ProductCard = ({ product, onClick }) => {
	const { image, title, price, rating, seller } = product;
	const formatPrice = (p) => `$${p.toFixed(2)}`;

	const Star = () => (
		<svg
			className='w-4 h-4 text-yellow-400 fill-current'
			viewBox='0 0 20 20'>
			<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
		</svg>
	);

	return (
		<div
			onClick={onClick}
			className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group'>
			<div className='relative h-44 bg-gray-100 overflow-hidden'>
				<img
					src={image}
					alt={title}
					loading='lazy'
					className='w-full h-full object-cover group-hover:scale-105 transition-transform'
					onError={(e) => {
						e.target.style.display = 'none';
						e.target.nextElementSibling.style.display = 'flex';
					}}
				/>
				<div className='hidden w-full h-full items-center justify-center bg-gray-200'>
					<svg
						className='w-12 h-12 text-gray-400'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
						/>
					</svg>
				</div>
			</div>

			<div className='p-4'>
				<h3 className='text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'>
					{title}
				</h3>

				<div className='flex items-center justify-between mb-2'>
					<p className='text-lg font-bold text-blue-600'>
						{formatPrice(price)}
					</p>

					<div className='flex items-center gap-1'>
						<Star />
						<span className='text-xs text-gray-600'>{rating}</span>
					</div>
				</div>

				<p className='text-xs text-gray-500'>
					by <span className='font-medium'>{seller}</span>
				</p>
			</div>
		</div>
	);
};

export default ProductCard;
