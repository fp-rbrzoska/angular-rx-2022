import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {  AppState, AppStateService } from './app-state.service';
import { User } from './models/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fp-rx';
  appState$!: Observable<AppState>
  pending$!: Observable<boolean>;
  user$!: Observable<User | null>
  constructor(private appState: AppStateService) {
    this.appState$ = this.appState.appState$
    this.pending$ = this.appState.pending$
   this.user$ = this.appState.loggedInUser$

  }

  logIn() {
    this.appState.logInAction()
  }

  logOut() {
    this.appState.logOutAction()
  }
}
