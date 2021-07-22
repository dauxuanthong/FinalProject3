const userRouter = require("./userRouter");
const auth = require("./auth");
const file = require("./file");

function router(app) {
    // /user
    app.use('/user', userRouter);
    // /auth
    app.use('/auth', auth);
}
module.exports = router;