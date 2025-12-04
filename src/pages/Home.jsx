import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';

const Home = ({ user, onLogout, cart }) => {
	const navigate = useNavigate();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className='min-h-screen bg-gray-50'>
			<Navbar
				user={user}
				onLogout={onLogout}
				onMenuToggle={() => setIsSidebarOpen(true)}
				cart={cart}
			/>

			<div className='flex'>
				<Sidebar
					isOpen={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
				/>

				<main className='flex-1 p-6'>
					<div className='max-w-screen-2xl mx-auto'>
						<h1 className='text-3xl font-bold text-gray-900 mb-8'>
							Discover Great Deals
						</h1>

						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{products.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									onClick={() =>
										navigate(`/product/${product.id}`)
									}
								/>
							))}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Home;
