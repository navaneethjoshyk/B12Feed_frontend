import { signUpUser, findUser, verifyPassword, createAuthToken } from '../services/userService.js';


const userSignUp = async (request, response) => {
    // Simulate form request data
    const email = 'example123@example.com'; // Email request data
    const password = 'password123'; // Password request data
    // Create attempts to create a user in DB
    try {
        // Add User in DB
        signUpUser(email, password);
    } catch (err) {
        console.log(err.message)
    }
    response.json('Hello World')
};

const loginUser = async (request, response) => {
    // Simulate form request data
    const email = 'example123@example.com';
    const password = 'password123';
    // Attempts to find a specific user and checks password then sends json response object
    try {
        const user = await findUser(email);
        if(verifyPassword(user.password, password)) {
            const sign = await createAuthToken(user);
            response.json({ message: 'Login Successful', sign })
        } else {
            console.log("Password is incorrect!")
        }
    } catch (err) {
        console.log(err.message);
    }
};

export {
    userSignUp,
    loginUser
};