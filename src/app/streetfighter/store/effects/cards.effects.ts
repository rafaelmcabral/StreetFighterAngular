import {Injectable} from '@angular/core';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import {Fighter} from '../../model/fighter.model';
import {createCard, deleteCard, updateCard, updateCardsList} from '../actions/cards.actions';
import {AngularFirestore} from '@angular/fire/firestore';
import {catchError, concatMap, exhaustMap, map} from 'rxjs/operators';
import {navigateTo} from '../../../store/actions/app.actions';
import {showSnackBar} from '../../../core/store/actions/core.actions';
import {from, of} from 'rxjs';

@Injectable()
export class CardsEffects {
  updateCardsList$ = createEffect(() =>
    this.firestore.collection<Fighter>('fighters').valueChanges().pipe(
      map(cards => updateCardsList({cards}))
  ));

  updateCard$ = createEffect(() => this.action$.pipe(
    ofType(updateCard),
    exhaustMap((action) =>
      from(this.firestore.doc(`fighters/${action.card.id}`).set(action.card)).pipe(
        concatMap(() => from([
          navigateTo({commands: ['core', 'layout', 'streetfighter', 'fighters']}),
          showSnackBar({message: `${action.card.name} updated`, config: {}})
        ])),
        catchError(() => of(showSnackBar({
          message: 'Something went wrong.', config: {
            duration: 5000
          }}))
        )
      )
    )
  ));

  deleteCard$ = createEffect(() => this.action$.pipe(
    ofType(deleteCard),
    exhaustMap((action) =>
      from(this.firestore.doc(`fighters/${action.id}`).delete()).pipe(
        concatMap(() => from([
          navigateTo({commands: ['core', 'layout', 'streetfighter', 'fighters']}),
          showSnackBar({message: 'Card deleted', config: {}})
        ])),
        catchError(() => of(showSnackBar( {
          message: 'Something went wrong.', config: {
            duration: 5000
          }
          })))
      )
    )
  ));

  createCard$ = createEffect(() => this.action$.pipe(
    ofType(createCard),
    exhaustMap((action) =>
      from(this.firestore.doc(`fighters/${this.createId()}`).set({
        id: this.newId,
        name: action.card.name,
        country: action.card.country,
        fightingStyle: action.card.fightingStyle
      })).pipe(
        concatMap(() => from( [
          navigateTo({commands: ['core', 'layout', 'streetfighter', 'fighters']}),
          showSnackBar({message: `${action.card.name} created`, config: {}})
        ])),
        catchError(() => of(showSnackBar({
          message: 'Something went wrong', config: {
            duration: 5000
          }
        })))
      )
    )
  ));

  constructor(private action$: Actions, private firestore: AngularFirestore) {
  }

  newId: string;
  private createId() {
    this.newId = this.firestore.createId();
    return this.newId;
  }
}
