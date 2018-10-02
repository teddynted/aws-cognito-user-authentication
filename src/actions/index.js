export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGIN_RECEIVE = "LOGIN_RECEIVE";
export const REQUEST_SESSION = "REQUEST_SESSION";
export const RECEIVE_SESSION = "SESSION_REQUEST";

export const loginRequest = data => ({ type: LOGIN_REQUEST, data });
export const loginReceive = data => ({ type: LOGIN_RECEIVE, data });
export const logoutRequest = () => ({ type: LOGOUT_REQUEST });
export const requestSession = () => ({ type: REQUEST_SESSION });
export const receiveSession = data => ({ type: RECEIVE_SESSION, data });