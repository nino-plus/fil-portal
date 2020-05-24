import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
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
    private authService: AuthService
  ) {}

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
    const formData = this.form.value;
    console.log(this.form.value);
    this.articleService.createArticle({
      supplier: formData.supplier,
      name: formData.name,
      composition: formData.composition,
      season: formData.season,
      type: formData.type,
      gauges: this.dataToArray(formData.gauges),
      otherFeatures: this.dataToArray(formData.otherFeatures),
      userId: this.authService.uid,
    });
  }
}
