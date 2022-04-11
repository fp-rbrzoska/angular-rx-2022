import { Injectable } from '@angular/core';
import { BehaviorSubject, distinct, distinctUntilChanged, map, tap } from 'rxjs';
import { Product } from './models/Product';
import { User } from './models/User';
import { debug, LogLevel } from './operators';
import { TestService } from './test.service';

export interface AppState {
    pending: boolean;
    loggedInUser: User | null;
    products: Product[];
}

const initAppState: AppState = {
  loggedInUser: null,
  products: [],
  pending: false
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private appStore = new BehaviorSubject<AppState>(initAppState);
  private actionHistory: { action: string; state: AppState }[] = []

  appState$ = this.appStore.asObservable();
  pending$ = this.appStore.pipe(
    map( state => state.pending),
    distinctUntilChanged(),
    debug('Pending state', LogLevel.INFO)
  )
  loggedInUser$ = this.appStore.pipe(
    map( state => state.loggedInUser),
    distinctUntilChanged(),
    debug('User state', LogLevel.ERROR)
  )

  constructor(private testService: TestService) { }

  logInAction() {
    this.setState({ pending: true}, '[User] LOGIN INIT')
    this.testService.logIn().subscribe(user => {
      this.setState({ loggedInUser: user, pending: false }, '[User] LOGIN SUCCESS')
    })
  }

  logOutAction() {
    this.setState({ loggedInUser: null }, '[User] LOGOUT')
  }

  private setState(partOfState: Partial<AppState>, actionName: string){
    const currentState = this.appStore.value;
    const newState = { ...currentState, ...partOfState };
    this.appStore.next(newState)
    this.actionHistory.push({ action: actionName, state: newState })
    //console.log(this.actionHistory)
  }

}
