import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {CustomSerializer} from './reducers/custom-route-serializer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
