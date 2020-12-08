import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sub-categories-popup',
  templateUrl: './sub-categories-popup.component.html',
  styleUrls: ['./sub-categories-popup.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModalConfig, NgbModal]
})
export class SubCategoriesPopupComponent implements OnInit {
  
  @ViewChild('myModal') myModal;
  private modalRef;
  counter : any = 0;
  isBtn = true;
  isModalShow = false;

  constructor(private modalService: NgbModal, config: NgbModalConfig,private comp: AppComponent) {
    config.backdrop = true;
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  open() {
      //this.modalService.open(CustomModalComponent);
      console.log("get cart value",localStorage.getItem('cart'));
      this.isModalShow = true;
  }
  backDrop(){
    this.isModalShow = false;
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
    localStorage.setItem('cart',this.counter);
  }

  decrementproduct() {
    if(this.counter > 0){
      this.counter--;
    }
    if(this.counter === 0){
      this.isBtn = true;
    } else{
      this.isBtn = false;
    }
    localStorage.setItem('cart',this.counter);
    this.comp.checkCart();
  }

  incrementproduct() {
    this.counter++;
    this.isBtn = false;
    localStorage.setItem('cart',this.counter);
    this.comp.checkCart();
  }

  incrementOne() {
    this.counter++;
    localStorage.setItem('cart',this.counter);
    this.isModalShow = false; 
    this.comp.checkCart();
  }

  addToCart() {
    this.isModalShow = false;
    this.comp.checkCart();
  }


  }
