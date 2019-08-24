import {createAction, props} from '@ngrx/store';
import {UserInfo} from 'firebase';

export const signInEmail = createAction(
  '[Core - Auth] Sign in with email and password.',
  props<{email: string, pwd: string}>()
);

export const signInGoogle = createAction(
  '[Core - Auth] Sign in with Google.'
);

export const updateUserInfo = createAction(
  '[Core - Auth] Sign in successfully',
  props<{user?: UserInfo}>()
);

export const signOut = createAction(
  '[Core - Auth] Sign out'
);

export const signOutSuccess = createAction(
  '[Core - Auth] Sign out successfully'
);
