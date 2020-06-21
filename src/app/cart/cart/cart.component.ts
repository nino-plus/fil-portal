import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { User } from '../../interfaces/user';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  users$: Observable<User[]> = this.cartService.getCartItems(
    this.authService.uid
  );

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  deleteCartItem(articleId: string) {
    return this.cartService
      .deleteCartItem(this.authService.uid, articleId)
      .then(() => {
        this.snackBar.open('カートから削除しました', null);
      });
  }
}
