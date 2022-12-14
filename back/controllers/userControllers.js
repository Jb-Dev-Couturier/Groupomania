import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import ObjectID from 'mongoose';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find().sort({ createdAt: -1 });
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails
    });
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a User
export const getUser = async (req, res) => {
  if (!ObjectID.isValidObjectId(req.params.id))
    return res.status(400).send('ID unknow:' + req.params.id);
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json('No such User');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//updateUser
export const updateUser = async (req, res) => {
  if (!ObjectID.isValidObjectId(req.params.id))
    return res.status(400).send('ID unknow:' + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pseudo: req.body.pseudo,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          bio: req.body.bio,
          livesIn: req.body.livesIn,
          worksAt: req.body.worksAt,
          relationship: req.body.relationship,
          country: req.body.country,
          isBanished: req.body.isBanished,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  if (!ObjectID.isValidObjectId(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: 'Successfully deleted. ' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Follow a User
export const followUser = async (req, res) => {
  if (req.body.IdToFollow !== req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.body.IdToFollow);
      if (!user.following.includes(req.body.IdToFollow)) {
        await user.updateOne({ $push: { following: req.body.IdToFollow } });
        await currentUser.updateOne({ $push: { followers: req.params.id } });
        res.status(200).json('Utilisateur suivi');
      } else {
        res.status(403).json('Vous le suivez deja');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('Vous ne pouvez pas vous suivre vous meme');
  }
};

// Unfollow a User
export const unfollowUser = async (req, res) => {
  if (req.body.IdToUnfollow !== req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.body.IdToUnfollow);
      if (user.following.includes(req.body.IdToUnfollow)) {
        await user.updateOne({ $pull: { following: req.body.IdToUnfollow } });
        await currentUser.updateOne({ $pull: { followers: req.params.id } });
        res.status(200).json('Utilisateur non suivi');
      } else {
        res.status(403).json('Vous ne le suivez pas');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('Vous ne pouvez pas ne plus vous suivre vous meme');
  }
};
