const express =  require("express");
const apiRouter = express.Router();
const userRouter = require("../routers/userRouter");
const imageRouter = require("../routers/imageRouter");
const authRouter = require("../routers/authRouter");


apiRouter.use("/", (req, res, next) => {
    console.log("Api Router");
    // console.log(req.session);
    // console.log(req.sessionID);

    // console.log(req.session.user);
    next();
})

apiRouter.get("/", (req, res) => {
    res.send("aeldglfjslf");
})

apiRouter.use("/users", userRouter);
apiRouter.use("/images", imageRouter);
apiRouter.use("/auth", authRouter);

module.exports = apiRouter;