import User from '../models/user_model';
import UserPokes from '../models/user_pokes_model';

// Get all users
const getUsers = async (userFields) => {
  try {
    const users = await User.find(userFields);
    return users;
  } catch (error) {
    throw new Error(`Get users error: ${error}`);
  }
};

// Get singular user
const getUser = async (userId) => {
  try {
    const user = await User.find({ _id: userId });
    return user;
  } catch (error) {
    throw new Error(`Get user error: ${error}`);
  }
};

// Create user
const createUser = async (userFields) => {
  try {
    // Create new user
    const user = new User();
    user.username = userFields.username;
    user.email = userFields.email;
    user.avatar = userFields.avatar;
    user.password = userFields.password;
    user.baseDate = new Date();
    user.pokes = new UserPokes(); // Initialize user pokes
    user.pokes.userId = user._id; // Set user pokes userId to user _id

    // Save and return user
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw new Error(`Create user error: ${error}`);
  }
};

// Update user
const updateUser = async (userId, userFields) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userFields);
    return updatedUser;
  } catch (error) {
    throw new Error(`Update user error: ${error}`);
  }
};

// Delete user
// TODO: make secure delete function and add security to data flow
const deleteUser = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error(`Delete user error: ${error}`);
  }
};

// Search users by mongoose-indexed username field
const searchUsers = async (query) => {
  try {
    const users = await User.find({ username: { $regex: query, $options: 'i' } });
    return users;
  } catch (error) {
    throw new Error(`Search users error: ${error}`);
  }
};

const userService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
};

export default userService;
