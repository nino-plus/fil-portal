import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
}
