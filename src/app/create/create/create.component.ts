import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  target: Article;
  articleId: string;
  form = this.fb.group({
    supplier: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(40)]],
    composition: ['', [Validators.required, Validators.maxLength(40)]],
    season: ['', [Validators.required, Validators.pattern(/21SS|20-21AW/)]],
    type: ['', [Validators.required]],
    gauges: this.fb.group({
      '3-5gg': [false],
      '5-7gg': [false],
      '12-14gg': [false],
      '16-18gg': [false],
    }),
    otherFeatures: this.fb.group({
      newss: [false],
      newaw: [false],
      stockService: [false],
      sustainability: [false],
    }),
  });

  get supplierControl() {
    return this.form.get('supplier') as FormControl;
  }
  get nameControl() {
    return this.form.get('name') as FormControl;
  }
  get compositionControl() {
    return this.form.get('composition') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.articleId = params.get('id');
          if (this.articleId) {
            return this.articleService.getArticle(params.get('id'));
          } else {
            return of(null);
          }
        })
      )
      .subscribe((article) => {
        if (this.articleId) {
          this.target = article;
          this.form.patchValue(article);
        } else {
          return of(null);
        }
      });
  }

  ngOnInit(): void {}

  private dataToArray(data: object): string[] {
    if (data) {
      return Object.entries(data)
        .filter(([key, value]) => value)
        .map(([key, value]) => key);
    } else {
      return [];
    }
  }

  submit() {
    if (this.target) {
      const formData = this.form.value;
      console.log(this.form.value);
      this.articleService
        .updateArticle({
          supplier: formData.supplier,
          name: formData.name,
          composition: formData.composition,
          season: formData.season,
          type: formData.type,
          gauges: this.dataToArray(formData.gauges),
          otherFeatures: this.dataToArray(formData.otherFeatures),
          userId: this.authService.uid,
          articleId: this.articleId,
        })
        .then(() => {
          this.router.navigateByUrl('/');
          this.snackBar.open('記事を編集しました', null, {
            duration: 2000,
          });
        });
    } else {
      const formData = this.form.value;
      console.log(this.form.value);
      this.articleService
        .createArticle({
          supplier: formData.supplier,
          name: formData.name,
          composition: formData.composition,
          season: formData.season,
          type: formData.type,
          gauges: this.dataToArray(formData.gauges),
          otherFeatures: this.dataToArray(formData.otherFeatures),
          userId: this.authService.uid,
        })
        .then(() => {
          this.router.navigateByUrl('/');
          this.snackBar.open('記事を作成しました。', null, {
            duration: 2000,
          });
        });
    }
  }

  deleteArticle() {
    return this.articleService.deleteArticle(this.articleId).then(() => {
      this.snackBar.open('記事を削除しました。', null, {
        duration: 2000,
      });
    });
  }
}
