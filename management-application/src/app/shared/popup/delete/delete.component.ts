import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  @Output() popupVal = new EventEmitter<boolean>();
  emittedValue: boolean = false;
  constructor() {}
  ngOnInit(): void {
  }
  delClick(){
    console.log("clicked");
    this.popupVal.emit(this.emittedValue);
    console.log(this.emittedValue);
  }
}
