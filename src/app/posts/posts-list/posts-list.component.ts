import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared.actions';
import { deletePostById, loadPosts } from '../State/posts.actions';
import { getPosts } from '../State/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]> | undefined;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loadPosts());
  }

  deletePost(data: any) {
    if (confirm('Are you sure you want to delete ?')) {
      const id = data; // Ensure it is converted to a number
      this.store.dispatch(setLoadingSpinner({ status: true }));

      this.store.dispatch(deletePostById({ id })); // Pass an object with the correct key
    }
  }
}
