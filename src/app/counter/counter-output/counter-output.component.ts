import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../State/counter.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit,OnDestroy {
  counter: number | undefined = 0;
  sink!: Subscription;
  // @Input() counter: any;

  // @Input() counter: any;
  constructor(private store: Store<{ counter: CounterState }>) {}
  ngOnInit() {
    this.sink = this.store.select('counter').subscribe((data: any) => {
      this.counter = data.counter;
    });
  }

  ngOnDestroy() {
    if (this.sink) {
      this.sink.unsubscribe();
    }
  }
}
