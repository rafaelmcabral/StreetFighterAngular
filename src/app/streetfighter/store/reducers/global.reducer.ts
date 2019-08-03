import {CardsState, reducerCards} from './cards.reducer';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

export interface FighterState {
  cards: CardsState;
};

export const fighterReducer: ActionReducerMap<FighterState> = {
  cards: reducerCards
};

export const getFighterState = createFeatureSelector<FighterState>(
  'fighter'
);
