import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { filter, first, from, fromEvent, map, Observable, of, pluck, take, tap } from 'rxjs';
import { TestService } from '../test.service';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit {
  @ViewChild('btn', { static: true }) btn!: ElementRef;
  @ViewChild('inp', { static: true }) inp!: ElementRef;

  multiplier = 3;


  myPromise = new Promise((res, rej) => {
    setTimeout(() => res('done!') , 2000)
  })

  myObservable = new Observable((obs) => {
    obs.next(1);
    obs.error('error!!');
    obs.next(2)
  })

  multiply(v: number) {
    return v*this.multiplier
  }


  constructor(private testService: TestService) {

    // this.myPromise.then(v => console.log(v))
    // fetch('http://onet.pl').then(v => console.log(v)).catch(err => console.log(err))

    // this.myObservable.subscribe(v => console.log(v));
    // of(1,2,4,5,6).subscribe(v => console.log(v))

    // from([1,2,6,7,8])
    // .pipe(
    //   map((v) => this.multiply(v))
    // )
    // .subscribe(v => console.log(v))

    this.testService.myStream$.pipe(first()).subscribe(v => console.log(v))
  }

  ngOnInit(): void {
    fromEvent(this.btn.nativeElement, 'click').subscribe(e => this.testService.addToStream())
    fromEvent(this.inp.nativeElement, 'input')
    .pipe(
      pluck('target', 'value'),
      filter((v: any) => !v.includes('dupa')),
      take(1),
      first()

      //map(ev => ev.target.value)
    )
    .subscribe(e => console.log(e))
  }

}
