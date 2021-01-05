import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { AppComponent } from 'src/app/app.component';
import {CategoryService} from './../../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
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
  categorydata:any=[]
  counter : any = 0;
  storeData:any={}
  isBtn = true;
  isModalShow = false;
  store_name:any="";
  store_logo:any=""
  mobile_number:any=""
  recproductData:any=[]
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
  
  search:any;


  searchedProducts:any=[]
  variationData:any=[];
  constructor(private router: Router,private modalService: NgbModal, config: NgbModalConfig,private comp: AppComponent,private categoryservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService) {
    config.backdrop = true;
    config.keyboard = false;
    
    
  }
  ngOnInit() {
    this.store_name=localStorage.getItem('username')
    this.mobile_number=localStorage.getItem('contact-no')
    this.loadStoreDetails()
    this.loadCategories()
    this.laodRecentProducts()
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


}

incrementproduct() {
  this.counter++;
  this.isBtn = false;

}

incrementOne() {
  this.counter++;
  localStorage.setItem('cart',this.counter);
  this.isModalShow = false; 

}

addToCart() {
  this.isModalShow = false;

}

private loadCategories(){
  this.spinner.show()
  this.categoryservice.getcategories().then(resp=>{
    if(resp['status']==200 && resp['message']=='Category list!'){
      this.spinner.hide()
      this.categorydata=resp['data']
    }else{
      this.spinner.hide()
      this.toastr.error('Something went wrong!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  
  },error=>{
    this.spinner.hide()
    console.log(error)
    this.toastr.error('Failed to load!','Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  })
}

gotoSubcategory(catid){
  this.router.navigate(['/category-page'],{queryParams:{id:catid}});
}

private loadStoreDetails(){
  this.spinner.show()
  this.categoryservice.getStoreDetails().then(resp=>{
    console.log(resp)
    if(resp['message']=='Store location Details!'){
      // this.allowFreeShipping=resp['data']['allow_free_shipping']
      // this.minCartAmount=resp['data']['min_order_amount']
      // this.allowStorePickup=resp['data']['allow_store_pickup']
      // this.shippingAmount=resp['data']['shipping_amount']
      this.store_name=resp['data']['store_name']
      this.store_logo=resp['data']['logo_img']
      this.spinner.hide()
      // this.loadCartDetails()
    }else{
      this.spinner.hide()
      this.toastr.error('Something went wrong!!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  },error=>{
    this.spinner.hide()
    console.log(error)
    this.toastr.error('Failed in load Store Details','Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  })
}

searhcProductbySearch(){
  this.spinner.show()
  this.categoryservice.searchProduct(this.search).then(resp=>{
    console.log(resp)
    if(resp['message']=='Product info!'){
      this.searchedProducts=resp['data']
      this.spinner.hide()
      localStorage.setItem('searchedProduct',JSON.stringify(this.searchedProducts))
      this.router.navigate(['/searched-results']);
    }else{
      this.spinner.hide()
      this.toastr.error('Not able to find the product','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  },error=>{
    this.spinner.hide()
    console.log(error)
    this.toastr.error('Failed to find the products','Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  })
}

private laodRecentProducts(){
  this.spinner.show()
  this.categoryservice.recentProducts().then(resp=>{
    console.log(resp)
    if(resp['message']=='Recent product list!'){
      this.recproductData=resp['data']
      this.spinner.hide()
     
    }else{
      this.spinner.hide()
      this.toastr.error('Not able to find the product','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  },error=>{
    this.spinner.hide()
    console.log(error)
    this.toastr.error('Failed to find the products','Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  })
}
gotoProductDetails(p_id:any){
  this.router.navigate(['/product-details'],{queryParams:{id:p_id}});
}

loadProductInfo(id,variations){
  console.log(id)
  console.log(variations)
  this.isModalShow = true;
}


}
