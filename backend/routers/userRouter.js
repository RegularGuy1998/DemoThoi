const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt-nodejs");
const userModel = require("../model/userModel");




//Get all
userRouter.get("/", (req, res) => {
    userModel.find({}, (err, user) => {
        if (err) {
            res.status(500).send({ success: 0, err });
        } else {
            res.send({ success: 1, user });
        }
    });
});

//Create New
userRouter.post("/", (req, res) => {
    const { email, password, username, avatarUrl, fullName } = req.body;
    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);
    userModel.create({ email, hashPassword, username, avatarUrl, fullName }, (err, userCreated) => {
        if (err) {
            res.status(500).send({ success: 0, err });
        } else {
            res.send({ success: 1, userCreated });
        }
    });
});

//Update
userRouter.put("/", async (req, res) => {
    const updateInfo = { email, password, avatarUrl, fullName, id } = req.body;
    // const updateInfo = {email, password, avatarUrl, fullName, id};
    // userModel.findById(id, (err, userFound) => {
    //     if(err){
    //         res.status(500).send({success: 0, err});
    //     } else if(!userFound){
    //         res.status(404).send({success: 0, message: "User not Found"})
    //     } else {
    //         for (const key in userFound) {
    //             if (updateInfo[key]) {
    //                 userFound[key] = updateInfo[key];
    //             }
    //         }
    //         userFound.save((err, userUpdate) => {
    //             if(err) {
    //                 res.status(500).send({success: 0, err});
    //             } else {
    //                 res.send({success: 1, userUpdate});
    //             }
    //         })
    //     }
    // });

    // userModel.findById(id)
    //     .then(userFound => {
    //         if (!userFound) {
    //             res.status(404).send({ success: 0, message: "User not Found" })
    //         } else {
    //             for (const key in userFound) {
    //                 if (updateInfo[key]) {
    //                     userFound[key] = updateInfo[key];

    //                 }
    //             }
    //             return userFound.save();
    //         }
    //     })
    //     .then(userUpdated => res.send({success: 1, userUpdated}))
    //     .catch(err => res.status(500).send({success:0, err}))

    try {
        let userFound = await userModel.findById(id);
        if (!userFound) {
            res.status(404).send({ success: 0, message: "User not Found" })
        }
        for (const key in updateInfo) {
            if (key == "password" && updateInfo[key]) {
                let compare =  bcrypt.compareSync(updateInfo.password, userFound.hashPassword);
                if (!compare) {
                    userFound.hashPassword = bcrypt.hashSync(updateInfo.password, bcrypt.genSaltSync());
                }
            } else if (updateInfo[key]) {
                userFound[key] = updateInfo[key];
            }
        }
        const userUpdated = await userFound.save();
        res.send({success: 1, userUpdated});
    } catch (error) {
        res.status(500).send({success:0, err})
    }
});

//Delete
userRouter.delete("/", (req, res) => {
    const id = req.body.id;
    userModel.findByIdAndRemove(id, (err, userRemove) => {
        if (err) {
            res.status(500).send({ success: 0, err });
        } else if (!userRemove) {
            res.status(404).send({ success: 0, message: "User not Exist!" })
        } else {
            res.send({ success: 1, userRemove });
        }
    })
})

//Get by id
userRouter.get("/findID", (req, res) => {
    const { id } = req.body;
    userModel.findById(id, (err, userFound) => {
        if (err) {
            res.status(500).send({ success: 0, err });
        } else if (!userFound) {
            res.status(404).send({ success: 0, message: "User not Exist!" })
        } else {
            res.send({ success: 1, userFound });
        }
    });
});

module.exports = userRouter;