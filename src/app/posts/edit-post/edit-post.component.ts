import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared.actions';
import { updatePost } from '../State/posts.actions';
import { getPostById } from '../State/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  postForm: FormGroup | undefined;
  postSubscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.postSubscription = this.store.select(getPostById).subscribe((post) => {
      console.log(post);
      if (post) {
        this.post = post;
        this.postForm?.patchValue({
          title: this.post.title,
          description: this.post.description,
        });
      }
    });

    /* this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id !== null) {
     
        this.store
          .select(getPostById(id))
          .subscribe((data) => {
            this.post = data ?? undefined; // Ensures `null` is converted to `undefined`
            this.createForm();
          });
      }
    }); */
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm?.get('description');
    if (descriptionForm?.touched && !descriptionForm.valid) {
      if (descriptionForm?.hasError('required')) {
        return 'Description is required';
      }
      if (descriptionForm?.hasError('minlength')) {
        return 'Description should be a minimum of 10 characters in length';
      }
    }
    return undefined;
  }

  onUpdatePost() {
    if (!this.postForm?.valid) {
      return;
    }

    const title = this.postForm?.value?.title ?? '';
    const description = this.postForm?.value?.description ?? '';
    const post: Post = {
      id: this.post?.id,
      title,
      description,
    };
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(updatePost({ post }));

    console.log(title, description);
  }

  ngOnDestroy(): void {
    this.postSubscription?.unsubscribe;
  }
}
