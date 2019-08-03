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

const pog = [
  {id: 1, name: 'Ryu', thumbnail: 'https://vignette.wikia.nocookie.net/streetfighter/images/4/46/Ryurender.png/revision/latest?cb=20170728171704'},
  {id: 2, name: 'Chun-li', thumbnail: 'https://vignette.wikia.nocookie.net/streetfighter/images/e/e3/Chunrender.png/revision/latest?cb=20170728163823'},
  {id: 3, name: 'Guile', thumbnail: 'https://vignette.wikia.nocookie.net/streetfighter/images/a/a2/Guilerender.png/revision/latest?cb=20170728164132'},
  {id: 4, name: 'Zangief', thumbnail: 'https://vignette.wikia.nocookie.net/streetfighter/images/8/88/Zangiefrender.png/revision/latest/scale-to-width-down/350?cb=20170728171808'},
  {id: 5, name: 'Dhalsim', thumbnail: 'https://vignette.wikia.nocookie.net/streetfighter/images/b/b1/Dhalsimrender.png/revision/latest/scale-to-width-down/350?cb=20170728164253'},
  {id: 6, name: 'Ken', thumbnail: 'https://vignette.wikia.nocookie.net/streetfighter/images/b/b4/Kenrender.png/revision/latest/scale-to-width-down/350?cb=20170728171332'},
  {id: 7, name: 'Cammy', thumbnail: 'https://vignette.wikia.nocookie.net/streetfighter/images/1/19/Cammyrender.png/revision/latest/scale-to-width-down/350?cb=20170728163129'},
  {id: 8, name: 'Blanka', thumbnail: 'https://vignette.wikia.nocookie.net/streetfighter/images/8/80/BLK_00.png/revision/latest/scale-to-width-down/350?cb=20180425080106'}
];

// const initialState = cardAdapter.getInitialState();
const initialState = cardAdapter.addAll(pog, cardAdapter.getInitialState());

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
