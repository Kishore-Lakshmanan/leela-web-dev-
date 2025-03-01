import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/state/auth.actions';
import { getErrorMessage, getLoading } from './store/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  errorMessage: Observable<string> | undefined;
  showToast = false;
  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
    this.errorMessage.subscribe((res) => {
      if (res) {
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }
    });
  }
  title = 'ngrx-counter';
  showLoading: Observable<boolean> | undefined;
}
