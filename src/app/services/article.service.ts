import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  items = [
    {
      id: 'aaa',
      supplier: 'Botto giuseppe',
      title: 'ALBA 2/30, 2/48',
      season: '20-21aw',
    },
    {
      id: 'bbb',
      supplier: 'Botto giuseppe',
      title: 'ALBA 2/30, 2/48',
      season: '20-21aw',
    },
    {
      id: 'ccc',
      supplier: 'Botto giuseppe',
      title: 'ALBA 2/30, 2/48',
      season: '20-21aw',
    },
    {
      id: 'ddd',
      supplier: 'Botto giuseppe',
      title: 'ALBA 2/30, 2/48',
      season: '20-21aw',
    },
  ];

  constructor() {}

  createArticle() {}
  updateArticle() {}
  deleteArticle() {}
  getArticle(id: string) {
    return this.items.find((item) => item.id === id);
  }
}
