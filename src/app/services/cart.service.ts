import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { User } from '../interfaces/user';

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

  getCartItems(userId: string): Observable<User[]> {
    return this.db
      .collection<User>(`users/${userId}/cart_items`)
      .valueChanges();
  }

  deleteCartItem(userId: string, articleId: string): Promise<void> {
    return this.db.doc(`users/${userId}/cart_items/${articleId}`).delete();
  }
}
