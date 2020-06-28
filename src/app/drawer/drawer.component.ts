import { Component, OnInit } from '@angular/core';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from '../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerService } from '../services/drawer.service';

interface Tag {
  value: string;
  highlighted: string;
  count: number;
  selected?: boolean;
}

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {
  private index: SearchIndex = this.searchService.index.article;
  tagDatas: {
    title: string;
    items: Tag[];
  }[];

  facetIds = [
    {
      id: 'supplier',
      label: 'Supplier',
    },
    {
      id: 'season',
      label: 'Season',
    },
    {
      id: 'otherFeatures',
      label: 'Other Features',
    },
    {
      id: 'composition',
      label: 'Composition',
    },
    {
      id: 'gauges',
      label: 'Gauges',
    },
  ];

  opened: boolean;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private drawerService: DrawerService
  ) {
    Promise.all(
      Object.values(this.facetIds).map((tagName) => this.getTags(tagName.id))
    ).then((tags: Tag[][]) => {
      this.tagDatas = tags.map((tag, index: number) => ({
        title: this.facetIds[index].label,
        items: tag,
      }));
    });
  }

  ngOnInit(): void {}

  private getTags(tagName: string): Promise<Tag[]> {
    return this.index.searchForFacetValues(tagName, '').then((result) => {
      return result.facetHits as Tag[];
    });
  }
}
