import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/shared.actions';
import {
  addPost,
  addPostSuccess,
  deletePostById,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<AppState>
  ) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            return loadPostsSuccess({ posts }); // Make sure to return the data if needed for dispatch
          })
        );
      }),
      catchError((errResp) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));

        const errorMessage = errResp?.error?.error.message;

        return of(setErrorMessage({ message: errorMessage }));
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));

            const errorMessage = errResp?.error?.error.message;

            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      mergeMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const post = { ...action.post, id: data.name };
            return updatePostSuccess({ post });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));

            const errorMessage = errResp?.error?.error.message;

            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePostById),
      mergeMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
