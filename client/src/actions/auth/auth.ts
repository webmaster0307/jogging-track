import {
    LOG_OUT,
    LOGIN_REQUEST,
    SIGNUP_REQUEST
} from "./authConstants";

import { IAction } from '../../interfaces/action.interface';

/**
 * login action
 * @param values 
 */
export const loginRequest = (values: object): IAction => ({
    payload: values,
    type: LOGIN_REQUEST
});

/**
 * logout action
 */
export const logout = (): IAction => ({
    type: LOG_OUT
});

/**
 * singup actions
 * @param values 
 */
export const signupRequest = (values: object): IAction => ({
    payload: values,
    type: SIGNUP_REQUEST
});
