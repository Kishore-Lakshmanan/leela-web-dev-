import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>('https://vue-completecourse.firebaseio.com/posts.json')
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              // Optional: To ensure you're accessing own properties
              posts.push({ ...data[key], id: key });
            }
          }
          return posts; // Return the posts array
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://vue-completecourse.firebaseio.com/posts.json`,
      post
    );
  }

  updatePost(post: Post): Observable<any> {
    const postData = {
      [String(post.id)]: { title: post.title, description: post.description },
    };
    return this.http.patch<{ name: string }>(
      `https://vue-completecourse.firebaseio.com/posts.json`,
      postData
    );
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(
      `https://vue-completecourse.firebaseio.com/posts/${id}.json`
    );
  }
}
