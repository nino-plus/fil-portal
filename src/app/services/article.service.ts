import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from '../interfaces/article';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private db: AngularFirestore) {}

  createArticle(article: Omit<Article, 'id' | 'createdAt'>): Promise<void> {
    const id = this.db.createId();
    return this.db.doc(`articles/${id}`).set({
      id,
      ...article,
      craetedAt: firestore.Timestamp.now(), // firestore形式のタイムスタンプを追加
    });
  }

  updateArticle() {}

  deleteArticle() {}

  getArticle(id: string) {
    return this.db.doc<Article>(`articles/${id}`).valueChanges();
  }

  getArticles(): Observable<Article[]> {
    return this.db.collection<Article>(`articles`).valueChanges();
  }
}
