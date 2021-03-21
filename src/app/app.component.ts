import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SpinnerComponent } from './shared/component/spinnercomponent/spinner.component';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  subscription: Subscription;
  spinnerComponent = SpinnerComponent;
  constructor(private router: Router) {
  }
  ngOnInit() {
    this.subscription = this.router.events
        .pipe(
            filter(event => event instanceof NavigationEnd)
        )
        .subscribe(() => window.scrollTo(0, 0));
}
ngOnDestroy() {
  if (this.subscription) {
      this.subscription.unsubscribe();
  }
}
}
