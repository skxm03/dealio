const ProductCard = ({ product }) => {
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
		<div className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group'>
			{/* Product Image */}
			<div className='relative h-48 bg-gray-100 overflow-hidden'>
				<img
					src={image}
					alt={title}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
					onError={(e) => (e.target.src = '/placeholder.png')}
				/>
			</div>

			{/* Product Info */}
			<div className='p-4'>
				<h3 className='text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'>
					{title}
				</h3>

				<div className='flex items-center justify-between mb-2'>
					<p className='text-xl font-bold text-blue-600'>
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
