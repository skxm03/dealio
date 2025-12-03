import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../data/users';

function Login({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email || !password) {
			setError('Please enter email and password');
			return;
		}

		const result = validateLogin(email, password);

		if (result.success) {
			onLogin(result.user);
			navigate('/'); // 👈 NEW redirect
		} else {
			setError(result.message);
		}
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
					{error && (
						<p className='mb-4 p-3 bg-red-50 text-red-700 border-l-4 border-red-500 rounded text-sm'>
							{error}
						</p>
					)}

					<form
						onSubmit={handleSubmit}
						className='space-y-5'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Email Address
							</label>
							<input
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='your@email.com'
								className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Password
							</label>
							<input
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='••••••••'
								className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500'
							/>
						</div>

						<button
							type='submit'
							className='w-full py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition'>
							Sign In
						</button>
					</form>

					<div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm'>
						<p>
							<strong>Email:</strong> john@example.com
						</p>
						<p>
							<strong>Password:</strong> password123
						</p>
					</div>
				</div>

				<div className='text-center mt-6 text-gray-500 text-xs'>
					© 2024 Dealio • Terms & Privacy Policy
				</div>
			</div>
		</div>
	);
}

export default Login;
