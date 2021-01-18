import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { AppComponent } from 'src/app/app.component';
import { CategoryService } from './../../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import { OwlOptions } from 'ngx-owl-carousel-o';
import {AuthService} from '../../_api/auth.service'
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
  categorydata: any = []
  counter: any = 0;
  storeData: any = {}
  isBtn = true;
  isModalShow = false;
  store_name: any = "";
  store_logo: any = ""
  mobile_number: any = ""
  recproductData: any = []
  customOptions: any = {
    loop: false,
    margin: 25,
    autoplay: true,
    responsiveClass: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],

    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }

    },

    nav: true
  }

  search: any;


  searchedProducts: any = []
  variationData: any = [];
  stroreid:any;
  params:any;
  usermobile:any='XXXXXXXXXX'
  whatsappchat:any;
  callnow:any;
  variation_ids: any;
  variationKeys: any = []
  product_id: any;
  cartData:any=[]
  constructor(private router: Router, private modalService: NgbModal, config: NgbModalConfig, private comp: AppComponent, private categoryservice: CategoryService, private toastr: ToastrService, private spinner: NgxSpinnerService,private route:ActivatedRoute,private auth: AuthService) {
    config.backdrop = true;
    config.keyboard = false;


  }
  ngOnInit() {
    
    this.params = this.route.snapshot.paramMap.get('username');
    if(this.params==undefined || this.params==null){
      this.params=localStorage.getItem('username')
    }
   // console.log(username)
    localStorage.setItem('username',this.params)
    this.store_name =  this.params
    this.mobile_number = localStorage.getItem('contact-no')
    
  
    this.laodRecentProducts()
    this.loadStoreId()
  }
  open() {
    //this.modalService.open(CustomModalComponent);
    console.log("get cart value", localStorage.getItem('cart'));
    this.isModalShow = true;
  }
  backDrop() {
    this.isModalShow = false;
  }
  decrement(p_count, id) {
    for (var data of this.recproductData) {
      if (data['id'] == id) {
        data['product_count'] = p_count
        if (data['product_count'] > 0) {
          data['product_count']--;
        }
        if (data['product_count'] === 0) {
          this.isBtn = false;
        } else {
          this.isBtn = true;
        }
      }


    }
    // if(this.counter > 0){
    //   this.counter--;
    // }
    // if(this.counter === 0){
    //   this.isBtn = false;
    // } else{
    //   this.isBtn = true;
    // }
  }

  increment(p_count, id) {
    for (var data of this.recproductData) {
      if (data['id'] == id) {
        data['product_count'] = p_count
        data['product_count']++;
        this.isBtn = true;
      }
    }

  }


  decrementproduct() {
    if (this.counter > 0) {
      this.counter--;
    }
    if (this.counter === 0) {
      this.isBtn = true;
    } else {
      this.isBtn = false;
    }


  }

  incrementproduct() {
    this.counter++;
    this.isBtn = false;

  }

  incrementOne() {
    this.counter++;
    localStorage.setItem('cart', this.counter);
    this.isModalShow = false;

  }

  addToCart() {
    this.isModalShow = false;

  }

  private loadCategories() {
    this.spinner.show()
    this.categoryservice.getcategories(this.stroreid).then(resp => {
      if (resp['status'] == 200 && resp['message'] == 'Category list!') {
        this.spinner.hide()
        this.categorydata = resp['data']
      } else {
        this.spinner.hide()
        this.toastr.error('Something went wrong!', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }

    }, error => {
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to load!', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    })
  }

  gotoSubcategory(catid) {
    this.router.navigate(['/category-page'], { queryParams: { id: catid } });
  }

  private loadStoreDetails() {
    this.spinner.show()
    this.categoryservice.getStoreDetails(this.stroreid).then(resp => {
      console.log(resp)
      if (resp['message'] == 'Store location Details!') {
        // this.allowFreeShipping=resp['data']['allow_free_shipping']
        // this.minCartAmount=resp['data']['min_order_amount']
        // this.allowStorePickup=resp['data']['allow_store_pickup']
        // this.shippingAmount=resp['data']['shipping_amount']
        this.store_name = resp['data']['store_name']
        this.store_logo = resp['data']['logo_img']
        this.spinner.hide()
        // this.loadCartDetails()
      } else {
        this.spinner.hide()
        this.toastr.error('Something went wrong!!', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }
    }, error => {
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed in load Store Details', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    })
  }

  searhcProductbySearch() {
    this.spinner.show()
    this.categoryservice.searchProduct(this.search,localStorage.getItem('storeId')).then(resp => {
      console.log(resp)
      if (resp['message'] == 'Product info!') {
        this.searchedProducts = resp['data']
        this.spinner.hide()
        localStorage.setItem('searchedProduct', JSON.stringify(this.searchedProducts))
        this.router.navigate(['/searched-results']);
      } else {
        this.spinner.hide()
        this.toastr.error('Not able to find the product', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }
    }, error => {
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to find the products', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    })
  }

  private laodRecentProducts() {
   
    this.categoryservice.recentProducts().then(resp => {
      console.log(resp)
      if (resp['message'] == 'Recent product list!') {
        var recdata= resp['data']
        for(var data of recdata){
          var obj={
            category_id:data['category_id'],
        category_name:data['category_name'],
        created_at:data['created_at'],
        discount:data['discount'],
        id:data['id'],
        mrp:data['mrp'],
        pieces:data['pieces'],
        product_description:data['product_description'],
        product_img_url:data['product_img_url'],
        product_img_url_2:data['product_img_url_2'],
        product_img_url_3:data['product_img_url_3'],
        product_img_url_4:data['product_img_url_4'],
        product_img_url_5:data['product_img_url_5'],
        product_name:data['product_name'],
        product_type_id:data['product_type_id'],
        product_type_name:data['product_type_name'],
        selling_price:data['selling_price'],
        status:data['status'],
        sub_category_id:data['sub_category_id'],
        subcategory_name:data['subcategory_name'],
        user_id:data['user_id'],
        user_name:data['user_name'],
        variations:data['variations'],
        cart_added:false,
        product_count:0
          }
          this.recproductData.push(obj)
        }

      } else {
       console.log('Something went wrong in recent products')
       
      }
    }, error => {
      console.log('Failed to load Recent products')
      console.log(error)
    
    })
  }
  gotoProductDetails(p_id: any) {
    this.router.navigate(['/product-details'], { queryParams: { id: p_id } });
  }

  loadProductInfo(id, variations) {
    console.log(id)
    console.log(variations)
    this.product_id = id
    this.counter = 0
    this.variation_ids = null;
    this.variationKeys = []
    if (variations.length > 0) {
      var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, []);
      };
      this.isModalShow = true;
      this.variationData = groupBy(variations, 'variation_name')
      console.log(this.variationData);
      console.log(Object.keys(this.variationData))
      this.variationKeys = Object.keys(this.variationData)
      
    } else {
      this.variationData = {}
      this.variationKeys = []
      this.isModalShow = true;
    }
   
  }

  private loadStoreId(){
    this.spinner.show()
    this.auth.getStoreId(this.params).then(resp=>{
      console.log(resp)
      if(resp['message']=='Vendor!'){
        this.spinner.hide()
        this.stroreid=resp['data']['id']
        this.usermobile=resp['data']['contact_no']
        this.whatsappchat=`//api.whatsapp.com/send?phone=91${this.usermobile}&text=Hi`
        this.callnow=`tel:0${this.usermobile}`
        localStorage.setItem('storeId',this.stroreid)
        this.loadStoreDetails()
        this.loadCategories()
        console.log(this.stroreid,)
      }else if(resp['message']=='Vendor not found!'){
        this.spinner.hide()
        this.toastr.error('Store not found!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else{
        this.spinner.hide()
        this.toastr.error('Something Went Wrong!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
     
      
    },error=>{
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to load store details!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
  }

 
}
