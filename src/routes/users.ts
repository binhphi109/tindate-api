import { Router } from "express";
import { asyncErrorHandler } from "../core/middlewares/errorHandler";
import UserService from "../services/UserService";
import UserActionService from "../services/UserActionService";

const router = Router();

router.post(
  "/login",
  asyncErrorHandler(async (req, res) => {
    const user = await UserService.login();

    res.json(user);
  })
);

router.post(
  "",
  asyncErrorHandler(async (req, res) => {
    const createUser = req.body;

    const createdUser = await UserService.createUser({
      ...createUser,
    });

    res.json(createdUser);
  })
);

router.get(
  "",
  asyncErrorHandler(async (req, res) => {
    const users = await UserService.getAllUsers();

    res.json(users);
  })
);

router.get(
  "/discover",
  asyncErrorHandler(async (req, res) => {
    const userId = req.query.userId as string;

    // get all reactions
    const userActions = await UserActionService.getUserActions(userId);
    const userActionToIds = userActions.map((action) => action.userToId);

    // filter all users not in it
    const users = await UserService.getAllUsers({ notIds: userActionToIds.concat(userId) });

    res.json(users);
  })
);

router.get(
  "/:userId",
  asyncErrorHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await UserService.getUser(userId);

    res.json(user);
  })
);

router.post(
  "/like",
  asyncErrorHandler(async (req, res) => {
    const action = req.body;

    const result = await UserActionService.likeUser(action);

    res.json({
      ...result,
      success: true,
    });
  })
);

router.post(
  "/pass",
  asyncErrorHandler(async (req, res) => {
    const action = req.body;

    await UserActionService.passUser(action);

    res.json({ success: true });
  })
);

router.get(
  "/:userId/likes",
  asyncErrorHandler(async (req, res) => {
    const { userId } = req.params;

    const userLikes = await UserActionService.getUserLikes(userId);

    res.json(userLikes);
  })
);

router.get(
  "/:userId/matches",
  asyncErrorHandler(async (req, res) => {
    const { userId } = req.params;

    const userMatches = await UserActionService.getUserMatches(userId);

    res.json(userMatches);
  })
);

router.put(
  "/:userId",
  asyncErrorHandler(async (req, res) => {
    const { userId } = req.params;
    const user = req.body;

    const updatedUser = await UserService.updateUser({
      ...user,
      _id: userId,
    });

    res.json(updatedUser);
  })
);

router.delete(
  "/:userId",
  asyncErrorHandler(async (req, res) => {
    const { userId } = req.params;

    await UserService.deleteUser(userId);

    res.json({ success: true });
  })
);

export default router;
