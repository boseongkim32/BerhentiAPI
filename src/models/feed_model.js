import mongoose, { Schema } from 'mongoose';

const FeedSchema = new Schema({
  // ID of user
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  // ID of user whose feed item belongs to (e.g. if friend's milestone, then this would be friend's id)
  feedUserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  // ID of feed object (milestone, relapse, or trigger)
  feedItemId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  // String indicating whether 'Relapse', 'Trigger', or 'Milestone'
  feedType: {
    type: String,
    required: true,
  },
  // Boolean indicating whether feed item is from self or friend
  isSelfItem: {
    type: Boolean,
    required: true,
  },
});

const FeedModel = mongoose.model('Feed', FeedSchema);

export default FeedModel;
