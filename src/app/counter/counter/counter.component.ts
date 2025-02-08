import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
counter:number=0
constructor( ){}
onInit(){}
// onincrement(){
// this.counter++
// }

// ondecrement(){
//   this.counter--
// }

// onreset(){
//   this.counter=0
// }
}
