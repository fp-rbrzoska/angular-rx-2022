import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  private subj = new Subject();
  private bSubj = new BehaviorSubject(0);
  private rSubs = new ReplaySubject(3);
  private aSubj = new AsyncSubject();
  constructor() { }

  ngOnInit(): void {

    this.subj.next(1)
    this.subj.next(2)
    // this.subj.complete()
    this.subj.subscribe(v => console.log('Subj: ', v))
    this.subj.next(4)

    this.bSubj.next(1)
    this.bSubj.next(2)
    // this.bSubj.complete()
    this.bSubj.subscribe(v => console.log('BSubj: ', v))
    this.bSubj.next(4)


    this.rSubs.next(0)
    this.rSubs.next(1)
    this.rSubs.next(2)
    this.rSubs.next(3)
    this.rSubs.next(4)
    // this.rSubs.complete()
    //this.rSubs.subscribe(v => console.log('RSubj: ', v))
    this.rSubs.next(5)

    this.rSubs.subscribe(v => console.log('RSubj: ', v))

    this.aSubj.next(1)
    this.aSubj.next(2)
    this.aSubj.next(3)
    this.aSubj.complete()
    this.aSubj.next(4)

    this.aSubj.subscribe(v => console.log('ASubj: ', v))
  }

}
