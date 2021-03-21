import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ebid',
  templateUrl: './ebid.component.html',
  styleUrls: ['./ebid.component.css']
})
export class EbidComponent implements OnInit {
KEF :any; 
IEC:any;
  constructor() { }

  ngOnInit() {
    this.KEF = [
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Community Engagement_Saajha_KEF.mp4",
      },
  
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Content_for_teachers_and_students_AID_INDIA_KEF.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Educational Initiatives_final.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Emotional Intelligence_Nalandaway Foundation_KEF.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/English_for_Everyone_ELF_KEF.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Hygiene_Jan-Pro India_KEF.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Pedagogy for higher order learning,critical thinking and creativity_Avanti_KEF.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Science_Math_AhaGuru_Education_KEF.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Skill Development_Quest Alliance_KEF.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Skill Development_Udhyam_KEF.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/The Kaivalya Education Foundation Story _ 06 May 2020.mp4",
      }
    ]
    this.IEC = [
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Art-CPB-IEC-CSSL-Ignus.mp4",
      },
  
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Atal Tinkering Labs-Life Lab- IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Career Counselling-Higher Education Project-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Community Engagement-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Competency-GPF-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Digital Content-PALGenie-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Foundational-literacy-Madhi-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Learning Assessments-CSSL-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Motivation in classrooms-Solar Trust-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Multimedia-KSL-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Pedagogy&capacity-Ignus-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Psychological Counselling-Yuvathi trust-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Skills-Lend a Hand-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Sports and Fitness-Sportz village-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Teacher Training-IEC-IEC-CSSL-Ignus.mp4",
      },
      {
        "src": "https://ebid1.s3.ap-south-1.amazonaws.com/Technology Devpt-Gooru India Foundation- IEC-CSSL-Ignus.mp4",
      }

    ]

  

  }

}
