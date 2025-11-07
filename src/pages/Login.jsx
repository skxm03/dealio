import { useState } from 'react';
import { validateLogin, registerUser } from '../data/users';

function Login({ onLogin }) {
	const [isSignup, setIsSignup] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
		confirmPassword: '',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setError('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		setTimeout(() => {
			if (isSignup) {
				if (!formData.name || !formData.email || !formData.password) {
					setError('Please fill in all fields');
					setLoading(false);
					return;
				}
				if (formData.password !== formData.confirmPassword) {
					setError('Passwords do not match');
					setLoading(false);
					return;
				}
				if (formData.password.length < 6) {
					setError('Password must be at least 6 characters');
					setLoading(false);
					return;
				}

				const result = registerUser({
					email: formData.email,
					password: formData.password,
					name: formData.name,
					address: {
						street: '',
						city: '',
						state: '',
						zip: '',
						country: 'USA',
					},
				});

				if (result.success) {
					onLogin(result.user);
				} else {
					setError(result.message);
				}
			} else {
				if (!formData.email || !formData.password) {
					setError('Please enter email and password');
					setLoading(false);
					return;
				}

				const result = validateLogin(formData.email, formData.password);

				if (result.success) {
					onLogin(result.user);
				} else {
					setError(result.message);
				}
			}
			setLoading(false);
		}, 500);
	};

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center p-5'>
			<div className='max-w-md w-full'>
				{/* Brand Header */}
				<div className='text-center mb-8'>
					<h1 className='text-5xl font-bold text-gray-900 mb-2 tracking-tight'>
						Dealio
					</h1>
					<p className='text-gray-600 text-base font-medium'>
						Your marketplace for great deals
					</p>
				</div>

				{/* Login Card */}
				<div className='bg-white rounded-xl shadow-lg border border-gray-200 p-10'>
					<div className='text-center mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 mb-1'>
							{isSignup ? 'Create Account' : 'Welcome Back'}
						</h2>
						<p className='text-gray-500 text-sm'>
							{isSignup
								? 'Sign up to start buying and selling'
								: 'Sign in to your account'}
						</p>
					</div>

					{error && (
						<div className='flex items-center gap-3 p-4 mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm'>
							<span className='text-lg'>⚠</span>
							<span>{error}</span>
						</div>
					)}

					<form
						onSubmit={handleSubmit}
						className='space-y-5'>
						{isSignup && (
							<div>
								<label
									htmlFor='name'
									className='block text-sm font-semibold text-gray-700 mb-2'>
									Full Name
								</label>
								<input
									id='name'
									type='text'
									name='name'
									value={formData.name}
									onChange={handleChange}
									placeholder='John Doe'
									disabled={loading}
									className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed'
								/>
							</div>
						)}

						<div>
							<label
								htmlFor='email'
								className='block text-sm font-semibold text-gray-700 mb-2'>
								Email Address
							</label>
							<input
								id='email'
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								placeholder='your@email.com'
								disabled={loading}
								className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed'
							/>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-semibold text-gray-700 mb-2'>
								Password
							</label>
							<input
								id='password'
								type='password'
								name='password'
								value={formData.password}
								onChange={handleChange}
								placeholder='••••••••'
								disabled={loading}
								className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed'
							/>
						</div>

						{isSignup && (
							<div>
								<label
									htmlFor='confirmPassword'
									className='block text-sm font-semibold text-gray-700 mb-2'>
									Confirm Password
								</label>
								<input
									id='confirmPassword'
									type='password'
									name='confirmPassword'
									value={formData.confirmPassword}
									onChange={handleChange}
									placeholder='••••••••'
									disabled={loading}
									className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed'
								/>
							</div>
						)}

						<button
							type='submit'
							disabled={loading}
							className='w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:bg-blue-300 disabled:cursor-not-allowed'>
							{loading
								? 'Please wait...'
								: isSignup
								? 'Create Account'
								: 'Sign In'}
						</button>
					</form>

					<div className='relative my-6'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-gray-200'></div>
						</div>
						<div className='relative flex justify-center text-sm'>
							<span className='px-4 bg-white text-gray-500 font-medium'>
								or
							</span>
						</div>
					</div>

					<button
						type='button'
						onClick={() => {
							setIsSignup(!isSignup);
							setError('');
							setFormData({
								email: '',
								password: '',
								name: '',
								confirmPassword: '',
							});
						}}
						disabled={loading}
						className='w-full py-3 px-6 bg-white text-blue-600 font-semibold border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed'>
						{isSignup
							? 'Already have an account? Sign In'
							: "Don't have an account? Sign Up"}
					</button>

					{!isSignup && (
						<div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
							<div className='inline-block bg-blue-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-2'>
								Demo Account
							</div>
							<p className='text-sm text-gray-700 mt-1'>
								<strong className='font-semibold'>
									Email:
								</strong>{' '}
								john@example.com
							</p>
							<p className='text-sm text-gray-700'>
								<strong className='font-semibold'>
									Password:
								</strong>{' '}
								password123
							</p>
						</div>
					)}
				</div>

				<div className='text-center mt-6'>
					<p className='text-gray-600 text-xs'>
						© 2024 Dealio. By continuing, you agree to our Terms &
						Privacy Policy
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
