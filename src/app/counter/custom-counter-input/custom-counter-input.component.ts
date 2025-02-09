import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { customIncrement } from '../State/counter.actions';
import { getChannelName } from '../State/counter.selector';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;
  channelName: any;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(getChannelName).subscribe((data) => {
      this.channelName = data;
    });
  }
  onAdd() {
    this.store.dispatch(customIncrement({ value: +this.value }));
  }
}
