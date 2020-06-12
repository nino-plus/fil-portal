import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';
import { SearchService } from '../services/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchIndex } from 'functions';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  articles$: Observable<Article[]> = this.articleService.getArticles();

  private index: SearchIndex = this.searchService.index.article;

  result: {
    nbHits: number;
    hits: any[];
  };

  constructor(
    private articleService: ArticleService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParamMap.subscribe((map) => {
      const searchQuery: string = map.get('searchQuery');
      const selectedTags: string[] = map.get('tags')
        ? map.get('tags').split(',')
        : [];
      this.index
        .search(searchQuery, {
          facetFilters: selectedTags,
        })
        .then((result) => (this.result = result));
    });
  }

  ngOnInit() {}
}
