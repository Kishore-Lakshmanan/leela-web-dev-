import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared.actions';
import { addPost } from '../State/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup | undefined;
  constructor(private store: Store<AppState>, private router: Router) {}
  ngOnInit(): void {
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

  onAddPost() {
    if (!this.postForm?.valid) {
      return;
    } else {
      //   console.log(this.postForm?.value);
      const post: Post = {
        title: this.postForm.value.title,
        description: this.postForm.value.description,
      };
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(addPost({ post }));
      this.router.navigate(['posts']);
    }
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
}
