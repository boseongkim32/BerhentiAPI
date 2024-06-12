import { Router } from 'express';
import * as Users from './controllers/user_controller';
import * as Triggers from './controllers/trigger_controller';
import * as Relapses from './controllers/relapse_controller';
import * as Friends from './controllers/friend_controller';
import * as Pokes from './controllers/poke_controller';
import * as Feed from './controllers/feed_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Berhenti API!' });
});

/* *********************************** */
/* ********** AUTH ROUTES ************ */
/* *********************************** */

router.route('/login')
  // Login
  .post(
    async (req, res) => {
      try {
        const result = await Users.login(req.body.username, req.body.password);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

/* *********************************** */
/* ********** USER ROUTES ************ */
/* *********************************** */

router.route('/users')
  // Create a new user
  .post(
    async (req, res) => {
      try {
        const result = await Users.createUser(req.body);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  .get(
    // Search for a user
    async (req, res) => {
      try {
        // format for call would be /users?q=****
        const result = await Users.searchUsers(req.query.q);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

router.route('/users/:id')
  // Get a user by id
  .get(
    async (req, res) => {
      try {
        const result = await Users.getUser(req.params.id);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Delete a user by id
  .delete(
    async (req, res) => {
      try {
        const result = await Users.deleteUser(req.params.id);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

/* *********************************** */
/* ********** POKE ROUTES ************ */
/* *********************************** */

router.route('/users/:id/pokes')
  // Send a new poke
  .post(
    async (req, res) => {
      try {
        const recipientPokes = await Pokes.sendPoke(req.body);
        return res.json(recipientPokes);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Get all pokes of a user
  .get(
    async (req, res) => {
      try {
        const pokes = await Pokes.getPokes(req.params.id);
        return res.json(pokes);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

router.route('/users/:id/pokes/:pokeId')
  // Updates pokes list marking poke as read
  .put(
    async (req, res) => {
      try {
        const unreadPokes = await Pokes.readPoke(req.params.id, req.params.pokeId);
        return res.json(unreadPokes);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

/* *********************************** */
/* ********* FRIEND ROUTES *********** */
/* *********************************** */

router.route('/users/:id/friends')
  // Get all of a user's friends
  .get(
    async (req, res) => {
      try {
        const result = await Friends.getFriends(req.params.id);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

router.route('/users/:id/friends/:friendId')
  // Remove a friend
  .delete(
    async (req, res) => {
      try {
        const result = await Friends.removeFriend(req.params.id, req.params.friendId);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Get a user's friend by id
  .get(
    async (req, res) => {
      try {
        const result = await Friends.getFriend(req.params.id, req.params.friendId);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Add a new friend (patching user friend list)
  .patch(
    async (req, res) => {
      try {
        const result = await Friends.addFriend(req.params.id, req.params.friendId);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

/* *********************************** */
/* ********* TRIGGER ROUTES ********** */
/* *********************************** */

router.route('/users/:id/triggers')
  // Get all triggers of a user
  .get(
    async (req, res) => {
      try {
        const result = await Triggers.getUserTriggers(req.params.id);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Create a new trigger
  .post(
    async (req, res) => {
      try {
        const result = await Triggers.createTrigger(req.params.id, req.body);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

router.route('/users/:id/triggers/:triggerId')
  // Get singular trigger by its id
  .get(
    async (req, res) => {
      try {
        const result = await Triggers.getTrigger(req.params.triggerId);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Update a trigger via its id
  .patch(
    async (req, res) => {
      try {
        const result = await Triggers.updateTrigger(req.params.triggerId, req.body);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Delete a trigger via its id
  .delete(
    async (req, res) => {
      try {
        const result = await Triggers.deleteTrigger(req.params.id, req.params.triggerId);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

/* *********************************** */
/* ********* RELAPSE ROUTES ********** */
/* *********************************** */

router.route('/users/:id/relapses')
  // Get all relapses
  .get(
    async (req, res) => {
      try {
        const results = await Relapses.getAllRelapses(req.params.id);
        return res.json(results);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Create a new relapse
  .post(
    async (req, res) => {
      try {
        const result = await Relapses.createRelapse(req.params.id, req.body);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

router.route('users/:id/relapses/:relapseId')
  // Get singular relapse by relapseId
  .get(
    async (req, res) => {
      try {
        const result = await Relapses.getRelapse(req.params.relapseId);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Update a relapse
  .patch(
    async (req, res) => {
      try {
        const updatedRelapse = await Relapses.updateRelapse(req.params.relapseId, req.body);
        return res.json(updatedRelapse);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Delete a relapse
  .delete(
    async (req, res) => {
      try {
        const deletedRelapse = await Relapses.deleteRelapse(req.params.id, req.params.relapseId);
        return res.json(deletedRelapse);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

/* *********************************** */
/* ******* MILESTONE ROUTES ********** */
/* *********************************** */

router.route('/users/:id/milestones')
  // Get a user's milestones
  .get(
    async (req, res) => {
      try {
        const result = await Users.getUserMilestones(req.params.id);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Create a new milestone for user
  .post(
    async (req, res) => {
      try {
        const result = await Users.createMilestone(req.params.id, req.body);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

router.route('/users/:id/milestones/:milestoneId')
  // Update a milestone by its id
  .put(
    async (req, res) => {
      try {
        const result = await Users.updateMilestone(req.params.milestoneId, req.body);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  )
  // Delete a milestone by its id
  .delete(
    async (req, res) => {
      try {
        const result = await Users.deleteMilestone(req.params.id, req.params.milestoneId);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

/* *********************************** */
/* ********** FEED ROUTES ************ */
/* *********************************** */

router.route('/users/:id/feed')
  .get(
    async (req, res) => {
      try {
        const result = await Feed.getFeedList(req.params.id);
        return res.json(result);
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    },
  );

router.route('/berhenti').get();

export default router;
