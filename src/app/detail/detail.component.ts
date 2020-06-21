import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  article$: Observable<Article>;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.article$ = this.route.paramMap.pipe(
      switchMap((prams) => {
        const id = prams.get('id');
        return this.articleService.getArticle(id);
      })
    );
  }

  addCart(articleId: string) {
    return this.cartService
      .addCart(this.authService.uid, articleId)
      .then(() => {
        this.snackBar.open('カートに追加しました', null);
      });
  }
}
