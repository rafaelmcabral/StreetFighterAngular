import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Fighter} from '../../model/fighter.model';
import {createCard, selectCard, unselectCard, updateCard} from '../../store/actions/cards.actions';
import {Action} from '@ngrx/store';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-fighter-detail',
  templateUrl: './fighter-detail.component.html',
  styleUrls: ['./fighter-detail.component.scss']
})
export class FighterDetailComponent implements OnInit {

  fighterForm = this.fb.group({
    id: [''],
    name: [''],
    country: [''],
    fightingStyle: ['']
  });

  @Input()
  set card(card: Fighter) {
    this.fighterForm.patchValue(card);
  }

  @Output()
  actionEmitter = new EventEmitter<Action>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  unselect() {
    this.actionEmitter.emit(unselectCard());
  }

  update() {
    if (this.fighterForm.get('id') && this.fighterForm.get('id').value !== '') {
      this.actionEmitter.emit(updateCard({card: this.fighterForm.value}));
    } else {
      this.actionEmitter.emit(createCard({card: this.fighterForm.value}));
    }
  }

  delete() {

  }

}
