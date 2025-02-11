import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

const getPostsState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});

export const getPostById = (id: number) =>
  createSelector(
    getPostsState,
    (state) => state.posts.find((post) => Number(post.id) === id) || null
  );
