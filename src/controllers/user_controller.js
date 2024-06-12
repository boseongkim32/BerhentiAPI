import userService from '../services/user_service';

// Create new user
export async function createUser(userFields) {
  try {
    const userExists = await userService.getUsers({ username: userFields.username });
    if (userExists.length > 0) {
      return ('Username is taken');
    }
    const newUser = userService.createUser(userFields);
    return newUser;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Get users (filtered by userFields or all users if empty object)
export async function getUsers(userFields) {
  try {
    const users = await userService.getUsers(userFields);
    return users;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Get singular user by id
export async function getUser(userId) {
  try {
    const user = await userService.getUser(userId);
    return user;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// TODO: make secure delete function and add security to data flow
export async function deleteUser(userId, userPassword) {
  try {
    const user = await userService.deleteUser(userId);
    return user;
  } catch (error) {
    throw new Error(`delete user error: ${error}`);
  }
}

// search users based on username
export async function searchUsers(query) {
  try {
    // search users by username
    const users = await userService.searchUsers(query);
    return users;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// basic login
export async function login(username, password) {
  try {
    const users = await userService.getUsers({ username });
    const user = users[0];
    if (user.password === password) {
      // TODO: is returning user/false fine or do we want auth token?
      return user;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}
