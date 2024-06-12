import milestoneService from '../services/milestone_service';
import userService from '../services/user_service';
import feedService from '../services/feed_service';

// Fetch all milestones of user
export async function getAllMilestones(userId) {
  try {
    const milestones = await milestoneService.getAllMilestones(userId);
    return milestones;
  } catch (error) {
    throw new Error(`Get all milestones error: ${error}`);
  }
}

// Fetch individual milestone
export async function getMilestone(milestoneId) {
  try {
    const milestone = await milestoneService.getMilestone(milestoneId);
    return milestone;
  } catch (error) {
    throw new Error(`Get milestone error: ${error}`);
  }
}

// Create new milestone
export async function createMilestone(userId, milestoneFields) {
  try {
    const milestone = await milestoneService.createMilestone(userId, milestoneFields);

    // add to user milestones and feed
    const user = await userService.getUser(userId);
    user.milestones.push(milestone._id);
    await feedService.addItemToFeed(userId, userId, milestone._id, 'Milestone');

    // add new milestone to all of user's friends' feeds
    await Promise.all(user.friends.map(async (friendId) => {
      await feedService.addItemToFeed(friendId, userId, milestone._id, 'Milestone');
    }));

    // save changes to user
    await user.save();
    return milestone;
  } catch (error) {
    throw new Error(`Error creating milestone: ${error}`);
  }
}

// Update milestone
export async function updateMilestone(milestoneId, milestoneFields) {
  try {
    const updatedMilestone = await milestoneService.updateMilestone(milestoneId, milestoneFields);
    return updatedMilestone;
  } catch (error) {
    throw new Error(`Update milestone error: ${error}`);
  }
}

// Delete milestone
export async function deleteMilestone(userId, milestoneId) {
  try {
    // Delete the milestone
    const deletedMilestone = await milestoneService.deleteMilestone(milestoneId);

    // Remove the feed item associted with the deleted milestone from feed lists
    const user = await userService.getUser(userId);
    await feedService.removeItemFromFeed(userId, milestoneId);
    await Promise.all(user.friends.map(async (friendId) => {
      await feedService.removeItemFromFeed(friendId, milestoneId);
    }));

    return deletedMilestone;
  } catch (error) {
    throw new Error(`Delete milestone error: ${error}`);
  }
}
