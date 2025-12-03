import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { products } from '../data/products';

const ProductDetail = ({ user, onLogout }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const product = products.find((p) => p.id === Number(id));

	if (!product) {
		return <p className='p-6 text-center'>Product not found</p>;
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<Navbar
				user={user}
				onLogout={onLogout}
			/>

			<div className='max-w-7xl mx-auto px-4 py-8'>
				<button
					onClick={() => navigate(-1)}
					className='text-gray-600 hover:text-gray-900 mb-4'>
					← Back
				</button>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Product Image */}
					<img
						src={product.image}
						alt={product.title}
						className='w-full h-96 object-cover bg-white rounded-lg shadow-sm border'
					/>

					{/* Product Details */}
					<div className='space-y-6'>
						<h1 className='text-3xl font-bold text-gray-900'>
							{product.title}
						</h1>

						<p className='text-4xl font-bold text-blue-600'>
							${product.price.toFixed(2)}
						</p>

						<div className='space-y-3 pt-2'>
							<button className='w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition'>
								Add to Cart
							</button>
							<button className='w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition'>
								Buy Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
