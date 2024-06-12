import feedService from '../services/feed_service';

// Get feed list
export default async function getFeedList(userId) {
  try {
    const feedList = feedService.getFeedList(userId);
    return feedList;
  } catch (error) {
    return error;
  }
}
