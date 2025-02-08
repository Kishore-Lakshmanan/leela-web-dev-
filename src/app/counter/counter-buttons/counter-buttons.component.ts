import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../State/counter.actions';
import { CounterState } from '../State/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent {
  constructor(private store:Store<{counter: CounterState}>){}
/*   @Output() increment= new EventEmitter<void>()
  @Output() decrement= new EventEmitter<void>()
  @Output() reset= new EventEmitter<void>()
  onIncrement(){
this.increment.emit()
  }

  onDecrement(){
    this.decrement.emit()
  }

  onReset(){
    this.reset.emit()
  } */


    onIncrement(){
    this.store.dispatch(increment())
        }
      
        onDecrement(){
          this.store.dispatch(decrement())
        }
      
        onReset(){
          this.store.dispatch(reset())
        } 

}
