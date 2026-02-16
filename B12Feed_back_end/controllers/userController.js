import { registerUserOrg, findUser, verifyPassword, createAuthToken } from '../services/userService.js';
import { needApproval } from '../utils/mail.js';
import { CLIENT_SIDE } from '../config/config.js';


const userSignUp = async (request, response) => {
    // Simulate form request data
    // const email = 'example123@example.com'; // Email request data
    // const password = 'password123'; // Password request data
    const { fName, lName, email, password, orgName, address, pNumber } = request.body;
    // Create attempts to create a user in DB
    try {
        // Add User in DB
        await registerUserOrg(fName, lName, email, password, orgName, address, pNumber);
        await needApproval(fName, lName, orgName)
        response.status(200).json({
            message: "User Registered successfully"
        });
    } catch (err) {
        response.status(400);
    }
};

const loginUser = async (request, response, next) => {
    // Simulate form request data
    // const email = 'example123@example.com';
    // const password = 'password123';
    // Attempts to find a specific user and checks password then sends json response object
    try {
        const user = await findUser(request.body.email);
        if(user) {
            const authorizePassword = await verifyPassword(user.password, request.body.password);
            if(authorizePassword) {
                const sign = await createAuthToken(user);
                // console.log(sign)
                response.cookie('jwt', sign).status(200).json({
                        message: "User authorized"
                    })
                next();
            } else {
                response.status(401);
            }
        } else {
            response.status(401).json({
                message: "Please Try again"
            })
        }
        
    } catch (err) {
        console.log(err.message);
    }
};

export {
    userSignUp,
    loginUser,
};