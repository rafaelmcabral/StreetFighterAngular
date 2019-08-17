import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {navigateTo} from '../actions/app.actions';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AppEffects {

  navigateTo$ = createEffect( () => this.actions$.pipe(
    ofType(navigateTo),
    tap(action => this.router.navigate(action.commands)),
  ), {dispatch: false});

  constructor(private actions$: Actions, private router: Router) {
  }
}
