import {Component, Input, OnInit, EventEmitter, ViewChild, Inject} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {MenuItem} from 'primeng/primeng';
import { AppComponent } from '../app.component';
import { FullLayoutComponent } from '../layouts/full/full-layout.component';
import { Router } from '@angular/router';
import { DOCUMENT, NgIf } from '@angular/common';
import { UserSessionService } from 'src/services/usersession.service';
import { CeoComponent } from '../pages/full-layout-page/ceo/ceo.component';
import { StateDashboardService } from '../pages/full-layout-page/statedashboard/dashboard.services';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" root="true" class="layout-menu layout-main-menu clearfix"
            [reset]="reset" visible="false" parentActive="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {
    private dikshaUrl = environment.dikshaUrl;
    @Input() reset: boolean;

    model: any[];

    items : any;

    theme = 'blue';

    layout = 'blue';

    version = 'v3';

    isShow: boolean;

    isShowing: boolean;

    usertypeId: any;

    userName: any;

    schooltypeId: any;

    emisUserType1: number;

    highClass: any;

    cateType: any;
    catty_id:any;
    teacherType: any;
    rsaToken: string;


    constructor(public app: FullLayoutComponent, @Inject(DOCUMENT) private document: Document, private userSessionService: UserSessionService,
    public router: Router,
    private dashboardService: StateDashboardService) {
        debugger
        this.usertypeId = this.userSessionService.userTypeId();
        this.userName = this.userSessionService.userName();
        this.schooltypeId = this.userSessionService.schoolTypeId();
        this.emisUserType1 = this.userSessionService.emisUsertype1();
        this.cateType = this.userSessionService.cateType();
        this.catty_id = this.userSessionService.catty_id();
        this.teacherType= this.userSessionService.teacherType();

    }

    ngOnInit() {
      
        this.isShow = true;
        const stringToSplit = this.userName;
        const ReportMenu = stringToSplit.split('-');
        if (this.usertypeId == 5 || this.usertypeId == 6 ||  this.usertypeId == 3 || this.usertypeId == 9 || this.usertypeId == 10 || this.usertypeId == 2 || this.usertypeId == 19 ) {
            // Starts
            this.model = [
                {label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/statedashboard']},
                // {
                //     label: 'Customization', icon: 'fa fa-fw fa-bars' , badge: '8',
                //     items: [
                //         {label: 'Static Menu', icon: 'fa fa-fw fa-bars',  command: () => this.app.changeToStaticMenu()},
                //         {label: 'Overlay Menu', icon: 'fa fa-fw fa-bars',  command: () => this.app.changeToOverlayMenu()},
                //         {label: 'Slim Menu', icon: 'fa fa-fw fa-bars',  command: () => this.app.changeToSlimMenu()},
                //         {label: 'Horizontal Menu', icon: 'fa fa-fw fa-bars',  command: () => this.app.changeToHorizontalMenu()},
                //         {label: 'Inline Profile', icon: 'fa fa-sun-o fa-fw',  command: () => this.app.profileMode = 'inline'},
                //         {label: 'Top Profile', icon: 'fa fa-moon-o fa-fw',  command: () => this.app.profileMode = 'top'},
                //         {label: 'Light Menu', icon: 'fa fa-sun-o fa-fw',  command: () => this.app.darkMenu = false},
                //         {label: 'Dark Menu', icon: 'fa fa-moon-o fa-fw',  command: () => this.app.darkMenu = true}
                //     ] 
                // },
                //  user 5 state
                //  user 9 CeoComponent
                //  user 3 distct

                {
                    label: 'Students', icon: 'fa fa-fw  fa-user', visible : this.usertypeId != 21 ? true : false,
                    // ,command: (event) => {this.goToStudents('students')}
                    items: [
                      {label: 'RTE Applicant' , visible : ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo'&& ReportMenu[1] !='estl' && ReportMenu[1] !='gis',
                        items: [{label: 'RTE Applicant Verification', routerLink: ['/rte/applicant/verification'], visible : this.usertypeId == 9 || ReportMenu[1] =="rte" ? true : false},
                          {label: 'RTE-Student', routerLink: ['/State/rte-student-reports'],visible : this.usertypeId == 2 || this.usertypeId == 9 || this.usertypeId == 3 || this.usertypeId == 5 || ReportMenu[1] =="rte" ? true : false},
                          {label: 'RTE-Applicaion Status', routerLink: ['/rte/applicantstatus'],visible : this.usertypeId == 9 || this.usertypeId == 3 || ReportMenu[1] =="rte" ? true : false},
                          {label: 'RTE-Type Wise', routerLink: ['/rte/typewise-application'],visible : this.usertypeId == 9 || this.usertypeId == 3 || ReportMenu[1] =="rte" ?  true : false},
                          {label: 'RTE-Daily Report', routerLink: ['/student/RTE-Dailyreport'],visible : this.usertypeId == 5 || this.usertypeId == 9 || this.usertypeId == 3 || ReportMenu[1] =="rte" ? true : false},
                           {label: 'RTE Seat Allotment', routerLink: ['/students/rteapplicants'],visible : this.usertypeId == 3 || ReportMenu[1] =="rte" ? true : false},
 
                        ]},

                        {label: 'CWSN',
                        items: [
                                 {label: 'CWSN Details', routerLink: ['/cwsn/details'],visible : this.usertypeId == 5 ||  this.usertypeId == 2 || this.usertypeId == 14 || this.usertypeId == 9 || this.usertypeId == 3 ||  this.usertypeId == 6  ? true : false},
                                 {label: 'CWSN Reports', routerLink: ['/State/children-with-special-needs',{page: 1}],visible :this.usertypeId != 5 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='estl'&& ReportMenu[1] !='gis' },
                               ]},

                            //    {label: 'Board Exam Coordination',visible : this.usertypeId != 2 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='estl' && ReportMenu[1] !='gis',
                            //    items: [
                            //     {label: 'Exam Center Updates', routerLink: ['/board/exam.co-ordinator'],visible : this.usertypeId == 5 ||  this.usertypeId == 9 || this.usertypeId == 3 ||  this.usertypeId == 6 ? true : false},
                            //     {label: 'Board Exam Coordination Report', routerLink: ['/teacher/asigned/reports'],visible : this.usertypeId == 5 ||  this.usertypeId == 9 || this.usertypeId == 3 || this.usertypeId == 19 ? true : false},
                            //  ]},


                        {label: 'Pending Student Request', routerLink: ['/pendingstudentrequest'], visible : this.usertypeId == 3 ? true : false},
                        // {label: 'Common Pool', routerLink: ['/commonpool']}
                        // {label: 'CWSN Details',  routerLink: ['/State/children-with-special-needs'], visible : ReportMenu[1] != 'quality' || ReportMenu[1] != 'osc' || ReportMenu[1] != 'civil' || ReportMenu[1] != 'cal' || ReportMenu[1] != 'mdo' ? true : false },
                        // {label: 'Students in Common Pool'},
                        // {label: 'Student Migration Report', routerLink: ['/State/migration']},
                        // {label: 'Students in Common Pool'},
                        // {label: 'Student Duplication List'},
                        // {label: 'Special Cash Incentive Report'},
                        // {label: 'Student Community Details'},
                        // {label: 'Student Search Details'},
                        // {label: 'Enrolment Details', routerLink: ['/state/enrolment-details']},
                        // {label: 'Community Details'},
                        {label: 'Aadhar Enrollment', routerLink: ['/State/aadhar-list'], visible : ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='estl' && ReportMenu[1] !='gis' },
                        //  {label: 'CWSN Details', routerLink: ['/State/emis_student_disablity_list'] },
                        //  {label: 'Noon Meal Details', routerLink: ['/noonmeal/student/Report'] },

                        {label: 'Student Migration Report', routerLink: ['/studentmigrationreport'], visible : this.usertypeId != 2 && this.usertypeId != 5 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='estl' && ReportMenu[1] !='gis'},
                        {label: 'Student Common Pool Report', routerLink: ['/studentcommonpoolreport'], visible : ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='estl' && ReportMenu[1] !='gis' },
                        {label: 'OSC Students Report', routerLink: ['/oscstudents'], visible : this.usertypeId == 3 || this.usertypeId == 5 || this.usertypeId == 2 || this.usertypeId == 9 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='estl' && ReportMenu[1] !='gis' ? true : false},
                        {label: 'Student Admission Approval', routerLink: ['/students/admissionapproval'],visible : this.usertypeId == 3 || this.usertypeId == 9  ? true : false},
                        {label: 'CWSN Reports', routerLink: ['/State/children-with-special-needs',{page: 1}],visible :this.usertypeId != 5 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='estl'&& ReportMenu[1] !='gis' },

                        {label: 'Competition Reports', routerLink: ['/competition-report'],visible : this.usertypeId == 3 || this.usertypeId == 6 || this.usertypeId == 10 || this.usertypeId == 9 ? true : false},
                        // {label: 'Out of School Children', routerLink: ['/State/osclist']},
                        // {label: 'Renewal Reset Queue List', routerLink: ['/State/RenewalResetQueue'] },
                        // {label: 'Right To Education', routerLink: ['/State/RTE_allocation']},
                        // {label: 'Un-Recognized School', routerLink: ['/State/school_unrecognized_list']},
                        // {label: 'SLAS Report-2019',visible : this.usertypeId != 2 && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc'&& ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'rte'&& ReportMenu[1] !='estl' && ReportMenu[1] !='gis',
                        //     items: [{label: 'Student-wise', routerLink: ['/acadamic_slas2019_student-wise',{page: 2}] },
                        //     // {label: 'School-wise' ,  routerLink: ['/slasschooldistrictwise'] }
                        //  ]},
                    //       {label: 'Scheme Reports',
                    //          items: [{label: 'Laptop Distribution Report', routerLink: ['/state/laptop-distribution'], visible : ReportMenu[1] != 'quality' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'rte' },

                    //   ]},

                        // {label: 'Renewal Reset Queue List', routerLink: ['/State/RenewalResetQueue'] },
                        // {label: 'Right To Education', routerLink: ['/State/RTE_allocation']},
                        // {label: 'Un-Recognized School', routerLink: ['/State/school_unrecognized_list']},

                        // {label: 'Renewal Reset Queue List', routerLink: ['/State/RenewalResetQueue'] },
                        // {label: 'Right To Education', routerLink: ['/State/RTE_allocation']},
                        // {label: 'Un-Recognized School', routerLink: ['/State/school_unrecognized_list']},
                        // {label: 'School Wash Details', routerLink: ['/State/school_wash_details']},
                        // {label: 'Committee Details', routerLink: ['/State/committee-details']},
                        // {label: 'Building Details', routerLink: ['/State/building-details']},
                    ]
                },
                {
                    label: 'Staff Details', icon: 'fa fa-fw  fa-user', visible : this.usertypeId != 21 ? true : false ,command: (event) => {this.goToStudents('staffs')},
                    items: [
                        {label: 'Staff List', routerLink: ['/staff'],visible : this.usertypeId == 5 || this.usertypeId == 6 ||  this.usertypeId == 9 ||  this.usertypeId == 10 || (this.usertypeId == 19 && ReportMenu[1] != 'gis') ? true : false},
                        // {label: 'Staff List', routerLink: ['/staff'],visible : this.usertypeId == 19 && ReportMenu[1] != 'gis' ? true : false},
                        {label: 'BRTE Details', routerLink: ['/State/brte-details'], visible : this.usertypeId != 2 && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'rte' && ReportMenu[1] !='gis'},
                        {label: 'Part Time Teachers', routerLink: ['/reports/parttime-teachers'], visible : this.usertypeId == 5 || this.usertypeId == 9 || this.usertypeId == 3  || this.usertypeId == 2 ? true : false },
                        {label: 'Part Time Teachers Salary', routerLink: ['/ptstaffpaidedreport'], visible : this.usertypeId == 3 || this.usertypeId == 9  || (this.usertypeId == 19 && ReportMenu[1] !='quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='gis')? true : false },
                      //  {label: 'Part Time Teachers Salary', routerLink: ['/State/parttimeteachersalaryreport'], visible :  this.usertypeId == 5 || this.usertypeId == 2 ||(this.usertypeId == 19 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] !='mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='gis') ? true : false },
                        {label: 'BT - By Appointed Subject', routerLink: ['/staff/BtTeachers'],visible : this.usertypeId == 5 ||  this.usertypeId == 9 || this.usertypeId == 3 ||  this.usertypeId == 2 ||(this.usertypeId == 19 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] !='mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='gis') ? true : false},
                        {label: 'IED Teachers', routerLink: ['/state/IED-Teacher'],visible : this.usertypeId == 5 ||  this.usertypeId == 9 || this.usertypeId == 3 || (this.usertypeId == 19 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] !='mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='gis') ? true : false },
                        // {label: 'Teachers', routerLink: ['/State/emis_teacher_details']},
                        // {label: 'Staff Details'},
                        // {label: 'Search Staff Details', routerLink: ['/staffsearch'], visible : this.usertypeId == 19 ? false : true},
                        // {label: 'Teacher Posting Duration'},
                        // {label: 'Students Teachers Ratio'},
                        // {label: 'Non-Teacher Details'},
                        // {label: 'Transfer Details',routerLink: ['/State/tranfer-details']},
                        // {label: 'Teacher Timetable Report'},
                        // {label: "Teacher's Children Report"},
              
                      {
                        label: 'Training Details', visible : this.usertypeId != 5, 
                        items: [
                            {label: 'Training Attended Report', routerLink: ['/staff/trainingdetails'],visible : this.usertypeId == 14 || this.usertypeId == 9 || this.usertypeId == 5 || this.usertypeId == 3 ? true : false},
                            {label: 'Training Attended Report', routerLink: ['/staff/trainingdetails'],visible : this.usertypeId == 19 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] !='mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='estl' && ReportMenu[1] !='gis'? true : false},
                            {label: 'BT - By Subject Taught', routerLink: ['/staff/bt-teachers'],visible : this.usertypeId == 5 ||  this.usertypeId == 9 || this.usertypeId == 3 ||  this.usertypeId == 2 || (this.usertypeId == 19 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] !='mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='gis') ? true : false},
                            {label: 'PINDICS Monitoring Report', routerLink: ['/state/pindicsreport',{page: 1}] ,visible :  this.usertypeId != 2 && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='estl' && ReportMenu[1] !='gis'}
                        ], },
                        {
                            label: ' Administrative Transfers', visible : this.usertypeId != 2 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'gis',
                            items: [
                                {label: 'Transfer a Teacher', routerLink: ['/state/teachertransfer']},
                                {label: 'Transfer Request Approval', routerLink: ['/requestapproval'],visible : this.usertypeId == 3  || this.usertypeId == 9? true : false},        
                            ],
                      },
                    //   {label: 'Training conducted', routerLink: ['/traininglist'],visible : this.usertypeId == 3 ? true : false },
                    ]
                },
                {
                    label: 'Staff Fixation', icon: 'fa fa-fw  fa-user' ,
                    visible :  this.usertypeId != 2 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='gis',
                    items: [
                        {label: 'DSE Staff Fixation', routerLink: ['/stafffixation'] },
                        {label: 'Staff Fixation Reports', routerLink: ['/staff/staff-fixation'], visible : this.usertypeId == 9 || this.usertypeId == 3 ? true : false },
                    ]
                },
                {
                    label: 'Schools', icon: 'fa fa-fw  fa-university', visible : this.isShow && this.usertypeId != 21 && this.usertypeId != 2 ? true : false,command: (event) => {this.goToStudents('schools')},
                    items: [
                        // {label: 'Section-wise Strength'},
                        {
                            label: 'Sections and Groups', visible : this.usertypeId != 2 && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'estl' && ReportMenu[1] != 'gis',
                            items: [
                                {label: 'Sections In Private Schools', routerLink: ['/section/aided/schools']},
                                // {label: 'Higher Secondary Groups', routerLink: ['/higher_secondary/groups']},
                                // {label: 'Timetable Reports'},
                                // {label: 'School Profle Verification'},
                                // {label: 'Lession'},
                                //  {label: 'Timetable - Lesson Plan'},
                                // {label: 'Timetable - Term Plan Plan'},
                                // {label: 'Timetable Report'},
                                // {label: 'Teacher Details'},
                                // {label: 'Non-Teacher Details'},
                                // {label: 'Transfer a Teacher'},
                                // {label: 'Transferred list'},

                            ]
                        },
                      
                        {
                            label: 'School Profile',visible:  this.usertypeId != 2 ? true:false,
                            items: [
                                {label: 'School Academic Details', routerLink: ['/State/school-academic-details'],visible :this.usertypeId != 5 && ReportMenu[1] != 'estl' && ReportMenu[1] != 'gis'},
                                // {label: 'School Land Details', routerLink: ['/State/school-land-details']},
                                {label: 'School Wash Details', routerLink: ['/State/school-wash-details'], visible : ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'estl' && ReportMenu[1] != 'gis'},
                                {label: 'Committee Report', routerLink: ['/State/committee-details'], visible : ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'gis'},
                                {label: 'Building Details', routerLink: ['/State/building-details'], visible : ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'estl' && ReportMenu[1] != 'gis'},
                                {
                                        label: ' Edit School Profile', routerLink: ['/school/edit-school-profile1'], visible : (this.usertypeId == 3 ||this.usertypeId == 9) ? true : false
                                    }

                            ]
                        },
                        {
                            label: 'Private Schools', visible :  this.usertypeId != 2 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] !='estl' ,
                            items: [
                                // {label: 'Recognition details'},
                                // {label: 'Reset Renewal', routerLink: ['/State/RenewalResetQueue']},
                                {label: 'Unrecognized Schools', routerLink: ['/State/unrecognized-school-list']},
                                {label: 'RTE Intake Capacity Report', routerLink: ['/State/right-to-education'], visible : this.usertypeId == 5 ? true : false},
                                // {label: 'RTE Intake Capacity', routerLink: ['/rteIntakeCapacity'], visible : this.usertypeId == 9 ? true : false},
                            ]
                        },
                        {label: 'Zonal School Mapping', routerLink: ['/brte/mapping'], visible : this.usertypeId == 3 ? true : false},

                        // {
                        //     label: 'School Edit Profile', routerLink: ['/school/edit-school-profile'], visible : (this.usertypeId == 3||this.usertypeId == 9) ? true : false
                        // }
                       
                     ]
                },
              {
                label: 'Online Services', icon: 'fa fa-internet-explorer', visible : this.usertypeId == 10 ||  this.usertypeId == 6 ? true : false,
                items: [
                  {label: 'BEO Assignment', routerLink: ['/beoassignment'], visible : this.usertypeId == 10 ? true : false, },
                //   {label: 'Renewal Status', routerLink: ['/new/school/renewal/status'], visible : this.usertypeId == 6 ? true : false, },

                ]
              },

                {
                    label: 'Academic Reports', icon: 'fa fa-fw  fa-database', visible :this.usertypeId != 2 && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'rte' && ReportMenu[1] !='estl' && ReportMenu[1] != 'gis' && this.usertypeId != 21 ? true : false ,
                    items: [
                        // {label: 'Teachers', routerLink: ['/State/emis_teacher_details']},
                        // {label: 'Staff Details'},
                        // {label: 'Search Staff Details'},
                        // {label: 'BRTE details' ,command: (event) => {this.goToBrte(); }}
                        // {label: 'BRTE details', routerLink: ['/State/brteDetails']},
                        // {label: 'Teacher Posting Duration'},
                        // {label: 'Students Teachers Ratio'},
                        // {label: 'Non-Teacher Details'},
                        // {label: 'Transfer a Teacher'},
                        // {label: 'Transferred list'},
                        // {label: 'Teacher Timetable Report'},
                        // {label: "Teacher's Children Report"},
                        // {
                        //     label: 'PINDICS Monitoring',
                        //     items: [
                        //         {label: 'Self Evaluation'}
                        //     ]
                        // },
                        {label: 'SLAS 2019 Student-wise',  routerLink: ['/acadamic_slas2019_student-wise',{page: 1}]},
                        // {label: 'SLAS 2019 School-wise',routerLink:['/acadamic_slas2019_school-wise']},
                        {label: 'Indicators Report',  visible :this.usertypeId != 5, routerLink: ['/state/indicatorMarkSheetReport']},
                        {label: 'Indicators Rank sheet', visible :this.usertypeId != 5,  routerLink: ['/state/indicator']},
                        {label: 'ATSL Reports', routerLink: ['/state/atsl-report']},
                        // {label: 'ATSL Reports', routerLink: ['/state/atsl-report-kamala']},

                        // {label: 'Special Reports'},
                        // {label: 'Teachers Biometric Attendance'},
                        // {label: 'DGE reports'},
                        // {label: 'Attendance Reports'},
                        // {label: 'Teacher Strike Report'},
                        // {label: 'Admissions In 2018-19'},
                        // {label: 'Admissions In 2019'},
                        // {label: '14417 Report'},
                    ]
                },
                {
                    label: 'Monitoring Reports', icon: 'fa fa-fw  fa fa-desktop', visible : this.usertypeId == 3 || this.usertypeId == 5 || this.usertypeId == 6 || this.usertypeId == 9 || this.usertypeId == 10 || this.usertypeId == 19? true : false ,
                    items: [
                        // {label: 'Indicators', icon: 'fa fa-fw fa-tag'},
                        // {label: 'Special Reports', icon: 'fa fa-fw fa-tag'},
                        {label: 'UDISE+ Completion Status',
              routerLink: ['/reports/udise-19-20-monitoring-reports'],visible : this.usertypeId !=19},
                    {label: 'UDISE+ Certification Status', routerLink: ['/reports/verificationstatusmonitoring'],visible :   this.usertypeId == 2 || this.usertypeId == 3 || this.usertypeId == 6 || this.usertypeId == 9 || this.usertypeId == 10 ? true : false , },
                    {label: 'UDISE+ Certification Status',  routerLink: ['/state/verificationstatusmonitoring'], visible :  this.usertypeId == 5 ? true : false },
            //   {label: 'Student Enrollment', routerLink: ['/state/pindicsreport']},
                                {label: 'PINDICS Monitoring', routerLink: ['/state/pindicsreport',{page: 2}],visible : this.usertypeId != 19},
                        // ], visible : ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mis' && ReportMenu[1] != 'rte'
                        // },
              {label: 'AEBAS Report', command: (event) => {this.goToExternalUrl('https://aebas.tnschools.gov.in/aebasv1/pages/main_dashboard_cat.php'); }, visible : ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'gis'},
              {label: 'PLA-Attendance Report', routerLink: ['/pla-attendance'],visible :   this.usertypeId == 3 || this.usertypeId == 6 || this.usertypeId == 9 || this.usertypeId == 10  ? true : false , },
              {label: 'SMC Resolution Report', routerLink: ['/reports/smcupload'],visible :   this.usertypeId == 5 || this.usertypeId == 3 || this.usertypeId == 14 ? true : false },
              {label: 'Covid Watch Report', routerLink: ['/state/covidwatchreport'],visible :   this.usertypeId == 5 || this.usertypeId == 9 || this.usertypeId == 3? true : false },
              {label: 'Health and IT  Report', routerLink: ['/health-it-report'], visible : this.usertypeId == 3 || this.usertypeId == 5 || this.usertypeId == 2 || this.usertypeId == 9 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] !='estl' && ReportMenu[1] !='gis' ? true : false},
              {label: 'Covid Watch Question Response', routerLink: ['/state/covidwatchquestionresposne'],visible :   this.usertypeId == 5 || this.usertypeId == 9 || this.usertypeId == 3? true : false },
            //   {
            //     label: 'PLA Reports',visible : this.usertypeId == 3 || this.usertypeId == 5 || this.usertypeId == 6 || this.usertypeId == 10 || this.usertypeId == 9 ? true : false,
            //     items: [
            //       {label: 'PLA-Inspection', routerLink: ['/pla-inspection']},
            //       {label: 'PLA-Attendance Learners', routerLink: ['/pla-attendance-learners']},
            //       {label: 'PLA-Attendance completed', routerLink: ['/pla-attendance-completed']},
            //     ]
            //   },
              //   {label: 'Covid Watch Detail Report', routerLink: ['/state/covidwatchdetilreport'],visible :   this.usertypeId == 5 || this.usertypeId == 9 || this.usertypeId == 3? true : false },

                        //  {label: 'Attendance Reports', routerLink: ['/attendance-report'], visible : this.usertypeId == 5 ? true : false},



                        // {label: 'Master Timtable Report', routerLink: ['/mastertimetable-report1']},
                        // {label: 'Teacher Strike Report'},

                    //     {label: 'Indicators',
                    //     items: [
                    //         {label: 'Reports'},
                    //         {label: 'Rank Sheet'},
                    //     ]
                    // },

                    ]
                },
                {
              label: 'UDISE+ Reports', icon: 'flaticon-buildings' ,visible : this.usertypeId == 3 || this.usertypeId == 5 || this.usertypeId == 6 || this.usertypeId == 9 || this.usertypeId == 1 || this.usertypeId == 10 || this.usertypeId == 19 || this.usertypeId == 2? true : false ,
          items: [
            {label: 'Declaration form', routerLink: ['/school/profile/verification/reports'], visible : this.usertypeId == 9 || this.usertypeId == 3 || this.usertypeId == 6 || this.usertypeId == 10 || this.usertypeId == 1 ? true : false},
            {label: 'Validation Summary', routerLink: ['/validation/summary/reports'], visible : this.usertypeId == 5 || this.usertypeId == 6 || this.usertypeId == 9 ||this.usertypeId == 10 || this.usertypeId == 3 ? true : false},
            {label: 'School Master (Live)', routerLink: ['/reports/school-master'], visible : this.usertypeId == 3 || this.usertypeId == 2 || this.usertypeId == 9 ? true : false}, 

            {
                label: 'DCF Reports',visible : this.usertypeId != 2 ? true:false,
              items: [
                // {label: 'Facilities Provided', routerLink: ['/reports/facilities-provided-children'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
                // {label: 'Annual Exam result(V,VIII)', routerLink: ['/reports/annual-exm-result-grade'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
                // {label: 'Teaching Staff', routerLink: ['/reports/teaching-staff'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
                // {label: 'Non Teaching Staff', routerLink: ['/reports/non-teaching-staff'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
                // {label: 'Enrolment - By Social Category ', routerLink: ['/reports/enrollment-socialcategory'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
                // {label: 'Enrolment and repeaters - Minority)', routerLink: ['/reports/academic_school_minority'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
              // {label: 'Receipts and Expenditure', routerLink: ['/reports/receipts-and-expend']},
              {
                label: 'Student Enrolment',
                items: [
                    {label: 'By Age', routerLink: ['/reports/enrolment-academic-session-age']},
                    {label: 'By Social Category', routerLink: ['/reports/enrollment-socialcategory'],},
                    {label: 'By Medium of Instruction', routerLink: ['/reports/enrolment-medium-instruction'],},
                    {label: 'CWSN Enrolment', routerLink: ['/reports/children-special-needs'],},

                ],
             },
             {
                label: 'Board Exam Results',
                items: [
                    {label: 'Regular (X)', routerLink: ['/lreports/board-exam-resut'],},
                    {label: ' Regular (XII)', routerLink: ['/reports/results-of-grade-regular'],},
                    {label: ' Non Regular (XII)', routerLink: ['/reports/results-of-grade-non-regular'], },
                    {label: 'Regular - Marks (XII)', routerLink: ['/reports/results-of-grade-regular-marks'], },
                    {label: ' Non Regular - Marks (XII)', routerLink: ['/reports/results-of-grade-non-regular-marks'],},
                    {label: 'Repeaters (All) ', routerLink: ['/reports/repeaters-all'],},
                    {label: 'Repeaters (By Grade)', routerLink: ['/reports/repeaters-grade'],},

                ],
             },
             {
                label: 'Staff',
                items: [
                    {label: 'Teaching Staff', routerLink: ['/reports/teaching-staff'],},
                    {label: 'Non Teaching Staff', routerLink: ['/reports/non-teaching-staff'],},
                                    ],
             },
             {
                label: 'Vocational (NSQF)',
                items: [
                    {label: 'Sectors & Courses', routerLink: ['/reports/NSQfvoNScational'],},
                    {label: ' Enrolment by Social Category', routerLink: ['/reports/vocational-education']},
                    {label: 'Enrolment by Trade', routerLink: ['/reports/enrolment-current-academic-session']},
                    {label: 'Lab Facility', routerLink: ['/reports/vocational-lab']},
                    {label: 'Classes Conducted', routerLink: ['/reports/classes-conducted']},
                    {label: ' VTP Details', routerLink: ['/reports/skill-training-providers']},
                ],
             },
             {
                label: 'Other',
                items: [
                    {label: 'Facilities Provided', routerLink: ['/reports/facilities-provided-children']},
                ],
             },
            ],
            },
             {
                label: ' Data Validation Reports',visible : this.usertypeId == 3 || this.usertypeId == 5 || this.usertypeId == 9 || this.usertypeId == 2? true : false,
                items: [
                    {label: 'Number of Schools', routerLink: ['/school-summary']},
                    {label: 'Statistical Report',
                      items: [
                        {label: 'By School Type', routerLink: ['/statistical-report']},
                        {label: 'By Management',  routerLink: ['/management-statistical-report'] },
                      ]
                    },
                    {
                        label: 'Number of Teachers ',
                        items: [
                            {label: 'By Class taught', routerLink: ['/reports/teacher-class-taught']},
                            {label: ' By Academic Qualification',  routerLink: ['/teacherAcadamicQualification'],visible : this.usertypeId !=2 ? true : false },
                            {label: ' By Professional Qualification',  routerLink: ['/teacherProfQualificationComponent'],visible : this.usertypeId !=2 ? true : false },
                        ],
                     },
                     {label: 'School Access Report',  routerLink: ['/State/nearest-govt-school'],visible :this.usertypeId ==2 || this.usertypeId == 3 || this.usertypeId == 9 || (this.usertypeId == 14 && this.teacherType == 103) ? true : false},
                     {label: 'Schools without Data', routerLink: ['/reports/schoolwithoutdata']},

                    ], },
            // {
            //     label: 'Verification Reports',
            //   items: [
            //     {label: 'School Count Verification', routerLink: ['/school-summary'],},
            //     {label: 'Statistical Report', routerLink: ['/statistical-report']},
            //     {label: ' Teachers by Class Taught', routerLink: ['/reports/teacher-class-taught']}]},
          ]
                },
              {
                label: 'Schemes', icon: 'fa fa-fw fa-bars', visible : this.usertypeId != 5 && this.usertypeId != 2 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] !='civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'estl' && ReportMenu[1] !='gis' && this.usertypeId != 21 ? true : false ,
                items: [
                  {label: 'Laptop Distribution', routerLink: ['/state/laptop-distribution']},
                  {label: 'Bicycle Distribution', routerLink: ['/costfree-bicycle'],visible :   this.usertypeId == 3 || this.usertypeId == 6 || this.usertypeId == 9 ? true : false,},
                  {label: 'Special Cash Incentive Report', routerLink: ['/reports/specialcase'],visible : this.usertypeId == 3 || this.usertypeId == 5 || this.usertypeId == 9 ? true : false,},

                ]
              },
                {
                    label: 'Other Links & Reports', icon: 'fa fa-fw  fa fa-info', visible : this.usertypeId != 2 && this.usertypeId != 21 ? true : false ,
                    items: [
                        {label: 'TNGIS', visible : ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] !='civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'estl', 
                            items: [
                                {label: 'TNGIS Login' , command: (event) => {this.goToExternalUrl('https://tngis.tn.gov.in/'); }},
                                {label: 'Help Videos', routerLink: ['/gisvideos']},
                                {label: 'User Guide', command: (event) => {this.goToExternalUrl('https://drive.google.com/file/d/1jyXbAfHJYZmd5Qklug2B67bMZ5FKDd4j/view?usp=sharing'); }},
                            ]
                        },
                        {label: 'Add Bank Branch',  routerLink: ['/add/branch/details'], visible : this.usertypeId == 3 ? true : false },
                        {label: '14417 Reports', command: (event) => {this.goToExternalUrl('http://125.21.192.32/dashboard/'); }, visible : ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'estl' && ReportMenu[1] != 'gis' },
                        {label: 'TNTP User Report', visible : ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'estl' && ReportMenu[1] != 'gis'},
                        {label: 'School Support',  routerLink: ['/SchoolInformation'], visible : this.usertypeId == 3 ? true : false },
            ]
        },
        {label: 'Bicycle Distribution', icon: 'fa fa-fw fa-bicycle', routerLink: ['/costfree-bicycle'], visible : this.usertypeId == 2   ? true : false},

        {
                    label:'Search',icon:'fa fa-fw fa-search',
                    visible : this.usertypeId != 21,
                    items: [
                        {label: 'Student', routerLink: ['/studentsearch']},
                        {label: 'Staff', routerLink: ['/staffsearch']},
                        {label: 'School', routerLink: ['/schoolsearch'],visible : this.usertypeId !=2 ? true:false}
                    ]
                },


            //   {
            //     label: 'TimeSheet', icon: 'fa fa-fw fa-bars', visible : this.usertypeId == 21 ? true : false , routerLink: ['/dailyupdates']
            //   },
        
        //{label: 'Downloads', icon: 'fa fa-fw fa-download', routerLink: ['/download'], visible : this.usertypeId == 19 || this.usertypeId == 5 && this.emisUserType1 == 1 ? true : this.usertypeId == 3 ? true : this.usertypeId == 9 ? true : false},
         // {label: 'Student Downloads', icon: 'fa fa-fw fa-download',
            //          items: [
            //              {label : 'RTE Student Lists', routerLink :['/student/RTE-Reimbursement'],visible : this.usertypeId == 3 || this.usertypeId == 5 || this.usertypeId == 9 ? true : false,}
            //          ] 
            //     },
            // {label: 'EBID', icon: 'fa fa-video-camera', routerLink: ['/ebid'], visible : this.usertypeId == 5 ? true :false},
        //{
        //     label:'Management Applications', icon: 'flaticon-refresh', visible : this.usertypeId == 9 || (this.usertypeId == 19 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'estl' && ReportMenu[1] != 'gis' ) ?  true : false ,
        //     items: [
            
        // {label: 'EBID', icon: 'fa fa-video-camera', routerLink: ['/ebid'], visible : this.usertypeId == 5 ? true :false},
        {label: 'Downloads', icon: 'fa fa-fw fa-download', routerLink: ['/download'], visible : this.usertypeId == 2 || this.usertypeId == 19 || this.usertypeId == 5 && this.emisUserType1 == 1 ? true : this.usertypeId == 3 ? true : this.usertypeId == 9 ? true : false},
        // {
        //     label:'Management Applications', icon: 'flaticon-refresh', visible : this.usertypeId == 9 ||  this.usertypeId == 5 || (this.usertypeId == 19 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'estl' && ReportMenu[1] != 'gis')?  true : false ,
        //    items: [
               
        //         {label: 'NOC for CBSE Affiliation', routerLink: ['/schoolApplyPendingList'], visible : this.usertypeId == 9 ||  this.usertypeId == 5 ?  true : false },
        //         //  {label: 'Download cbsc form data', command: (event) => {this.goToExternalPrint('/cbscprintpdf'); } },

        //    ]
        // },

            ]
        

            // ends


        
        } else if(this.usertypeId == 14 || this.usertypeId == 8){
                this.model = [
                    {label: 'My Profile', icon: 'fa fa-fw  fa-user', routerLink: ['/teachers-dashboard']},
                    {label: 'Homework Details',icon: 'flaticon2-open-text-book', routerLink:['/state/homework']},
                    {label: 'CWSN Details', icon: 'flaticon-buildings', routerLink: ['/cwsn/details'],visible : this.teacherType == 103? true : false},
                    {label: 'Karpom Eluduvom',icon: 'flaticon2-open-text-book', routerLink:['/karpom-eluduvom/1/0']},
                    {label: 'UDISE+ Certification', icon: 'fa fa-fw  fa-id-card-o', routerLink: ['/school/profile/verification/reports'],visible : this.teacherType == 103 ? true : false} ,
                    // {label: 'Edit School Profile', icon: 'fa fa-fw  fa-pencil-square-o', routerLink: ['/school/edit-school-profile'],visible : this.teacherType == 103 ? true : false},
                    // {label: 'Report',icon: 'fa fa-info'},
                    {label: 'Trainings Attended',icon: 'fa fa-fw fa-bars', routerLink: ['/reports/staff-training-details'] },
                    {label: 'Mapping Skill Feedback',icon: 'far fa-comment-alt', routerLink: ['/mappingskill'] },
                    {label: 'TN DIKSHA',icon: 'fa fa-fw fa-bars', command: (event) => {this.goToDisksh(); }  },
                    {label: 'Monitoring Report',icon: 'fa fa-info',  visible : this.teacherType == 103,
                    items: [
                        {label: 'PLA-Attendance Report', routerLink: ['/pla-attendance']},
                        {label: 'School Access Report',routerLink: ['/State/nearest-govt-school'],visible : this.teacherType == 103 ? true : false },
                        {label: 'SMC Resolution Report', routerLink: ['/reports/smcupload']}
                    ]},
                    {label: 'Create Questions',icon: 'fa fa-book',  visible : this.usertypeId == 14,
                    items: [
                        {label: 'Create Questions', routerLink: ['/create-question']},
                        {label: 'Create Questions Set',routerLink: ['/create-questionset'] },
                      
                    ]}
                    // {label: 'Call Tracking', icon: 'fa fa-phone', routerLink: ['/Teacher/Calltracking'], visible : this.usertypeId ==14 ? true : false},
                ];
        }
       else if(this.usertypeId == 21){
        this.model = [
            {label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/elearn/content/reports']},

            {
                label: 'Upload Contents', icon: 'flaticon2-user-1', routerLink: ['/upload/content'],
            },

            {
            label: 'Question Bank', icon: 'fa fa-fw fa-bars', routerLink: ['/question-set']
            },
            {
                label: 'Quick Fix', icon: 'fa fa-fw fa-bars', routerLink: ['/SchoolInformation']
                },
                 {
                    label:'Search',icon:'fa fa-fw fa-search',
                    items: [
                        {label: 'Student', routerLink: ['/studentsearch']},
                        {label: 'Staff', routerLink: ['/staffsearch']},
                        {label: 'School', routerLink: ['/schoolsearch'],visible : this.usertypeId !=2 ? true:false}
                    ]
                },
      ];
       }
       else if(this.usertypeId == 22){ 
        this.model = [
            {label: 'Dashboard', icon: 'flaticon-dashboard', routerLink: ['/dashboard'],visible : this.usertypeId != 20 || this.usertypeId != 21 ? true : false},
            {
                label: 'Staff Details', icon: 'flaticon2-user-1',
            items: [
                {label: 'Staff List', routerLink: ['/staff'] },
        ]
    }]
       }
        else {
            this.model = [
                {label: 'Dashboard', icon: 'flaticon-dashboard', routerLink: ['/dashboard'],visible : this.usertypeId != 20 || this.usertypeId != 21 ? true : false,},
                {label: 'Dashboard', icon: 'flaticon-dashboard', routerLink: ['/admin'],visible : this.usertypeId == 20 ? true : false,},


                {
                    label: 'Projects', icon: 'flaticon2-user-1' ,visible : this.usertypeId == 20 ? true : false,
                    items: [
                        {label: 'Project Creation', routerLink: ['/projectcreation']},
                        {label: 'All Project Summery', routerLink: ['/project/reports']},
                        {label: 'Activity Wise Reports', routerLink: ['/admin']},
                        {label: 'Date Wise Reports', routerLink: ['/admin']},
                    ]
                },

                {
                    label: 'Master', icon: 'flaticon2-user-1' ,visible : this.usertypeId == 20 ? true : false,
                    items: [
                        {label: 'Add Bank Branch', routerLink: ['/add/branch/details']},
                    ]
                },

                {label: 'Upload Contents', icon: 'flaticon2-user-1', routerLink: ['/upload/content'],visible : this.usertypeId == 21 ? true : false,},
                {
                    label: 'E-Learing Reports', icon: 'flaticon2-user-1', routerLink: ['/elearn/content/reports'],visible : this.usertypeId == 20 ? true : false,
                },
                {
                    label: 'Students', icon: 'flaticon2-user-1' ,visible : this.usertypeId != 20 ? true : false,
                    items: [
                    //     {label: 'Board Exam Coordination',
                    //     items: [
                    //      {label: 'Exam Center Updates', routerLink: ['/board/exam.co-ordinator']},
                    //     //  {label: 'Teacher Assignment', routerLink: ['/teacher/asigned/reports'],visible : this.usertypeId == 5 ||  this.usertypeId == 9 || this.usertypeId == 3  ? true : false},
                    //   ]},
                        {label: 'Students Admission', routerLink: ['/admission']},
                        {label: 'Students Tagging', routerLink: ['/tagging']},
                        {label: 'Students List', routerLink: ['/studentlist']},
                        {label: 'Students Promote', routerLink: ['/school/student_promotion']},
                        {label: 'Students TC Details', routerLink: ['/tcdetails/1/0']},
                        // {label: 'Class 7 SLAS 2019', routerLink: ['/class7_report']},
                        {label: 'Academic Records', routerLink: ['/academicrecords']},
                        {label: 'Special Cash Incentive', routerLink: ['/cashincentive']},
                        {label: 'Student Summary', routerLink: ['/school/student-summary']},
                        {label: 'ATSL Report', routerLink: ['/state/atsl-report'],visible : (this.usertypeId == 1 && (this.cateType == 'Higher Secondary School' || this.cateType == 'High School')) ? true : false},
                        {label: 'RTE Applicants', routerLink: ['/students/rteapplicants'],visible : (this.schooltypeId == 3 ) ? true : false},
                        {label: 'Health Profile', routerLink: ['/health-profile'],visible : (this.usertypeId == 1 ) ? true : false},
                        {label: 'IT Profile', routerLink: ['/itprofile'],visible : (this.usertypeId == 1 ) ? true : false},
                        {label: 'Competition Participation', routerLink: ['/competition'],visible : (this.schooltypeId == 1 && (this.catty_id ==2 || this.catty_id ==3 ||this.catty_id == 4 || this.catty_id ==5 ))? true : false},
                        {label: 'Competition Reports', routerLink: ['/competition-report'],visible : (this.schooltypeId == 1 && ( this.catty_id ==2 || this.catty_id ==3 ||this.catty_id == 4 || this.catty_id ==5 )) ? true : false},
                        {label: 'ILLA Result', routerLink: ['/teachersassessmentreport'],visible : (this.schooltypeId == 1 && (this.catty_id == 4 || this.catty_id ==5 ))? true : false},
                        
                    ]
                },
                {
                    label: 'Timetable', icon: 'flaticon2-open-text-book' ,visible : this.usertypeId != 20 ? true : false,
                    items: [
                        {label: 'Master Timetable', routerLink: ['/mastertimetable']},
                        {label: 'Weekly Timetable', routerLink: ['/weeklytimetable']},
                        {label: 'Today Timetable', routerLink: ['/todaytimetable']},
                    ]
                },
                {
                    label: 'Schemes', icon: 'flaticon2-open-text-book' ,visible : this.usertypeId != 20 ? true : false,
                    items: [
                        {label: 'Noon Meals', routerLink: ['/noonmeal']},
                        {label: 'Uniform', routerLink: ['/uniform']},
                        {label: 'Laptop', routerLink: ['/laptop']},
                        {label: 'Textbook For Primary', routerLink: ['/textbook'], visible : (this.usertypeId == 1 && (this.schooltypeId == 1 || this.schooltypeId == 2 || this.schooltypeId == 4)) ? true : false},
                        {label: 'Textbook Secondary', routerLink: ['/textbook_sec'],visible : (this.usertypeId == 1 && (this.schooltypeId == 1 || this.schooltypeId == 2 || this.schooltypeId == 4)) ? true : false},
                        {label: 'Bicycle Issue', routerLink: ['/bicycle'],visible : (this.schooltypeId == 1 || this.schooltypeId == 2 || this.schooltypeId == 4 || this.schooltypeId == 5)? true : false},
                        {
                            label:'KGBV & CWSN',
                            items: [
                               
                                {label: 'Students Maping', routerLink: ['/schools/mapping'] },
                                {label: 'Benefit Tracking', routerLink: ['/schools/tracking'] },
                            ]
                        },
                    ]
                },
                {
                    label: 'Staff Details', icon: 'flaticon2-user-1' ,visible : this.usertypeId != 20 ? true : false,
                    items: [
                        {label: 'Staff List', routerLink: ['/staff'] },
                        // {label: 'Staff Login Details', routerLink: ['/staff-logindetail'] },
                        {label: 'IFHRMS', command: (event) => {this.goToExternalUrl('https://forms.gle/fsbQ7B4breXiHsW9A'); } , visible : this.schooltypeId == 1 ? true : this.schooltypeId == 2 ? true : this.schooltypeId == 4 ? true : false},
                        {label: 'In-Service Training Details', routerLink: ['/stafftraininglist'], visible : this.schooltypeId == 1 || this.schooltypeId == 4 ? true : this.schooltypeId == 2 ? true : false },
                        {label: 'NSQF Vocational Instructors', routerLink: ['/nsqfstaffreg'], visible : this.schooltypeId == 1 ? true : false },
                        {label: 'PINDICS HM Evaluation', routerLink: ['/pindics-hmevaluation']},
                        {label: 'PT Staff Salary Distribution',  routerLink: ['/parttimeteacher'], visible : this.schooltypeId == 1 || this.schooltypeId == 2 || this.schooltypeId == 4 ? true : false }
                    ]
                },

                {
                    label: 'UDISE +', icon: 'flaticon-buildings' ,visible : this.usertypeId != 20 ? true : false,
                    items: [
                        // {label: 'Download DCF', command: (event) => {this.goToDownloadDcf('http://shorturl.at/mpsyH'); }},
                     {label: 'Download School Data', command: (event) => {this.goToExternalPrint('/udisereportprintpdf'); } },
                    //    {label: 'Download School Data',  routerLink: [window.open('/udisereports')]},

                        // {label: 'Basic Information', routerLink: ['/basic_school_form']},
                        // {label: 'School Details', routerLink: ['/school_details']},
                        {label: 'Training Details', routerLink: ['/training-details']},
                        // {label: 'Committee Details', routerLink: ['/schoolcommittee']},
                        // {label: 'Land Details', routerLink: ['/school-land']},
                        // {label: 'School Inventory', routerLink: ['/school-inventory']},
                        // {label: 'Funds', routerLink: ['/funds']},
                     ]
                },
                {
                    label: 'UDISE+ Reports', icon: 'flaticon-buildings' ,visible : this.usertypeId == 3 || this.usertypeId == 5 || this.usertypeId == 6 || this.usertypeId == 9 || this.usertypeId == 1 || this.usertypeId == 10 ? true : false ,
                items: [
                  {label: 'Data Corrections', routerLink: ['/data/correction'],visible : this.usertypeId == 1 ? true : false},
                  {label: 'Declaration form', routerLink: ['/school/profile/verification/reports'], visible : this.usertypeId == 9 || this.usertypeId == 3 || this.usertypeId == 6 || this.usertypeId == 10 || this.usertypeId == 1 ? true : false},
                  {
                      label: 'DCF Reports',
                    items: [
                      // {label: 'Facilities Provided', routerLink: ['/reports/facilities-provided-children'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
                      // {label: 'Annual Exam result(V,VIII)', routerLink: ['/reports/annual-exm-result-grade'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
                      // {label: 'Teaching Staff', routerLink: ['/reports/teaching-staff'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
                      // {label: 'Non Teaching Staff', routerLink: ['/reports/non-teaching-staff'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
                      // {label: 'Enrolment - By Social Category ', routerLink: ['/reports/enrollment-socialcategory'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
                      // {label: 'Enrolment and repeaters - Minority)', routerLink: ['/reports/academic_school_minority'], visible : this.usertypeId == 6 || this.usertypeId == 10 ? false : true},
                    // {label: 'Receipts and Expenditure', routerLink: ['/reports/receipts-and-expend']},
                    {
                      label: 'Student Enrolment',
                      items: [
                          {label: 'By Age', routerLink: ['/reports/enrolment-academic-session-age']},
                          {label: 'By Social Category', routerLink: ['/reports/enrollment-socialcategory'],},
                          {label: 'By Medium of Instruction', routerLink: ['/reports/enrolment-medium-instruction'],},
                          {label: 'CWSN Enrolment', routerLink: ['/reports/children-special-needs'],},

                      ],
                   },

                   {
                      label: 'Board Exam Results',
                      items: [
                          {label: 'Regular (X)', routerLink: ['/lreports/board-exam-resut'],},
                          {label: ' Regular (XII)', routerLink: ['/reports/results-of-grade-regular'],},
                          {label: ' Non Regular (XII)', routerLink: ['/reports/results-of-grade-non-regular'],},
                          {label: 'Regular - Marks (XII)', routerLink: ['/reports/results-of-grade-regular-marks'],},
                          {label: ' Non Regular - Marks (XII)', routerLink: ['/reports/results-of-grade-non-regular-marks'],},
                          {label: 'Repeaters (All) ', routerLink: ['/reports/repeaters-all'], },
                          {label: 'Repeaters (By Grade)', routerLink: ['/reports/repeaters-grade'],},

                      ],
                   },
                   {
                      label: 'Staff',
                      items: [
                          {label: 'Teaching Staff', routerLink: ['/reports/teaching-staff'],},
                          {label: 'Non Teaching Staff', routerLink: ['/reports/non-teaching-staff'],},
                                          ],
                   },
                   {
                      label: 'Vocational (NSQF)',
                      items: [
                          {label: 'Sectors & Courses', routerLink: ['/reports/NSQfvoNScational'], visible : this.schooltypeId == 1 || this.schooltypeId == 2 || this.schooltypeId == 4 ? true : false, },
                          {label: ' Enrolment by Social Category', routerLink: ['/reports/vocational-education']},
                          {label: 'Enrolment by Trade', routerLink: ['/reports/enrolment-current-academic-session']},
                          {label: 'Lab Facility', routerLink: ['/reports/vocational-lab']},
                          {label: 'Classes Conducted', routerLink: ['/reports/classes-conducted']},
                          {label: ' VTP Details', routerLink: ['/reports/skill-training-providers']},


                      ],
                   },
                   {
                      label: 'Other',
                      items: [
                          {label: 'Facilities Provided', routerLink: ['/reports/facilities-provided-children']},
                      ],
                   },
                  ],
                  },
                   {
                      label: ' Data Validation Reports',visible : this.usertypeId == 3 || this.usertypeId == 5 || this.usertypeId == 9 ? true : false,
                      items: [
                          {label: 'Number of Schools', routerLink: ['/school-summary']},
                          {label: 'Statistical Report', routerLink: ['/statistical-report']},

                          {
                              label: 'Number of Teachers ',
                              items: [
                                  {label: ' Teachers by Class Taught', routerLink: ['/reports/teacher-class-taught']},
                                  {label: 'Teacher Academic Qualification report',  routerLink: ['/teacherAcadamicQualification'], },
                                  {label: 'Teacher Professional Qualification report',  routerLink: ['/teacherProfQualificationComponent'], },
                                  {label: 'Nearest Government School',  routerLink: ['/State/nearest-govt-school'],},
                                ],                            },
                      ], },
                //   {
                //       label: 'Verification Reports',
                //     items: [
                //       {label: 'School Count Verification', routerLink: ['/school-summary'], visible : this.usertypeId != 1 || this.usertypeId == 6 ? true : false},
                //       {label: ' Teachers by Class Taught', routerLink: ['/reports/teacher-class-taught']}]},
                ]
                      },
                // {
                //     label: 'Vocational Reports', icon: 'flaticon-buildings',
                //     items: [
                //     //   {label: ' Class X with one vocational ', routerLink: ['/reports/vocationalsubjectX']},
                //     //   {label: ' Class XII with one vocational ', routerLink: ['/reports/vocationalsubjectXII']},



                //     ]
                //   },
                {
                    label: 'Schools', icon: 'flaticon-buildings' ,visible : this.usertypeId != 20 ? true : false,
                    items: [
                        {label: 'Class and Section', routerLink: ['/classsection']},
                        // {label: 'School Profile', routerLink: ['/school_profile']},
                        {label: 'Schools Needs CSR', routerLink: ['/school_need_csr']},
                        {label : 'Students-PendingRequest',routerLink : ['/Students/pendingrequest',{page: 1}]},
                         {label : 'Students-RaiseRequest',routerLink : ['/Students/raiserequest',{page: 2}]},
                         {
                            label: 'KGBV & ARS',visible:  this.usertypeId != 2 ? true:false,
                            items: [
                                {label: 'School Maintenance', routerLink: ['/schoolmaintainance-home'],},
                                {label: 'EB Bill / Water Charges', routerLink: ['/school-Ebbill'],},
                                {label: 'Student Stipend', routerLink: ['/student-banking-detail'],},
                            ]
                        },
                        {label : 'Annual Grants',visible : (this.schooltypeId == 1 || this.schooltypeId == 2 || this.schooltypeId == 4) ? true : false,routerLink : ['/school-grants']},
                        {label : 'School Bank Details',visible : (this.schooltypeId == 3 ) ? true : false,routerLink : ['/schoolbankdetails']}
                     ]
                },
                {label: 'Registers', icon: 'flaticon2-group', routerLink: ['/registers'],visible : this.usertypeId != 20 ? true : false,},
                {
                    label:'Search', icon: 'fa fa-fw fa-search',
                    items: [
                       
                        {label: 'Staff', routerLink: ['/staffsearch'] },
                    ]
                },
                {
                    label:'Management Applications', icon: 'flaticon-refresh', visible : this.schooltypeId == 2 ? true : this.schooltypeId == 3 ? true : this.schooltypeId == 4 ? true : this.usertypeId == 19 && ReportMenu[1] != 'quality' && ReportMenu[1] != 'ied' && ReportMenu[1] != 'osc' && ReportMenu[1] != 'civil' && ReportMenu[1] != 'cal' && ReportMenu[1] != 'mdo' && ReportMenu[1] != 'rte' && ReportMenu[1] != 'estl' && ReportMenu[1] != 'gis' ?  true : false ,
                    items: [
                       
                        {label: 'Renewal', routerLink: ['/renewal'], visible : this.schooltypeId == 2 ? true : this.schooltypeId == 3 ? true : this.schooltypeId == 4 ? true : false },
                        // {label: 'NOC for CBSE Affiliation', routerLink: ['/ceolandingpage'], visible : this.schooltypeId == 2 ? true : this.schooltypeId == 3 ? true : this.schooltypeId == 4 ? true : false },
                    ]
                },
            ];
        }


    }
    changeTheme(theme: string) {
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as  HTMLLinkElement;

        if (this.version === 'v3') {
            themeLink.href =  'assets/theme/theme-' + theme + '.css';
        } else {
            themeLink.href =  'assets/theme/theme-' + theme + '-v4' + '.css';
        }

        this.theme = theme;

    }

    changeLayout(layout: string, special?: boolean) {
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as  HTMLLinkElement;

        if (this.version === 'v3') {
            layoutLink.href = 'assets/layout/css/layout-' + layout + '.css';
        } else {
            layoutLink.href = 'assets/layout/css/layout-' + layout + '-v4' + '.css';
        }

        this.layout = layout;

        if (special) {
            this.app.darkMenu = true;
        }
    }

    changeVersion(version: string) {
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as  HTMLLinkElement;
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as  HTMLLinkElement;

        if (version === 'v3') {
            this.version = 'v3';
            themeLink.href =  'assets/theme/theme-' + this.theme + '.css';
            layoutLink.href = 'assets/layout/css/layout-' + this.layout + '.css';
        } else {
            themeLink.href =  'assets/theme/theme-' + this.theme + '-v4' + '.css';
            layoutLink.href = 'assets/layout/css/layout-' + this.layout + '-v4' + '.css';
            this.version = '-v4';
        }

    }
    goToIFHRMS(url) {
        window.open(url, '_blank');
    }

    goToDownloadDcf(url) {
       window.open(url, '_blank');
    }
    goToExternalUrl(url) {
        // this.document.location.href = url;
        window.open(url, '_blank');
    }
    goToExternalUrlAebas(url) {
        // this.document.location.href = url;
        window.open(url, '_blank');
    }
    goToExternalPrint(url) {
        debugger;
        window.open(url, '_blank');
    }
    goToStudents(url) {
        debugger;
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/commondashboard/'+url]);
        });
    }
    goToDisksh() {
        this.dashboardService.getDikshaToken().subscribe((res) => { 
           this.rsaToken = res.records.rsatoken;
            this.document.location.href = this.dikshaUrl+'/v2/user/session/create?token='+this.rsaToken;
        //   debugger;
        //   console.log(this.totalSchools);
          console.log(res);
          debugger;
        });
      }
}

@Component({
  /* tslint:disable:component-selector */
    selector: '[app-submenu]',
  /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)"
                   class="ripplelink" *ngIf="!child.routerLink"
                    [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down menuitem-toggle-icon" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>

                <a (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down menuitem-toggle-icon" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{child.label}}</div>
                </div>
                <div class="submenu-arrow" *ngIf="child.items"></div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset" [parentActive]="isActive(i)"
                    [@children]="(app.isSlim()||app.isHorizontal())&&root ? isActive(i) ?
                     'visible' : 'hidden' : isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                display: 'block'
            })),
            state('hidden', style({
                display: 'none'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _reset: boolean;

    _parentActive: boolean;

    activeIndex: number;

    constructor(public app: FullLayoutComponent,
                private router: Router) {}

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }

        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({originalEvent: event, item});
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.app.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isHorizontal() || this.app.isSlim()) {
                this.app.resetMenu = true; } else {
                this.app.resetMenu = false; }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (this.root && this.app.menuHoverActive && (this.app.isHorizontal() || this.app.isSlim())
            && !this.app.isMobile() && !this.app.isTablet()) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && (this.app.isHorizontal() || this.app.isSlim())) {
            this.activeIndex = null;
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
