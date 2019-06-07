import { Reducer } from 'redux';
import { 
  LOG_OUT,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS  
} from '../actions/auth/authConstants';
import { IAction } from '../interfaces/action.interface';
import { hasToken } from '../services/auth.service';

export interface IAuth {
  readonly isAuthenticated: boolean
  readonly isLoading: boolean
  readonly isError: boolean
}

const INITIAL_STATE: IAuth = {
  isAuthenticated: hasToken(),
  isError: false,
  isLoading: false  
};

const authReducer: Reducer = (state: IAuth = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        isError: false,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, isLoading: false };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case LOG_OUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
