import {loginEmail} from '../actions/login.action';
import {createReducer, on} from '@ngrx/store';

const reducer = createReducer(
  on(loginEmail, (state, {email, password}) => {

  })
)
