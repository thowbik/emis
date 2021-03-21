
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { LeftmenuComponent } from './shared/leftmenu/leftmenu.component';
import { HttpInterceptorService } from 'src/services/interceptor.service';
import { DataService } from 'src/services/data.service';
import { NavigationService } from 'src/services/navigation.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './shared/header/header.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { ComponentsModule } from './shared/component/components.module';
import { Observable } from 'rxjs';
import { SpinnerComponent } from './shared/component/spinnercomponent/spinner.component';
import { BrowserModule } from '@angular/platform-browser';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { NavBarService } from 'src/services/navbar.service';
import {ButtonModule} from 'primeng/button';
import { NgHttpLoaderModule } from 'ng-http-loader';
import {CardModule} from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TableModule} from 'primeng/table';
import { AppMenuComponent, AppSubMenuComponent } from './shared/app.menu.component';
import {MenuModule} from 'primeng/menu';
import {KeyFilterModule } from 'primeng/keyfilter' ;
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { StateDashboardService } from './pages/full-layout-page/statedashboard/dashboard.services';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
@NgModule({
  declarations: [AppComponent, FullLayoutComponent,ContentLayoutComponent, LeftmenuComponent, HeaderComponent, BreadcrumbComponent,AppMenuComponent,AppSubMenuComponent],
  imports: [
    BrowserAnimationsModule,
    CardModule,
    ConfirmDialogModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    BrowserModule,
    ButtonModule,
    ButtonModule,
     RadioButtonModule,
     TableModule,
     ScrollPanelModule,
     MenuModule,
     KeyFilterModule,
    //NgbModule.forRoot(),
     // NgbModule.forRoot(),
     ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgHttpLoaderModule.forRoot(),
    McBreadcrumbsModule.forRoot()
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: createTranslateLoader,
    //     deps: [HttpClient]
    //   }
    // }),

   ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService,
    UserSessionService,
    NavigationService,
    DataService,
    NavBarService,
    StateDashboardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],

   bootstrap: [AppComponent],
  entryComponents:
    [
      SpinnerComponent
    ]
})
export class AppModule { }
