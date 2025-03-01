import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';

export const ADD_POST_ACTION = '[posts page] add post';
export const ADD_POST_SUCCESS = '[posts page] add post success';
export const UPDATE_POST_ACTION = '[posts page] update post';
export const UPDATE_POST_SUCCESS = '[posts page] update post success';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const DELETE_POST_SUCCESS = '[posts page] delete post success';
export const LOAD_POST = '[posts page] load posts';
export const LOAD_POST_SUCCESS = '[posts page] load posts success';

export const ROUTE_TO_POST = '[posts page] routing';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());
export const addPostSuccess = createAction(
  ADD_POST_SUCCESS,
  props<{ post: Post }>()
);

export const updatePost = createAction(
  UPDATE_POST_ACTION,
  props<{ post: Post }>()
);
export const updatePostSuccess = createAction(
  UPDATE_POST_SUCCESS,
  props<{ post: Post }>()
);
export const deletePostById = createAction(
  DELETE_POST_ACTION,
  props<{ id: any }>()
);
export const deletePostSuccess = createAction(
  DELETE_POST_SUCCESS,
  props<{ id: any }>()
);

export const loadPosts = createAction(LOAD_POST);
export const loadPostsSuccess = createAction(
  LOAD_POST_SUCCESS,
  props<{ posts: Post[] }>()
);

export const routeToPost = createAction(
  ROUTE_TO_POST,
  props<{ routingTo: string }>()
);
