import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-studentwelfare',
  templateUrl: './studentwelfare.component.html',
  styleUrls: ['./studentwelfare.component.css']
})
export class StudentwelfareComponent implements OnInit {
  schoolId: any;
  routeData: any;
  pageId: any;
  cols1: any[] = [];
  sampleSelectedColumn1: Array<Object> = [];
  cols2: any[] = [];
  sampleSelectedColumn2: Array<Object> = [];
  cols3: any[] = [];
  sampleSelectedColumn3: Array<Object> = [];
  cols4: any[] = [];
  sampleSelectedColumn4: Array<Object> = [];
  cols5: any[] = [];
  sampleSelectedColumn5: Array<Object> = [];
  cols6: any[] = [];
  sampleSelectedColumn6: Array<Object> = [];
  cols7: any[] = [];
  sampleSelectedColumn7: Array<Object> = [];
  cols8: any[] = [];
  sampleSelectedColumn8: Array<Object> = [];
  cols9: any[] = [];
  sampleSelectedColumn9: Array<Object> = [];
  cols10: any[] = [];
  sampleSelectedColumn10: Array<Object> = [];
  cols11: any[] = [];
  sampleSelectedColumn11: Array<Object> = [];
  cols12: any[] = [];
  sampleSelectedColumn12: Array<Object> = [];
  cols13: any[] = [];
  sampleSelectedColumn13: Array<Object> = [];
  cols14: any[] = [];
  sampleSelectedColumn14: Array<Object> = [];
  ptmgr: any;
  ptmgrData: any;
  noDataFound: boolean;
  notebook: any;
  notebookData: any;
  bag: any;
  bagData: any;
  uniform: any;
  uniformData: any;
  footwear: any;
  footwearData: any;
  buspass: any;
  buspassData: any;
  pencil: any;
  pencilData: any;
  grometry: any;
  grometryData: any;
  atlas: any;
  atlasData: any;
  lap11Data: any;
  lap11: any;
  lap12: any;
  lap12Data: any;
  lappre12: any;
  lappre12Data: any;
  cwsnBenefitData: any;
  cwsnBenefit: any;
  commonData: any;
  exportColumns: any;

  constructor(
    private registersService: RegisterService,
    private cs: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userSessionService: UserSessionService
  ) {
    debugger
    this.schoolId = this.userSessionService.schoolId();
    this.routeData = this.route.snapshot;
    this.pageId = this.routeData.queryParams.PageId;
  }

  ngOnInit() {
    this.headerData();
    if (this.pageId == 1) {
      this.getPTMGR();
    }
    if (this.pageId == 2) {
      this.getTextbooks();
    }
    if (this.pageId == 3) {
      this.getNotebooks();
    }
    if (this.pageId == 4) {
      this.getBags();
    }
    if (this.pageId == 5) {
      this.getUniforms();
    }
    if (this.pageId == 6) {
      this.getFootwear();
    }
    if (this.pageId == 7) {
      this.getBusPass();
    }
    if (this.pageId == 8) {
      this.getPencil();
    }
    if (this.pageId == 9) {
      this.getGeometry();
    }
    if (this.pageId == 10) {
      this.getAtlas();
    }
    if (this.pageId == 11) {
      this.getLaptops11();
    }
    if (this.pageId == 12) {
      this.getLaptops12();
    }
    if (this.pageId == 13) {
      this.getLaptopsPre12();
    }
    if (this.pageId == 14) {
      this.getCWSNben();
    }

  }
  headerData() {
    // PTMGR Nutritious Meal Programme Beneficiaries (Mid Day Meal)
    this.cols1 = [
      { field: 'unique_id_no', header: 'UDISE No' },
      { field: 'name', header: 'Student Name' },
      { field: 'community_name', header: 'Community' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
    ];
    this.sampleSelectedColumn1 = this.cols1;
    // Cost Free Textbooks Distribution Details
    this.cols2 = [
      { field: '', header: 'UDISE No' },
      { field: '', header: 'Student Name' },
      { field: '', header: 'Gender' },
      { field: '', header: 'Class' },
      { field: '', header: 'Section' },
      { field: '', header: 'Subject' },
      { field: '', header: 'Medium' },
      { field: '', header: 'Distribution Date' }
    ];
    this.sampleSelectedColumn2 = this.cols2;
    // Cost Free Notebooks Distribution Details
    this.cols3 = [
      { field: 'unique_id_no', header: 'UDISE No' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Medium' },
      { field: 'counts', header: 'Count' },
      { field: 'scat', header: 'Note Category' },
      { field: 'distribution_date', header: 'Distribution Date' },
    ];
    this.sampleSelectedColumn3 = this.cols3;
    // Cost Free Bags Distribution Details
    this.cols4 = [

      { field: 'unique_id_no', header: 'UDISE No' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'MEDINSTR_DESC', header: 'Medium' },
      { field: 'scheme_category', header: 'Size' },
      { field: 'distribution_date', header: 'Distribution Date' },

    ];
    this.sampleSelectedColumn4 = this.cols4;
    // Cost Free Uniforms Distribution Details
    this.cols5 = [

      { field: 'unique_id_no', header: 'UDISE No' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'MEDINSTR_DESC', header: 'Medium' },
      { field: 'scheme_category', header: 'Size' },
      { field: 'sets', header: 'Sets' },
      { field: 'distribution_date', header: 'Distribution Date' }
    ];
    this.sampleSelectedColumn5 = this.cols5;
    // Cost Free Footwear Distribution Details
    this.cols6 = [
      { field: 'unique_id_no', header: 'UDISE No' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'MEDINSTR_DESC', header: 'Medium' },
      { field: 'scheme_category', header: 'Size' },
      { field: 'distribution_date', header: 'Distribution Date' },
    ];
    this.sampleSelectedColumn6 = this.cols6;
    // Cost Free Bus Pass Distribution Details
    // Cost Free Colour Pencil Distribution Details
    // Cost Free Geometry Box Distribution Details
    // Cost Free Atlas Distribution Details
    // Cost Free Laptops Distribution 11-Std Details
    this.cols7 = [
      { field: 'unique_id_no', header: 'UDISE No' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'MEDINSTR_DESC', header: 'Medium' },
      { field: 'distribution_date', header: 'Distribution Date' },
    ];
    this.sampleSelectedColumn7 = this.cols7;
    // Cost Free Laptops Distribution 12-Std Details
    // Cost Free Laptops Distribution Previous Year 12-Std Details
    this.cols8 = [
      { field: 'unique_id_no', header: 'UDISE No' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'unique_supply', header: 'Serial No' },
      { field: 'distribution_date', header: 'Distribution Date' },
    ];
    this.sampleSelectedColumn8 = this.cols8;

    // CWSN-Student Benefits Register
    this.cols9 = [

      { field: 'unique_id_no', header: 'Student Id' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'da_name', header: 'CWSN' },
      { field: 'national_id', header: 'National Id' },
      { field: 'bf', header: 'Benefits' },
      { field: 'provided_by', header: 'Provided By' },
      { field: 'acad_year', header: 'Academic Year' },
    ];
    this.sampleSelectedColumn9 = this.cols9;
  }

  //   PTMGR Nutritious Meal Programme Beneficiaries (Mid Day Meal)
  getPTMGR() {
    this.registersService.getPTMGRMealProgramme(this.schoolId).subscribe((res) => {
      if (res) {
        this.ptmgr = res.result.ptmgr_noon_meal_program;
        if (this.ptmgr.length > 0) {
          this.ptmgrData = this.ptmgr;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }


  // Cost Free Textbooks Distribution Details
  getTextbooks() {
    //  this.registersService.getCostTextNotebookDetails(this.schoolId).subscribe((res) => {
    //       if (res) {
    //         this.data = res.result.student_osc;
    //       }
    //     });
  }


  // Cost Free Notebooks Distribution Details
  getNotebooks() {
    this.registersService.getCostFreeNotebookDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.notebook = res.result.note_book_distribute_details;
        if (this.notebook.length > 0) {
          this.notebookData = this.notebook;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }
  // Cost Free Bags Distribution Details
  getBags() {
    this.registersService.getCostFreeBagsDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.bag = res.result.bags_distribute_details;
        if (this.bag.length > 0) {
          this.bagData = this.bag;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }
  // Cost Free Uniforms Distribution Details
  getUniforms() {
    const classsection = {
      emis_school_id: this.schoolId,
      set: '1'
    };

    this.registersService.getCostFreeUniformsDetails(classsection, true).subscribe((res) => {
      if (res) {
        this.uniform = res.result.uniform_distribute_details;
        if (this.uniform.length > 0) {
          this.uniformData = this.uniform;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }
  // Cost Free Footwear Distribution Details
  getFootwear() {
    this.registersService.getCostFreeFootwearDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.footwear = res.result.footwear_distribute_details;
        if (this.footwear.length > 0) {
          this.footwearData = this.footwear;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }
  // Cost Free Bus Pass Distribution Details
  getBusPass() {
    this.registersService.getCostFreeBuspassDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.buspass = res.result.buspass_distribute_details;
        if (this.buspass.length > 0) {
          this.commonData = this.buspass;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }
  // Cost Free Colour Pencil Distribution Details
  getPencil() {
    this.registersService.getCostFreeColourpencilDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.pencil = res.result.colorpencil_distribute_details;
        if (this.pencil.length > 0) {
          this.commonData = this.pencil;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }
  // Cost Free Geometry Box Distribution Details
  getGeometry() {
    this.registersService.getCostFreeGeometryboxDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.grometry = res.result.geometrybox_distribute_details;
        if (this.grometry.length > 0) {
          this.commonData = this.grometry;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }
  // Cost Free Atlas Distribution Details
  getAtlas() {
    this.registersService.getCostFreeAtlasDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.atlas = res.result.atlas_distribute_details;
        if (this.atlas.length > 0) {
          this.commonData = this.atlas;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }
  // Cost Free Laptops Distribution 11-Std Details
  getLaptops11() {
    this.registersService.getCostFreeLaptops11Details(this.schoolId).subscribe((res) => {
      if (res) {
        this.lap11 = res.result.Laptops_distribute_details;
        if (this.lap11.length > 0) {
          this.commonData = this.lap11;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }
  // Cost Free Laptops Distribution 12-Std Details
  getLaptops12() {
    this.registersService.getCostFreeLaptops12Details(this.schoolId).subscribe((res) => {
      if (res) {
        this.lap12 = res.result.Laptops_distribute_details;
        if (this.lap12.length > 0) {
          this.lap12Data = this.lap12;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }
  // Cost Free Laptops Distribution Previous Year 12-Std Details
  getLaptopsPre12() {
    this.registersService.getCostFreeLaptops12preyearsDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.lappre12 = res.result.Laptops_distribute_pervious;
        if (this.lappre12.length > 0) {
          this.lap12Data = this.lappre12;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }
  // CWSN-Student Benefits Register
  getCWSNben() {
    this.registersService.getCwsnStudentBenefitRegister(this.schoolId).subscribe((res) => {
      if (res) {
        this.cwsnBenefit = res.result.cwsn_benefit;
        if (this.cwsnBenefit.length > 0) {
          this.cwsnBenefitData = this.cwsnBenefit;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });
  }

   // common for all
   onBack() {
    this.router.navigate(['/register']);
  }

  exportPdf(data, dataHeader) {
    debugger;
    this.exportColumns = dataHeader.map(col => ({ title: col.header, dataKey: col.field }));
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, data);
        doc.save('Verificationstatus.pdf');
      })
    })
  }

  exportExcel(data) {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Verificationstatus");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }


}
