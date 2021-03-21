import { Moment } from 'moment';

export interface  bloodgroupjson {
    bloodgroup: bloodgroup[];
}

export interface bloodgroup {
  id: number;
  group: string;
}


export interface religionjson{
    religion: religion[];
}

export interface religion {
    id: number;
    religion_name:string;
}

export interface communityjson{community:community[];}

export interface community {
    id:number, 
    community_code:string,
    community_name:string, 
    religion_id:number   
}
export interface castejson{caste:caste[];}
export interface caste {
    id:number, 
    caste_code:number,
    caste_name:string,
    community_id:number
}

export interface studentregistration {
    dataStatus: boolean,
    message: string
    result: masterlist[],
    status: number
} 
export interface studentDetails {
    id:number,
    student_id:number,
    benefit_type:string,
    term: string,
    distribute_date: string,
} 
export interface teacherDetails {
    IndexID:number,
    CallStatus:number,
    NoOfCalls: number;
    CallRemarks: string,
} 
export interface teacherDropdown {
    label:string,
    value:string,
} 
export interface callTracking {
AssignBy: number,
AssignDate: Date,
AssignTeach: number,
AssignedCls: number,
AssignedSub: string,
CallReference: string,
CallRemarks: string,
CallStatus: number,
CallStatusName: string,
IndexID: number,
PhoneNo: number,
RecDate: Date
RespoDate: Date
NoOfCalls: number;
dropdownValues:teacherDropdown[]
}
export interface StudentAdmissionApproval {
    stud_id:number,
    schl_id: number,
    class: number,
    sec: number,
    stud_name: string,
    admt_date: Date,
    admison_status: number,
    remrks: string,
}
interface masterlist{
 incomes:income[],
 bloodgroup:bloodgroup[],
 classstudying: classstudying[],
 disabilities: disabilities[],
 disadvantages: disadvantages[],
 groupcate: groupcate[],
 groupcateid: string,
 highclass: string
 launguages: launguages[],
 lowestclass: string
 managecateid: managecateid[]
 mediumofinstruction: mediumofinstruction[],
 religions: religion[],
 rtetype: rtetype[],
 schooldist: schooldist[],
 validation_error:string,
}
export interface StaffListApproval {
    stud_id:number,
    schl_id: number,
    class: number,
    sec: number,
    stud_name: string,
    admt_date: Date,
    admison_status: number,
    remrks: string,
} 
export interface income{ id:string, income_value:string}
export interface classstudying{id: string, class_studying: string}
export interface disabilities{label: string, value: string}
export interface disadvantages{id: string, dis_group_name: string}
export interface groupcate{id: string, group_code: string, sub3: string, sub4: string, sub5: string, sub6: string, group_description: string, group_name: string}
export interface launguages{ID: string,MEDINSTR_DESC: string,MEDINSTR_ID: string,MEDINSTR_PARENT: string,PREDEFINED: string,VISIBLE_YN: string}
export interface managecateid{id: string, manage_name: string}
export interface mediumofinstruction{id: string,ID: string,MEDINSTR_DESC: string,MEDINSTR_ID: string,MEDINSTR_PARENT: string,PREDEFINED: string,
                                     VISIBLE_YN: string,created_date: Moment,medium_instrut: string,modified_date: Moment,other_medium: string,school_key_id: string}
export interface religions{id: string, religion_name: string}
export interface rtetype{cate: string, id: string}
export interface schooldist{label: string,value: number}