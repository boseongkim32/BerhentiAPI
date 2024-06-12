import Milestone from '../models/milestone_model';

// get all milestones of user
const getAllMilestones = async (userId) => {
  try {
    const milestones = await Milestone.find({ userId });
    return milestones;
  } catch (error) {
    throw new Error(`Get all milestones error: ${error}`);
  }
};

// get individual milestone
const getMilestone = async (milestoneId) => {
  try {
    const milestone = await Milestone.findById(milestoneId);
    return milestone;
  } catch (error) {
    throw new Error(`Get milestone error: ${error}`);
  }
};

// Create new milestone
const createMilestone = async (userId, milestoneFields) => {
  try {
    const milestone = new Milestone();

    milestone.userId = userId;
    milestone.description = milestoneFields.reason;
    milestone.time = milestoneFields.time;

    const savedMilestone = await milestone.save();
    return savedMilestone;
  } catch (error) {
    throw new Error(`Create milestone error: ${error}`);
  }
};

// Update milestone
const updateMilestone = async (milestoneId, milestoneFields) => {
  try {
    const updatedMilestone = await Milestone.findByIdAndUpdate(milestoneId, milestoneFields, { new: true });
    return updatedMilestone;
  } catch (error) {
    throw new Error(`Update milestone error: ${error}`);
  }
};

// Delete milestone
const deleteMilestone = async (milestoneId) => {
  try {
    await Milestone.findOneAndDelete(milestoneId);
  } catch (error) {
    throw new Error(`Delete milestone error: ${error}`);
  }
};

const milestoneService = {
  getAllMilestones,
  getMilestone,
  createMilestone,
  updateMilestone,
  deleteMilestone,
};

export default milestoneService;
