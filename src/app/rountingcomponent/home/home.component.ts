import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModalConfig, NgbModal]
})
export class HomeComponent implements OnInit {

  @ViewChild('myModal') myModal;
  private modalRef;
  counter : any = 0;
  isBtn = true;
  isModalShow = false;
  customOptions: any = {
    loop: true,
    margin:25,
    autoplay:true,
    responsiveClass: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],

    responsive: {
      0: {
       items: 2,
        nav:true
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }

  },
      
   nav: true
  }
  




  constructor(private router: Router,private modalService: NgbModal, config: NgbModalConfig,private comp: AppComponent) {
   
    
    
  }
  ngOnInit() {

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
