import { Component, OnInit } from '@angular/core';
import { concatMap, exhaustMap, forkJoin, merge, mergeMap, Observable, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  myAsyncOperation$ = new Observable((obs) => {
    setTimeout(() => {
      obs.next('Value from first async stream')
      obs.error()
      obs.complete()
    }, 2000)
  })
  my2AsyncOperation$ = new Observable((obs) => {
    setTimeout(() => {
      obs.next('Value from second async stream')
      obs.complete()
    }, 5000)
  })

  mySubj = new Subject();
  constructor() { }

  ngOnInit(): void {

    ///merge([this.myAsyncOperation$, this.my2AsyncOperation$]).subscribe(v => console.log(v))

    this.mySubj
    .pipe(
      tap(v => console.log(v)),
      switchMap(v => this.myAsyncOperation$))
    .subscribe(v => console.log('In subscribe: ' + v))
  }

  startStream() {
    this.mySubj.next('Value 1 from first stream')
    this.mySubj.next('Value 1 from first stream')
    this.mySubj.next('Value 1 from first stream')
    this.mySubj.next('Value 1 from first stream')
    this.mySubj.next('Value 1 from first stream')
    this.mySubj.next('Value 1 from first stream')
    setTimeout(() => {
      this.mySubj.next('Value 2 from first stream')
    }, 1500)

  }


}
