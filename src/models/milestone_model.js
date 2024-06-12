import mongoose, { Schema } from 'mongoose';

const MilestoneSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  description: { type: String },
  time: { type: Date },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const MilestoneModel = mongoose.model('Milestone', MilestoneSchema);

export default MilestoneModel;
