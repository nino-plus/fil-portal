import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
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

  ngOnInit(): void {}
}
