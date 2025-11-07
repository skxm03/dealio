export const users = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA"
    },
    joinedDate: "2023-05-15",
    sellerRating: 4.8,
    buyerRating: 4.9
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    password: "password123",
    name: "Jane Smith",
    phone: "+1 (555) 987-6543",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA"
    },
    joinedDate: "2023-08-22",
    sellerRating: 5.0,
    buyerRating: 4.7
  }
];

// Helper function to find user by email
export const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

// Helper function to validate login
export const validateLogin = (email, password) => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  }
  return { success: false, message: "Invalid email or password" };
};

// Helper function to register new user
export const registerUser = (userData) => {
  const existingUser = findUserByEmail(userData.email);
  if (existingUser) {
    return { success: false, message: "Email already registered" };
  }
  
  const newUser = {
    id: users.length + 1,
    username: userData.email.split('@')[0],
    ...userData,
    joinedDate: new Date().toISOString().split('T')[0],
    sellerRating: 0,
    buyerRating: 0
  };
  
  users.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  return { success: true, user: userWithoutPassword };
};
