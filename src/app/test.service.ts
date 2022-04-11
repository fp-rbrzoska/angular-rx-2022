import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {


  private mySubj = new BehaviorSubject(0);
  myStream$ = this.mySubj.asObservable();
  constructor() { }

  addToStream() {
    this.mySubj.next(Math.floor(Math.random() * 10))
  }
}
