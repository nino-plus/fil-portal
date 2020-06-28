import { Component } from '@angular/core';
import { DrawerService } from './services/drawer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isOpened$: Observable<boolean> = this.drawerService.isOpen$;
  title = 'fil-portal';

  opened = true;

  constructor(private drawerService: DrawerService) {
    this.drawerService.isOpen$.subscribe((opened) => (this.opened = opened));
  }
}
