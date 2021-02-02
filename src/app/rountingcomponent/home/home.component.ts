import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { AppComponent } from 'src/app/app.component';
import { CategoryService } from './../../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../_api/auth.service'
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
  isBtn = false;
  isModalShow = false;
  store_name: any = "";
  store_logo: any = ""
  mobile_number: any = ""
  recproductData: any = []


  // slides = [
  //   { img: "http://placehold.it/350x150/000000" },
  //   { img: "http://placehold.it/350x150/111111" },
  //   { img: "http://placehold.it/350x150/333333" },
  //   { img: "http://placehold.it/350x150/666666" },
  //   { img: "http://placehold.it/350x150/000000" },
  //   { img: "http://placehold.it/350x150/111111" },
  //   { img: "http://placehold.it/350x150/333333" },
  //   { img: "http://placehold.it/350x150/666666" }
  // ];
  slideConfig = { "slidesToShow": 4, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  search: any;


  searchedProducts: any = []
  variationData: any = [];
  stroreid: any;
  params: any;
  usermobile: any = 'XXXXXXXXXX'
  whatsappchat: any;
  callnow: any;
  variation_ids: any;
  variationKeys: any = []
  product_id: any;
  cartData: any = []
  cartData1:any = []
  storeLocation: any;
  variation1:any=[]
  variation2:any=[]
  variationname1:any=null;
  variationname2:any=null;
  activeElement1 :number;
  activeElement2 :number;
  variation_ids_arr:any=[]
  varia_split_arr:any=[]
  productInfo:any={}
  cartcounter : any = 0;
  username:any;
  constructor(private router: Router, private modalService: NgbModal, config: NgbModalConfig, private comp: AppComponent, private categoryservice: CategoryService, private toastr: ToastrService, private spinner: NgxSpinnerService, private route: ActivatedRoute, private auth: AuthService) {
    config.backdrop = true;
    config.keyboard = false;

  }
  ngOnInit() {
  
     this.params = this.route.snapshot.paramMap.get('username');
     if(localStorage.getItem('username')!=null){
        if(localStorage.getItem('username')!=this.params){
          localStorage.removeItem('token')
          localStorage.removeItem('contact-no')
          localStorage.removeItem('subCategory')
          localStorage.removeItem('storeId')
          localStorage.setItem('username', this.params)
          this.loadStoreId()
        }else if(localStorage.getItem('username')==this.params){
          localStorage.setItem('username', this.params)
          this.loadStoreId()  
        }
    }else{
      localStorage.setItem('username', this.params)
      this.loadStoreId()
  
    }
    $("#bottom-menu a").on('click', function () {
      $("#bottom-menu a").removeClass('active');
      $(this).addClass('active');
   });
   this.username=localStorage.getItem('username')
  

    

   
  }
  open() {
    //this.modalService.open(CustomModalComponent);
    console.log("get cart value", localStorage.getItem('cart'));
    this.isModalShow = true;
  }
  backDrop() {
    this.isModalShow = false;
  }
  decrement(p_count,id) {
    for(var data of this.recproductData){
      if(data['id']==id){
        data['product_count']=p_count
        if(data['product_count'] > 0){
          data['product_count']--;
        }
        if(data['product_count'] === 0){
          this.isBtn = false;
        } else{
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


  decrementproduct(p_count,id) {
    // console.log(p_count)
    for(var data of this.recproductData){
     let obj = this.cartData.find(o => o.product_id === data['id']);
     console.log(obj)
     if(obj!=undefined){
       if(data['id']==id){
         data['product_count']=p_count
         if(data['product_count'] > 0){
             data['product_count']--;
             console.log(data['product_count'])
             if(data['product_count']>=1)
               this.add(obj['id'],data['product_count'])
            else if(data['product_count']===0){
               this.deleteCartData(obj['id'])
           }
         }
         
         
       }
     }
   }
   
     }

     deleteCartData(id:any){
      this.spinner.show()
      this.categoryservice.removeCartItem(id).then(resp=>{
        console.log(resp)
        if(resp['message']=='Item remove from cart successfully!'){
          this.laodRecentProducts()
         // this.foot.loadCartDetails()
          this.spinner.hide()
        }else if(resp['message']=='Something went wrong'){
          this.spinner.hide()
          this.toastr.error('Something went wrong','Error',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
      },error=>{
        console.log(error)
        this.spinner.hide()
        this.toastr.error('Failed to remove cart item!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      })
    }

    add(id,qty) {
      this.spinner.show()
          this.categoryservice.updateCartQuantity(id,qty).then(resp=>{
           
            if(resp['message']=='Cart updated successfully!' && resp['status']==200){
              this.laodRecentProducts()
             // this.foot.loadCartDetails()
            }else{
              this.spinner.hide()
              this.toastr.error('Something went wrong!!!','Error',{
                timeOut:3000,
                positionClass:'toast-top-center'
                })
            }
           
          },error=>{
            this.spinner.hide()
            console.log(error)
            this.toastr.error('Failed to update quantity!','Error',{
              timeOut:3000,
              positionClass:'toast-top-center'
              })
          })
        
      
      
    }

    incrementproduct(p_count,id) {
      for(var data of this.recproductData){
        let obj = this.cartData.find(o => o.product_id === data['id']);
        if(obj!=undefined){
          if(data['id']==id){
            data['product_count']=p_count
            data['product_count']++;
            this.add(obj['id'],data['product_count'])
          }
        }
        
      }
     
      this.isBtn = true;
  
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
        if(resp['data']['latitude']!=null || resp['data']['longitude']!=null){
          this.storeLocation = `https://maps.google.com/?q=${resp['data']['latitude']},${resp['data']['longitude']}`
        }else{
          this.storeLocation = `javascript:void(0)`
        }
       
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
    this.categoryservice.searchProduct(this.search, localStorage.getItem('storeId')).then(resp => {
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
    this.recproductData=[]
    this.categoryservice.recentProducts(this.stroreid).then(resp => {
      console.log(resp)
      if (resp['message'] == 'Recent product list!') {
        var recdata = resp['data']
        for (var data of recdata) {
          var obj = {
            category_id: data['category_id'],
            category_name: data['category_name'],
            created_at: data['created_at'],
            discount: data['discount'],
            id: data['id'],
            mrp: data['mrp'],
            pieces: data['pieces'],
            product_description: data['product_description'],
            product_img_url: data['product_img_url'],
            product_img_url_2: data['product_img_url_2'],
            product_img_url_3: data['product_img_url_3'],
            product_img_url_4: data['product_img_url_4'],
            product_img_url_5: data['product_img_url_5'],
            product_name: data['product_name'],
            product_type_id: data['product_type_id'],
            product_type_name: data['product_type_name'],
            selling_price: data['selling_price'],
            status: data['status'],
            sub_category_id: data['sub_category_id'],
            subcategory_name: data['subcategory_name'],
            user_id: data['user_id'],
            user_name: data['user_name'],
            variations: data['variations'],
            cart_added: false,
            product_count: 0
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

  loadProductInfo(id,variations,product){
    this.variation1=[]
    this.variation2=[]
    this.variationname1=null
    this.variationname2=null
    this.product_id=id
    this.productInfo=product
    this.varia_split_arr=[]
    this.variation_ids_arr=[]
    console.log(variations)
      var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, []);
      };
    
      this.variationData=groupBy(variations, 'variation_name')
      this.variationKeys=Object.keys(this.variationData)
      if(this.variationKeys.length==2){
        console.log("Load Product")
        console.log(this.variationKeys)
        this.variationname1=this.variationKeys[0]
        this.variationname2=this.variationKeys[1]
        for(var data of variations){
          if(data['variation_name']==this.variationKeys[0]){
            var obj={
              id:data['id'],
              status:data['status'],
              variation_name:data['variation_name'],
              variation_value:data['variation_value']
            }
            this.variation1.push(obj)
          }else if(data['variation_name']==this.variationKeys[1]){
            var obje={
              id:data['id'],
              status:data['status'],
              variation_name:data['variation_name'],
              variation_value:data['variation_value']
            }
            this.variation2.push(obje)
          }
         
        }
      }else if(this.variationKeys.length==1){
        console.log("Load Product")
        console.log(this.variationKeys)
        this.variationname1=this.variationKeys[0]
        for(var data of variations){
          if(data['variation_name']==this.variationKeys[0]){
            var obj={
              id:data['id'],
              status:data['status'],
              variation_name:data['variation_name'],
              variation_value:data['variation_value']
            }
            this.variation1.push(obj)
          }
         
        }
      }else{
        console.log("Load Product")
        console.log(this.variationKeys)
        this.variation1=[]
        this.variation2=[]
      }
      this.isModalShow = true;
    
   
    
  }

  private loadStoreId() {
    this.spinner.show()
    this.auth.getStoreId(this.params).then(resp => {
      console.log(resp)
      if (resp['message'] == 'Vendor!') {
        this.spinner.hide()
        this.stroreid=resp['data']['id']
        this.usermobile=resp['data']['contact_no']
        this.whatsappchat=`//api.whatsapp.com/send?phone=91${this.usermobile}&text=Hi, I found your online store on mydhanda.com and wanted to know more about your products and offerings.`
        this.callnow=`tel:${this.usermobile}`
        // <a href="tel:0120-4888488"><img src="/static/images/common/phone_icon.svg" alt="">0120 - 4888488</a>
       
        localStorage.setItem('storeId',this.stroreid)
        this.loadStoreDetails()
        this.loadCategories()
        this.loadStoreImpressions()
        this.laodRecentProducts()
        this.loadCartDetails()
        console.log(this.stroreid,)
      } else if (resp['message'] == 'Vendor not found!') {
        this.spinner.hide()
        this.toastr.error('Store not found!', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      } else {
        this.spinner.hide()
        this.toastr.error('Something Went Wrong!', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }


    }, error => {
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to load store details!', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    })
  }

  private loadStoreImpressions() {
    this.categoryservice.getstoreimpressions(this.stroreid).then(resp => {
      console.log(resp)
    }, error => {
      console.log(error)
    })
  }

  closepop(){
    this.isModalShow=false;
  }

  setActiveVar1(id:any){
  
    this.activeElement1 = id;

  }

  setActiveVar2(id:any){
  
    this.activeElement2 = id;

  }

  selectvariation(id,var_name){
    var obj={}
    obj["id"]=id
    obj['var_name']=var_name
    if(this.variation_ids_arr.length>0){
     if(this.variation_ids_arr.find(key => key.var_name === obj['var_name'])){
      this.removeByAttr(this.variation_ids_arr, 'var_name', obj['var_name']);
      this.variation_ids_arr.push(obj)
     }else{
      this.variation_ids_arr.push(obj)
     }
    }else{
      this.variation_ids_arr.push(obj)
    }
    this.varia_split_arr = this.variation_ids_arr.map(function(item) {
      return item['id'];
    });
    this.variation_ids=this.varia_split_arr.toString()
  }

  removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}

addproducttoCart(p_count:any){
  this.spinner.show()
  if(this.auth.getIsLoggedIn()){
  if(this.varia_split_arr.length > 0){
  if(p_count>0){
    var obj={
      "product_id":this.product_id,
      "price":this.productInfo['selling_price'],
      "qty":p_count,
      "variation_id":this.variation_ids
    }
    this.categoryservice.addcart(obj).then(resp=>{
      console.log(resp)
      if(resp['message']=='Product added to the cart successfully!' && resp['status']==200){
        this.isModalShow = false;
        this.laodRecentProducts()
        this.loadCartDetails()
        this.spinner.hide()
        this.toastr.success('Product has been added to the cart!','Success',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else if(resp['message']=='Product in the cart has been updated!' && resp['status']==200){
        this.isModalShow = false;
        this.spinner.hide()
        this.laodRecentProducts()
        this.loadCartDetails()
        this.toastr.success('Product in the cart has been updated!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else{
        this.toastr.error('Something Went Wrong!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    },error=>{
      console.log(error)
      this.toastr.error('Failed to add to the cart!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
  }else{
    this.toastr.error('Please Select the Quantity!','Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
}else{
  if(p_count>0){
    var obje={
      "product_id":this.product_id,
      "price":this.productInfo['selling_price'],
      "qty":p_count,
      "variation_id":""
    }
    this.categoryservice.addcart(obje).then(resp=>{
      console.log(resp)
      if(resp['message']=='Product added to the cart successfully!' && resp['status']==200){
        this.isModalShow = false;
        this.spinner.hide()
        this.laodRecentProducts()
        this.loadCartDetails()
        //this.foot.loadCartDetails()
        this.toastr.success('Product has been added to the cart!','Success',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else if(resp['message']=='Product in the cart has been updated!' && resp['status']==200){
        this.isModalShow = false;
        this.spinner.hide()
        this.laodRecentProducts()
        this.loadCartDetails()
        //this.foot.loadCartDetails()
        this.toastr.success('Product in the cart has been updated!','Error',{
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
      console.log(error)
      this.spinner.hide()
      this.toastr.error('Failed to add to the cart!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
  }else{
    this.spinner.hide()
    this.toastr.error('Please Select the Quantity!','Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
}
}else{
  this.spinner.hide()
  if (this.varia_split_arr.length > 0){
    if (p_count > 0){
      var cobj = {
        "product_id": this.product_id,
        "price": this.productInfo['selling_price'],
        "qty": p_count,
        "variation_id": this.variation_ids
      }
    
      localStorage.setItem('addCartData',JSON.stringify(cobj))
    }else {
      this.spinner.hide()
      this.toastr.error('Please Select the Quantity!', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    }
  }else {
    if (p_count > 0){
      var cobje = {
        "product_id": this.product_id,
        "price": this.productInfo['selling_price'],
        "qty": p_count,
        "variation_id": ""
      }
      localStorage.setItem('addCartData',JSON.stringify(cobje))
    }else {
      this.spinner.hide()
      this.toastr.error('Please Select the Quantity!', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    }
  }
  this.toastr.warning('Please Login to Continue!', 'Alert', {
    timeOut: 3000,
    positionClass: 'toast-top-center'
  })
  localStorage.setItem('currentpath',this.router.url)
  this.router.navigate(['/signin-signup'])
}

  

}

private loadCartDetails(){
  this.cartcounter=0
  this.cartData1=[]
  this.categoryservice.getCartList().then(resp=>{

    if(resp['message']=='Record not found!' && resp['status']==404){
          console.log('Not Record in Cart')
          this.cartcounter=0;
        
    }else if(resp['message']=='Cart info!' && resp['status']==200){
  
      this.cartData1=resp['data']
     
      for(var data of this.cartData1){
        this.cartcounter+=data['qty']
      }
    

    }else{
    console.log("Something Went Wrong")
    this.cartcounter=0;
    }
  },error=>{
    this.cartcounter=0;
    console.log(error)
   
  })
}

getCurrentPath(){
  localStorage.setItem('currentpath',this.router.url)
}


}
