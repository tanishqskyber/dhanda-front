import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
})
export class CustomModalComponent implements OnInit {

  counter = 0;
  isBtn = true;
  private modalRef;
  

  constructor(public activeModal: NgbActiveModal, config: NgbModalConfig) {
    config.backdrop = true;
    config.keyboard = false;
  }
 
  ngOnInit(): void {
  }

  decrement() {
    if(this.counter > 0){
      this.counter--;
    }
    if(this.counter === 0){
      this.isBtn = true;
    } else{
      this.isBtn = false;
    }
  }

  increment() {
    this.counter++;
    this.isBtn = false;
  }

}
