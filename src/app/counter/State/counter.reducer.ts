import { Action, createReducer, on } from '@ngrx/store';
import {
  customIncrement,
  decrement,
  increment,
  reset,
} from './counter.actions';
import { CounterState, initialState } from './counter.state';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customIncrement, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.value,
    };
  })
);

export function counterReducer(
  state: CounterState = initialState,
  action: Action
) {
  return _counterReducer(state, action);
}
