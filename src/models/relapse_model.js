/* eslint-disable prefer-arrow-callback */
/* eslint-disable import/no-cycle */
import mongoose, { Schema } from 'mongoose';
import UserModel from './user_model';

const RelapseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  reason: { type: String },
  time: { type: Date },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// update most recent relapse for user when a relaps occurs
RelapseSchema.post('save', async function (doc) {
  try {
    await UserModel.findByIdAndUpdate(doc.userId, { baseDate: doc.time });
  } catch (error) {
    console.error('Error updating user:', error);
  }
});

const RelapseModel = mongoose.model('Relapse', RelapseSchema);

export default RelapseModel;
