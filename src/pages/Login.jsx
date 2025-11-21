import { useState } from 'react';
import { validateLogin } from '../data/users';

function Login({ onLogin }) {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		setTimeout(() => {
			if (!formData.email || !formData.password) {
				setError('Please enter email and password');
				setLoading(false);
				return;
			}

			const result = validateLogin(formData.email, formData.password);
			result.success ? onLogin(result.user) : setError(result.message);
			setLoading(false);
		}, 500);
	};

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6'>
			<div className='w-full max-w-md'>
				<div className='text-center mb-8'>
					<h1 className='text-4xl font-bold text-gray-900'>Dealio</h1>
					<p className='text-gray-500 mt-1 text-sm'>
						Your marketplace for great deals
					</p>
				</div>

				<div className='bg-white rounded-lg border border-gray-200 shadow-sm p-8'>
					<div className='text-center mb-6'>
						<h2 className='text-xl font-semibold text-gray-900'>
							Welcome Back
						</h2>
						<p className='text-gray-500 text-sm'>
							Sign in to your account
						</p>
					</div>

					{error && (
						<div className='flex items-center gap-2 p-3 mb-5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm'>
							<svg
								className='w-5 h-5'
								fill='currentColor'
								viewBox='0 0 20 20'>
								<path
									fillRule='evenodd'
									d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
									clipRule='evenodd'
								/>
							</svg>
							<span>{error}</span>
						</div>
					)}

					<form
						onSubmit={handleSubmit}
						className='space-y-5'>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700 mb-1'>
								Email Address
							</label>
							<input
								id='email'
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								disabled={loading}
								placeholder='your@email.com'
								className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100 disabled:cursor-not-allowed'
							/>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700 mb-1'>
								Password
							</label>
							<input
								id='password'
								type='password'
								name='password'
								value={formData.password}
								onChange={handleChange}
								disabled={loading}
								placeholder='••••••••'
								className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-gray-100 disabled:cursor-not-allowed'
							/>
						</div>

						<button
							type='submit'
							disabled={loading}
							className='w-full py-3.5 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition disabled:bg-blue-300 disabled:cursor-not-allowed'>
							{loading ? 'Signing In...' : 'Sign In'}
						</button>
					</form>

					<div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
						<div className='inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2'>
							Demo Account
						</div>
						<p className='text-sm text-gray-700'>
							<strong>Email:</strong> john@example.com
						</p>
						<p className='text-sm text-gray-700'>
							<strong>Password:</strong> password123
						</p>
					</div>
				</div>

				<div className='text-center mt-6'>
					<p className='text-gray-500 text-xs'>
						© 2024 Dealio • Terms & Privacy Policy
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
