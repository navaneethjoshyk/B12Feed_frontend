import 'dotenv/config';

// Configuration files (e.g., database, environment variables)

const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

const CLIENT_SIDE = process.env.CLIENT_SIDE;

const SECRET = process.env.SECRET;

const BREVO_USER = process.env.BREVO_USER;

const BREVO_PASS = process.env.BREVO_PASS;

export {
    PORT,
    MONGO_URI,
    CLIENT_SIDE,
    SECRET,
    BREVO_USER,
    BREVO_PASS
}