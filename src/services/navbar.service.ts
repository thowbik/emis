import { Injectable, Output, EventEmitter } from '@angular/core'
import { DataService } from './data.service';


@Injectable()
export class NavBarService {

  isOpen = true;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private dataService: DataService) {
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }


}