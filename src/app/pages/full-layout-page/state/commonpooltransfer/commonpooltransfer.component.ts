import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commonpooltransfer',
  templateUrl: './commonpooltransfer.component.html',
  styleUrls: ['./commonpooltransfer.component.scss']
})
export class CommonpooltransferComponent implements OnInit {
  public dataHeader: any;
  public CommonpooltransferList: any;
  constructor(private router: Router) {
    // this.CommonpooltransferList = this.router;
  }

  ngOnInit() {
  }

}
