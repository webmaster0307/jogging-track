import { RouterState } from 'connected-react-router';
import { IAuth } from '../reducers/auth';
import { ICounterReducer } from '../reducers/counter';

// Application State
export interface IAppState {
    counter: ICounterReducer,
    languageSelection: any,
    router: RouterState,
    theme: any,
    auth: IAuth
}
