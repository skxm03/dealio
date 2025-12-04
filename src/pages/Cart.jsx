import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Cart = ({ user, onLogout, cart, removeFromCart }) => {
	const navigate = useNavigate();

	let total = 0;
	for (let i = 0; i < cart.length; i++) {
		total += cart[i].price;
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<Navbar
				user={user}
				onLogout={onLogout}
				cart={cart}
			/>

			<div className='max-w-4xl mx-auto p-6'>
				<button
					onClick={() => navigate(-1)}
					className='text-gray-600 hover:text-gray-900 mb-6'>
					← Back
				</button>

				<h1 className='text-2xl font-bold mb-6'>Your Cart</h1>

				{cart.length === 0 ? (
					<p className='text-gray-600 text-sm'>Your cart is empty</p>
				) : (
					<>
						{cart.map((item, index) => (
							<div
								key={index}
								className='flex justify-between items-center bg-white p-3 rounded-lg mb-3'>
								<div className='flex items-center gap-3'>
									<img
										src={item.image}
										className='w-14 h-14 object-cover rounded'
									/>
									<p className='text-sm font-medium'>
										{item.title}
									</p>
								</div>

								<div className='text-right'>
									<p className='text-sm'>
										${item.price.toFixed(2)}
									</p>
									<button
										className='text-xs text-red-500'
										onClick={() => removeFromCart(index)}>
										Remove
									</button>
								</div>
							</div>
						))}

						<hr className='my-4' />

						<p className='text-lg font-semibold'>
							Total: ${total.toFixed(2)}
						</p>

						<button
							className='w-full bg-blue-600 text-white mt-4 py-3 rounded-lg'
							onClick={() => alert('Checkout not added')}>
							Checkout
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Cart;
