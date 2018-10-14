import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGIN_RECEIVE, LOGOUT_REQUEST, REQUEST_SESSION, RECEIVE_SESSION, SIGNUP_REQUEST, SIGNUP_RECEIVE, CONFIRM_SIGNUP_REQUEST, REQUEST_CURRENT_USER, RECEIVE_CURRENT_USER, CONFIRM_SIGNUP_RECEIVE } from './actions/index';
import api from "./apis";

function* loginRequest(action) {
    const { data } = action;
    const login = yield call(api.login,data);
    const session = yield call(api.session);
    yield put({ type: LOGIN_RECEIVE, data: login });
    yield put({ type: RECEIVE_SESSION, data: session });
}

function* logoutRequest() {
    yield call(api.logout);
}

function* sessionRequest() {
  const response = yield call(api.session);
  yield put({ type: RECEIVE_SESSION, data: response });
  
}

function* signupRequest(action) {
    const { data } = action;
    const res = yield call(api.signup,data);
    yield put({ type: SIGNUP_RECEIVE, data: res });
}

function* confirmSignup(action) {
    const { data } = action;
    const response = yield call(api.confirmSignup,data);
    yield put({ type: CONFIRM_SIGNUP_RECEIVE, data: response });
}

function* currentUserInfo(){
    const response = yield call(api.currentUserInfo);
    yield put({ type: RECEIVE_CURRENT_USER, data: response });
}

export default function* mySaga(){
    yield takeLatest(LOGIN_REQUEST, loginRequest);
    yield takeLatest(LOGOUT_REQUEST, logoutRequest);
    yield takeLatest(REQUEST_SESSION, sessionRequest);
    yield takeLatest(SIGNUP_REQUEST, signupRequest);
    yield takeLatest(CONFIRM_SIGNUP_REQUEST, confirmSignup);
    yield takeLatest(REQUEST_CURRENT_USER, currentUserInfo);
}