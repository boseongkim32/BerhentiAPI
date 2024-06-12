import User from '../models/user_model';

// Get all friends of a user
const getFriends = async (userId) => {
  try {
    const user = await User.findById(userId);
    const friendsIds = user.friends;
    const friendsList = Promise.all(friendsIds.map(async (friendId) => {
      const friend = await User.findById(friendId);
      return friend;
    }));
    return friendsList;
  } catch (error) {
    throw new Error(`get friends error: ${error}`);
  }
};

// Get a user's friend
const getFriend = async (userId, friendId) => {
  try {
    const friendsIds = await User.findById(userId, 'friends');
    if (friendsIds.includes(friendId)) {
      const friend = await User.findById(friendId);
      return friend;
    } else {
      throw new Error('User is not a friend');
    }
  } catch (error) {
    throw new Error(`get friend error: ${error}`);
  }
};

// Add a new friend
const addFriend = async (userId, friendId) => {
  try {
    // cannot friend yourself
    if (userId === friendId) {
      return 'cannot friend oneself';
    }
    const user = await User.findById(userId);
    // cannot request a friend again
    if (user.friends.includes(friendId)) {
      return 'already friends';
    }
    const confOut = await User.findByIdAndUpdate(userId, { $push: { friendRequestsOut: friendId } });
    const confIn = await User.findByIdAndUpdate(friendId, { $push: { friendRequestsIn: userId } });
    const match = await User.exists({ _id: userId, friendRequestsIn: friendId, friendRequestsOut: friendId });
    if (match) {
      await User.findByIdAndUpdate(userId, { $push: { friends: friendId } });
      await User.findByIdAndUpdate(friendId, { $push: { friends: userId } });
    }
    return confOut && confIn && match;
  } catch (error) {
    throw new Error(`add friend error: ${error}`);
  }
};

// Remove a friend
const removeFriend = async (userId, friendId) => {
  try {
    const userConf = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId, friendRequestsOut: friendId } });
    const friendConf = await User.findByIdAndUpdate(friendId, { $pull: { friends: userId, friendRequestsIn: userId } });
    return userConf && friendConf;
  } catch (error) {
    throw new Error(`remove friend error: ${error}`);
  }
};

const friendService = {
  getFriends,
  getFriend,
  addFriend,
  removeFriend,
};

export default friendService;
