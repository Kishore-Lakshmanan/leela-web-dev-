import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogout } from '../auth/state/auth.actions';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { User } from '../models/user.model';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeOutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  FIREBASE_API_KEY = 'AIzaSyDByek3HKZ2G-BmTtmOwMWkK_UFjVh9xTM';

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  /** Sign-up (Register a new user) */
  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return `Email Not Found`;

      case 'INVALID_PASSWORD':
        return `Invalid Password`;
      case 'INVALID_LOGIN_CREDENTIALS':
        return `Invalid login credentials`;
      case 'EMAIL_EXISTS':
        return `Credentials already exisit`;
      default:
        return `Unknown Error occured ( ${message} ).Please Try again!`;
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeOutInterval(user);
  }
  runTimeOutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeOutInterval = setTimeout(() => {
      //logut func or get the refresh token
      this.store.dispatch(autoLogout());
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeOutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeOutInterval) {
      clearTimeout(this.timeOutInterval);
      this.timeOutInterval = null;
    }
  }
}
