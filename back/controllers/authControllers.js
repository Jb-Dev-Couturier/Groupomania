import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { signUpErrors, signInErrors } from '../utils/errors.utils.js';

dotenv.config();

//Enregistrement nouvelle utilisateur
export const registerUser = async (req, res) => {
  const { pseudo, username, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, username, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};
// Login User

// Changed
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.login(username, password);
    res.status(200).json({
      userId: user._id,
      userAdmin: user.isAdmin,
      userBanished: user.isBanished,
      token: jwt.sign(
        {
          userId: user._id,
          userAdmin: user.isAdmin,
          userBanished: user.isBanished,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h',
        }
      ),
    });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};
