export const users = [
	{
		id: 1,
		username: 'john_doe',
		email: 'john@example.com',
		password: 'password123',
		name: 'John Doe',
		phone: '+1 (555) 123-4567',
		address: {
			street: '123 Main St',
			city: 'New York',
			state: 'NY',
			zip: '10001',
			country: 'USA',
		},
		joinedDate: '2023-05-15',
		sellerRating: 4.8,
		buyerRating: 4.9,
	},
];

export const findUserByEmail = (email) => {
	return users.find((user) => user.email === email);
};

export const validateLogin = (email, password) => {
	const user = findUserByEmail(email);
	if (user && user.password === password) {
		const { password: _, ...userWithoutPassword } = user;
		return { success: true, user: userWithoutPassword };
	}
	return { success: false, message: 'Invalid email or password' };
};
