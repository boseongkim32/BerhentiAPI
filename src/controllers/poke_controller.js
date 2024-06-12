import pokeService from '../services/poke_service';

// Get all of a user's pokes
export async function getPokes(userId) {
  try {
    const userPokesObject = await pokeService.getPokes(userId);
    console.log('userPokesObject', userPokesObject);
    const all = await Promise.all(
      userPokesObject?.pokes?.all?.map((pokeId) => { return pokeService.getPoke(pokeId); }),
    );
    const unread = await Promise.all(
      userPokesObject?.pokes?.unread?.map((pokeId) => { return pokeService.getPoke(pokeId); }),
    );
    const pokes = { all, unread };
    return pokes;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Get a singular poke
export async function getPoke(pokeId) {
  try {
    const poke = await pokeService.getPokes(pokeId);
    return poke;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Mark a user's poke as read
export async function readPoke(userId, pokeId) {
  try {
    const unreadPokes = await pokeService.readPoke(userId, pokeId);
    return unreadPokes;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Create a new poke and adds it to receiver's pokes list
export async function sendPoke(pokeFields) {
  try {
    const recipientPokes = await pokeService.sendPoke(pokeFields);
    return recipientPokes;
  } catch (error) {
    console.error(error);
    return error;
  }
}
