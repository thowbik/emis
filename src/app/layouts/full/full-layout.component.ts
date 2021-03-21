import { Component, OnInit, ElementRef, Inject, Renderer2, AfterViewInit, ViewChild } from '@angular/core';

// import { ConfigService } from 'app/shared/services/config.service';
import { DOCUMENT } from '@angular/common';
import {ScrollPanel} from 'primeng/primeng';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
enum MenuOrientation {
  STATIC,
  OVERLAY,
  SLIM,
  HORIZONTAL
}

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})

export class FullLayoutComponent implements AfterViewInit {
  [x: string]: any;
  @ViewChild('sidebarBgImage', { static: false }) sidebarBgImage: ElementRef;
  @ViewChild('appSidebar', { static: false }) appSidebar: ElementRef;
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  options = {
    direction: 'ltr',
    bgColor: 'black',
    bgImage: 'assets/img/sidebar-bg/01.jpg'
  };
  hideSidebar: boolean;
  iscollapsed = false;
  isSidebar_sm = false;
  isSidebar_lg = false;
  bgColor = 'black';
  bgImage = 'assets/img/sidebar-bg/01.jpg';
  emisUserType : number;
  public config: any = {};
  public isOpen: boolean = true;


  constructor(private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,private userSessionService : UserSessionService,private alertService: AlertService) {
        this.emisUserType = this.userSessionService.userTypeId();   
  }

  layoutMode: MenuOrientation = MenuOrientation.STATIC;

  darkMenu = false;
  
  profileMode = 'inline';
  
  rotateMenuButton: boolean;
  
  topbarMenuActive: boolean;
  
  overlayMenuActive: boolean;
  
  staticMenuDesktopInactive: boolean;
  
  staticMenuMobileActive: boolean;
  
  layoutMenuScroller: HTMLDivElement;
  
  menuClick: boolean;
  
  topbarItemClick: boolean;
  
  activeTopbarItem: any;
  
  resetMenu: boolean;

  temp_login :boolean;
  
  menuHoverActive: boolean;
  
  @ViewChild('layoutMenuScroller', { static: true }) layoutMenuScrollerViewChild: ScrollPanel;
  
  ngAfterViewInit() {
    //  if(this.emisUserType=="6"){
    //     this.temp_login = true;
    //  }
    //  else {
    //     this.temp_login = false;
    //  }
    //   setTimeout(() => {this.layoutMenuScrollerViewChild.moveBar(); }, 100);
  }
  
  onLayoutClick() {
      if (!this.topbarItemClick) {
          this.activeTopbarItem = null;
          this.topbarMenuActive = false;
      }
  
      if (!this.menuClick) {
          if (this.isHorizontal() || this.isSlim()) {
              this.resetMenu = true;
          }
  
          if (this.overlayMenuActive || this.staticMenuMobileActive) {
              this.hideOverlayMenu();
          }
  
          this.menuHoverActive = false;
      }
  
      this.topbarItemClick = false;
      this.menuClick = false;
  }
  
  onMenuButtonClick(event) {
      this.menuClick = true;
      this.rotateMenuButton = !this.rotateMenuButton;
      this.topbarMenuActive = false;
  
      if (this.layoutMode === MenuOrientation.OVERLAY) {
          this.overlayMenuActive = !this.overlayMenuActive;
      } else {
          if (this.isDesktop()) {
              this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive; } else {
              this.staticMenuMobileActive = !this.staticMenuMobileActive; }
      }
  
      event.preventDefault();
  }
  
  onMenuClick($event) {
      this.menuClick = true;
      this.resetMenu = false;
  
      if (!this.isHorizontal()) {
          setTimeout(() => {this.layoutMenuScrollerViewChild.moveBar(); }, 450);
      }
  }
  
  onTopbarMenuButtonClick(event) {
      debugger;
      this.topbarItemClick = true;
      this.topbarMenuActive = !this.topbarMenuActive;
  
      this.hideOverlayMenu();
  
      event.preventDefault();
  }
  
  onTopbarItemClick(event, item) {
      debugger;
      this.topbarItemClick = true;
  
      if (this.activeTopbarItem === item) {
          this.activeTopbarItem = null; } else {
          this.activeTopbarItem = item; }
  
      event.preventDefault();
  }
  
  onTopbarSubItemClick(event) {
      event.preventDefault();
  }
  
  hideOverlayMenu() {
      this.rotateMenuButton = false;
      this.overlayMenuActive = false;
      this.staticMenuMobileActive = false;
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
  
  isOverlay() {
      return this.layoutMode === MenuOrientation.OVERLAY;
  }
  
  isHorizontal() {
      return this.layoutMode === MenuOrientation.HORIZONTAL;
  }
  
  isSlim() {
      return this.layoutMode === MenuOrientation.SLIM;
  }
  
  changeToStaticMenu() {
      this.layoutMode = MenuOrientation.STATIC;
  }
  
  changeToOverlayMenu() {
      this.layoutMode = MenuOrientation.OVERLAY;
  }
  
  changeToHorizontalMenu() {
      this.layoutMode = MenuOrientation.HORIZONTAL;
  }
  
  changeToSlimMenu() {
      this.layoutMode = MenuOrientation.SLIM;
  }
}
