import { User } from '../models/dbSchema.js';
import argon2d from 'argon2';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const signUpUser = async (email, password) => {
    console.log(email, password);
    return User.create({
        email: email,
        password: await argon2d.hash(password)
    })
}

const findUser = async (email) => {
    return await User.findOne({
        email: email
    });
}

const verifyPassword = async (password, inputPassword) => {
    return await argon2d.verify(password, inputPassword);
}

const createAuthToken = async (userInfo) => {
    return jwt.sign(JSON.stringify(userInfo), process.env.SECRET);
}

export {
    signUpUser,
    findUser,
    verifyPassword,
    createAuthToken
}