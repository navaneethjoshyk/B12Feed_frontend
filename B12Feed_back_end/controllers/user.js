import { registerUserOrg, findUser, verifyPassword, createAuthToken } from '../services/userService.js';
import { CLIENT_SIDE } from '../config/config.js';


const userSignUp = async (request, response) => {
    // Simulate form request data
    // const email = 'example123@example.com'; // Email request data
    // const password = 'password123'; // Password request data
    const { fName, lName, email, password, orgName, address, pNumber } = request.body;
    // Create attempts to create a user in DB
    try {
        // Add User in DB
        registerUserOrg(fName, lName, email, password, orgName, address, pNumber);
    } catch (err) {
        console.log(err.message)
    }
    response.json('Hello World')
};

const loginUser = async (request, response, next) => {
    // Simulate form request data
    // const email = 'example123@example.com';
    // const password = 'password123';
    // Attempts to find a specific user and checks password then sends json response object
    try {
        const user = await findUser(request.body.email);
        const authorizePassword = await verifyPassword(user.password, request.body.password);
        if(authorizePassword) {
            const sign = await createAuthToken(user);
            response
                .cookie('jwt', sign)
                .redirect(`${CLIENT_SIDE}/discover`)
            next();
        } else {
            response.status(401);
        }
    } catch (err) {
        console.log(err.message);
    }
};

export {
    userSignUp,
    loginUser,
    test
};