import { Injectable } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { environment } from './../../environments/environment';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  index = {
    article: searchClient.initIndex('articles'),
  };

  constructor() {}
}
