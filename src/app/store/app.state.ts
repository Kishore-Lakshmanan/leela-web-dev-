import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AuthReducer } from '../auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';
import { CounterState } from '../counter/State/counter.state';
import { PostsState } from '../posts/State/posts.state';
import { SharedReducer } from './shared.reducer';
import { SHARED_STATE_NAME } from './shared.selector';
import { SharedState } from './shared.store';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  counter: CounterState;
  posts: PostsState;
  router: RouterReducerState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  router: routerReducer,

  /*  counter: counterReducer,
  posts: postsReducer, */
};
