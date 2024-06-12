import friendService from '../services/friend_service';

// Get all friends of a user
export async function getFriends(userId) {
  try {
    const friend = await friendService.getFriends(userId);
    return friend;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Get a user's friend
export async function getFriend(userId, friendId) {
  try {
    const friend = await friendService.getFriend(userId, friendId);
    return friend;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Add a friend to a user
export async function addFriend(userId, friendId) {
  try {
    const friend = await friendService.addFriend(userId, friendId);
    return friend;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Remove a friend
export async function removeFriend(userId, friendId) {
  try {
    const friend = await friendService.removeFriend(userId, friendId);
    return friend;
  } catch (error) {
    console.error(error);
    return error;
  }
}
