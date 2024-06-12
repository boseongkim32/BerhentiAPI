import mongoose, { Schema } from 'mongoose';
// import Poke from './poke_model';

const UserPokesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  all: [Schema.Types.ObjectId],
  // read: [Poke.schema],
  unread: [Schema.Types.ObjectId],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const UserPokesModel = mongoose.model('UserPokes', UserPokesSchema);

export default UserPokesModel;
