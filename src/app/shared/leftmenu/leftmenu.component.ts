import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { NavBarService } from 'src/services/navbar.service';
import { UserSessionService } from 'src/services/usersession.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {
  url: any;
  isOpen: boolean =true;
  toggleTitle: string;
  isShowStudentMenu:boolean = false;
  isShowSchoolMenu: boolean = false;
  isShowSchemeMenu:boolean =false;
  isShowTimetableMenu:boolean =false;
  isShowStaffMenu:boolean =false;
  schoolTypeId: number;
  selectedIndex: number;
  isShowUdiseMenu: boolean = false;
  isShowUdisereports: boolean = false;


  constructor(private router : Router,private navBarService: NavBarService,private userSessionService: UserSessionService,
    @Inject(DOCUMENT) private document: Document) {
    this.schoolTypeId = this.userSessionService.schoolTypeId();
   }

  ngOnInit() {
  //   this.navBarService.change.subscribe(isOpen => {
  //     this.isOpen = isOpen;
  // });
    this.toggleTitle = this.isOpen ? 'Close' : 'Expand';
    
  }
  navigate(txt:string):void{
    debugger;
   console.log(txt);
     this.url = '/'+txt;
    // url.push("/"+txt);
    // this.router.navigate(['/department']);
    this.router.navigate([this.url]);
  }
  sidebarToggle()
  {
    debugger;
    this.navBarService.toggle();
    this.isOpen = !this.isOpen;
    this.toggleTitle = this.isOpen ? 'Close' : 'Expand';
  }
  toggleList(item,index)
  {
    this.selectedIndex = index;
    debugger;
    if(item == 'students')
    {
this.isShowStudentMenu = !this.isShowStudentMenu;
    }
    else if(item == 'schools')
    {
this.isShowSchoolMenu = !this.isShowSchoolMenu;
    }
    else if(item == 'schemes')
    {
this.isShowSchemeMenu = !this.isShowSchemeMenu;
    }
    else if(item == 'teachers')
    {
this.isShowStaffMenu = !this.isShowStaffMenu;
    }
    else if(item == 'timetable')
    {
      debugger;
this.isShowTimetableMenu = !this.isShowTimetableMenu;
    }
    else if(item == 'udise')
    {
      debugger;
this.isShowUdiseMenu = !this.isShowUdiseMenu;
    }
    else if(item == 'udisereports')
    {
      debugger;
this.isShowUdisereports = !this.isShowUdisereports;
    }
  }
  goToDownloadDcf()
  {
    //this.document.location.href = 'http://shorturl.at/mpsyH';
    window.open("http://shorturl.at/mpsyH", "_blank");
  }
  goToIFHRMS(){
    window.open("https://forms.gle/fsbQ7B4breXiHsW9A", "_blank");
  }
}
