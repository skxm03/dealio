const ProductCard = ({ product, onClick }) => {
	const { image, title, price } = product;
	const formattedPrice = `$${price.toFixed(2)}`;

	return (
		<div
			onClick={onClick}
			className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group'>
			<img
				src={image}
				alt={title}
				className='w-full h-44 object-cover'
				loading='lazy'
			/>

			<div className='p-4'>
				<h3 className='text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'>
					{title}
				</h3>

				<p className='text-lg font-bold text-blue-600'>
					{formattedPrice}
				</p>
			</div>
		</div>
	);
};

export default ProductCard;
