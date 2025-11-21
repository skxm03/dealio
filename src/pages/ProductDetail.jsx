import { useState } from 'react';
import Navbar from '../components/Navbar';
import { products } from '../data/products';

const ProductDetail = ({ user, onLogout, productId = 1, onBackToHome }) => {
	const product = products.find((p) => p.id === productId) || products[0];

	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const images = [product.image, product.image, product.image];

	const stars = Array.from({ length: 5 });

	return (
		<div className='min-h-screen bg-gray-50'>
			<Navbar
				user={user}
				onLogout={onLogout}
			/>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<button
					onClick={onBackToHome}
					className='flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4'>
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
						<div className='bg-white rounded-lg overflow-hidden shadow-sm border'>
							<img
								src={images[selectedImage]}
								alt={product.title}
								className='w-full h-96 object-cover'
							/>
						</div>

						<div className='grid grid-cols-3 gap-4'>
							{images.map((img, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={`rounded-lg overflow-hidden border-2 ${
										selectedImage === index
											? 'border-blue-600'
											: 'border-gray-200 hover:border-gray-300'
									}`}>
									<img
										src={img}
										className='w-full h-24 object-cover'
									/>
								</button>
							))}
						</div>
					</div>

					<div className='space-y-6'>
						<div>
							<h1 className='text-3xl font-bold text-gray-900'>
								{product.title}
							</h1>
							<div className='flex items-center gap-3 mt-1'>
								<div className='flex'>
									{stars.map((_, i) => (
										<svg
											key={i}
											className={`w-5 h-5 ${
												i < Math.floor(product.rating)
													? 'text-yellow-400'
													: 'text-gray-300'
											}`}
											fill='currentColor'
											viewBox='0 0 20 20'>
											<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
										</svg>
									))}
								</div>
								<span className='text-gray-600 text-sm'>
									(156 reviews)
								</span>
							</div>
						</div>

						<div className='bg-blue-50 rounded-lg p-6 border border-blue-100'>
							<span className='text-4xl font-bold text-blue-600'>
								${product.price.toFixed(2)}
							</span>
							<span className='ml-2 line-through text-gray-500 text-lg'>
								${(product.price * 1.2).toFixed(2)}
							</span>
							<p className='text-green-600 mt-1'>
								Save ${(product.price * 0.2).toFixed(2)}
							</p>
						</div>

						<div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg border'>
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
						</div>

						<div>
							<label className='text-sm font-medium text-gray-700'>
								Quantity
							</label>
							<div className='flex items-center gap-3 mt-2'>
								<button
									onClick={() =>
										setQuantity(Math.max(1, quantity - 1))
									}
									className='w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg'>
									–
								</button>
								<input
									type='number'
									value={quantity}
									onChange={(e) =>
										setQuantity(
											Math.max(
												1,
												Number(e.target.value) || 1
											)
										)
									}
									className='w-20 h-10 text-center border rounded-lg'
								/>
								<button
									onClick={() => setQuantity(quantity + 1)}
									className='w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg'>
									+
								</button>
							</div>
						</div>

						<div className='space-y-3'>
							<button className='w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700'>
								Add to Cart
							</button>
							<button className='w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800'>
								Buy Now
							</button>
							<button className='w-full border-2 border-gray-300 py-4 rounded-lg hover:border-gray-400 flex gap-2 justify-center'>
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
							<p className='font-semibold text-green-800'>
								Free Shipping
							</p>
							<p className='text-sm text-green-700 mt-1'>
								Estimated delivery: 3–5 business days
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
