import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// declare let L;
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {NavigationService} from 'src/services/navigation.service';
import { StateDashboardService } from './dashboard.services';
import {UserSessionService} from '../../../../services/usersession.service';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import {Chart} from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class StateDashboardComponent implements OnInit {
  // dataHeader: any[] = [];
  selectedColumns: any[] = [];
  data: any[] = [];
  totalCountData: any[] = [];
  centralGovtCountData: any[] = [];
  fullyAidedCountData: any[] = [];
  governmentCountData: any[] = [];
  partiallyAidedCountData: any[] = [];
  UnAidedCountData: any[] = [];
  totalStudents: any;
  totalTeachers: any;
  totalSchools: any;
  totalNonteaching: any;
  renewaldata: any;
  userTypeId: any;
  pending0: any;
  totalpending0: any;
  pending1: any;
  totalpending1: any;
  pending2: any;
  totalpending2: any;
  totalpending3: any;
  pending3: any;
  pending4: any;
  totalpending4: any;
  pending5: any;
  pending6: any;
  totalpending5: any;
  totalpending6: any;
  Piechart: any[];
  districtId: number;
  eduDistId: number;
  blockId: number;
  dashboardData: any[] = [];
  beoMapId: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private navigationService: NavigationService,
    private userSessionService: UserSessionService,
    private dashboardService: StateDashboardService
    ) {
      this.router = router;
      this.userTypeId = this.userSessionService.userTypeId();
      this.districtId = this.userSessionService.districtId();
      this.eduDistId  = this.userSessionService.eduDistId();
      this.blockId    = this.userSessionService.blockId();
      this.beoMapId = this.userSessionService.emisUsertype1();
  }

  ngOnInit() {
    Chart.plugins.unregister(ChartDataLabels);
    this.districtId = this.districtId ? this.districtId : 99;
    this.eduDistId = this.eduDistId ? this.eduDistId : 0;
    this.blockId = this.blockId ? this.blockId : 0;
    this.beoMapId = this.userTypeId == "6" ? this.beoMapId : 0;
    this.getDashboardData();

  //   this.dataHeader = [
  //   { field: 'body_type', header: 'Body Type' },
  //   { field: 'central_govt', header: 'Central Govt' },
  //   { field: 'fully_aided', header: 'Fully Aided' },
  //   { field: 'govt', header: 'Government'},
  //   { field: 'total', header: 'Total' }
  // ];

// Start of the First Chart Students-------------------------------

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
     // plugins: [ChartDataLabels],
      type: 'doughnut',
      data: {
      labels: ['Govt', 'Fully Aided', 'Partially Aided', 'Unaided', 'Central Govt'],
      datasets: [{
        // label: 'Students (Lakhs)',
        data: [4690181,	1574755,	620179,	5984561,71831],
        backgroundColor: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
        borderWidth: 1
    }]
},
      options: {
          title: {
            display: true,
            text: 'No. of Students by Management',
            fontSize: 14
          },
          legend: {
            position: 'right',
            labels: {
              boxWidth: 10
            }
          },
          layout: {
            padding: {
                left: 25,
                right: 0,
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
                      display: false,
                    //   formatter: (value, ctx) => {
                    //   const datasets = ctx.chart.data.datasets;
                    //   if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                    //     const sum = datasets[0].data.reduce((a, b) => a + b, 0);
                    //     const  percentage = Math.round((value / sum) * 100) + '%';
                    //     return percentage;
                    //   } else {
                    //     return percentage;
                    //   }
                    // },

                color: '#fffefc',
                anchor: 'center',
                clamp : true,
                align: 'center'
              }
          }
}
});

// --------------------------End of First Chart------------------------


// Start of the Second Chart------------------------

    const ctx1 = document.getElementById('myChart1') as HTMLCanvasElement;
    const myChart1 = new Chart(ctx1, {
     // plugins: [ChartDataLabels],
      type: 'doughnut',
      data: {
      labels: ['Govt', 'Fully Aided', 'Partially Aided', 'Unaided', 'Central Govt'],
      datasets: [{
        label: 'Teachers (Lakhs)',
        data: [225522, 59888, 17360, 264410, 1395],
        backgroundColor: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
        borderWidth: 1
    }]
},
        options: {
              title: {
                display: true,
                text: 'No. of Teachers by Management',
                fontSize: 14 },

                legend: {
                position: 'right',
                labels: { boxWidth: 10 }
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
                    display: false,
                    // formatter: (value, ctx1) => {
                    //   const datasets = ctx1.chart.data.datasets;
                    //   if (datasets.indexOf(ctx1.dataset) === datasets.length - 1) {
                    //     const sum = datasets[0].data.reduce((a, b) => a + b, 0);
                    //     const  percentage = Math.round((value / sum) * 100) + '%';
                    //     return percentage;
                    //   } else {
                    //     return percentage;
                    //   }
                    // },


                    color: '#fffefc',
                    anchor: 'center',
                    clamp : true,
                    align: 'center'
                  }
              }
}
});

// --------------------------End of Second Chart------------------------


// Start of the Third Chart------------------------

    const ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;
    const myChart2 = new Chart(ctx2, {
     // plugins: [ChartDataLabels],
        type: 'doughnut',
        data: {
        labels: ['Govt', 'Fully Aided', 'Partially Aided', 'Unaided', 'Central Govt'],
        datasets: [{
            label: 'Schools (Thousands)',
            data: [37498,	7287,	1057,	13045,65],
            backgroundColor: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
            borderWidth: 1
        }]
        },
        options: {
        title: {
        display: true,
        text: 'No. of Schools by Management',
        fontSize: 14
        },
        legend: {
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
            display: false,
            // formatter: (value, ctx2) => {
            //   const datasets = ctx2.chart.data.datasets;
            //   if (datasets.indexOf(ctx2.dataset) === datasets.length - 1) {
            //     const sum = datasets[0].data.reduce((a, b) => a + b, 0);
            //     const  percentage = Math.round((value / sum) * 100) + '%';
            //     return percentage;
            //   } else {
            //     return percentage;
            //   }
            // },
                  color: '#fffefc',
                  anchor: 'center',
                  clamp : true,
                  align: 'center'
          }
        }
}
});

// --------------------------End of Third Chart------------------------

// Start of the fourth Chart Classwise
const ctx3 = document.getElementById('myChart3') as HTMLCanvasElement;
    const myChart3 = new Chart(ctx3, {
     plugins: [ChartDataLabels],
      type: 'bar',
      data: {
      labels: ['PreKG', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', ],
      datasets: [{
           // tslint:disable-next-line: max-line-length
           data: [8805,	273181,	608008,	0,	1009403,	1038263,	1078248,	1047296,	1008290,	1041175,	1058012,	1021412,	1022140,	882286,	857371
          ],
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
// ---------------------------End of Fourth Chart--------------------


// ---------------------------Start of Fifth Chart School by Categroy ---------


    const ctx4 = document.getElementById('myChart4') as HTMLCanvasElement;
    const myChart4 = new Chart(ctx4, {
 // plugins: [ChartDataLabels],
  type: 'bar',
  data: {
  labels: ['Primary School', 'Middle School', 'High School', 'Hr Sec School' ],
  datasets: [{
       // tslint:disable-next-line: max-line-length
       data: [24305,	7015,	3083,	3095],
      // tslint:disable-next-line: max-line-length
      backgroundColor: ['#58508d', '#58508d', '#58508d', '#58508d'],
      borderWidth: 1
  }]
  },
    options: {
    title: {
    display: true,
    text: 'Govt Schools by Category',

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

// ----------------------------End of Fifth Chart---------------------------

// -----------------------------Start of Sixth Chart-------------------------

    const ctx5 = document.getElementById('myChart5') as HTMLCanvasElement;
    const myChart5 = new Chart(ctx5, {
// plugins: [ChartDataLabels],
type: 'horizontalBar',
data: {
// tslint:disable-next-line: max-line-length
labels: ['ADW', 'Borstal', 'Corporation', 'Differently Abled Welfare Department','Forest Department', 'Kallar BC/MBC Dept','KGBV','Municipality','Residential-Access','School Education Dept','Tribal Welfare'],
datasets: [{
   // tslint:disable-next-line: max-line-length
   data: [1134,	17,	438,	20,	20,	295,	61,	916,	11,	34262,	314],
  // tslint:disable-next-line: max-line-length
  backgroundColor: ['#58508d', '#58508d', '#58508d', '#58508d', '#58508d', '#58508d', '#58508d', '#58508d', '#58508d', '#58508d', '#58508d',],
  borderWidth: 1
}]
},
options: {
title: {
display: true,
text: 'Govt Schools by Management',

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



// ------------------------------End of Sixth Chart---------------------------


// ----------------------------Start of the Seventh Chart----------------------

    const ctx6 = document.getElementById('myChart6') as HTMLCanvasElement;
    const myChart6 = new Chart(ctx6, {
// plugins: [ChartDataLabels],
              type: 'bar',
              data: {
              // tslint:disable-next-line: max-line-length
              labels: ['Primary_School', 'Middle_School', 'High School', 'HrSec School'],
              datasets: [{
              // tslint:disable-next-line: max-line-length
              data: [1253302,953926,562817,1920136
              ],
                // tslint:disable-next-line: max-line-length
              backgroundColor: ['#58508d', '#58508d', '#58508d', '#58508d'],
              borderWidth: 1
              }]
              },
              options: {
              title: {
              display: true,
              text: 'Students by School Category',
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

// ----------------------------End of Seventh Chart ---------------------------

// -----------------------------Start of Eigth Chart- Govt Teacher by School Category-

    const ctx7 = document.getElementById('myChart7') as HTMLCanvasElement;
    const myChart7 = new Chart(ctx7, {
// plugins: [ChartDataLabels],
                type: 'bar',
                data: {
                // tslint:disable-next-line: max-line-length
                labels: ['Primary_School', 'Middle_School', 'High School', 'HrSec School'],
                datasets: [{
                // tslint:disable-next-line: max-line-length
                data: [57745,	50864,	31118,	85775],
                // tslint:disable-next-line: max-line-length
                backgroundColor: ['#58508d', '#58508d', '#58508d', '#58508d'],
                borderWidth: 1
                }]
                },
                options: {
                title: {
                display: true,
                text: 'Govt Teacher by School Category',

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





// -----------------------------End of Eigth Chart---Govt Teacher by School Category----

    this.selectedColumns = [
    { field: 'body_type', header: 'Category'},
    { field: 'central_govt', header: 'Central Govt' },
    { field: 'fully_aided', header: 'Fully Aided' },
    { field: 'govt', header: 'Government'},
    { field: 'partially_aided', header: 'Partially Aided' },
    { field: 'un_aided', header: 'Un Aided'},
    { field: 'total', header: 'Total' }
  ];


    // this.getDashboardDetails();
    
  }
  getDashboardData() {
    this.dashboardService.getDashboardDetailsData(this.districtId, this.eduDistId, this.blockId,this.beoMapId).subscribe((res) => {
      this.dashboardData = res;
      debugger;
      this.totalStudents = this.dashboardData[0].Total_Stud;
      this.totalTeachers = this.dashboardData[0].Total_Teach;
      this.totalSchools = this.dashboardData[0].Schools;
      console.log(this.totalSchools);
      console.log(res);
    });
  }
  SchoolDetails() {
    this.navigationService.goToschoolList();
  }

}
