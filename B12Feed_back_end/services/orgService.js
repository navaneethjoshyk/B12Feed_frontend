import { User, Organization } from '../models/dbSchema.js';

// Load the User with it's Organization
const findUserOrg = async (email) => {
    return await User.findOne({
        email: email
    }).populate('userOrg');
}

export {
    findUserOrg
}