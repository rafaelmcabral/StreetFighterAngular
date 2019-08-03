import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Fighter} from '../../model/fighter.model';
import {Action} from '@ngrx/store';
import {selectCard} from '../../store/actions/cards.actions';

@Component({
  selector: 'app-fighter-list',
  templateUrl: './fighter-list.component.html',
  styleUrls: ['./fighter-list.component.scss']
})
export class FighterListComponent implements OnInit {

  @Input()
  cards: Fighter[];

  @Output()
  actionEmitter = new EventEmitter<Action>();

  constructor() { }

  ngOnInit() {
  }

  select(card: Fighter) {
    this.actionEmitter.emit(selectCard({card}));
  }

}
