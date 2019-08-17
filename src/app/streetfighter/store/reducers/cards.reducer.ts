import {Fighter} from '../../model/fighter.model';
import {Action, createReducer, on} from '@ngrx/store';
import {createCard, deleteCard, selectCard, unselectCard, updateCard} from '../actions/cards.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export const cardAdapter = createEntityAdapter<Fighter>( {
    selectId: fighter => fighter.id,
    sortComparer: (a: Fighter, b: Fighter) => a.name.localeCompare(b.name)
});

export interface CardsState extends EntityState<Fighter> {
  card?: Fighter;
}

// const pog = [
//  {id: 1, name: 'Ryu',  country: 'Japan', fightingStyle: 'Karate'},
//  {id: 2, name: 'Chun-li',  country: 'China', fightingStyle: 'Kung Fu'},
//  {id: 3, name: 'Guile',  country: 'USA', fightingStyle: 'Military Fighting' },
//  {id: 4, name: 'Zangief',  country: 'Russia', fightingStyle: 'Wrestling'},
//  {id: 5, name: 'Dhalsim',  country: 'India', fightingStyle: 'Yoga'},
//  {id: 6, name: 'Ken',  country: 'USA', fightingStyle: 'Karate' },
//  {id: 7, name: 'Cammy',  country: 'England', fightingStyle: 'Military Special Forces Fighting Style' },
//  {id: 8, name: 'Blanka',  country: 'Brazil', fightingStyle: 'Jungle Wild Fighting Style' }
// ];

const initialState = cardAdapter.getInitialState();
// const initialState = cardAdapter.addAll(pog, cardAdapter.getInitialState());

const reducer = createReducer(
  initialState,
  on(selectCard, (state, {card}) => ({...state, card})),
  on(unselectCard, (state: CardsState) => {
    const {card, ...rest} = state;
    return rest;
  }),
  on(createCard, (state, {card}) => cardAdapter.addOne(card, state)),
  on(updateCard, (state, {card}) =>
    cardAdapter.updateOne({id: card.id, changes: card}, state)
  ),
  on(deleteCard, (state, {id}) => cardAdapter.removeOne(id, state))
);

export function reducerCards(state: CardsState, action: Action) {
  return reducer(state, action);
}
