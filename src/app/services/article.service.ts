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

  createArticle(
    article: Omit<Article, 'articleId' | 'createdAt'>
  ): Promise<void> {
    const articleId = this.db.createId();
    return this.db.doc(`articles/${articleId}`).set({
      articleId,
      ...article,
      craetedAt: firestore.Timestamp.now(), // firestore形式のタイムスタンプを追加
    });
  }

  updateArticle(article: Article): Promise<void> {
    return this.db.doc(`articles/${article.articleId}`).update(article);
  }

  deleteArticle(articleId: string): Promise<void> {
    return this.db.doc(`articles/${articleId}`).delete();
  }

  getArticle(articleId: string) {
    return this.db.doc<Article>(`articles/${articleId}`).valueChanges();
  }

  getArticles(): Observable<Article[]> {
    return this.db.collection<Article>(`articles`).valueChanges();
  }
}
