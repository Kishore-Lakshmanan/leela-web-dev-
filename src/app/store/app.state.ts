import { counterReducer } from '../counter/State/counter.reducer';
import { CounterState } from '../counter/State/counter.state';
import { postsReducer } from '../posts/State/posts.reducer';
import { PostsState } from '../posts/State/posts.state';

export interface AppState {
  counter: CounterState;
  posts: PostsState;
}

export const appReducer = {
  counter: counterReducer,
  posts: postsReducer,
};
