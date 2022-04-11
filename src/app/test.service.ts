import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, Subject } from 'rxjs';
import { Product } from './models/Product';

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

  getProducts(): Observable<Product[]> {
    return of<Product[]>([
      { id: '1', name: 'Prod1', price: 10.99 },
      { id: '2', name: 'Prod2', price: 0.99 },
      { id: '3', name: 'Prod3', price: 100.19 },
      { id: '4', name: 'Prod4', price: 22.99 }
    ]).pipe(delay(2000));
  }

  logIn() {
    return of({
      username: 'admin',
      email: 'johnny@bravo.uk',
      fullName: 'Alojzy Jeż',
      age: 62
    }).pipe(delay(3000))
  }


}
