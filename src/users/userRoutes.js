const { Router } = require("express");
const { addUser, login, updateUser, deleteUser } = require("./userControllers");
const { hashPassword, tokenCheck } = require("../middleware");

const userRouter = Router();

userRouter.post("/user/signup", [hashPassword], addUser);
userRouter.post("/user/login", login);
userRouter.put("/user/update", tokenCheck, updateUser);
userRouter.delete("/user/delete", tokenCheck, deleteUser);

module.exports = userRouter;