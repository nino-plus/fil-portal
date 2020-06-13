import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DrawerService } from '../services/drawer.service';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl('');
  index = this.searchService.index.article;

  constructor(
    private authService: AuthService,
    private drawerService: DrawerService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  routeSearch(searchQuery: string) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        searchQuery,
      },
    });
  }

  toggle() {
    this.drawerService.toggle();
  }

  logout() {
    this.authService.logout();
  }
}
