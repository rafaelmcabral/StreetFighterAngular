import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Fighter} from '../../model/fighter.model';
import {Action, select, Store} from '@ngrx/store';
import {FighterState} from '../../store/reducers/global.reducer';
import {getCard} from '../../store/selectors/cards.selectors';

@Component({
  selector: 'app-fighter',
  templateUrl: './fighter.component.html',
  styleUrls: ['./fighter.component.scss']
})
export class FighterComponent implements OnInit {

  card$: Observable<Fighter>;

  constructor(private store: Store<FighterState>) { }

  ngOnInit() {
    this.card$ = this.store.pipe(select(getCard));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}
