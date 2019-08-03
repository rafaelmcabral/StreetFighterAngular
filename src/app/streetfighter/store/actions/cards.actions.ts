import {createAction, props} from '@ngrx/store';
import {Fighter} from '../../model/fighter.model';

export const createCard = createAction(
  '[Cards] Create card.',
  props<{card: Fighter}>()
);

export const updateCard = createAction(
  '[Cards] Update card.',
  props<{card: Fighter}>()
);

export const deleteCard = createAction(
  '[Cards] Delete cards.',
  props<{id: number}>()
);

export const selectCard = createAction(
  '[Cards] Select card.',
  props<{card: Fighter}>()
);

export const unselectCard = createAction(
  '[Cards] Unselect card.'
);
