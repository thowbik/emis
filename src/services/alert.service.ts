import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AlertService {

  constructor(private toastr: ToastrService) {
    this.toastr.toastrConfig.enableHtml = true;
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.toastr.success(message);
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.toastr.error(message);
  }

  warning(message: string, keepAfterNavigationChange = false) {
    this.toastr.warning(message);
  }

  info(message: string, keepAfterNavigationChange = false) {
    this.toastr.info(message);
  }
}
