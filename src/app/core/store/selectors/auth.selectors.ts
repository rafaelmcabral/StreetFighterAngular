import {createSelector} from '@ngrx/store';
import {getCoreState} from '../reducers/feature.reducer';

export const getAuthState = createSelector(
  getCoreState,
  state => state.auth
);

export const isAuthenticated = createSelector(
  getAuthState,
  state => !!state.user
);

export const getAuthenticatedUser = createSelector(
  getAuthState,
  state => state.user
);
