import { useState } from 'react';
import Navbar from '../components/Navbar';
import { products } from '../data/products';

const ProductDetail = ({ user, onLogout, productId = 1, onBackToHome }) => {
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const productData = products.find((p) => p.id === productId) || products[0];
	const images = [productData.image, productData.image, productData.image];

	const product = {
		...productData,
		images,
		reviews: 156,
		condition: 'New',
		availability: 'In Stock',
		shipping: 'Free Shipping',
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			<Navbar
				user={user}
				onLogout={onLogout}
			/>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<button
					onClick={onBackToHome}
					className='flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors'>
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 19l-7-7 7-7'
						/>
					</svg>
					Back to Products
				</button>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					<div className='space-y-4'>
						<div className='bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200'>
							<img
								src={product.images[selectedImage]}
								alt={product.title}
								className='w-full h-96 object-cover'
								loading='lazy'
							/>
						</div>

						<div className='grid grid-cols-3 gap-4'>
							{product.images.map((img, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={`bg-white rounded-lg overflow-hidden border-2 transition ${
										selectedImage === index
											? 'border-blue-600 shadow-sm'
											: 'border-gray-200 hover:border-gray-300'
									}`}>
									<img
										src={img}
										alt={`${product.title}-${index}`}
										className='w-full h-24 object-cover'
										loading='lazy'
									/>
								</button>
							))}
						</div>
					</div>

					<div className='space-y-6'>
						<div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>
								{product.title}
							</h1>

							<div className='flex items-center gap-3'>
								<div className='flex items-center gap-1'>
									{[...Array(5)].map((_, index) => (
										<svg
											key={index}
											className={`w-5 h-5 ${
												index <
												Math.floor(product.rating)
													? 'text-yellow-400 fill-current'
													: 'text-gray-300 fill-current'
											}`}
											viewBox='0 0 20 20'>
											<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
										</svg>
									))}
									<span className='ml-2 text-lg font-semibold text-gray-900'>
										{product.rating}
									</span>
								</div>
								<span className='text-gray-500'>
									({product.reviews} reviews)
								</span>
							</div>
						</div>

						<div className='bg-blue-50 rounded-lg p-6 border border-blue-100'>
							<div className='flex items-baseline gap-2'>
								<span className='text-4xl font-bold text-blue-600'>
									${product.price.toFixed(2)}
								</span>
								<span className='text-gray-500 line-through text-lg'>
									${(product.price * 1.2).toFixed(2)}
								</span>
							</div>
							<p className='text-green-600 font-medium mt-1'>
								Save ${(product.price * 0.2).toFixed(2)} (20%
								off)
							</p>
						</div>

						<div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200'>
							<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
								<span className='text-blue-600 font-bold text-lg'>
									{product.seller[0]}
								</span>
							</div>

							<div>
								<p className='text-sm text-gray-500'>Sold by</p>
								<p className='font-semibold text-gray-900'>
									{product.seller}
								</p>
							</div>

							<button className='ml-auto px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium'>
								View Store
							</button>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div className='p-4 bg-white rounded-lg border border-gray-200'>
								<p className='text-sm text-gray-500 mb-1'>
									Condition
								</p>
								<p className='font-semibold text-gray-900'>
									{product.condition}
								</p>
							</div>
							<div className='p-4 bg-white rounded-lg border border-gray-200'>
								<p className='text-sm text-gray-500 mb-1'>
									Availability
								</p>
								<p className='font-semibold text-green-600'>
									{product.availability}
								</p>
							</div>
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-medium text-gray-700'>
								Quantity
							</label>
							<div className='flex items-center gap-3'>
								<button
									onClick={() =>
										setQuantity(Math.max(1, quantity - 1))
									}
									className='w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-semibold transition'>
									−
								</button>

								<input
									type='number'
									value={quantity}
									onChange={(e) =>
										setQuantity(
											Math.max(
												1,
												parseInt(e.target.value) || 1
											)
										)
									}
									className='w-20 h-10 text-center border border-gray-300 rounded-lg font-semibold'
								/>

								<button
									onClick={() => setQuantity(quantity + 1)}
									className='w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-semibold transition'>
									+
								</button>
							</div>
						</div>

						<div className='space-y-3 pt-4'>
							<button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors text-lg shadow-sm'>
								Add to Cart
							</button>

							<button className='w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-lg transition-colors text-lg shadow-sm'>
								Buy Now
							</button>

							<button className='w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 rounded-lg transition flex items-center justify-center gap-2'>
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
									/>
								</svg>
								Add to Watchlist
							</button>
						</div>

						<div className='bg-green-50 border border-green-200 rounded-lg p-4'>
							<div className='flex items-center gap-2'>
								<svg
									className='w-5 h-5 text-green-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M5 13l4 4L19 7'
									/>
								</svg>
								<span className='font-semibold text-green-800'>
									{product.shipping}
								</span>
							</div>
							<p className='text-sm text-green-700 mt-1 ml-7'>
								Estimated delivery: 3-5 business days
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
