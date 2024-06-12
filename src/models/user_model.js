/* eslint-disable import/no-cycle */
/* eslint-disable prefer-arrow-callback */
import mongoose, { Schema } from 'mongoose';
import UserPokesModel from './user_pokes_model';
import FeedModel from './feed_model';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://www.shareicon.net/data/512x512/2017/02/09/878597_user_512x512.png',
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  friendRequestsOut: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  friendRequestsIn: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  // List of trigger objects
  triggers: [{
    type: Schema.Types.ObjectId,
    ref: 'Trigger',
  }],
  // List of relapse objects
  relapses: [{
    type: Schema.Types.ObjectId,
    ref: 'Relapse',
  }],
  // List of milestones
  milestones: [{
    type: Schema.Types.ObjectId,
    ref: 'Milestone',
  }],
  // List of feed items (personal and friends' milestones, relapses, triggers)
  feed: [{
    type: FeedModel.schema,
    ref: 'Feed Item',
  }],
  // embeds UserPokesModel
  pokes: UserPokesModel.schema,
  // counts time since last relapse
  currentStreak: {
    type: Number, // days
    default: 0,
  },
  baseDate: {
    type: Date,
  },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

UserSchema.post('find', async function afterUserFind(docs) {
  const today = new Date();
  docs.forEach(async (doc) => {
    // get number of days since baseDate (last relapse or start date)
    const timeDifference = today.getTime() - doc.baseDate.getTime();
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // not sure if this will work as intended, based on stackoverflow & chatgpt, might need to do doc._doc.currentStreak?
    doc.currentStreak = dayDifference;
    await doc.save();
  });
});

UserSchema.index({ username: 'text' });

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
