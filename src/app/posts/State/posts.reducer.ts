import { Action, createReducer, on } from '@ngrx/store';
import { addPost, deletePostById, updatePost } from './posts.actions';
import { initialState, PostsState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state, action) => {
    const updatePost = state.posts.map((post) => {
      return post.id === action.post.id ? action.post : post;
    });
    return {
      ...state,
      posts: updatePost,
    };
  }),
  on(deletePostById, (state, { id }) => {
    const updatePost = state.posts.filter((post) => {
      return Number(post.id) !== Number(id);
    });
    return {
      ...state,
      posts: updatePost,
    };
  })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return _postsReducer(state, action);
}
