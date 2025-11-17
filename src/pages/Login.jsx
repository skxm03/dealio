import { useState } from 'react';
import { validateLogin, registerUser } from '../data/users';

function Login({ onLogin }) {
	const [isSignup, setIsSignup] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError('');
	};

	const validateSignup = () => {
		const { name, email, password, confirmPassword } = formData;
		if (!name || !email || !password) return 'Please fill in all fields';
		if (password !== confirmPassword) return 'Passwords do not match';
		if (password.length < 6)
			return 'Password must be at least 6 characters';
		return null;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		setTimeout(() => {
			if (isSignup) {
				const errorMsg = validateSignup();
				if (errorMsg) {
					setError(errorMsg);
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

				result.success
					? onLogin(result.user)
					: setError(result.message);
			} else {
				if (!formData.email || !formData.password) {
					setError('Please enter email and password');
					setLoading(false);
					return;
				}

				const result = validateLogin(formData.email, formData.password);
				result.success
					? onLogin(result.user)
					: setError(result.message);
			}

			setLoading(false);
		}, 500);
	};

	// Reusable field generator (keeps full styling)
	const renderInput = (id, label, type = 'text') => (
		<div>
			<label
				htmlFor={id}
				className='block text-sm font-semibold text-gray-700 mb-2'>
				{label}
			</label>
			<input
				id={id}
				type={type}
				name={id}
				value={formData[id]}
				onChange={handleChange}
				disabled={loading}
				placeholder={
					type === 'email'
						? 'your@email.com'
						: type === 'password'
						? '••••••••'
						: 'John Doe'
				}
				className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed'
			/>
		</div>
	);

	return (
		<div className='min-h-[100vh] bg-gray-50 flex items-center justify-center py-4 px-4'>
			<div className='w-full max-w-md'>
				{/* Brand Header */}
				<div className='text-center mb-6'>
					<h1 className='text-4xl font-bold text-gray-900 tracking-tight'>
						Dealio
					</h1>
					<p className='text-gray-600 text-sm font-medium'>
						Your marketplace for great deals
					</p>
				</div>

				{/* Login Card */}
				<div className='bg-white rounded-xl shadow-lg border border-gray-200 p-6'>
					<div className='text-center mb-6'>
						<h2 className='text-xl font-bold text-gray-900 mb-1'>
							{isSignup ? 'Create Account' : 'Welcome Back'}
						</h2>
						<p className='text-gray-500 text-sm'>
							{isSignup
								? 'Sign up to start buying and selling'
								: 'Sign in to your account'}
						</p>
					</div>

					{error && (
						<div className='flex items-center gap-2 p-3 mb-5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm'>
							⚠ <span>{error}</span>
						</div>
					)}

					<form
						onSubmit={handleSubmit}
						className='space-y-4'>
						{isSignup && renderInput('name', 'Full Name')}
						{renderInput('email', 'Email Address', 'email')}
						{renderInput('password', 'Password', 'password')}
						{isSignup &&
							renderInput(
								'confirmPassword',
								'Confirm Password',
								'password'
							)}

						<button
							type='submit'
							disabled={loading}
							className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:bg-blue-300'>
							{loading
								? 'Please wait...'
								: isSignup
								? 'Create Account'
								: 'Sign In'}
						</button>
					</form>

					{/* Divider */}
					<div className='relative my-4'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-gray-200'></div>
						</div>
						<div className='relative flex justify-center text-xs'>
							<span className='px-2 bg-white text-gray-500 font-medium'>
								or
							</span>
						</div>
					</div>

					{/* Toggle */}
					<button
						type='button'
						onClick={() => {
							setIsSignup(!isSignup);
							setError('');
							setFormData({
								name: '',
								email: '',
								password: '',
								confirmPassword: '',
							});
						}}
						className='w-full py-3 bg-white text-blue-600 font-semibold border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all'>
						{isSignup
							? 'Already have an account? Sign In'
							: "Don't have an account? Sign Up"}
					</button>

					{!isSignup && (
						<div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
							<div className='inline-block bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full mb-1'>
								Demo Account
							</div>
							<p className='text-xs text-gray-700'>
								<strong>Email:</strong> john@example.com
							</p>
							<p className='text-xs text-gray-700'>
								<strong>Password:</strong> password123
							</p>
						</div>
					)}
				</div>

				<div className='text-center mt-4'>
					<p className='text-gray-500 text-[10px]'>
						© 2024 Dealio — Terms & Privacy
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
