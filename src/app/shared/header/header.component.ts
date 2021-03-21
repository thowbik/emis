import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationService } from 'src/services/navigation.service';
import { AlertService } from 'src/services/alert.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserSessionService } from 'src/services/usersession.service';
import { NavBarService } from 'src/services/navbar.service';
import { FullLayoutComponent } from 'src/app/layouts/full/full-layout.component';
enum MenuOrientation {
  STATIC,
  OVERLAY,
  SLIM,
  HORIZONTAL
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  layoutMode: MenuOrientation = MenuOrientation.STATIC;
  studentName: any;
  classId: any;
  className: any;
  section: any;
  class_in_roman:any = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","LKG","UKG","PREKG"];
  display: boolean = false;
  staticMenu: boolean =false;
  rotateMenuButton: boolean;
  items:any[] =[];
  overlayMenuActive: boolean;


  schoolName: any;
  userName: string;
  userType: string;
  instDistrict: string;
  isOpen: boolean = false;
  toggleTitle: string;
  isShowDropdown: boolean =false;
  emisUserType:any;
  menuClick: boolean;
  topbarMenuActive: boolean;

  staticMenuDesktopInactive: boolean;

  staticMenuMobileActive: boolean;
  constructor(
    private navigationService: NavigationService,
    public app: FullLayoutComponent,
    private alertService: AlertService, private router: Router,
    private authService : AuthenticationService,private userSessionService : UserSessionService,private navBarService:NavBarService) {
      debugger;
      this.schoolName = this.userSessionService.schoolName();
      this.userName = this.userSessionService.userName();
      this.userType = this.userSessionService.userType();
      this.instDistrict = this.userSessionService.eduDistName();
      this.emisUserType = this.userSessionService.userTypeId();
     }

  ngOnInit() {

    //this.toggleMenu(event);
    this.items = [
      {label: 'Reset Password', icon: 'fa fa-key', routerLink: ['/reset-password'] },
      {label: 'Logout', icon: 'pi pi-sign-out', command: () => {
        this.onLogout();
      }}
  ];
  }

  isTablet() {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
}

isDesktop() {
    return window.innerWidth > 1024;
}

isMobile() {
    return window.innerWidth <= 640;
}
  toggleDropdown()
  {
    this.isShowDropdown = !this.isShowDropdown;
  }
  // toggleSidebar()
  // {
  //   this.navBarService.toggle();
  //   this.isOpen = !this.isOpen;
  //   this.toggleTitle = this.isOpen ? 'Close' : 'Expand';
  // }
  // showConfirmation()
  // {
  //   this.display = true;
  // }
  onLogout()
  {
    this.authService.logOut();
    this.navigationService.goToLogin();
    localStorage.removeItem("schoolName");
    localStorage.removeItem('schoolTypeId');
    localStorage.clear();
  }
  resetPassword() {
    
  }
  toggleMenu(event)
  {
    this.staticMenu = !this.staticMenu;
    if(!this.staticMenu) {
      this.app.changeToStaticMenu();
    }
    else {
      this.app.changeToOverlayMenu();
    }
    // this.menuClick = true;
    // this.rotateMenuButton = !this.rotateMenuButton;
    // this.topbarMenuActive = false;

    // if (this.layoutMode === MenuOrientation.OVERLAY) {
    //     this.overlayMenuActive = !this.overlayMenuActive;
    // } else {
    //     if (this.isDesktop()) {
    //         this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive; } else {
    //         this.staticMenuMobileActive = !this.staticMenuMobileActive; }
    // }

    // event.preventDefault();
  }
  cancel()
  {
this.display = false;
  }


  // toggleDropdown()
  // {
  //   this.isShowDropdown = !this.isShowDropdown;
  // }



  // toggleSidebar()
  // {
  //   this.navBarService.toggle();
  //   this.isOpen = !this.isOpen;
  //   this.toggleTitle = this.isOpen ? 'Close' : 'Expand';
  // }
  // onLogout()
  // {
  //   this.authService.logOut();
  //   this.navigationService.goToLogin();
  //   localStorage.removeItem("schoolName");
  //   localStorage.removeItem('schoolTypeId');
  //   localStorage.clear();
  // }
}
