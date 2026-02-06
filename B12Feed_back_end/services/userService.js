import { User, Organization } from '../models/dbSchema.js';
import { SECRET } from '../config/config.js'
import argon2d from 'argon2';
import jwt from 'jsonwebtoken';

// Register User and Organization
const registerUserOrg = async (fName, lName, email, password, orgName, address, pNumber) => {
    // After User's Initial register, user data and organization data get saved into the db and the user record will be linked with the organization record that got saved.
    const hashedPassword = await argon2d.hash(password)
    // const hashPassword = await argon2d.hash(password);
    const user = await User.insertOne({
        first_name: fName,
        last_name: lName,
        email: email,
        password: hashedPassword,
    });

    const organization = await Organization.insertOne({
        name: orgName,
        address: address,
        primary_phone_number: pNumber,
        is_org_registered: false,
        orgAdmin: user
    })
    // Add organization id to the new User record
    user.userOrg = organization._id;
    await user.save();
}

// Load the User for Authentication
const findUser = async (email) => {
    return await User.findOne({
        email: email
    });
}

// Verify the password
const verifyPassword = async (password, inputPassword) => {
    return await argon2d.verify(password, inputPassword);
}

// Create JWT after authentication
const createAuthToken = async (userInfo) => {
    return jwt.sign(JSON.stringify(userInfo), SECRET);
}

export {
    registerUserOrg,
    findUser,
    verifyPassword,
    createAuthToken,
}