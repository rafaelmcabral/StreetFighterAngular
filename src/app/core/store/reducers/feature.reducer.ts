import {AuthState, authReducer} from '../reducers/auth.reducer';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

export interface CoreState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<CoreState> = {
  auth: authReducer
}

export const getCoreState = createFeatureSelector<CoreState>(
  'core'
);
