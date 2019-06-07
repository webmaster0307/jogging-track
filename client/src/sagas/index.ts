import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { counterSaga } from './counter';

export default function* rootSaga() {
  yield all([
    authSaga(), 
    counterSaga()
  ]);
}
