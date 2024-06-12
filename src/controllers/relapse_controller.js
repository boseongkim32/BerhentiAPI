import feedService from '../services/feed_service';
import relapseService from '../services/relapse_service';
import userService from '../services/user_service';

// Get relapse by relapseId
export async function getRelapse(relapseId) {
  try {
    const relapse = await relapseService.getRelapse(relapseId);
    return relapse;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Get all relapses of a user
export async function getAllRelapses(userId) {
  try {
    const relapses = await relapseService.getAllRelapses(userId);
    return relapses;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Create a new relapse, add it to user's relapse list and feed list, add it to user's friends' feed lists
export async function createRelapse(userId, relapseFields) {
  try {
    // Create new relapse
    const relapse = await relapseService.createRelapse(userId, relapseFields);

    // Add relapse to user's list of relapses and feed list
    const user = await userService.getUser(userId);
    user.relapses.push(relapse._id);
    await feedService.addItemToFeed(userId, userId, relapse._id, 'Relapse');

    // Update all user's friends' feeds to include relapse
    await Promise.all(user.friends.map(async (friendId) => {
      await feedService.addItemToFeed(friendId, userId, relapse._id, 'Relapse');
    }));

    await user.save();
    return relapse;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Update relapse
export async function updateRelapse(relapseId, relapseFields) {
  try {
    const updatedRelapse = await relapseService.updateRelapse(relapseId, relapseFields);
    return updatedRelapse;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Delete relapse and remove from user's friends' feed lists
export async function deleteRelapse(userId, relapseId) {
  try {
    // Delete the relapse
    const deletedRelapse = await relapseService.deleteRelapse(relapseId);

    // Remove the feed object associated from friends' feed lists
    const user = await userService.getUser(userId);
    await feedService.removeItemFromFeed(userId, relapseId);
    await Promise.all(user.friends.map(async (friendId) => {
      await feedService.removeItemFromFeed(friendId, relapseId);
    }));

    return deletedRelapse;
  } catch (error) {
    console.error(error);
    return error;
  }
}
