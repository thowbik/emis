import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { UserSessionService } from './usersession.service';
import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {

    private baseUrl = environment.apiBaseUrl;
    private baseUrl1 = environment.apiBaseUrl1;
    private stagingLoginApiBaseUrl = "http://13.232.216.80/api/login";
    private authorization_key = environment.loggedInAuthorization;
    private loginAuthorization_key = environment.loginAuthorization;
    private loggedInAuthorization_key = environment.loggedInAuthorization;
    private authorization1 = environment.authorization1;
  constructor(
    private router: Router,
    private sessionService: UserSessionService,
    private authService: AuthenticationService,
    private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const authToken = this.sessionService.authToken();
        //console.log(token);
        if(authToken !=null)
        {
          if (request.url.search(this.baseUrl1) != -1 ) 
           { 
              let requests = request.clone({
              headers:new HttpHeaders({  
                'Connection': "keep-alive",
                'x-api-key': this.authorization1
                 })    
              });
            return next.handle(requests).pipe(
              catchError(this.handleError<any>('role', []))
            )
          }
          else if(request.url.includes(this.baseUrl))
          {
            let requests = request.clone({
              headers:new HttpHeaders({         
                      'Authorization': this.loggedInAuthorization_key,         
                      'Token':authToken
              })    
            });
            return next.handle(requests).pipe(
              catchError(this.handleError<any>('role', [])))   
          }
          else {
            let requests = request.clone({
              headers:new HttpHeaders({
                // 'Content-Type': "image/jpeg",
                 })    
              });
            return next.handle(requests).pipe(
              catchError(this.handleError<any>('role', []))
            )
          } 
        }
        else
        {
          if (request.url.includes("schlReg"))
          {
            let requests = request.clone({
              headers:new HttpHeaders({         
                      'Authorization': this.loggedInAuthorization_key,         
              })    
            });
           return next.handle(requests).pipe(
             catchError(this.handleError<any>('role', [])))            
          }
          else if(request.url.includes(this.stagingLoginApiBaseUrl))
          {
            let requests = request.clone({
              headers:new HttpHeaders({         
                      'Authorization': this.loggedInAuthorization_key,         
              })    
            });
           return next.handle(requests).pipe(
             catchError(this.handleError<any>('role', [])))            
          }
          else if(request.url.includes('auth'))
          {
            let requests = request.clone({
              headers:new HttpHeaders({         
                      'Authorization': this.loggedInAuthorization_key,         
              })    
            });
           return next.handle(requests).pipe(
             catchError(this.handleError<any>('role', [])))            
          }
          else
          {
            let requests = request.clone({
              headers:new HttpHeaders({         
                      'Authorization': this.loginAuthorization_key,         
              })    
            });
          return next.handle(requests).pipe(
            catchError(this.handleError<any>('role', [])))
          }
        }
      }

      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          if(error instanceof HttpErrorResponse){
            // console.error("Error: " + error.status);
            if(error.status == 401){
                // localStorage.clear();
                // this.authService.logOut();
                // this.router.navigate(['/login']);
            }
            else if(error.status == 404){
               this.alertService.error(error.message);
            }
            else if(error.status == 503){
              this.alertService.error(error.message);
            }
            else{
              let errorMessage = '';
              let type : number;
              if (error.error instanceof ErrorEvent) {
                 // client-side error
                  errorMessage = `${error.error.message}`;
                  type = 1;
              } else {
                  // server-side error
                  errorMessage = `${error.message}`;
                  type = 2;
              }
              // this.alertService.error((type == 2) ? `${error.status} / ${error.statusText} Occurred` : `Error Message : ${errorMessage}`);
              return throwError('An error occurred, please try again later \n '+ errorMessage);
            }
          }
        };
      }

    //   return next.handle(request).do((event: any) => {
    //     if (event instanceof HttpResponse) {
    //       const action = request.urlWithParams.replace(this.baseUrl, '');
    //       const elapsed = Date.now() - started;
    //       console.log(`${action} took ${elapsed} milliseconds`);
    //     }
    //   }).catch((error, caught) => {
    //     if (error instanceof HttpErrorResponse) {
    //       if (error.status === 401) {
    //         this.authService.logOut();
    //         this.router.navigate(['/login']);
    //       } else {
    //         this.broadcastFriendlyErrorMessage(error);
    //       }
    //     }
    //     // return the error to the method that called it
    //     return Observable.throw(error);
    //   }) as any;
    // }
  
    // broadcastFriendlyErrorMessage(rejection) {
    //     let msg = '';
    //   if (rejection.status === 0 && (rejection.statusText === '' || rejection.statusText === 'Unknown Error')) {
    //     this.alertService.error('Unable to connect to the server, please try again in a couple of seconds.');
    //   } else if (rejection.status === 400) {
    //     if (rejection.error) {// jshint ignore:line
    //       msg = rejection.error; // jshint ignore:line
    //     }
    //     this.alertService.error(msg);
    //   } else if (rejection.status === 404) {
    //     if (rejection.message) {
    //       this.alertService.error(rejection.message);
    //     }
    //   } else if (rejection.status === 500) {
    //     if (rejection.message) {
    //       let ex = rejection.message;
    //       while (ex.innerException) {
    //         ex = ex.innerException;
    //       }
    //       this.alertService.error(ex.exceptionMessage);
    //     }
    //   } else if (rejection.responseStatus === 401) {
    //     this.authService.logOut();
    //     this.router.navigate(['/login']);
    //   } else if (rejection.responseStatus === 0) {
    //     this.alertService.error('Error occured, while uploading file');
    //   } else if (rejection.responseStatus === 400) {
    //     if (rejection.response) { // jshint ignore:line
    //       msg = rejection.response; // jshint ignore:line
    //     }
    //     this.alertService.error(msg);
    //   }
    // }
}
