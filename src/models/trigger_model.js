import mongoose, { Schema } from 'mongoose';

const TriggerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  title: { type: String },
  message: { type: String },
  time: { type: Date },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const TriggerModel = mongoose.model('Trigger', TriggerSchema);

export default TriggerModel;
