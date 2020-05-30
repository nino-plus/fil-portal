import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        return this.db.doc<User>(`users/${afUser.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );
  uid: string;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private snackBar: MatSnackBar
  ) {
    this.user$.subscribe((user) => {
      this.uid = user && user.userId;
    });
  }

  createUser(params: { email: string; password: string }) {
    this.afAuth
      .createUserWithEmailAndPassword(params.email, params.password)
      .then((result) => {
        result.user.sendEmailVerification();
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('このメールアドレスは既に登録されています。');
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です。');
            break;
        }
      });
  }

  resetPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email).catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/user-not-found':
          alert('このメールアドレスのユーザーは見つかりません');
          break;
        case 'auth/wrong-password':
          alert('パスワードが間違っています');
          break;
        case 'auth/invalid-email':
          alert('メールアドレスが不正です');
          break;
      }
    });
  }

  login(params: { email: string; password: string }) {
    this.afAuth
      .signInWithEmailAndPassword(params.email, params.password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('このメールアドレスのユーザーは見つかりません');
            break;
          case 'auth/wrong-password':
            alert('パスワードが間違っています');
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です');
            break;
        }
      })
      .then(() => {
        this.snackBar.open('ログインしました', null, {
          duration: 2000,
        });
      });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました', null, {
        duration: 2000,
      });
    });
  }
}
