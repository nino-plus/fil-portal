import { Component } from '@angular/core';
import { DrawerService } from './services/drawer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isOpened$: Observable<boolean> = this.drawerService.isOpened$;
  title = 'fil-portal';

  constructor(private drawerService: DrawerService) {}
}
