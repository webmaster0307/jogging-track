import { push } from 'connected-react-router';
import { all, put, takeLatest } from "redux-saga/effects";

import { 
  LOG_OUT, 
  LOGIN_FAILURE, 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS  
} from '../actions/auth/authConstants';
import { IAction } from '../interfaces/action.interface';
import { 
  auth,
  logout as removeToken, 
  setToken,
  signup
} from '../services/auth.service';

export interface IAuthValues {
  username: string
  password: string
}

interface ILoginAction extends IAction {
  payload: IAuthValues
}

/**
 * worker Saga: will be fired on login actions
 * @param action 
 */
function* onLogin(action: ILoginAction) {
  const { username, password } = action.payload;
  try {
    const response = yield auth({ username, password });    
    const { token } = response.data;
    setToken(token);
    yield put({ type: LOGIN_SUCCESS });
    yield put(push('/dashboard'));
  } catch (e) {
    yield put({ type: LOGIN_FAILURE });
  }
}

export interface ISignupValues {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

interface ISignupAction extends IAction {
  payload: ISignupValues
}

function* onSingup(action: ISignupAction) {
  try {
    yield signup(action.payload);
    yield put({ type: SIGNUP_SUCCESS });
  } catch (e) {
    yield put({ type: SIGNUP_FAILURE });
  }
}

/**
 * This will remvoe the token and redirect to login page
 */
function* onLogout() {
  removeToken();
  yield put(push('/login'));
}

/**
 * auth saga definition
 */
export function* authSaga() {
  yield all([
    yield takeLatest(LOGIN_REQUEST, onLogin),
    yield takeLatest(LOG_OUT, onLogout),
    yield takeLatest(SIGNUP_REQUEST, onSingup)
  ]);
}
