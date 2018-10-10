import { Auth } from "aws-amplify";

// User Login
const login = async data => {
    try {
        await Auth.signIn(data.email, data.password);
        return true;
    } catch (e) {
        return false;
    }
};

// User logout
const logout = async () => await Auth.signOut();

// Get a user session
const session = async () => {
    try {
        if (await Auth.currentSession()) {
            return true;
        }
    } catch(e) {
        return false;
    }
}

// User Sign up
const signup = async data => {
    try {
        await Auth.signUp(data.email, data.password);
        return true;
    } catch (e) {
        return false;
    }
};

/*
 Confirm User Sign up
 */

const confirmSignup = async data => {
    try {
        await Auth.confirmSignUp(data.email, data.password);
        await Auth.signIn(data.email, data.password);
        return true;
    } catch (e) {
        return false;
    }
};

export default { login, logout, session, signup, confirmSignup };