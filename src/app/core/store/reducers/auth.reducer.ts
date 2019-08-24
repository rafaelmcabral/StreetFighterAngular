import {UserInfo} from 'firebase';
import {Action, createReducer, on} from '@ngrx/store';
import {signOutSuccess, updateUserInfo} from '../actions/login.action';

export interface AuthState {
  user?: UserInfo;
}

export const initialState: AuthState = {};

const reducer = createReducer<AuthState>(
  initialState,
  on(updateUserInfo, (state, {user}) => {
    if (user) {
      return ({...state, user});
    } else {
      const {user: garbage, ...rest} = state;
      return rest;
    }
  }),
  on(signOutSuccess, (state => {
    const {user, ...rest} = state;
    return rest;
  }))
)

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
