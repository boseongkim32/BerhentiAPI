import mongoose, { Schema } from 'mongoose';

const PokeSchema = new Schema({
  // To and from are references to the User ids
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  // Poke content
  content: String,

  // Datetime of poke
  dateTime: {
    type: Date,
    default: Date.now,
  },

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const PokeModel = mongoose.model('Poke', PokeSchema);

export default PokeModel;
