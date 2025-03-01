import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { COUNTER_STATE_NAME } from '../State/counter.selector';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  counter: number | undefined = 0;
  sink!: Subscription;
  // @Input() counter: any;

  // @Input() counter: any;
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.sink = this.store.select(COUNTER_STATE_NAME).subscribe((data: any) => {
      this.counter = data.counter;
    });
  }

  ngOnDestroy() {
    if (this.sink) {
      this.sink.unsubscribe();
    }
  }
}
