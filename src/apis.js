import { Auth } from "aws-amplify";

// User Login
const login = async data => {
    try {
        await Auth.signIn(data.email, data.password);
        return 'login success';
    } catch (e) {
        return e.message;
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
        await Auth.signUp({ username:data.email, password: data.password });
        return 'signup success';
    } catch (e) {
        return e.message;
    }
};

/*
 Confirm User Sign up
 */
const confirmSignup = async data => {
    try {
        await Auth.confirmSignUp( data.email, data.confirmationCode );
        await Auth.signIn( data.email, data.password );
        return 'confirm success';
    } catch (e) {
        return !e.message ? 'The code you provided is incorrect!' : e.message;
    }
};

/**
 * Get current authenticated user details
 */
const currentUserInfo = async () => { 
    try {
      var user = await Auth.currentAuthenticatedUser();
      return user.attributes.email;
    } catch(e){
      return e;
    }
    
}

export default { login, logout, session, signup, confirmSignup, currentUserInfo };