import {createAction, props} from '@ngrx/store';

export const navigateTo = createAction(
  '[App] Navigate to.',
  props<{ commands: string[] }>()
);
