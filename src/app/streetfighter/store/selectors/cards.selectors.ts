import {createSelector} from '@ngrx/store';
import {getFighterState} from '../reducers/global.reducer';
import {cardAdapter} from '../reducers/cards.reducer';

export const getCardsState = createSelector(
  getFighterState,
  state => state.cards
);

export const getAllCards = createSelector(
  getCardsState,
  state => cardAdapter.getSelectors().selectAll(state)
);

export const getCard = createSelector(
  getCardsState,
  state => state.card
);

