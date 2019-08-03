import { Component, OnInit } from '@angular/core';
import {FighterState} from '../../store/reducers/global.reducer';
import {Action, select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Fighter} from '../../model/fighter.model';
import {getAllCards} from '../../store/selectors/cards.selectors';

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit {

  cards$: Observable<Fighter[]>;

  constructor(private store: Store<FighterState>) { }

  ngOnInit() {
    this.cards$ = this.store.pipe(select(getAllCards));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}
