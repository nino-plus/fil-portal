import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { SearchIndex } from 'algoliasearch/lite';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  private index: SearchIndex = this.searchService.index.article;

  searchResult = false;
  result: {
    nbHits: number;
    hits: any[];
  };
  resultList: Article[] = [];
  query: string;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe((map) => {
      this.resultList = [];
      this.index = this.searchService.index.article;
      this.query = map.get('searchQuery') || '';
      this.search();
    });
  }

  ngOnInit() {}

  private search() {
    this.index.search(this.query).then((result) => {
      this.result = result;
      const items = result.hits as any[];
      this.resultList.push(...items);
    });
  }
}
