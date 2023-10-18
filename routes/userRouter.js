const { Router} = require("express");
const { Register, Login, loggedInUser, getUser, getAll, updateUser } = require("../controller/userController");

const userRouter = Router();

userRouter.post("/register",async(req,res) => {
    try {
        const data = await Register(req);
        res.send(data);
    } catch (error) {
        res.send({
            err : error.message
        })
    }
})

userRouter.post("/login",async(req,res) => {
    try {
        const data = await Login(req);
        res.send(data);
    } catch (error) {
        res.send({
            err : error.message
        })
    }
})

userRouter.get("/loggedInUser", async(req,res) => {
    try {
        const data = await loggedInUser(req);
        res.send(data);
    } catch (error) {
        res.send(
            {
                err : error.message
            }
        )
    }
})

userRouter.get("/getUser/:userId", async(req,res) => {
    try {
        const data = await getUser(req);
        res.send(data);
    } catch (error) {
        res.send(
            {
                err : error.message
            }
        )
    }
})

userRouter.get("/getAll", async(req,res) => {
    try {
        const data = await getAll(req);
        res.send(data);
    } catch (error) {
        res.send(
            {
                err : error.message
            }
        )
    }
})

userRouter.patch("/updateUser/:userId", async(req,res) => {
    try {
        const data = await updateUser(req);
        res.send(data);
    } catch (error) {
        res.send(
            {
                err : error.message
            }
        )
    }
})


module.exports = userRouter;