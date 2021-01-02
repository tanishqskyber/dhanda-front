import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { AppComponent } from '../app.component';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';

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
  productData:any=[];
  params:any;
  subcategory_name:any;
  search:any;
  category_id:any;
  constructor(private modalService: NgbModal, config: NgbModalConfig,private comp: AppComponent,private categoryservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute) {
    config.backdrop = true;
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.queryParams["id"];
    this.subcategory_name=localStorage.getItem('sub_cat_name')
    this.loadProductdata()
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


  private loadProductdata(){
    this.spinner.show()
    this.categoryservice.getProductList(this.params).then(resp=>{
      console.log(resp)
      if(resp['message']=='No product found!' && resp['status']==404){
        this.spinner.hide()
        this.toastr.error('No Product found!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else if(resp['message']=='Product list!' && resp['status']==200){
        this.spinner.hide()
        this.productData=resp['data']
        this.category_id=this.productData[0]['category_id']
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

  gotoProductDetails(p_id:any){
    this.router.navigate(['/product-details'],{queryParams:{id:p_id}});
  }


  }
