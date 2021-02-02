import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent } from '../../custom-modal/custom-modal.component';
import { AppComponent } from '../../app.component';
import {CategoryService} from '../../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';
import {AuthService} from '../../_api/auth.service'
import * as $ from 'jquery';
import {Location} from '@angular/common';
@Component({
  selector: 'app-searched-product',
  templateUrl: './searched-product.component.html',
  styleUrls: ['./searched-product.component.css']
})
export class SearchedProductComponent implements OnInit {
  @ViewChild('myModal') myModal;
  private modalRef;
  counter : any = 0;
  isBtn = false;
  isModalShow = false;
  productData:any=[];
  params:any;
  subcategory_name:any;
  search:any;
  category_id:any;
  variation_ids_arr:any=[]
  varia_split_arr:any=[]
  variation_ids:any;
  productInfo:any={}
  variationData:any={}
  variationKeys:any=[]
  product_id:any;
  cartData:any=[]
  variation1:any=[]
  variation2:any=[]
  variationname1:any=null;
  variationname2:any=null;
  activeElement1 :number;
  activeElement2 :number;
  username:any;
  cartcounter : any = 0;
  constructor(private modalService: NgbModal, config: NgbModalConfig,private comp: AppComponent,private categoryservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute,private auth:AuthService,private _location: Location) { 
    config.backdrop = true;
    config.keyboard = false;
  }

  ngOnInit(): void {
  
    this.loadCartData()
    $("#bottom-menu a").on('click', function () {
      $("#bottom-menu a").removeClass('active');
      $(this).addClass('active');
   });
   this.username=localStorage.getItem('username')
  }


  private loadProductdata(){
    this.productData=[]
    var pdata=JSON.parse(localStorage.getItem('searchedProduct'))
  
    var obje={}
    for(var data of pdata){
      let obj = this.cartData.find(o => o.product_id === data['id']);
     if(obj!=undefined){
      if(Object.keys(obj).length != 0){
        obje={
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
          cart_added:true,
          product_count:obj['qty']
      }
    }else{
      obje={
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
    }
     }else{
      obje={
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
     }
    
    this.productData.push(obje)
  }
    console.log(this.productData)
  }

  gotoProductDetails(p_id:any){
    this.router.navigate(['/product-details'],{queryParams:{id:p_id}});
  }


  loadProductInfo(id,variations,product){
    this.variation1=[]
    this.variation2=[]
    this.variationname1=null
    this.variationname2=null
    this.varia_split_arr=[]
    this.variation_ids_arr=[]
    this.product_id=id
    this.productInfo=product
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
        this.variation1=[]
        this.variation2=[]
      }
      this.isModalShow = true;
    
   
    
  }


  addproducttoCart(p_count:any){
    this.spinner.show()
    if(this.auth.getIsLoggedIn()){
    if(this.varia_split_arr.length >0){
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
          this.loadCartData()
          this.toastr.success('Product has been added to the cart!','Success',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }else if(resp['message']=='Product in the cart has been updated!' && resp['status']==200){
          this.isModalShow = false;
          this.loadCartData()
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
          this.loadCartData()
          //this.foot.loadCartDetails()
          this.toastr.success('Product has been added to the cart!','Success',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }else if(resp['message']=='Product in the cart has been updated!' && resp['status']==200){
          this.isModalShow = false;
          this.spinner.hide()
          this.loadCartData()
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

  backDrop(){
    this.isModalShow = false;
    this.productInfo={}
    this.variationData=[]
    this.variationKeys=[]
  }
  decrement(p_count,id) {
    for(var data of this.productData){
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

  increment(p_count,id) {
    for(var data of this.productData){
      if(data['id']==id){
        data['product_count']=p_count
        data['product_count']++;
        this.isBtn = true;
      }
    }
   
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

  decrementproduct(p_count,id) {
 // console.log(p_count)
 for(var data of this.productData){
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

  add(id,qty) {
    this.spinner.show()
        this.categoryservice.updateCartQuantity(id,qty).then(resp=>{
         
          if(resp['message']=='Cart updated successfully!' && resp['status']==200){
            this.loadCartData()
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

  deleteCartData(id:any){
    this.spinner.show()
    this.categoryservice.removeCartItem(id).then(resp=>{
      console.log(resp)
      if(resp['message']=='Item remove from cart successfully!'){
        this.loadCartData()
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


  incrementproduct(p_count,id) {
    for(var data of this.productData){
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

    this.isModalShow = false; 

  }

  private loadCartData(){
    this.cartcounter=0
    this.spinner.show()
    this.categoryservice.getCartList().then(resp=>{
      if(resp['message']=='Record not found!' && resp['status']==404){
        this.spinner.hide()
        this.loadProductdata()
      }else if(resp['message']=='Cart info!' && resp['status']==200){
      
        this.cartData=resp['data']
        for(var data of this.cartData){
          this.cartcounter+=data['qty']
        }
        this.loadProductdata()
        this.spinner.hide()
      }else{
        this.spinner.hide()
        this.loadProductdata()
        console.log('Something Went Wrong!')
      }
    },error=>{
      this.spinner.hide()
      this.loadProductdata()
      console.log(error)
      console.log('Failed to load!')
    })
  }

  setActiveVar1(id:any){
  
    this.activeElement1 = id;

  }

  setActiveVar2(id:any){
  
    this.activeElement2 = id;

  }

  getCurrentPath(){
    localStorage.setItem('currentpath',this.router.url)
  }

  closepop(){
    this.isModalShow=false;
  }

  backClicked() {
    localStorage.removeItem('searchedProduct')
    this._location.back();
    
  }


}
