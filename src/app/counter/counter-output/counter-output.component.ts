import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit  {
  counter: number | undefined=0;
  // @Input() counter: any;

  // @Input() counter: any;
  constructor(private store: Store<{ counter: number }>) {}
  ngOnInit() {  
    this.store.select('counter').subscribe((data:any) => {

      this.counter = data.counter;
    });
  }
}
