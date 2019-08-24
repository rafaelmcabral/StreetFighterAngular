import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {CoreState} from '../../store/reducers/feature.reducer';
import {Observable} from 'rxjs';
import {signOut} from '../../store/actions/login.action';
import {isAuthenticated} from '../../store/selectors/auth.selectors';
import {navigateTo} from '../../../store/actions/app.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<CoreState>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(isAuthenticated));
  }

  logout() {
    this.store.dispatch(signOut());
  }

}
