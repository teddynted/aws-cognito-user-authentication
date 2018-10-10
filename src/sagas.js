import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGIN_RECEIVE, LOGOUT_REQUEST, REQUEST_SESSION, RECEIVE_SESSION, SIGNUP_REQUEST, SIGNUP_RECEIVE, CONFIRM_SIGNUP_REQUEST, REQUEST_CURRENT_USER, RECEIVE_CURRENT_USER } from './actions/index';
import { push } from "react-router-redux";
import api from "./apis";

function* loginRequest(action) {
  try {
    const { data } = action;
    yield call(api.login,data);
    yield put({ type: RECEIVE_SESSION, data: true });
  } catch (err) {
    yield put({ type: LOGIN_RECEIVE, data: 'Error occured trying to login!' });
  }
}

function* logoutRequest() {
  try {
    yield call(api.logout);
  } catch (err) {
    yield put({ type: LOGIN_RECEIVE, data: 'Error occured trying to logout!' });
  }
}

function* sessionRequest() {
  try {
    const response = yield call(api.session);
    yield put({ type: RECEIVE_SESSION, data: response });
  } catch (err) {
    yield put({ type: RECEIVE_SESSION, data: false });
  }
}

function* signupRequest(action) {
  try {
    const { data } = action;
    yield call(api.signup,data);
    yield put({ type: SIGNUP_RECEIVE, data: 'Signed up successfully!' });
    yield put({ type: RECEIVE_SESSION, data: true });
  } catch (err) {
    yield put({ type: SIGNUP_RECEIVE, data: 'Error occured trying to sign up!' });
  }
}

function* confirmSignup(action) {
  try {
    const { data } = action;
    yield call(api.confirmSignup,data);
    const response = yield call(api.session);
    yield put({ type: RECEIVE_SESSION, data: response });
    yield put(push("/"));
  } catch (err) {
    yield put({ type: SIGNUP_RECEIVE, data: 'Error occured trying to sign up!' });
  }
}

function* currentUserInfo(){
  try {
    const response = yield call(api.currentUserInfo);
    yield put({ type: RECEIVE_CURRENT_USER, data: response });
  } catch (err) {
    yield put({ type: SIGNUP_RECEIVE, data: 'Error occured trying to get user info!' });
  }
}

export default function* mySaga(){
    yield takeLatest(LOGIN_REQUEST, loginRequest);
    yield takeLatest(LOGOUT_REQUEST, logoutRequest);
    yield takeLatest(LOGOUT_REQUEST, logoutRequest);
    yield takeLatest(REQUEST_SESSION, sessionRequest);
    yield takeLatest(SIGNUP_REQUEST, signupRequest);
    yield takeLatest(CONFIRM_SIGNUP_REQUEST, confirmSignup);
    yield takeLatest(REQUEST_CURRENT_USER, currentUserInfo);
}