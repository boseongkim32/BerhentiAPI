import Feed from '../models/feed_model';
import User from '../models/user_model';

// Get feed list of a user
const getFeedList = async (userId) => {
  try {
    const feedList = await User.findById(userId, 'feed');
    return feedList;
  } catch (error) {
    throw new Error(`Get feed list error: ${error}`);
  }
};

// Add item to feed list
// userId: id of user whose feedList is being updated
// feedUserId: id of user whose feedItem belongs to (e.g. if friend's milestone, this would be friend's id)
// feedItemId: id of feed object being added
// feedType: string indicating whether 'Milestone', 'Trigger', or 'Relapse'
const addItemToFeed = async (userId, feedUserId, feedItemId, feedType) => {
  try {
    const feedItem = new Feed();
    feedItem.userId = userId;
    feedItem.feedUserId = feedUserId;
    feedItem.feedItemId = feedItemId;
    feedItem.feedType = feedType;

    // Set boolean to indicate whether the feed object is from user or friend
    if (userId === feedUserId) {
      feedItem.isSelfItem = true;
    } else {
      feedItem.isSelfItem = false;
    }

    const savedFeedItem = await feedItem.save();
    const newFeedList = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          feed: savedFeedItem._id,
        },
      },
      { new: true },
    );
    return newFeedList;
  } catch (error) {
    throw new Error(`Add to feed list error: ${error}`);
  }
};

// Remove item from feed list
// userId: id of user whose feedList is being updated
// feedItemId: id of feed item (milestone, relapse, or trigger) being removed
const removeItemFromFeed = async (userId, feedItemId) => {
  try {
    // Get the feed item to remove
    const feedItemToRemove = await Feed.findOne({ feedItemId });

    // Remove feed item from feed list
    const newFeedList = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          feed: feedItemToRemove._id,
        },
      },
      { new: true },
    );

    // Delete feed object
    await Feed.findByIdAndDelete(feedItemToRemove._id);

    return newFeedList;
  } catch (error) {
    throw new Error(`Remove from feed list error: ${error}`);
  }
};

const feedService = {
  getFeedList,
  addItemToFeed,
  removeItemFromFeed,
};

export default feedService;
