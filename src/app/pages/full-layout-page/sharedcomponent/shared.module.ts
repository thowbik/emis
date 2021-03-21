import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule} from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CalendarModule } from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {PanelModule} from 'primeng/panel';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {AccordionModule} from 'primeng/accordion';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { EditSchoolProfileComponent } from './edit-school-profile/edit-school-profile.component';
import { AddSchoolProfileComponent } from './add-school-profile/add-school-profile.component';
import { SchooldetailsEditComponent } from './schooldetails-edit/schooldetails-edit.component';

@NgModule({
   imports: [
      CommonModule,
      RadioButtonModule,
      FormsModule,
      ReactiveFormsModule,
      TableModule,
      MultiSelectModule,
      DialogModule,
      ButtonModule,
      FieldsetModule,
      KeyFilterModule,
      CalendarModule,
      TabViewModule,
      RadioButtonModule,
      DropdownModule,
      CardModule,
      CheckboxModule,
      PanelModule,
      InputTextareaModule,
      ConfirmDialogModule,
      FileUploadModule,
      GalleriaModule,
      ScrollPanelModule,
      AccordionModule,MessagesModule,MessageModule],
   declarations: [EditSchoolProfileComponent, AddSchoolProfileComponent,SchooldetailsEditComponent],
   exports: [EditSchoolProfileComponent, AddSchoolProfileComponent,SchooldetailsEditComponent],
})
export class SharedModule { }
