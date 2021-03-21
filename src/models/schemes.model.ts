    import { Moment } from 'moment';
   
    /**  Model : Scheme's Master */
            export interface schemesResponse { 
                dataStatus: boolean;
                message:string;
                result:Array<schemeList>;
                status:number;
            }

            export interface schemeList {
                appli_highclass: string;
                appli_lowclass: string;
                id: string;
                scheme_name: string;
            }

    /**  Model : Scheme's SubCategory Master */
            export interface schemeSubCategoryResponse { 
                dataStatus: boolean;
                message:string;
                result:Array<schemeSubCategoryList>;
                status:number;
            }

            export interface schemeSubCategoryList {
                id:number;
                multiselect: number;
                scheme_category: string;
                scheme_id: number;
                timestamp: Moment;
            }

    /**  Model : Noonmeal Scheme's */    
            export interface noonmealResponse { 
                dataStatus: boolean;
                message:string;
                result:Array<noonmealList>;
                status:number;
            }

            export interface noonmealList  {
                status: boolean;
                class_section:string;
                class_studying_id:string;
                distribution_date:Moment;
                indent:Moment;
                is_opted:any;
                name:string;
                noonmeal_id:string;
                scheme_id:string;
                stud_id:string;
                student_id:string;
                unique_id_no:number;
            }

    /**  Model : Uniform Scheme's */    
            export interface uniformResponse { 
                dataStatus: boolean;
                message:string;
                result:Array<uniformList>;
                status:number;
            }

            export interface uniformList {
                school_id:string;
                student_id:string;
                indent_date:Moment;
                class:string; section :string;
                set1_category:string ;
                set2_category:string;
                set3_category:string ;
                set4_category:string; 
                set1_distribution_date:Moment ;
                set2_distribution_date:Moment ;
                set3_distribution_date:Moment ;
                set4_distribution_date:Moment ;
                finalsub:number ;     
            }

    /**  Model : Laptop Scheme's */    
            export interface existingLaptopResponse {
                    dataStatus: boolean;
                    status: number;
                    message: string;
                    result:Array<existingLaptopList>;
            }

            export interface existingLaptopList 
            {
                    id: string;
                    unique_id_no: string;
                    name: string;
                    class_studying_id: string;
                    class_section: string;
                    scheme_id: string;
                    scheme_category: string;
                    indent_date: string;
                    distribution_date: Moment
                    unique_supply: number;
            }

    /** Model : Save and Update Scheme's  (common for all Schemes) */
            export interface saveAndUpdateSchemesDtl {
                dataStatus: boolean;
                message: string;
                status: number;
            }

            export interface medinstr {
                ID : number; 
                MEDINSTR_ID: number; 
                MEDINSTR_DESC : string; 
                MEDINSTR_PARENT: number;
                PREDEFINED: number;
                VISIBLE_YN: number;
            }
            
    /** Namespace : uniform scheme's sample format  
        namespace uniformModel {
            export interface uniformList {
                id: number;
                name: string;
            }

            export interface uniform2 {
                id: number;
                isActive: boolean;
            }
        } */