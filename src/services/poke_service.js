import User from '../models/user_model';
import Poke from '../models/poke_model';

// Get wrapped of all of user's pokes
const getPokes = async (userId) => {
  try {
    // returns user_pokes object
    const pokes = await User.findById(userId, 'pokes');
    return pokes;
  } catch (error) {
    throw new Error(`Get pokes error: ${error}`);
  }
};

// Get singular poke by pokeId
const getPoke = async (pokeId) => {
  try {
    const poke = await Poke.findById(pokeId);
    return poke;
  } catch (error) {
    throw new Error(`Get poke error: ${error}`);
  }
};

// Marks a poke as read
const readPoke = async (userId, pokeId) => {
  try {
    // Remove poke from unread
    const unreadPokes = await User.findByIdAndUpdate(userId, { $pull: { 'pokes.unread': pokeId } }, { new: true });
    return unreadPokes;
  } catch (error) {
    throw new Error(`Read poke error: ${error}`);
  }
};

// Send poke
const sendPoke = async (pokeFields) => {
  try {
    // Create new poke
    const poke = new Poke();
    poke.to = pokeFields.to;
    poke.from = pokeFields.from;
    poke.content = pokeFields.content;
    poke.dateTime = pokeFields.dateTime;
    // Save poke
    const savedPoke = await poke.save();
    // Save poke to recipient user's pokes list
    const recipientPokes = await User.findByIdAndUpdate(
      poke.to,
      {
        $push: {
          'pokes.all': poke._id,
          'pokes.unread': poke._id,
        },
      },
      { new: true },
    );
    if (!recipientPokes) {
      throw new Error('Recipient user not found');
    }
    return savedPoke;
  } catch (error) {
    throw new Error(`send poke error: ${error}`);
  }
};

const pokeService = {
  getPokes,
  getPoke,
  readPoke,
  sendPoke,
};

export default pokeService;
