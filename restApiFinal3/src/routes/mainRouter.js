const userRouter = require("./userRouter");
const auth = require("./auth");
const post = require("./post");

function router(app) {
    // /user
    app.use('/user', userRouter);
    // /auth
    app.use('/auth', auth);
    // /post
    app.use('/post', post)
}
module.exports = router;