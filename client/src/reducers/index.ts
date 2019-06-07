// import { connectRouter } from 'connected-react-router';
import { localizeReducer } from 'react-localize-redux';
import { combineReducers } from 'redux';
import authReducer from './auth';
import counterReducer from './counter';
import themeReducer from './theme';

export default combineReducers({  
  auth: authReducer,
  counter: counterReducer,
  localize: localizeReducer,
  theme: themeReducer 
});
