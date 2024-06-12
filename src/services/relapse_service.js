import Relapse from '../models/relapse_model';

// Get all of a user's relapses
const getAllRelapses = async (userId) => {
  try {
    const relapse = await Relapse.find({ userId });
    return relapse;
  } catch (error) {
    throw new Error(`Get all relapses error: ${error}`);
  }
};

// Get singular relapse of a user
const getRelapse = async (relapseId) => {
  try {
    const relapse = await Relapse.findById(relapseId);
    return relapse;
  } catch (error) {
    throw new Error(`Get relapse error: ${error}`);
  }
};

// Create new relapse for a user
const createRelapse = async (userId, relapseFields) => {
  try {
    const relapse = new Relapse();

    relapse.userId = userId;
    relapse.reason = relapseFields.reason;
    relapse.time = relapseFields.time;

    const savedRelapse = await relapse.save();
    return savedRelapse;
  } catch (error) {
    throw new Error(`Create relapse error: ${error}`);
  }
};

// Update a relapse
const updateRelapse = async (relapseId, relapseFields) => {
  try {
    const updatedRelapse = await Relapse.findByIdAndUpdate(relapseId, relapseFields);
    return updatedRelapse;
  } catch (error) {
    throw new Error(`Update relapse error: ${error}`);
  }
};

// Delete a relapse
const deleteRelapse = async (relapseId) => {
  try {
    const deletedRelapse = await Relapse.findByIdAndDelete(relapseId);
    return deletedRelapse;
  } catch (error) {
    throw new Error(`Delete relapse error: ${error}`);
  }
};

const relapseService = {
  getAllRelapses,
  getRelapse,
  createRelapse,
  updateRelapse,
  deleteRelapse,
};

export default relapseService;
