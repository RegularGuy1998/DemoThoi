const express =  require("express");
const imageRouter = express.Router();

const imageModel = require("../model/imageModel");


//Create Image
imageRouter.post("/", (req,res) => {
    console.log(req.body);
    const {owner, imageUrl, description, view, like, comment} = req.body;
    imageModel.create({owner, imageUrl, description, view, like, comment}, (err, imageCreated) => {
        if(err) {
            res.status(500).send({success: 0, err});
        } else {
            res.send({success: 1, imageCreated});
        }
    });
});


//Get all Image
imageRouter.get("/", (req, res) => {
    imageModel.find({}, '-comment').populate("comment.owner", "username fullName avatarUrl").populate("owner").exec((err, images) => {
        if(err) {
            res.status(500).send({success: 0, err});
        } else {
            res.send({success: 1, images});
        }
    })
})


imageRouter.put("/", (req, res) => {
    const updateInfo = {description, comment, id} = req.body;
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

    imageModel.findById(id)
        .then(imageFound => {
            if (!imageFound) {
                res.status(404).send({ success: 0, message: "Image not Found" })
            } else {
                for (const key in imageFound) {
                    if (updateInfo[key]) {
                        imageFound[key] = updateInfo[key];

                    }
                }
                return imageFound.save();
            }
        })
        .then(imageUpdated => res.send({success: 1, imageUpdated}))
        .catch(err => res.status(500).send({success:0, err}))

    // try {
    //     let userFound = userModel.findById(id);
    //     if (!userFound) {
    //         res.status(404).send({ success: 0, message: "User not Found" })
    //     }
    //     for (const key in userFound) {
    //         if (updateInfo[key]) {
    //             userFound[key] = updateInfo[key];
    //         }
    //     }
    //     const userUpdated = userFound.save();
    //     res.send({success: 1, userUpdated});
    // } catch (error) {
    //     res.status(500).send({success:0, err})
    // }
});

imageRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    imageModel.findById(id)
    .populate("comment.owner", "username fullName avatarUrl")
    .populate("owner")
    .then(imageFound =>{
        if(!imageFound) {
            res.status(404).send({success: 0, message: "Image not Found"})
        } else {
            res.send({success: 1, imageFound});
        }
    })
    .catch(err => res.status(500).send({success: 0, err}));
});

module.exports = imageRouter;