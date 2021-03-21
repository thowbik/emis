import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// declare let L;
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {NavigationService} from 'src/services/navigation.service';
import * as Chart from 'chart.js';
// import {Chart} from 'chart.js'
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { StateDashboardService } from '../dashboard.services';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import * as d3Sankey from 'd3-sankey';
@Component({  
  selector: 'app-commondashboard',
  templateUrl: './commondashboard.component.html',
  styleUrls: ['./commondashboard.component.css']
})
export class CommondashboardComponent implements OnInit {
  userTypeId: any;
  routeParams: any;
  userType: string;
  isStudents: boolean;
  isStaffs: boolean;
  isSchools: boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
    private navigationService: NavigationService,
    private userSessionService: UserSessionService,
    private dashboardService: StateDashboardService,
    private route: ActivatedRoute
    ) {
      this.routeParams = route.snapshot.params;
      this.userType = this.routeParams.user;
    debugger;
      this.router = router;
      this.userTypeId = this.userSessionService.userTypeId();
  }

  ngOnInit() {
    Chart.plugins.unregister(ChartDataLabels);
    this.userTypeBasedData();
  }
  userTypeBasedData()
  {
    switch(this.userType){
      case 'students':
        /* if the user is students call the related api here */ 
        this.isStudents = true;
        this.isStaffs =false;
        this.isSchools = false;
this.generateStudentChart();
        break;
      case 'staffs':
          /* if the user is schools call the related api here */ 
          this.isStudents = false;
          this.isStaffs =true;
          this.isSchools = false;
        break;
        case 'schools':
            /* if the user is staffs call the related api here */ 
            this.isStudents = false;
            this.isStaffs =false;
            this.isSchools = true;
          break;
      default:
        break;
    }
  }
  generateStudentChart() {
 // Start of the First Chart Students-------------------------------
 const ctx3 = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart3 = new Chart(ctx3, {
     plugins: [ChartDataLabels],
      type: 'bar',
      data: {
      labels: ['PreKG', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', ],
      datasets: [{
           // tslint:disable-next-line: max-line-length
           data: [27230,	600823,	632365,	1008990,	1036322,	1078212,	1043965,	1042189,	1041825,	1057197,	1037718,	1029043,	996386,	860218,	819308],
          // tslint:disable-next-line: max-line-length
          backgroundColor: ['#003f5c', '#003f5c', '#003f5c', '#003f5c', '#003f5c', '#003f5c', '#003f5c', '#003f5c', '#003f5c', '#003f5c', '#003f5c', '#003f5c', '#003f5c', '#003f5c', '#003f5c'],
          borderWidth: 1
      }]
      },
        options: {
        title: {
        display: true,
        text: 'Class wise Strength',

        fontSize: 14
        },
        legend: {
        display: false,
        position: 'right',
        labels: {
          boxWidth: 10
        }
        },
        layout: {
        padding: {
            left: 25,
            right: 25,
            top: 0,
            bottom: 0
        },
        },
        responsive: false,
        scales: {
            // yAxes: [{
            //     ticks: {
            //         beginAtZero: true
            //     }
            // }]
        },
        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
              color: '#000000',
              anchor: 'end',
              clamp : true,
              align: 'end'
          }
        }
        }
});
 // --------------------------End of First Chart------------------------
  }


}

