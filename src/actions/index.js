export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGIN_RECEIVE = "LOGIN_RECEIVE";
export const REQUEST_SESSION = "REQUEST_SESSION";
export const RECEIVE_SESSION = "SESSION_REQUEST";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_RECEIVE = "SIGNUP_RECEIVE";
export const CONFIRM_SIGNUP_REQUEST = "SIGNUP_REQUEST";

export const loginRequest = data => ({ type: LOGIN_REQUEST, data });
export const loginReceive = data => ({ type: LOGIN_RECEIVE, data });
export const logoutRequest = () => ({ type: LOGOUT_REQUEST });
export const requestSession = () => ({ type: REQUEST_SESSION });
export const receiveSession = data => ({ type: RECEIVE_SESSION, data });
export const signupRequest = data => ({ type: SIGNUP_REQUEST, data });
export const signupReceive = data => ({ type: SIGNUP_RECEIVE, data });
export const confirmSignupRequest = data => ({ type: CONFIRM_SIGNUP_REQUEST, data });