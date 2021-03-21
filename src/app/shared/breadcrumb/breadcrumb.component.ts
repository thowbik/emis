import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map, mergeMap } from 'rxjs/internal/operators';
import { Location } from '@angular/common';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  name: string;
  breadcrumbs: Array<any> = [];
  menu: Array<any> = [];
  constructor(private router : Router,
     private activatedRoute: ActivatedRoute,
     private location: Location) {
    this.listenRouting();
   }

  ngOnInit() {
  }
  listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    // this.router.events.subscribe((router: any) => {
    //   alert("hello");
    //   routerUrl = router.urlAfterRedirects;
    //   if (routerUrl && typeof routerUrl === 'string') {
    //     // 初始化breadcrumb
    //     target = this.menu;
    //     this.breadcrumbList.length = 0;
    //     // 取得目前routing url用/區格, [0]=第一層, [1]=第二層 ...etc
    //     routerList = routerUrl.slice(1).split('/');
    //     routerList.forEach((router, index) => {
    //       // 找到這一層在menu的路徑和目前routing相同的路徑
    //       target = target.find(page => page.path.slice(2) === router);
    //       // 存到breadcrumbList到時後直接loop這個list就是麵包屑了
    //       this.breadcrumbList.push({
    //         name: target.name,
    //         // 第二層開始路由要加上前一層的routing, 用相對位置會造成routing錯誤
    //         path: (index === 0) ? target.path : `${this.breadcrumbList[index-1].path}/${target.path.slice(2)}`
    //       });
          
    //       // 下一層要比對的目標是這一層指定的子頁面
    //       if (index+1 !== routerList.length) {
    //         target = target.children;
    //       }
    //     });

    //     console.log(this.breadcrumbList);
    //   }
    // });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        let snapshot = this.router.routerState.snapshot;
        this.breadcrumbs = [];
        let url = snapshot.url;
        let routeData = route.snapshot.data;

        console.log(routeData);
        let label = routeData.title;
        let parentLabel = routeData.parent;
        let parentUrl = routeData.parentUrl ? routeData.parentUrl : '' ;
        let params = snapshot.root.params;
      
        this.breadcrumbs.push({
          url: url,
          label: label,
          parentLabel:parentLabel,
          parentUrl: parentUrl,
          params: params
        });
      });
  }
  goBack(event,data) {
    debugger;
    if(data.parentUrl) {
    this.router.navigate([data.parentUrl]);
    }
  }
}
