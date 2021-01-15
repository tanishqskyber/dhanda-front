import { Component, OnInit , Input, ViewEncapsulation} from '@angular/core';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';
import { error } from 'protractor';
@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {
textvalue= 1; 
textvalue1=1;
cartData:any=[]
delieveryCharges:number=0;
totalPrice:number=0;
totalPayment:number=0;
couponDiscount:number=0;
couponCode:any;
orderNotes:any=null;
couponId:any=null;
totalPaymentb4Discount:number=0
TpaymentRefvalue:number=0
couponApplied:boolean=false;
allowFreeShipping:boolean=false
minCartAmount:number=0;
allowStorePickup:boolean=false;
shippingAmount:number=0;
cartId:any=[];
@Input() counter = 1;

  constructor(private catservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.loadStoreDetails()
  }

  private loadCartDetails(){
    this.spinner.show()
    this.totalPrice=0
    this.catservice.getCartList().then(resp=>{
      console.log(resp)
      if(resp['message']=='Record not found!' && resp['status']==404){
        this.spinner.hide()
        this.router.navigate(['/empty-cart']);
      }else if(resp['message']=='Cart info!' && resp['status']==200){
      
        this.cartData=resp['data']
        for(var data of this.cartData){
          if(data['variations'].length>0){
            
            this.totalPrice+=data['selling_price']*data['qty']
            if(this.allowFreeShipping==true){
              this.totalPaymentb4Discount=this.totalPrice-this.couponDiscount
            }else{
              this.delieveryCharges=this.shippingAmount
              this.totalPaymentb4Discount=(this.totalPrice+this.delieveryCharges)-this.couponDiscount
            }
            

            
            
          }
          this.cartId.push(parseInt(data['id']))
        }
        this.spinner.hide()
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
      this.toastr.error('Failed to get Cart Details!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
  }

  add(id) {
    this.spinner.show()
    for(var data of this.cartData){
      if(data['id']==id){
        data['qty']++
        this.catservice.updateCartQuantity(id,data['qty']).then(resp=>{
         
          if(resp['message']=='Cart updated successfully!' && resp['status']==200){
            this.loadCartDetails()
            
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
    }
    
  }

  remove(id) {
    this.spinner.show()
    for(var data of this.cartData){
      if(data['id']==id){
        if(data['qty'] != 0){
          data['qty']--;
          if(data['qty']>=1){
            this.catservice.updateCartQuantity(id,data['qty']).then(resp=>{
              if(resp['message']=='Cart updated successfully!' && resp['status']==200){
                this.loadCartDetails()
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
          }else if (data['qty']===0){
            this.deleteCartData(id)
          }
          
        }
      }
    }
  
}

deleteCartData(id:any){
  this.spinner.show()
  this.catservice.removeCartItem(id).then(resp=>{
    console.log(resp)
    if(resp['message']=='Item remove from cart successfully!'){
      this.loadCartDetails()
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

loadCouponDetails(){
  this.totalPayment=this.totalPaymentb4Discount
  this.spinner.show()
  this.catservice.getCouponDetails(this.couponCode).then(resp=>{
   
    console.log(resp)
    if(resp['message']=='Coupon info!' && resp['status']==200){
     var curr_date=new Date()
     var expiry_date=new Date(resp['data']['expiry_date'])
   if(expiry_date.getDate()>curr_date.getDate()){
    if(resp['data']['coupon_type']=='amount'){
      if(this.totalPayment>=resp['data']['min_cart_amount']){
        this.couponDiscount=resp['data']['amount']
        this.totalPayment=this.totalPayment-this.couponDiscount
        this.couponId=resp['data']['id']
        console.log(this.totalPayment)
        this.couponApplied=true
        this.TpaymentRefvalue=this.totalPayment
        this.spinner.hide()
      }else{
        this.spinner.hide()
       
        this.couponApplied=false
        this.toastr.error('1Coupon not applicable!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    }else if(resp['data']['coupon_type']=='percentage'){
      if(this.totalPayment>=resp['data']['min_cart_amount']){
        this.couponDiscount=(this.totalPayment/100)*resp['data']['amount']
        this.totalPayment=this.totalPayment-this.couponDiscount
        this.couponId=resp['data']['id']
        console.log(this.totalPayment)
        this.couponApplied=true
        this.TpaymentRefvalue=this.totalPayment
        this.spinner.hide()
      }else{
        this.spinner.hide()
     
        this.couponApplied=false
        this.toastr.error('2Coupon not applicable!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
 
    }else{
      this.spinner.hide()
     
      this.couponApplied=false
      this.toastr.error('3Coupon not applicable!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
   }else{
    this.spinner.hide()
    this.couponApplied=false
    this.toastr.error('Coupon has been expired!','Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
   }
      
    }else if(resp['message']=='No coupon found!' && resp['status']==404){
      this.spinner.hide()
      this.couponApplied=false
      this.toastr.error('Coupon not found!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else if(resp['message']=='Error!' && resp['status']==404){
      this.spinner.hide()
      this.couponApplied=false
      this.toastr.error('Error while fetching coupon details!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else{
      this.spinner.hide()
      this.couponApplied=false
      this.toastr.error('Something went wrong!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  },error=>{
    this.spinner.hide()
    this.couponApplied=false
    console.log(error)
    this.toastr.error('Failed in getting coupon details','Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  })
}

proceesRequest(){
  if(this.couponApplied){
    if(this.minCartAmount<=this.TpaymentRefvalue){
      var params={
        "cart_id":this.cartId,
        "notes":this.orderNotes,
        "coupon_id":this.couponId,
        "shipping_amount":this.delieveryCharges,
        "total_price":this.totalPrice,
        "coupon_discount":this.couponDiscount,
       "final_amount":this.TpaymentRefvalue
      }
      localStorage.setItem('orderDetails',JSON.stringify(params))
      if(this.allowStorePickup==true){
        localStorage.setItem('allowStorePickup',"true")
      }else if(this.allowStorePickup==false){
        localStorage.setItem('allowStorePickup',"false")
      }
      this.router.navigate(['/checkout']);
    }else{
      this.toastr.error('Total amount is less than Minimum cart Amount Value','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }

  }else if(!this.couponApplied){
    if(this.minCartAmount<=this.totalPaymentb4Discount){
    var params={
      "cart_id":this.cartId,
      "notes":this.orderNotes,
      "coupon_id":this.couponId,
      "shipping_amount":this.delieveryCharges,
      "total_price":this.totalPrice,
      "coupon_discount":this.couponDiscount,
     "final_amount":this.totalPaymentb4Discount
    }
    localStorage.setItem('orderDetails',JSON.stringify(params))
    if(this.allowStorePickup==true){
      localStorage.setItem('allowStorePickup',"true")
    }else if(this.allowStorePickup==false){
      localStorage.setItem('allowStorePickup',"false")
    }
    
    this.router.navigate(['/checkout']);
  }else{
    this.toastr.error('Total amount is less than Minimum cart Amount Value','Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
  }
 


}

private loadStoreDetails(){
  this.spinner.show()
  this.catservice.getStoreDetails(localStorage.getItem('storeId')).then(resp=>{
    console.log(resp)
    if(resp['message']=='Store location Details!'){
      this.allowFreeShipping=resp['data']['allow_free_shipping']
      this.minCartAmount=resp['data']['min_order_amount']
      this.allowStorePickup=resp['data']['allow_store_pickup']
      if(resp['data']['shipping_amount']!=null)
      this.shippingAmount=resp['data']['shipping_amount']
      else
      this.shippingAmount=0
      this.loadCartDetails()
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
}
