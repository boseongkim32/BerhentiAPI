// import Trigger from '../models/trigger_model';
import triggerService from '../services/trigger_service';
import userService from '../services/user_service';
import feedService from '../services/feed_service';

// Get all triggers of a user
export async function getUserTriggers(userId) {
  try {
    const triggers = await triggerService.getAllTriggers(userId);
    return triggers;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Get singular trigger by id
export async function getTrigger(triggerId) {
  try {
    const trigger = await triggerService.getTrigger(triggerId);
    return trigger;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Creates new trigger, adds it to user's trigger list, adds to all of user's friends' feed list
export async function createTrigger(userId, triggerFields) {
  try {
    // Create new trigger
    const trigger = await triggerService.createTrigger(userId, triggerFields);

    // Add trigger to user's list of triggers and to feed list
    const user = await userService.getUser(userId);
    user.triggers.push(trigger._id);
    await feedService.addItemToFeed(userId, userId, trigger._id, 'Trigger');

    // Update all user's friends' feeds to include trigger
    await Promise.all(user.friends.map(async (friendId) => {
      await feedService.addItemToFeed(friendId, userId, trigger._id, 'Trigger');
    }));

    // Save user and return trigger
    await user.save();
    return trigger;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Update a user's trigger
export async function updateTrigger(triggerId, triggerFields) {
  try {
    const updatedTrigger = await triggerService.updateTrigger(triggerId, triggerFields);
    return updatedTrigger;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Delete a user's trigger
export async function deleteTrigger(userId, triggerId) {
  try {
    // Delete the trigger
    const deletedTrigger = await triggerService.deleteTrigger(triggerId);

    // Remove the feed item associated with the deleted trigger from feed lists
    const user = await userService.getUser(userId);
    await feedService.removeItemFromFeed(userId, triggerId);
    await Promise.all(user.friends.map(async (friendId) => {
      await feedService.removeItemFromFeed(friendId, triggerId);
    }));

    return deletedTrigger;
  } catch (error) {
    console.error(error);
    return error;
  }
}
