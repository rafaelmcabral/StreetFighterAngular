import {createAction, props} from '@ngrx/store';
import {Fighter} from '../../model/fighter.model';

export const updateCardsList = createAction(
  '[Cards] Update cards list.',
  props<{cards: Fighter[]}>()
)

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
  props<{id: string}>()
);

export const selectCard = createAction(
  '[Cards] Select card.',
  props<{card: Fighter}>()
);

export const unselectCard = createAction(
  '[Cards] Unselect card.'
);
