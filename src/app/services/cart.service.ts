import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { User } from '../interfaces/user';
import { switchMap } from 'rxjs/operators';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private db: AngularFirestore) {}
  addCart(userId: string, articleId: string): Promise<void> {
    return this.db
      .doc(`users/${userId}/cart_items/${articleId}`)
      .set({ articleId });
  }

  getCartItems(userId: string): Observable<Article[]> {
    return this.db
      .collection<User>(`users/${userId}/cart_items`)
      .valueChanges()
      .pipe(
        switchMap((items) => {
          return combineLatest(
            items.map((item) =>
              this.db.doc<Article>(`articles/${item.articleId}`).valueChanges()
            )
          );
        })
      );
  }

  deleteCartItem(userId: string, articleId: string): Promise<void> {
    return this.db.doc(`users/${userId}/cart_items/${articleId}`).delete();
  }
}
