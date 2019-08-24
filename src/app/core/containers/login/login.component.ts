import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Action, Store} from '@ngrx/store';
import {CoreState} from '../../store/reducers/feature.reducer';
import {signInEmail, signInGoogle} from '../../store/actions/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group( {
    email: ['', [Validators.required, Validators.email]],
    pwd: ['', [Validators.required, Validators.minLength(8)]]
  });

  @Output()
  actionEmitter = new EventEmitter<Action>();

  constructor(private fb: FormBuilder, private store: Store<CoreState>) { }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      // todo: dispatch login action
      console.log('dispatch login action');
      this.store.dispatch(signInEmail(this.loginForm.value));

    }
  }

  google() {
    // todo: dispatch google login action
    console.log('dispatch google login action');
    this.store.dispatch(signInGoogle());
  }

}
