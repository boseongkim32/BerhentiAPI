import Trigger from '../models/trigger_model';

// Get all of a user's triggers
const getAllTriggers = async (userId) => {
  try {
    const triggers = await Trigger.find({ userId });
    return triggers;
  } catch (error) {
    throw new Error(`Get all triggers error: ${error}`);
  }
};

// Get singular trigger of user
const getTrigger = async (triggerId) => {
  try {
    const trigger = await Trigger.findById(triggerId);
    return trigger;
  } catch (error) {
    throw new Error(`Get trigger error: ${error}`);
  }
};

// Create new trigger
const createTrigger = async (userId, triggerFields) => {
  try {
    const trigger = new Trigger();

    trigger.userId = userId;
    trigger.title = triggerFields.title;
    trigger.message = triggerFields.message;
    trigger.time = triggerFields.time;

    const savedTrigger = await trigger.save();
    return savedTrigger;
  } catch (error) {
    throw new Error(`Create trigger error: ${error}`);
  }
};

// Update a trigger
const updateTrigger = async (triggerId, triggerFields) => {
  try {
    const updatedTrigger = await Trigger.findByIdAndUpdate(triggerId, triggerFields);
    return updatedTrigger;
  } catch (error) {
    throw new Error(`Update trigger error: ${error}`);
  }
};

// Delete a trigger
const deleteTrigger = async (triggerId) => {
  try {
    const deletedTrigger = await Trigger.findOneAndDelete(triggerId);
    return deletedTrigger;
  } catch (error) {
    throw new Error(`Delete trigger error: ${error}`);
  }
};

const triggerService = {
  getAllTriggers,
  getTrigger,
  createTrigger,
  updateTrigger,
  deleteTrigger,
};

export default triggerService;
