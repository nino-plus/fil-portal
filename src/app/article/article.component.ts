import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  articles$: Observable<Article[]> = this.articleService.getArticles();

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {}
}
